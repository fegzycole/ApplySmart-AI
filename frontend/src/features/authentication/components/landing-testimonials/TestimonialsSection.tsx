import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    quote: "ApplySmart AI helped me land 3x more interviews. The resume optimizer is a game-changer!",
    author: {
      name: "Sarah Johnson",
      role: "Software Engineer",
      initials: "SJ"
    },
    gradient: {
      card: "from-white via-violet-50/50 to-white dark:from-zinc-900 dark:via-violet-950/20 dark:to-zinc-900",
      avatar: "from-violet-500 to-fuchsia-500"
    }
  },
  {
    quote: "The job tracker keeps me organized and the analytics show exactly where to improve my applications.",
    author: {
      name: "Michael Chen",
      role: "Product Manager",
      initials: "MC"
    },
    gradient: {
      card: "from-white via-cyan-50/50 to-white dark:from-zinc-900 dark:via-cyan-950/20 dark:to-zinc-900",
      avatar: "from-cyan-500 to-teal-500"
    }
  },
  {
    quote: "Best investment for my career transition. Got my dream job within 2 months of using ApplySmart!",
    author: {
      name: "Emma Patel",
      role: "UX Designer",
      initials: "EP"
    },
    gradient: {
      card: "from-white via-fuchsia-50/50 to-white dark:from-zinc-900 dark:via-fuchsia-950/20 dark:to-zinc-900",
      avatar: "from-fuchsia-500 to-pink-500"
    }
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Loved by Job Seekers
            </span>
            <br />
            <span className="text-zinc-900 dark:text-white">Worldwide</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
