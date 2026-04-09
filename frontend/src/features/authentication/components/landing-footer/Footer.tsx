import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-violet-200/50 dark:border-violet-800/50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ApplySmart AI</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              AI-powered job search assistant to help you land more interviews.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Templates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-violet-200/50 dark:border-violet-800/50 text-center text-zinc-600 dark:text-zinc-400">
          © 2026 ApplySmart AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
