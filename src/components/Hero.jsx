import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
              Join 500+ students already swapping skills
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Exchange Skills, <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Empower Future.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
              Connect with fellow students, exchange valuable skills, collaborate on learning, and grow together through a community-driven knowledge-sharing platform. No money required, just your willingness to learn and teach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                to="/explore"
                className="inline-flex justify-center items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Skills
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/signup"
                className="inline-flex justify-center items-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl text-base font-bold shadow-sm hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Join Community
                <Users size={20} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20 transform -translate-x-10 translate-y-10"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 bg-white p-2 transform -rotate-1">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Students collaborating"
                className="w-full h-auto rounded-2xl object-cover"
              />
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4 animate-bounce transform rotate-2" style={{ animationDuration: '3s' }}>
                <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                  🚀
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Skill Mastered</p>
                  <p className="font-bold text-slate-900">React JS</p>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4 animate-bounce transform -rotate-2" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                  ✨
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">New Connection</p>
                  <p className="font-bold text-slate-900">Alex joined</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
