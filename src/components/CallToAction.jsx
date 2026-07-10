import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-indigo-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
          Ready to Start Learning?
        </h2>
        <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
          Join SkillSwap today and become part of a community where every student is both a learner and a teacher.
        </p>
        <div className="pt-4">
          <Link
            to="/signup"
            className="inline-flex justify-center items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl text-base font-bold shadow-xl shadow-indigo-900/20 hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Join SkillSwap
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
