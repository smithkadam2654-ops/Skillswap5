import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Home, Compass, LayoutGrid, MessageSquare, 
  Settings, LogOut, Star, MapPin, CheckCircle2,
  Trophy, Flame, Award, Repeat, Menu, ChevronLeft,
  Users, BookOpen, Diamond, Zap, Share2
} from 'lucide-react';
import Navbar from '../components/Navbar';

import { mockUsers } from '../data/mockUsers';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const matchedUser = mockUsers.find(u => u.id === id);

  // Mock data for the profile based on the ID or just use Smith Kadam as default
  const profile = matchedUser ? {
    ...matchedUser,
    profession: `${matchedUser.college} | ${matchedUser.branch} | ${matchedUser.year}`,
    achievements: [
      { icon: Trophy, label: '3 Hackathons', color: 'text-yellow-500', bg: 'bg-yellow-50' },
      { icon: Star, label: `${matchedUser.rating} Rating`, color: 'text-[#5B5BFF]', bg: 'bg-[#5B5BFF]/10' },
      { icon: Award, label: 'Verified', color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' }
    ],
    stats: [
      { label: 'Skill Swaps', value: matchedUser.swaps.toString(), icon: Repeat, color: 'text-blue-500', bg: 'bg-blue-50' },
      { label: 'Students Helped', value: (matchedUser.swaps * 2).toString(), icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
      { label: 'Community Rating', value: `${matchedUser.rating}/5`, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    ]
  } : {
    name: 'Smith Kadam',
    profession: 'B.Tech IT Student | IIT Madras BS Data Science',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/300?u=smithkadam',
    bio: "Hi! I'm Smith Kadam, a B.Tech Information Technology student at Shah & Anchor Kutchhi Engineering College and an IIT Madras BS in Data Science student. I'm passionate about software development, AI, data science, and building impactful web applications.\n\nI enjoy participating in hackathons, collaborating with teams, and creating projects that solve real-world problems. Through SkillSwap, I hope to share my knowledge, learn new technologies, and connect with students who love building and innovating together.",
    teaching: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Python', 'C Programming', 'MATLAB', 'Git & GitHub', 'Data Science Basics'],
    wants: ['Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'System Design', 'Node.js', 'Next.js', 'MongoDB', 'Docker', 'Cyber Security', 'UI/UX Design'],
    achievements: [
      { icon: Trophy, label: '3 Hackathons', color: 'text-yellow-500', bg: 'bg-yellow-50' },
      { icon: Star, label: '9.76 FY CGPA', color: 'text-[#5B5BFF]', bg: 'bg-[#5B5BFF]/10' },
      { icon: Award, label: 'NPTEL Certified', color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' }
    ],
    stats: [
      { label: 'Skill Swaps', value: '12', icon: Repeat, color: 'text-blue-500', bg: 'bg-blue-50' },
      { label: 'Students Helped', value: '35', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
      { label: 'Skills Shared', value: '10', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
      { label: 'Skills Learned', value: '8', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
      { label: 'Current Streak', value: '15 Days', icon: Flame, color: 'text-red-500', bg: 'bg-red-50' },
      { label: 'Community Rating', value: '4.9/5', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
      { label: 'XP Earned', value: '2,450', icon: Diamond, color: 'text-cyan-500', bg: 'bg-cyan-50' },
      { label: 'Reputation', value: 'Top Mentor', icon: Award, color: 'text-indigo-500', bg: 'bg-indigo-50' }
    ]
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-screen bg-[#F8FAFC] font-sans overflow-hidden text-[#111827]"
    >
      <Navbar />
      <Toaster position="bottom-right" />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 z-30">
            <span className="font-bold text-lg">SkillSwap</span>
            <div className="w-10"></div> {/* placeholder for balance */}
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 pb-24 hide-scrollbar">
            
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6B7280] hover:text-[#5B5BFF] transition-colors mb-4 w-fit group font-medium text-[14px]">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Explore Skills
            </button>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl">
              
              {/* Left Column (Profile Info) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#5B5BFF]/10 to-[#7C3AED]/10"></div>
                  
                  <div className="relative mb-6 mt-12">
                    <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#22C55E] border-4 border-white rounded-full"></div>
                  </div>
                  
                  <h1 className="text-[24px] font-bold mb-1">{profile.name}</h1>
                  <p className="text-[#6B7280] text-[15px] font-medium mb-4">{profile.profession}</p>
                  
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="flex items-center gap-1.5 text-[14px] text-[#6B7280] bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <MapPin className="w-4 h-4" /> {profile.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-[#111827] font-semibold bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                      <Star size={16} className="text-[#F59E0B] fill-current" /> {profile.rating}
                    </div>
                  </div>
                  
                  <div className="mb-8 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold bg-green-50 text-green-700 border border-green-200">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Available for Skill Swaps
                    </span>
                  </div>

                  <div className="w-full space-y-3">
                    <button onClick={() => { navigate(`/messages/${id || '1'}`); toast.success('Connection request sent!'); }} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] text-white text-[15px] font-semibold shadow-lg shadow-[#5B5BFF]/30 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <MessageSquare className="w-5 h-5" /> Connect
                    </button>
                    <button onClick={() => { navigate(`/messages/${id || '1'}`); toast.success('Skill exchange requested!'); }} className="w-full py-3.5 rounded-xl bg-white text-[#111827] text-[15px] font-semibold hover:bg-slate-50 border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                      <Repeat className="w-5 h-5" /> Request Skill Exchange
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right Column (Details) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="lg:col-span-8 space-y-6">
                
                {/* About */}
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                  <h2 className="text-[20px] font-semibold mb-4">About Me</h2>
                  <p className="text-[#6B7280] leading-relaxed text-[15px] whitespace-pre-line">
                    {profile.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills I Teach */}
                  <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                    <h2 className="text-[18px] font-semibold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                      Skills I Teach
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.teaching.map(skill => (
                        <span key={skill} className="px-4 py-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E] text-[14px] font-semibold border border-[#22C55E]/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills I Want */}
                  <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                    <h2 className="text-[18px] font-semibold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED]">
                        <Repeat className="w-5 h-5" />
                      </span>
                      Skills I Want
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.wants.map(skill => (
                        <span key={skill} className="px-4 py-2 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] text-[14px] font-semibold border border-[#7C3AED]/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                  <h2 className="text-[20px] font-semibold mb-6">Achievements</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {profile.achievements.map((achieve, i) => (
                      <motion.div whileHover={{ y: -4 }} key={i} className="flex flex-col items-center justify-center text-center p-6 rounded-[20px] border border-slate-100 hover:shadow-lg transition-all cursor-default bg-slate-50/50">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${achieve.bg} ${achieve.color}`}>
                          <achieve.icon className="w-7 h-7" />
                        </div>
                        <span className="font-bold text-[16px] text-[#111827]">{achieve.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Community Stats */}
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                  <h2 className="text-[20px] font-semibold mb-6">Community Stats</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {profile.stats.map((stat, i) => (
                      <div key={i} className="flex flex-col p-4 rounded-[20px] border border-slate-100 bg-slate-50/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-4 h-4" />
                          </div>
                          <span className="text-[#6B7280] text-[13px] font-medium">{stat.label}</span>
                        </div>
                        <span className="text-[20px] font-bold text-[#111827]">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
      </main>

      {/* Mobile Overlays */}
      {isSidebarOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#111827]/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setIsLogoutModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-[24px] p-8 w-full max-w-sm shadow-xl text-center">
              <h3 className="text-xl font-bold mb-2">Logout</h3>
              <p className="text-[#6B7280] mb-8 text-[15px]">Are you sure you want to log out of your account?</p>
              <div className="flex gap-3">
                <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 py-3.5 rounded-xl bg-slate-50 text-[#111827] font-semibold hover:bg-slate-100 transition-colors border border-slate-200">Cancel</button>
                <button onClick={handleLogout} className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">Logout</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </motion.div>
  )
}
