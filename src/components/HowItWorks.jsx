import { UserPlus, Share2, Search, Smile } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Create Your Profile',
      description: 'Sign up in seconds and build your academic and skill profile.',
      icon: UserPlus,
    },
    {
      id: 2,
      title: 'Share Skills You Can Teach',
      description: 'List the subjects or skills you are good at and willing to teach others.',
      icon: Share2,
    },
    {
      id: 3,
      title: 'Find Skills You Want',
      description: 'Browse or search for skills you want to learn from fellow students.',
      icon: Search,
    },
    {
      id: 4,
      title: 'Learn Together',
      description: 'Connect, exchange knowledge, and grow together without spending money.',
      icon: Smile,
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">Simple Process</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">How SkillSwap Works</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Start exchanging skills in four easy steps. Our platform is designed to make connecting with other students seamless and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 shrink-0 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    0{step.id}
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">{step.title}</h4>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
