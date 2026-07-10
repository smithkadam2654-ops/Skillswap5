import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      department: 'Computer Science',
      review: 'SkillSwap completely changed how I learn. I taught Python and in return learned UI/UX design from an amazing fine arts student. The collaborative vibe is just unmatched.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'David Chen',
      department: 'Business Administration',
      review: 'I needed help with data analytics for a project but couldn\'t afford a tutor. Traded my public speaking skills for data lessons. Best decision I made this semester!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      department: 'Graphic Design',
      review: 'Teaching Photoshop to others actually made me understand it better. Plus, learning basic HTML/CSS in return has made my portfolio website look incredible.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">Community Stories</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Student Testimonials</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Don't just take our word for it. Hear from students who have transformed their learning experience through SkillSwap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative group hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-8 italic flex-grow">
                "{testimonial.review}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mt-1">{testimonial.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
