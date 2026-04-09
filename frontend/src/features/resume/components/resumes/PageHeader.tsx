import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FileText, Plus, Search } from "lucide-react";

interface PageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PageHeader({ searchQuery, onSearchChange }: PageHeaderProps) {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-4 lg:mb-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-sm mb-3">
            <FileText className="size-4" />
            <span className="font-medium">Resume Management</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
              My Resumes
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base lg:text-lg">
            Manage and organize all your professional resumes
          </p>
        </div>
        <Link to="/app/resume-builder" className="w-full lg:w-auto">
          <Button className="w-full lg:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 h-11 px-6 rounded-xl">
            <Plus className="size-5 mr-2" />
            <span className="hidden sm:inline">Create New Resume</span>
            <span className="sm:hidden">Create Resume</span>
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search resumes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-violet-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300" />
      </div>
    </div>
  );
}
