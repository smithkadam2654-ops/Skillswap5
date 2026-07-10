import { Users, BookOpen, Grid, Repeat } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      id: 1,
      name: 'Active Students',
      value: '500+',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      id: 2,
      name: 'Skills Available',
      value: '200+',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 3,
      name: 'Departments',
      value: '50+',
      icon: Grid,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 4,
      name: 'Successful Exchanges',
      value: '1000+',
      icon: Repeat,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bgColor.replace('100', '50')} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
