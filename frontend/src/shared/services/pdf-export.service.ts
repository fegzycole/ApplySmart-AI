import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import type { PdfPage } from './pdf-extraction.service';

/**
 * Map font names to closest StandardFont equivalent
 */
function selectBestFont(fontName: string, pdfDoc: PDFDocument, fontCache: Map<string, PDFFont>): Promise<PDFFont> {
  const lowerFontName = fontName.toLowerCase();

  // Check cache first
  if (fontCache.has(lowerFontName)) {
    return Promise.resolve(fontCache.get(lowerFontName)!);
  }

  // Map font names to StandardFonts
  let standardFont: typeof StandardFonts[keyof typeof StandardFonts];

  // Check for Times/serif fonts first
  if (lowerFontName.includes('times') || lowerFontName.includes('serif')) {
    if (lowerFontName.includes('bold') && (lowerFontName.includes('italic') || lowerFontName.includes('oblique'))) {
      standardFont = StandardFonts.TimesRomanBoldItalic;
    } else if (lowerFontName.includes('bold')) {
      standardFont = StandardFonts.TimesRomanBold;
    } else if (lowerFontName.includes('italic') || lowerFontName.includes('oblique')) {
      standardFont = StandardFonts.TimesRomanItalic;
    } else {
      standardFont = StandardFonts.TimesRoman;
    }
  }
  // Check for Courier/monospace fonts
  else if (lowerFontName.includes('courier') || lowerFontName.includes('mono')) {
    if (lowerFontName.includes('bold') && lowerFontName.includes('oblique')) {
      standardFont = StandardFonts.CourierBoldOblique;
    } else if (lowerFontName.includes('bold')) {
      standardFont = StandardFonts.CourierBold;
    } else if (lowerFontName.includes('oblique') || lowerFontName.includes('italic')) {
      standardFont = StandardFonts.CourierOblique;
    } else {
      standardFont = StandardFonts.Courier;
    }
  }
  // Helvetica/Arial/sans-serif (default)
  else {
    if (lowerFontName.includes('bold') && (lowerFontName.includes('italic') || lowerFontName.includes('oblique'))) {
      standardFont = StandardFonts.HelveticaBoldOblique;
    } else if (lowerFontName.includes('bold')) {
      standardFont = StandardFonts.HelveticaBold;
    } else if (lowerFontName.includes('italic') || lowerFontName.includes('oblique')) {
      standardFont = StandardFonts.HelveticaOblique;
    } else {
      standardFont = StandardFonts.Helvetica;
    }
  }

  return pdfDoc.embedFont(standardFont).then(font => {
    fontCache.set(lowerFontName, font);
    return font;
  });
}

/**
 * Export modified PDF using pdf-lib
 * This preserves layout by using absolute positioning
 */
export async function exportModifiedPdf(
  originalPdfUrl: string,
  modifiedPages: PdfPage[]
): Promise<Blob> {
  console.log('[PDF Export] Starting export with', modifiedPages.length, 'pages');

  // Fetch the original PDF
  const existingPdfBytes = await fetch(originalPdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Font cache to avoid re-embedding same fonts
  const fontCache = new Map<string, PDFFont>();

  // Process each page
  for (const modifiedPage of modifiedPages) {
    const pageIndex = modifiedPage.pageNumber - 1;
    const page = pdfDoc.getPages()[pageIndex];

    if (!page) continue;

    const { width, height } = page.getSize();

    console.log(`[PDF Export] Processing page ${modifiedPage.pageNumber}, ${modifiedPage.textItems.length} text items`);

    // Group text items by line to create larger cover rectangles
    const lineGroups = new Map<number, typeof modifiedPage.textItems>();
    modifiedPage.textItems.forEach(item => {
      if (!lineGroups.has(item.lineIndex)) {
        lineGroups.set(item.lineIndex, []);
      }
      lineGroups.get(item.lineIndex)!.push(item);
    });

    // Cover existing text by drawing white rectangles per line
    // This is more efficient and ensures better coverage
    lineGroups.forEach((items) => {
      if (items.length === 0) return;

      const minX = Math.min(...items.map(i => i.x));
      const maxX = Math.max(...items.map(i => i.x + i.width));
      const minY = Math.min(...items.map(i => i.y));
      const maxHeight = Math.max(...items.map(i => i.height));

      // Draw a white rectangle covering the entire line with extra padding
      page.drawRectangle({
        x: minX - 2,
        y: height - minY - maxHeight - 2,
        width: maxX - minX + 4,
        height: maxHeight + 4,
        color: rgb(1, 1, 1),
        opacity: 1, // Fully opaque white
        borderWidth: 0,
      });
    });

    // Draw modified text at original positions with font matching
    for (const item of modifiedPage.textItems) {
      if (!item.text || item.text.trim() === '') continue;

      try {
        const font = await selectBestFont(item.fontName, pdfDoc, fontCache);

        page.drawText(item.text, {
          x: item.x,
          y: height - item.y - item.height, // Convert coordinates
          size: item.fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      } catch (error) {
        console.warn('[PDF Export] Failed to draw text item:', error, item);
      }
    }
  }

  console.log('[PDF Export] Saving PDF...');
  const pdfBytes = await pdfDoc.save();
  console.log('[PDF Export] Export complete, size:', pdfBytes.length, 'bytes');
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Download PDF blob
 */
export function downloadPdf(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Upload PDF blob to server
 */
export async function uploadPdfBlob(blob: Blob, filename: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', blob, filename);

  const response = await fetch('/api/v1/storage/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload PDF');
  }

  const data = await response.json();
  return data.url;
}
