import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";

export function CTASection() {
  return (
    <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-3xl blur-3xl opacity-20" />
        <div className="relative bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 rounded-2xl sm:rounded-3xl p-8 sm:p-16 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-violet-100 mb-8 sm:mb-10 leading-relaxed px-2">
            Join thousands of job seekers who have accelerated their careers with AI
          </p>
          <Link to="/signup" className="inline-block">
            <Button size="lg" className="bg-white hover:bg-violet-50 text-violet-600 text-base sm:text-lg px-8 sm:px-12 h-12 sm:h-14 rounded-full font-semibold shadow-2xl transform hover:scale-105 transition-all">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
