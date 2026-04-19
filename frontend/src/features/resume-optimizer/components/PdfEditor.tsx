import { useEffect, useRef, useState } from 'react';
import { renderPdfPage, extractPdfWithPositions, type PositionedText, type PdfPage } from '@/shared/services/pdf-extraction.service';
import { ChevronLeft, ChevronRight, Loader2, FileSearch, Wand2, Eye } from 'lucide-react';

type LoadingStage = 'loading' | 'extracting' | 'rendering' | 'complete';

interface PdfEditorProps {
  pdfUrl: string;
  onTextExtracted?: (text: string, pages: PdfPage[]) => void;
  scale?: number;
}

export function PdfEditor({ pdfUrl, onTextExtracted, scale = 1.3 }: PdfEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    let isMounted = true;

    const loadPdf = async () => {
      if (!isMounted) return;

      setLoadingStage('loading');
      setError(null);
      setCurrentPage(1);

      try {
        // Stage 1: Loading PDF
        console.log('[PdfEditor] Loading PDF from:', pdfUrl);

        // Stage 2: Extracting text with positions
        if (!isMounted) return;
        setLoadingStage('extracting');
        console.log('[PdfEditor] Extracting text...');
        const extracted = await extractPdfWithPositions(pdfUrl);

        if (!isMounted) return;
        setPages(extracted.pages);
        console.log('[PdfEditor] Extracted pages:', extracted.pages.length);

        // Call onTextExtracted only once
        if (onTextExtracted) {
          onTextExtracted(extracted.rawText, extracted.pages);
        }

        // Stage 3: Rendering preview
        if (!isMounted) return;
        setLoadingStage('rendering');
        console.log('[PdfEditor] Rendering page...');
        if (canvasRef.current) {
          await renderPdfPage(pdfUrl, 1, canvasRef.current, scale);
        }

        // Stage 4: Complete
        if (!isMounted) return;
        setLoadingStage('complete');
        console.log('[PdfEditor] PDF loaded successfully');
      } catch (error) {
        console.error('[PdfEditor] Failed to load PDF:', error);
        if (isMounted) {
          setError(`Failed to load PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl, scale]); // Removed onTextExtracted from deps

  useEffect(() => {
    // Only run when changing pages, not on initial load
    if (!pdfUrl || !canvasRef.current || loadingStage !== 'complete' || currentPage === 1) return;

    let isMounted = true;

    const renderPage = async () => {
      if (!isMounted) return;

      try {
        console.log('[PdfEditor] Changing to page:', currentPage);
        await renderPdfPage(pdfUrl, currentPage, canvasRef.current!, scale);
      } catch (error) {
        console.error('[PdfEditor] Failed to render page:', error);
        if (isMounted) {
          setError(`Failed to render page: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    };

    renderPage();

    return () => {
      isMounted = false;
    };
  }, [currentPage]); // Only depend on currentPage changes

  const currentPageData = pages.find(p => p.pageNumber === currentPage);

  const getLoadingContent = () => {
    switch (loadingStage) {
      case 'loading':
        return {
          icon: <Loader2 className="size-10 text-violet-600 animate-spin" />,
          title: 'Loading PDF...',
          description: 'Reading your document'
        };
      case 'extracting':
        return {
          icon: <FileSearch className="size-10 text-fuchsia-600 animate-pulse" />,
          title: 'Analyzing Layout...',
          description: 'Extracting text and positions'
        };
      case 'rendering':
        return {
          icon: <Eye className="size-10 text-cyan-600 animate-pulse" />,
          title: 'Rendering Preview...',
          description: 'Preparing visual display'
        };
      default:
        return null;
    }
  };

  const loadingContent = getLoadingContent();

  return (
    <div className="relative w-full min-h-[500px]">
      {loadingStage !== 'complete' && loadingContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-50/95 via-white/95 to-fuchsia-50/95 dark:from-zinc-900/95 dark:via-violet-950/95 dark:to-zinc-900/95 z-20 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl">
              {loadingContent.icon}
            </div>
            <div className="text-center space-y-2">
              <div className="text-xl font-bold text-zinc-900 dark:text-white">{loadingContent.title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{loadingContent.description}</div>
            </div>
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-4">
              <div className={`size-2 rounded-full transition-all ${loadingStage === 'loading' ? 'bg-violet-600 scale-125' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
              <div className={`size-2 rounded-full transition-all ${loadingStage === 'extracting' ? 'bg-fuchsia-600 scale-125' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
              <div className={`size-2 rounded-full transition-all ${loadingStage === 'rendering' ? 'bg-cyan-600 scale-125' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-8 text-center bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400 font-medium">{error}</div>
        </div>
      )}

      {!error && (
        <>
          <div className="relative w-full bg-white dark:bg-zinc-950 p-4 rounded-lg flex items-center justify-center">
            {/* PDF Canvas */}
            <canvas
              ref={canvasRef}
              className="shadow-lg rounded-lg max-w-full max-h-[calc(100vh-300px)] object-contain"
              style={{
                imageRendering: 'high-quality',
                imageRendering: '-webkit-optimize-contrast',
                display: 'block'
              }}
            />

          </div>

          {/* Page Navigation */}
          {pages.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Page {currentPage}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">of</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {pages.length}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(pages.length, prev + 1))}
                disabled={currentPage === pages.length}
                className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
