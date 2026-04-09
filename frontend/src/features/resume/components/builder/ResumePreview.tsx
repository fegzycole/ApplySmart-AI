export function ResumePreview() {
  return (
    <div className="bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl p-8 min-h-[600px] shadow-lg">
      <div className="space-y-4 text-sm" style={{ fontFamily: 'Times New Roman, serif' }}>
        <div className="text-center border-b border-zinc-900 dark:border-zinc-100 pb-3">
          <h3 className="font-bold text-2xl text-zinc-900 dark:text-zinc-100">YOUR NAME</h3>
          <p className="text-zinc-900 dark:text-zinc-100 mt-1">Your Professional Title</p>
          <p className="text-zinc-700 dark:text-zinc-300 text-xs mt-2">
            your.email@example.com • (555) 123-4567 • City, State
          </p>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 pb-1 border-b border-zinc-900 dark:border-zinc-100 text-sm uppercase tracking-wide">
            Professional Summary
          </h4>
          <p className="text-zinc-900 dark:text-zinc-100 text-xs leading-relaxed">
            Your professional summary will appear here as you type...
          </p>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 pb-1 border-b border-zinc-900 dark:border-zinc-100 text-sm uppercase tracking-wide">
            Experience
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Job Title</p>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs">Company Name • Start - End</p>
              <p className="text-zinc-900 dark:text-zinc-100 text-xs mt-1">
                Your achievements and responsibilities will appear here...
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 pb-1 border-b border-zinc-900 dark:border-zinc-100 text-sm uppercase tracking-wide">
            Education
          </h4>
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Degree</p>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs">Institution • Year</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 pb-1 border-b border-zinc-900 dark:border-zinc-100 text-sm uppercase tracking-wide">
            Skills
          </h4>
          <p className="text-zinc-900 dark:text-zinc-100 text-xs">
            Your technical skills will appear here...
          </p>
        </div>
      </div>
    </div>
  );
}
