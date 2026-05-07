import type { Job, JobFormData } from "../types/job.types";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export const EMPTY_JOB_FORM_DATA: JobFormData = {
  company: "",
  role: "",
  link: "",
  status: "SAVED",
  notes: "",
  salary: "",
  location: "",
  applicationDeadline: "",
};

export function createJobFormData(job?: Job | null): JobFormData {
  if (!job) {
    return EMPTY_JOB_FORM_DATA;
  }

  return {
    company: job.company,
    role: job.role,
    link: job.link ?? "",
    status: job.status,
    notes: job.notes ?? "",
    salary: job.salary ?? "",
    location: job.location ?? "",
    applicationDeadline: formatDateTimeLocalValue(job.applicationDeadline),
  };
}

export function formatJobTimestamp(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return DATE_TIME_FORMATTER.format(date);
}

export function formatJobDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return DATE_FORMATTER.format(date);
}

export function formatDateTimeLocalValue(value: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}
