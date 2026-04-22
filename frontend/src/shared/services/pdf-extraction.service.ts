import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker for Vite
// Use CDN for reliability across environments
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

console.log('PDF.js version:', pdfjsLib.version);
console.log('PDF.js worker:', pdfjsLib.GlobalWorkerOptions.workerSrc);

export interface PositionedText {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontName: string;
  pageNumber: number;
  lineIndex: number;
}

export interface PdfPage {
  pageNumber: number;
  width: number;
  height: number;
  textItems: PositionedText[];
}

export interface ExtractedPdfData {
  pages: PdfPage[];
  rawText: string;
}

/**
 * Extract text with positions from PDF using PDF.js
 * This preserves layout information for cloning
 */
export async function extractPdfWithPositions(pdfUrl: string): Promise<ExtractedPdfData> {
  console.log('[PDF Extract] Starting extraction for:', pdfUrl);

  try {
    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      verbosity: 0, // Reduce console noise
    });

    console.log('[PDF Extract] Loading document...');
    const pdf = await loadingTask.promise;
    console.log('[PDF Extract] Document loaded. Pages:', pdf.numPages);

    const pages: PdfPage[] = [];
    let rawText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`[PDF Extract] Processing page ${pageNum}/${pdf.numPages}`);
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      const textContent = await page.getTextContent();

      const textItems: PositionedText[] = [];
      const lines = groupIntoLines(textContent.items as any[], viewport.height);

      lines.forEach((line, lineIndex) => {
        line.forEach((item) => {
          const transform = item.transform;
          const x = transform[4];
          const y = viewport.height - transform[5]; // Flip Y coordinate

          textItems.push({
            text: item.str,
            x,
            y,
            width: item.width,
            height: item.height,
            fontSize: Math.abs(transform[0]), // Font size from transform matrix
            fontName: item.fontName || 'Unknown',
            pageNumber: pageNum,
            lineIndex,
          });

          rawText += item.str;
        });
        rawText += '\n';
      });

      pages.push({
        pageNumber: pageNum,
        width: viewport.width,
        height: viewport.height,
        textItems,
      });
    }

    console.log('[PDF Extract] Extraction complete. Total pages:', pages.length);
    return { pages, rawText };
  } catch (error) {
    console.error('[PDF Extract] Failed:', error);
    throw new Error(`PDF extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Group text items into lines based on Y coordinates
 */
function groupIntoLines(items: any[], pageHeight: number): any[][] {
  const LINE_THRESHOLD = 3; // pixels

  // Sort items by Y position (top to bottom)
  const sortedItems = [...items].sort((a, b) => {
    const yA = pageHeight - a.transform[5];
    const yB = pageHeight - b.transform[5];
    return yA - yB;
  });

  const lines: any[][] = [];
  let currentLine: any[] = [];
  let currentY = -1;

  sortedItems.forEach((item) => {
    const y = pageHeight - item.transform[5];

    if (currentY === -1 || Math.abs(y - currentY) <= LINE_THRESHOLD) {
      currentLine.push(item);
      currentY = y;
    } else {
      if (currentLine.length > 0) {
        // Sort line by X position (left to right)
        currentLine.sort((a, b) => a.transform[4] - b.transform[4]);
        lines.push(currentLine);
      }
      currentLine = [item];
      currentY = y;
    }
  });

  if (currentLine.length > 0) {
    currentLine.sort((a, b) => a.transform[4] - b.transform[4]);
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Extract just the raw text from PDF (for AI processing)
 */
export async function extractPdfText(pdfUrl: string): Promise<string> {
  const data = await extractPdfWithPositions(pdfUrl);
  return data.rawText;
}

/**
 * Render PDF page to canvas for visual display with high DPI support
 * Renders at high resolution but displays at normal size for crisp quality
 */
export async function renderPdfPage(
  pdfUrl: string,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale: number = 1.0
): Promise<void> {
  console.log(`[PDF Render] Rendering page ${pageNumber} at display scale ${scale}`);

  try {
    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      verbosity: 0,
    });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(pageNumber);

    // Get device pixel ratio for high-DPI displays (Retina, etc.)
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Render at higher resolution for clarity (using device pixel ratio)
    // but display at the requested scale
    const renderScale = scale * devicePixelRatio;
    const viewport = page.getViewport({ scale: renderScale });
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get canvas context');
    }

    // Set canvas internal resolution (high for clarity)
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Don't set explicit CSS size - let CSS classes handle it for proper container fitting
    // This allows max-width and max-height to work properly

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    console.log('[PDF Render] Rendering at', viewport.width, 'x', viewport.height, 'displaying at', canvas.style.width, 'x', canvas.style.height);
    await page.render(renderContext).promise;
    console.log('[PDF Render] Render complete');
  } catch (error) {
    console.error('[PDF Render] Failed:', error);
    throw new Error(`PDF rendering failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
