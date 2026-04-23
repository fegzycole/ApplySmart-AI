import { Eye, Download, Save, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PreviewHeaderProps {
  onSave: () => void;
  onDownload: () => void;
  saving: boolean;
  downloading: boolean;
}

export function PreviewHeader({ onSave, onDownload, saving, downloading }: PreviewHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-2xl border border-violet-200 dark:border-violet-800">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
          <Eye className="size-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-white">Live Preview</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Updates as you type</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="rounded-lg" onClick={onSave} disabled={saving}>
          {saving
            ? <><Loader2 className="size-4 mr-1 animate-spin" />Saving...</>
            : <><Save className="size-4 mr-1" />Save</>}
        </Button>
        <Button
          size="sm"
          className="rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          onClick={onDownload}
          disabled={downloading}
        >
          {downloading
            ? <><Loader2 className="size-4 mr-1 animate-spin" />Downloading...</>
            : <><Download className="size-4 mr-1" />Download</>}
        </Button>
      </div>
    </div>
  );
}
