import { Link } from "react-router";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Search, Plus } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl">
      <CardContent className="p-12 text-center">
        <div className="size-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Search className="size-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          No resumes found
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Try adjusting your search or create a new resume
        </p>
        <Link to="/app/resume-builder">
          <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
            <Plus className="size-5 mr-2" />
            Create Your First Resume
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
