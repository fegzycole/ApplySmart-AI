package ai.applysmart.service.template;

import ai.applysmart.exception.FileProcessingException;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
class ChromiumPdfRenderer {

    private static final int CHROMIUM_TIMEOUT_SECONDS = 45;

    byte[] render(String html, String chromiumPath) {
        Path workDir = null;

        try {
            workDir = Files.createTempDirectory("applysmart-pdf-");
            Path htmlPath = workDir.resolve("document.html");
            Path pdfPath = workDir.resolve("document.pdf");
            Path logPath = workDir.resolve("chromium.log");

            Files.writeString(htmlPath, html, StandardCharsets.UTF_8);
            Process process = startChromium(chromiumPath, htmlPath, pdfPath, logPath, workDir);
            boolean finished = process.waitFor(CHROMIUM_TIMEOUT_SECONDS, TimeUnit.SECONDS);
            String output = Files.exists(logPath) ? Files.readString(logPath, StandardCharsets.UTF_8) : "";

            validateProcessResult(process, finished, output, pdfPath);
            return Files.readAllBytes(pdfPath);
        } catch (FileProcessingException e) {
            throw e;
        } catch (Exception e) {
            throw new FileProcessingException("Failed to generate PDF with Chromium", e);
        } finally {
            deleteTemporaryDirectory(workDir);
        }
    }

    private Process startChromium(String chromiumPath,
                                  Path htmlPath,
                                  Path pdfPath,
                                  Path logPath,
                                  Path workDir) throws java.io.IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(buildCommand(chromiumPath, htmlPath, pdfPath));
        processBuilder.redirectErrorStream(true);
        processBuilder.redirectOutput(logPath.toFile());
        processBuilder.environment().put("HOME", workDir.toString());
        processBuilder.environment().put("XDG_CONFIG_HOME", workDir.resolve("config").toString());
        processBuilder.environment().put("XDG_CACHE_HOME", workDir.resolve("cache").toString());

        return processBuilder.start();
    }

    private List<String> buildCommand(String chromiumPath, Path htmlPath, Path pdfPath) {
        return List.of(
                chromiumPath,
                "--headless",
                "--no-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--run-all-compositor-stages-before-draw",
                "--no-pdf-header-footer",
                "--print-to-pdf-no-header",
                "--print-to-pdf=" + pdfPath.toAbsolutePath(),
                htmlPath.toUri().toString()
        );
    }

    private void validateProcessResult(Process process, boolean finished, String output, Path pdfPath)
            throws java.io.IOException {
        if (!finished) {
            process.destroyForcibly();
            throw new FileProcessingException("Chromium PDF generation timed out");
        }

        if (process.exitValue() != 0) {
            throw new FileProcessingException("Chromium PDF generation failed: " + output);
        }

        if (!Files.exists(pdfPath) || Files.size(pdfPath) == 0) {
            throw new FileProcessingException("Chromium PDF generation produced an empty file");
        }
    }

    private void deleteTemporaryDirectory(Path directory) {
        if (directory == null) {
            return;
        }

        try (var paths = Files.walk(directory)) {
            paths.sorted(Comparator.reverseOrder()).forEach(path -> {
                try {
                    Files.deleteIfExists(path);
                } catch (Exception e) {
                    log.warn("Failed to delete temporary PDF path: {}", path, e);
                }
            });
        } catch (Exception e) {
            log.warn("Failed to clean temporary PDF directory: {}", directory, e);
        }
    }
}
