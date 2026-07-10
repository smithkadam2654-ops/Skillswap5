import { 
  Code, Cpu, Layout, Feather, 
  Video, Camera, Music, Mic,
  PieChart, Globe, TrendingUp, FunctionSquare
} from 'lucide-react';

export default function PopularSkills() {
  const categories = [
    { name: 'Programming', icon: Code, desc: 'Python, Java, C++', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'AI & ML', icon: Cpu, desc: 'TensorFlow, Data Science', color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Web Development', icon: Layout, desc: 'React, Node, HTML', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'UI/UX Design', icon: PieChart, desc: 'Figma, Prototyping', color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Graphic Design', icon: Feather, desc: 'Photoshop, Illustrator', color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Video Editing', icon: Video, desc: 'Premiere, After Effects', color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Photography', icon: Camera, desc: 'Lighting, Editing', color: 'text-teal-600', bg: 'bg-teal-50' },
    { name: 'Music Production', icon: Music, desc: 'Ableton, FL Studio', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Public Speaking', icon: Mic, desc: 'Debate, Presentations', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Mathematics', icon: FunctionSquare, desc: 'Calculus, Algebra', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { name: 'Languages', icon: Globe, desc: 'Spanish, French, Japanese', color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'Business', icon: TrendingUp, desc: 'Marketing, Finance', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">Explore Categories</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Popular Skills to Exchange</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Discover a wide range of skills offered by students across different departments and disciplines.
            </p>
          </div>
          <button className="whitespace-nowrap bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            View All Categories
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${cat.bg.replace('50', '100')} ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">{cat.name}</h4>
                <p className="text-sm text-slate-500">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
