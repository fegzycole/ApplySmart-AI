import { Button } from "@/shared/components/ui/button";
import { Download } from "lucide-react";

export function PreviewActions() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
        <Download className="size-4 mr-2" />
        PDF
      </Button>
      <Button variant="outline" className="w-full border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30">
        <Download className="size-4 mr-2" />
        DOCX
      </Button>
    </div>
  );
}
