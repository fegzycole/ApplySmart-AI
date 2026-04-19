import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Upload, Sparkles, Download, FileText, TrendingUp, Zap, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { PdfEditor } from '../components/PdfEditor';
import type { PdfPage } from '@/shared/services/pdf-extraction.service';
import { tokenStorage } from '@/shared/utils/token-storage';

interface OptimizationResult {
  content: string;
  originalScore: number;
  optimizedScore: number;
  changes: string[];
  fileUrl: string; // URL to optimized PDF from backend
}

const TEMPLATES = [
  { value: 'MODERN', label: 'Modern', description: 'Clean and minimal design with subtle accents' },
  { value: 'PROFESSIONAL', label: 'Professional', description: 'Traditional corporate-friendly layout' },
  { value: 'CREATIVE', label: 'Creative', description: 'Bold design for creative professionals' },
  { value: 'CLASSIC', label: 'Classic', description: 'Timeless ATS-optimized format' },
];

export function ResumeOptimizerPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('MODERN');
  const [extractedPages, setExtractedPages] = useState<PdfPage[]>([]);
  const [originalText, setOriginalText] = useState('');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Debug: Track pdfFile state changes
  useEffect(() => {
    console.log('[ResumeOptimizer] pdfFile state changed:', pdfFile?.name || 'null');
  }, [pdfFile]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('[ResumeOptimizer] File selected:', file?.name, file?.type, file?.size);

    if (!file) {
      console.log('[ResumeOptimizer] No file selected');
      return;
    }

    if (file.type !== 'application/pdf') {
      console.error('[ResumeOptimizer] Invalid file type:', file.type);
      toast.error('Please upload a PDF file');
      event.target.value = ''; // Reset input
      return;
    }

    console.log('[ResumeOptimizer] Setting PDF file...');
    setPdfFile(file);
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setOptimizationResult(null);
    // Reset extracted data
    setOriginalText('');
    setExtractedPages([]);
    console.log('[ResumeOptimizer] PDF file set successfully:', file.name);
  };

  const handleTextExtracted = useCallback((text: string, pages: PdfPage[]) => {
    console.log('[ResumeOptimizer] Text extracted, length:', text.length, 'pages:', pages.length);
    setOriginalText(text);
    setExtractedPages(pages);
  }, []);

  const handleOptimize = async () => {
    if (!pdfFile || !jobDescription) {
      toast.error('Please upload a resume and enter a job description');
      return;
    }

    const token = tokenStorage.getToken();
    if (!token) {
      toast.error('You must be logged in to optimize resumes');
      return;
    }

    setIsOptimizing(true);
    toast.loading('Optimizing your resume with AI...', { id: 'optimize' });

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      // Send jobDescription as a Blob with text/plain content-type for @RequestPart
      formData.append('jobDescription', new Blob([jobDescription], { type: 'text/plain' }));

      // Call backend API for AI optimization with extended timeout (120s for AI processing + Cloudinary upload)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 second timeout

      try {
        console.log('[ResumeOptimizer] Sending optimization request with template:', selectedTemplate);
        const response = await fetch(`/api/v1/resumes/optimize-upload?template=${selectedTemplate}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        console.log('[ResumeOptimizer] Received response:', response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[ResumeOptimizer] Error response body:', errorText);
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { message: errorText };
          }
          throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('[ResumeOptimizer] Response body:', responseText);

        let result: OptimizationResult;
        try {
          result = JSON.parse(responseText);
          console.log('[ResumeOptimizer] Parsed optimization result:', result);
        } catch (parseError) {
          console.error('[ResumeOptimizer] Failed to parse JSON:', parseError);
          throw new Error('Invalid response format from server');
        }

        // Validate required fields
        if (!result.content || typeof result.originalScore !== 'number' || typeof result.optimizedScore !== 'number' || !Array.isArray(result.changes) || !result.fileUrl) {
          console.error('[ResumeOptimizer] Missing required fields in response:', result);
          throw new Error('Invalid optimization response structure');
        }

        setOptimizationResult(result);
        console.log('[ResumeOptimizer] Optimized PDF URL:', result.fileUrl);

        toast.success(`Resume optimized! Score improved from ${result.originalScore} to ${result.optimizedScore}`, { id: 'optimize' });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.error('[ResumeOptimizer] Optimization failed:', error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error('Request timed out. The AI optimization is taking longer than expected (>2 minutes). Please try again.', { id: 'optimize' });
        } else {
          toast.error(error.message || 'Failed to optimize resume', { id: 'optimize' });
        }
      } else {
        toast.error('An unexpected error occurred', { id: 'optimize' });
      }
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleExport = async () => {
    if (!optimizationResult?.fileUrl) {
      toast.error('No optimized resume available to download');
      return;
    }

    setIsExporting(true);
    toast.loading('Downloading optimized resume...', { id: 'export' });

    try {
      // Download from backend URL
      const response = await fetch(optimizationResult.fileUrl);
      if (!response.ok) {
        throw new Error('Failed to download optimized resume');
      }

      const blob = await response.blob();
      const filename = `${pdfFile?.name.replace('.pdf', '')}-optimized.pdf` || 'resume-optimized.pdf';

      // Download the file
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Resume downloaded successfully!', { id: 'export' });
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download optimized resume. Please try again.', { id: 'export' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setPdfUrl('');
    setJobDescription('');
    setExtractedPages([]);
    setOriginalText('');
    setOptimizationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Zap className="size-5 text-white" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Resume Optimizer
            </h1>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Transform your resume with AI while preserving exact formatting
          </p>
        </div>

        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Upload & Settings */}
          <div className="space-y-4">
            {/* Upload Card */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Upload className="size-5 text-violet-600" />
                  Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="group relative border-2 border-dashed border-violet-300/50 dark:border-violet-700/50 rounded-lg p-6 text-center transition-all hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-950/20">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform">
                      <FileText className="size-6 text-white" />
                    </div>
                    {pdfFile && pdfFile.name ? (
                      <div className="space-y-1">
                        <p className="font-semibold text-zinc-900 dark:text-white text-sm">{pdfFile.name}</p>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle2 className="size-3 text-green-600" />
                          <p className="text-xs text-green-600 dark:text-green-400">Ready</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-medium text-zinc-900 dark:text-white text-sm">
                          Click to upload PDF
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500">
                          Max 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="size-3.5 text-violet-600" />
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-32 p-3 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                    <FileText className="size-3.5 text-violet-600" />
                    Resume Template
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map((template) => (
                      <button
                        key={template.value}
                        onClick={() => setSelectedTemplate(template.value)}
                        className={`
                          p-3 rounded-lg border-2 text-left transition-all
                          ${selectedTemplate === template.value
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/20'
                            : 'border-zinc-300 dark:border-zinc-700 hover:border-violet-300 dark:hover:border-violet-700'
                          }
                        `}
                      >
                        <div className="font-semibold text-sm text-zinc-900 dark:text-white mb-1">
                          {template.label}
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          {template.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleOptimize}
                  disabled={!pdfFile || !jobDescription || isOptimizing}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="size-4 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4 mr-2" />
                      Optimize Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Card */}
            {optimizationResult && (
              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="size-5 text-green-600" />
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Original</div>
                      <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {optimizationResult.originalScore}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/50 dark:to-fuchsia-950/50">
                      <div className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                        Optimized
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        {optimizationResult.optimizedScore}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      Improvements
                    </h4>
                    <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                      {optimizationResult.changes.slice(0, 5).map((change, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30"
                        >
                          <CheckCircle2 className="size-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-zinc-700 dark:text-zinc-300">{change}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      {isExporting ? (
                        <>
                          <RefreshCw className="size-4 mr-2 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="size-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="icon"
                    >
                      <RefreshCw className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: PDF Preview */}
          <div className="lg:sticky lg:top-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="size-5 text-cyan-600" />
                    {optimizationResult ? 'Original Preview' : 'Preview'}
                  </CardTitle>
                  {optimizationResult && (
                    <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full">
                      <CheckCircle2 className="size-3" />
                      Ready to Download
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {pdfUrl ? (
                  <div className="rounded-lg overflow-auto border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 max-h-[calc(100vh-250px)]">
                    <PdfEditor
                      pdfUrl={pdfUrl}
                      onTextExtracted={handleTextExtracted}
                      scale={1.2}
                    />
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
                    <div className="text-center space-y-3">
                      <div className="size-16 mx-auto rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <FileText className="size-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">No PDF uploaded</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500">Upload to preview</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
