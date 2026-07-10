import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, Globe, Users, BookOpen, Star, Sparkles, ChevronDown, 
  Target, Zap, Shield, Heart, Lightbulb, TrendingUp, CheckCircle,
  MessageCircle, Video, Award, Smile, ArrowRight, Github, Linkedin, Play
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const TIMELINE_STEPS = [
  { icon: UserPlus, title: 'Create your profile', desc: 'Sign up and showcase your current skills and learning goals.' },
  { icon: BookOpen, title: 'Add skills you can teach', desc: 'List the topics you are confident in teaching others.' },
  { icon: Search, title: 'Find students to learn from', desc: 'Browse profiles and find the perfect peer mentor for your needs.' },
  { icon: Repeat, title: 'Exchange knowledge', desc: 'Connect, schedule a session, and start swapping skills.' },
  { icon: Award, title: 'Earn badges, XP, and reputation', desc: 'Grow your portfolio as you complete successful swaps.' }
];

import { UserPlus, Search, Repeat } from 'lucide-react';

const FEATURES = [
  { icon: BookOpen, title: 'Learn New Skills', desc: 'Access a diverse range of topics from programming to design.' },
  { icon: Users, title: 'Teach What You Know', desc: 'Solidify your knowledge by teaching peers.' },
  { icon: MessageCircle, title: 'Connect with Students', desc: 'Build a network of passionate learners worldwide.' },
  { icon: Star, title: 'Earn Reputation', desc: 'Get reviews and build a trustworthy profile.' },
  { icon: Target, title: 'Build Your Portfolio', desc: 'Showcase your verified learning and teaching history.' },
  { icon: MessageCircle, title: 'Community Discussions', desc: 'Join forums and groups to discuss ideas.' },
  { icon: Video, title: 'Live Sessions', desc: 'Seamlessly integrate video calls for learning.' },
  { icon: CheckCircle, title: 'Verified Profiles', desc: 'Trust our robust peer review and verification system.' },
  { icon: Award, title: 'Achievement Badges', desc: 'Gamify your learning journey with badges and XP.' },
  { icon: Smile, title: 'Completely Free', desc: 'No hidden fees. Knowledge is the only currency.' }
];

const STATS = [
  { value: 500, suffix: '+', label: 'Active Students' },
  { value: 200, suffix: '+', label: 'Skills Available' },
  { value: 1000, suffix: '+', label: 'Successful Exchanges' },
  { value: 50, suffix: '+', label: 'Expert Mentors' },
  { value: 4.9, suffix: '★', label: 'Average Rating' }
];

const TESTIMONIALS = [
  { name: 'Sarah Jenkins', role: 'Computer Science, Year 3', skill: 'Learned React', text: 'SkillSwap helped me master React in just a few weeks by learning directly from seniors.', img: 'https://i.pravatar.cc/150?img=1' },
  { name: 'David Chen', role: 'Design, Year 2', skill: 'Taught UI/UX', text: 'Teaching UI/UX helped me refine my own skills and build confidence. Plus, I learned Python in return!', img: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Aisha Patel', role: 'Business, Year 4', skill: 'Learned Data Science', text: 'The community here is incredible. Everyone is so willing to help and share their knowledge.', img: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Marcus Johnson', role: 'Engineering, Year 1', skill: 'Learned Calculus', text: 'Found an amazing peer mentor who explained complex math concepts simply. Highly recommend!', img: 'https://i.pravatar.cc/150?img=8' },
  { name: 'Elena Rodriguez', role: 'Arts, Year 3', skill: 'Taught Illustration', text: 'I love that I can exchange my art skills for coding lessons. It is a win-win situation.', img: 'https://i.pravatar.cc/150?img=9' },
  { name: 'James Wilson', role: 'Marketing, Year 2', skill: 'Learned SEO', text: 'The best way to learn is by doing and discussing. SkillSwap provides the perfect platform for that.', img: 'https://i.pravatar.cc/150?img=12' }
];

const VALUES = [
  { icon: Users, title: 'Community', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: TrendingUp, title: 'Growth', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Repeat, title: 'Collaboration', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Lightbulb, title: 'Innovation', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Shield, title: 'Trust', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: BookOpen, title: 'Lifelong Learning', color: 'text-indigo-500', bg: 'bg-indigo-50' }
];

const HISTORY = [
  { year: '2026', title: 'SkillSwap Idea Born', desc: 'A group of students realized the need for a free, peer-to-peer learning platform.' },
  { year: 'Q2 2026', title: 'Prototype Developed', desc: 'The first version of SkillSwap was launched on a university campus.' },
  { year: 'Q3 2026', title: '100 Students Joined', desc: 'Rapid adoption by early users seeking to exchange skills.' },
  { year: 'Q4 2026', title: '500+ Community Members', desc: 'Expanded to multiple universities and added new features.' },
  { year: 'Future', title: '100,000+ Learners', desc: 'Our goal is to become the global standard for student knowledge sharing.' }
];

const TEAM = [
  { name: 'Alex Thompson', role: 'Founder & CEO', bio: 'Passionate about democratizing education and building communities.', img: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Samantha Lee', role: 'Head of Product', bio: 'Obsessed with creating intuitive and beautiful user experiences.', img: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Michael Brown', role: 'Lead Developer', bio: 'Full-stack wizard dedicated to building scalable and robust systems.', img: 'https://i.pravatar.cc/150?img=55' },
  { name: 'Emily Davis', role: 'Community Manager', bio: 'Ensuring our community remains vibrant, supportive, and safe.', img: 'https://i.pravatar.cc/150?img=47' }
];

const FAQS = [
  { q: 'What is SkillSwap?', a: 'SkillSwap is a student-powered learning platform where you can teach what you know and learn what you want, all through peer-to-peer exchanges without spending money.' },
  { q: 'Is SkillSwap free?', a: 'Yes! SkillSwap is completely free. The currency is your time and knowledge.' },
  { q: 'Can I teach multiple skills?', a: 'Absolutely. You can list as many skills as you are comfortable teaching.' },
  { q: 'Do I receive certificates?', a: 'Yes, as you complete verifiable learning tracks and receive positive reviews, you can earn platform certificates.' },
  { q: 'How are mentors verified?', a: 'Mentors build reputation through community reviews, XP earned from successful sessions, and our internal badge system.' },
  { q: 'How do skill exchanges work?', a: 'You find someone who wants to learn your skill and can teach you a skill you want. You send a request, and if accepted, you schedule a session together.' }
];

function Counter({ end, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}{suffix}</span>;
}

export default function AboutUsPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden"
    >
      <Navbar />

      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5B4CF5]/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5B4CF5] text-sm font-bold mb-6 border border-indigo-100">
                <Sparkles size={16} /> About SkillSwap
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Learn Together.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B4CF5] to-[#A855F7]">Teach Together.</span><br/>
                Grow Together.
              </h1>
              <p className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
                SkillSwap is a student-powered learning platform where knowledge is exchanged instead of bought. Whether you're a beginner looking to learn or an expert ready to teach, SkillSwap connects passionate learners through collaborative skill sharing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/explore" className="px-8 py-4 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-[#5B4CF5]/25 flex items-center gap-2">
                  Explore Skills <ArrowRight size={20} />
                </Link>
                <Link to="/signup" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold transition-all">
                  Join Community
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-[3rem] overflow-hidden border border-white/50 shadow-2xl flex items-center justify-center p-8 relative">
                {/* Abstract Illustration Representation */}
                <div className="w-full h-full relative">
                   <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students Collaborating" className="w-full h-full object-cover rounded-2xl shadow-lg mix-blend-overlay opacity-80" />
                   
                   {/* Floating Tech Icons */}
                   {['React', 'Python', 'AI', 'Canva', 'UI/UX', 'Cloud'].map((skill, idx) => (
                     <motion.div 
                        key={skill}
                        animate={{ y: [0, -15, 0] }} 
                        transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5, ease: "easeInOut" }}
                        className="absolute bg-white/90 backdrop-blur px-4 py-2 rounded-xl font-bold text-sm shadow-xl text-slate-800 border border-slate-100"
                        style={{
                          top: `${20 + (idx * 15)}%`,
                          left: `${10 + (idx % 2 === 0 ? Math.random() * 20 : 50 + Math.random() * 20)}%`
                        }}
                      >
                        {skill}
                     </motion.div>
                   ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story & Mission/Vision */}
        <section className="py-24 bg-slate-50 border-y border-slate-100 relative">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800" alt="Learning together" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Why SkillSwap Exists</h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Many students possess incredible skills but lack opportunities to teach or learn from peers. Traditional education often builds silos, and paid courses can create financial barriers.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    SkillSwap bridges this gap by creating a community-driven ecosystem where everyone can exchange knowledge, build portfolios, gain experience, and grow together—without spending a dime.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-[#5B4CF5]/50 hover:shadow-[#5B4CF5]/10 transition-all group">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Rocket className="text-[#5B4CF5] w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mission</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    To make quality peer-to-peer education accessible for every student regardless of background.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.1 }} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all group">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="text-purple-500 w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Vision</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    To become the world's largest student knowledge-sharing community where every learner can also become a teacher.
                  </p>
                </motion.div>
              </div>
           </div>
        </section>

        {/* How It Works Timeline */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How SkillSwap Works</h2>
            <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto">A simple, effective process to start your knowledge exchange journey.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative">
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10"></div>
               {TIMELINE_STEPS.map((step, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center w-full md:w-1/5 mb-10 md:mb-0 relative group"
                  >
                    <div className="w-16 h-16 bg-white border-4 border-slate-50 rounded-full shadow-lg flex items-center justify-center text-[#5B4CF5] font-bold text-xl mb-4 group-hover:scale-110 group-hover:border-indigo-100 transition-all z-10 relative">
                       <step.icon className="w-7 h-7" />
                       <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs border-2 border-white">
                         {idx + 1}
                       </div>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 px-2">{step.title}</h4>
                    <p className="text-sm text-slate-500 px-4">{step.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* Why Choose SkillSwap */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose SkillSwap</h2>
             <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto">Everything you need to learn, teach, and grow in one powerful platform.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {FEATURES.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 bg-indigo-50 text-[#5B4CF5] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#5B4CF5] group-hover:text-white transition-all">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-500">{feature.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 bg-[#5B4CF5] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center divide-x divide-white/20">
              {STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-indigo-100 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Community */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Community</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Hear what students are saying about their SkillSwap experience.</p>
          </div>
          
          {/* Auto-sliding carousel wrapper */}
          <div className="flex gap-6 px-4 pb-8 overflow-x-auto snap-x snap-mandatory custom-scrollbar" style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2))', paddingRight: 'max(1rem, calc((100vw - 80rem) / 2))' }}>
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 w-[350px] bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 font-medium italic mb-6 leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role} • {t.skill}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-16">Our Core Values</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {VALUES.map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center"
                >
                  <div className={`w-16 h-16 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-4`}>
                    <val.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">{val.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievement Timeline */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Our Journey</h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-100 before:via-[#5B4CF5] before:to-indigo-100">
              {HISTORY.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#5B4CF5] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-slate-900">{item.title}</h4>
                      <span className="text-sm font-bold text-[#5B4CF5] bg-indigo-50 px-3 py-1 rounded-full">{item.year}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Team</h2>
             <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto">The students building the future of student education.</p>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {TEAM.map((member, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 group relative overflow-hidden"
                 >
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-50 group-hover:border-indigo-100 transition-colors">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-[#5B4CF5] transition-colors">{member.name}</h4>
                    <p className="text-sm font-bold text-purple-500 mb-4">{member.role}</p>
                    <p className="text-sm text-slate-600 mb-6">{member.bio}</p>
                    
                    <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 transition-colors"><Linkedin size={18}/></button>
                      <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 transition-colors"><Github size={18}/></button>
                    </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
             
             <div className="space-y-4">
               {FAQS.map((faq, i) => (
                 <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-[#5B4CF5]/50 transition-colors">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-bold text-slate-900 text-lg">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#5B4CF5]' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-[#5B4CF5] rounded-full blur-[150px] opacity-40"></div>
              <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] opacity-40"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to Start Learning?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of students exchanging knowledge every day.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup" className="px-8 py-4 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5B4CF5]/30">
                  Join Community
                </Link>
                <Link to="/explore" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg transition-all">
                  Explore Skills
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </motion.div>
  );
}
