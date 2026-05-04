export function triggerBrowserDownload(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
}

export function getResumeDownloadFilename(fileUrl: string) {
  const pathname = fileUrl.split("#")[0]?.split("?")[0] ?? "";
  const rawFilename = pathname.split("/").pop();

  if (!rawFilename) {
    return "optimized-resume.pdf";
  }

  return decodeURIComponent(rawFilename);
}
