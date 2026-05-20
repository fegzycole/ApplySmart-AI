import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiClient, ApiError } from "./api-client";

function createLocalStorageMock() {
  const values = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
    clear: vi.fn(() => {
      values.clear();
    }),
  };
}

function createJsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });
}

describe("ApiClient", () => {
  const config = {
    baseURL: "/api/v1",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  beforeEach(() => {
    vi.stubGlobal("localStorage", createLocalStorageMock());
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("reads the bearer token from storage for each request", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createJsonResponse({ ok: true }));

    localStorage.setItem("auth_token", "latest-token");

    const client = new ApiClient(config);
    await client.get("/profile");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/profile",
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer latest-token",
        },
      }),
    );
  });

  it("uses explicit authorization headers when no stored token exists", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createJsonResponse({ ok: true }));

    const client = new ApiClient(config);
    client.setHeader("Authorization", "Bearer manual-token");

    await client.get("/profile");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/profile",
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer manual-token",
        },
      }),
    );
  });

  it("does not set a JSON content type for FormData payloads", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createJsonResponse({ uploaded: true }));

    const client = new ApiClient(config);
    const payload = new FormData();
    payload.append("file", new Blob(["resume"]), "resume.txt");

    await client.post("/resumes/upload", payload);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/resumes/upload",
      expect.objectContaining({
        headers: {},
        body: payload,
      }),
    );
  });

  it("supports query params on POST requests", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createJsonResponse({ score: 92 }));

    const client = new ApiClient(config);
    await client.post("/resumes/42/analyze", undefined, undefined, {
      jobDescription: "React developer",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/resumes/42/analyze?jobDescription=React+developer",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("returns undefined for successful empty responses", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 204 }));

    const client = new ApiClient(config);

    await expect(client.delete<void>("/sessions/current")).resolves.toBeUndefined();
  });

  it("returns undefined for successful 200 responses with an empty body", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("", { status: 200 }));

    const client = new ApiClient(config);

    await expect(client.get<void>("/empty")).resolves.toBeUndefined();
  });

  it("throws parsed API errors without clearing auth when no token was used", async () => {
    vi.mocked(fetch).mockResolvedValue(
      createJsonResponse(
        { message: "Sign in required" },
        { status: 401 },
      ),
    );

    const client = new ApiClient(config);

    await expect(client.get("/profile")).rejects.toMatchObject({
      status: 401,
      message: "Sign in required",
      data: { message: "Sign in required" },
    });
    expect(localStorage.removeItem).not.toHaveBeenCalled();
  });

  it("clears auth on 401 only when the request used auth", async () => {
    vi.stubGlobal("window", {
      location: {
        pathname: "/login",
        href: "http://localhost/login",
      },
    });
    vi.mocked(fetch).mockResolvedValue(
      createJsonResponse(
        { message: "Session expired" },
        { status: 401 },
      ),
    );
    localStorage.setItem("auth_token", "expired-token");
    localStorage.setItem("refresh_token", "expired-refresh-token");

    const client = new ApiClient(config);

    await expect(client.get("/profile")).rejects.toMatchObject({
      status: 401,
      message: "Session expired",
    });
    expect(localStorage.removeItem).toHaveBeenCalledWith("auth_token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("refresh_token");
  });

  it("maps request aborts to timeout API errors", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockImplementation((_url, init) => (
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          const abortError = new Error("Request aborted");
          abortError.name = "AbortError";
          reject(abortError);
        });
      })
    ));

    const client = new ApiClient(config);
    const request = expect(client.get("/slow")).rejects.toMatchObject({
      status: 408,
      message: "Request timeout",
    });

    await vi.advanceTimersByTimeAsync(config.timeout);
    await request;
  });

  it("returns blob responses from postBlob", async () => {
    const blob = new Blob(["pdf"], { type: "application/pdf" });
    vi.mocked(fetch).mockResolvedValue(new Response(blob, { status: 200 }));

    const client = new ApiClient(config);

    await expect(client.postBlob("/documents/export", { id: "doc-1" })).resolves.toBeInstanceOf(Blob);
    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/documents/export",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "doc-1" }),
      }),
    );
  });

  it("throws parsed API errors from getBlobByUrl", async () => {
    vi.mocked(fetch).mockResolvedValue(
      createJsonResponse(
        { message: "Document unavailable" },
        { status: 404 },
      ),
    );

    const client = new ApiClient(config);

    try {
      await client.getBlobByUrl("/documents/doc-1.pdf");
      throw new Error("Expected getBlobByUrl to reject");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toMatchObject({
        status: 404,
        message: "Document unavailable",
      });
    }
  });
});
