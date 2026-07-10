import { BookOpen, TrendingUp } from 'lucide-react';

export default function SDGSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">Our Impact</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">SDGs Supported</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            SkillSwap aligns with the United Nations Sustainable Development Goals to create a better and more sustainable future for all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* SDG 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-start gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex flex-col items-center justify-center font-bold flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <span className="text-[10px] uppercase tracking-widest mb-1 opacity-80">SDG</span>
              <span className="text-3xl">4</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <BookOpen size={20} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Quality Education</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                SkillSwap promotes accessible, collaborative, and lifelong learning by breaking down financial barriers and empowering students to educate one another.
              </p>
            </div>
          </div>

          {/* SDG 8 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-start gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-2xl flex flex-col items-center justify-center font-bold flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <span className="text-[10px] uppercase tracking-widest mb-1 opacity-80">SDG</span>
              <span className="text-3xl">8</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <TrendingUp size={20} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Decent Work & Growth</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                SkillSwap helps students develop practical, market-ready skills and career readiness through peer-to-peer mentoring and collaborative projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
