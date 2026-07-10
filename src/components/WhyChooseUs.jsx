import { BookOpen, DollarSign, Briefcase, Globe, Users, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Student-to-Student Learning',
      description: 'Learn in a comfortable environment with peers who understand your perspective and challenges.',
      icon: Users,
    },
    {
      title: 'No Money Required',
      description: 'Knowledge is the only currency here. Trade your skills for the ones you want to learn.',
      icon: DollarSign,
    },
    {
      title: 'Build Practical Skills',
      description: 'Gain real-world, applicable skills that go beyond traditional classroom theory and lectures.',
      icon: Briefcase,
    },
    {
      title: 'Expand Your Network',
      description: 'Connect with students from different departments, backgrounds, and disciplines across campus.',
      icon: Globe,
    },
    {
      title: 'Collaborative Growth',
      description: 'Fostering a culture where teaching reinforces your own knowledge while helping others succeed.',
      icon: BookOpen,
    },
    {
      title: 'Learn Anytime',
      description: 'Flexible scheduling that works around your classes, exams, and personal commitments.',
      icon: Clock,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">Benefits</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Why Choose SkillSwap</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Join a vibrant community of passionate learners and educators. Discover why students are shifting to collaborative skill exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
