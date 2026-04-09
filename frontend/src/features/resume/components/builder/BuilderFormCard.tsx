import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { FileText, Save } from "lucide-react";

interface BuilderFormCardProps {
  children: ReactNode;
}

export function BuilderFormCard({ children }: BuilderFormCardProps) {
  return (
    <Card className="border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
              <FileText className="size-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Build Your Resume</CardTitle>
              <CardDescription className="text-sm">Fill in your details below</CardDescription>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg"
          >
            <Save className="size-4 mr-2" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
