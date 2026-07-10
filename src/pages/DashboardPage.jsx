import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Search, Bell, Trophy, Flame, Star, BookOpen, Users,
  MessageSquare, Calendar, ChevronRight, TrendingUp,
  Award, Play, MapPin, MoreHorizontal, Settings
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const learningData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 2.5 },
  { name: 'Sat', hours: 5 },
  { name: 'Sun', hours: 4.5 },
];

const skillData = [
  { name: 'React', progress: 85, color: '#5B4CF5' },
  { name: 'Python', progress: 63, color: '#7B61FF' },
  { name: 'UI/UX', progress: 40, color: '#A855F7' },
  { name: 'Communication', progress: 91, color: '#4ADE80' },
];

export default function DashboardPage() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      time: 'TOMORROW • 10:00 AM',
      title: 'React Basics',
      with: 'Rahul Sharma',
      type: 'join',
      color: 'blue'
    },
    {
      id: 2,
      time: 'FRIDAY • 6:00 PM',
      title: 'Photoshop Mastery',
      with: 'Sneha Kapoor',
      type: 'pending',
      color: 'purple'
    }
  ]);

  const [taughtSkills, setTaughtSkills] = useState([
    { id: 1, title: 'React Development', level: 'Intermediate', students: 20, rating: 4.8 },
    { id: 2, title: 'Graphic Design', level: 'Advanced', students: 45, rating: 5.0 }
  ]);

  const handleDeleteSkill = (id, title) => {
    setTaughtSkills(prev => prev.filter(s => s.id !== id));
    toast.success(`${title} removed from your taught skills`);
  };

  const handleEditSkill = (title) => {
    toast.success(`Editing ${title}...`);
  };

  const handleLearnNow = (skill) => {
    toast.success(`Enrolled in ${skill}! Redirecting to course...`);
  };

  const handleCongratulate = () => {
    toast.success('You congratulated Ankit!');
  };

  const handleLike = () => {
    toast.success('You liked this activity');
  };

  const handleDownload = () => {
    toast.success('Downloading notes...');
  };

  const handleViewFeed = () => {
    toast.success('Loading full community feed...');
  };

  const handleJoin = (title) => {
    toast.success(`Joining meeting for ${title}...`);
  };

  const handleAccept = (id, title) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, type: 'join' } : s));
    toast.success(`Accepted session: ${title}`);
  };

  const handleDecline = (id, title) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    toast.error(`Declined session: ${title}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col text-[#111827]"
    >
      <Navbar />
      <Toaster position="top-right" />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                className="text-3xl font-bold text-slate-900"
              >
                👋 Welcome back, Smith!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-slate-500 mt-1"
              >
                Good Evening 🌙 Continue learning and teaching.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-4 w-full md:w-auto"
            >
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search Skills..." 
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#5B4CF5] focus:ring-2 focus:ring-[#5B4CF5]/20"
                />
              </div>
              <Link to="/explore" className="hidden md:flex px-5 py-2.5 bg-[#5B4CF5] text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 transition-colors items-center gap-2 h-12">
                Explore Skills
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-8">
              
              {/* Profile & Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                
                {/* Profile Completion */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Award className="w-16 h-16 text-[#5B4CF5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-500 mb-2">Profile Completion</h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold text-slate-900">82%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-[#5B4CF5] to-[#7B61FF] rounded-full"></motion.div>
                  </div>
                </motion.div>

                {/* Weekly Streak */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-all">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Flame className="w-16 h-16 text-[#F97316]" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-500 mb-2">Weekly Streak</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-900">12</span>
                    <span className="text-slate-500 font-medium mb-1">Days</span>
                  </div>
                  <p className="text-sm text-[#F97316] font-medium mt-2 flex items-center gap-1"><Flame className="w-4 h-4"/> Keep it up!</p>
                </motion.div>
                
                {/* Reputation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Star className="w-16 h-16 text-[#EAB308]" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-500 mb-2">Reputation</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-900">520</span>
                    <span className="text-slate-500 font-medium mb-1">XP</span>
                  </div>
                  <p className="text-sm text-[#EAB308] font-medium mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4"/> +45 this week</p>
                </motion.div>

                {/* Rank */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-[#5B4CF5] to-[#7B61FF] p-6 rounded-2xl shadow-lg shadow-[#5B4CF5]/20 text-white relative overflow-hidden group hover:-translate-y-1 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Trophy className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-white/80 mb-2">Global Rank</h3>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold">Top 8%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mt-4">
                    <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-white rounded-full"></motion.div>
                  </div>
                </motion.div>

              </div>

              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-[#5B4CF5] transition-colors">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><BookOpen className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium">Skills Learned</h4>
                    <p className="text-xl font-bold text-slate-900">18 <span className="text-xs text-green-500 font-medium ml-1">+3</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-[#5B4CF5] transition-colors">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Users className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium">Skills Shared</h4>
                    <p className="text-xl font-bold text-slate-900">9 <span className="text-xs text-slate-400 font-medium ml-1">45 students</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-[#5B4CF5] transition-colors">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><MessageSquare className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium">Active Swaps</h4>
                    <p className="text-xl font-bold text-slate-900">6</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-[#5B4CF5] transition-colors">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><Star className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium">Total XP</h4>
                    <p className="text-xl font-bold text-slate-900">5,420</p>
                  </div>
                </div>
              </div>

              {/* Charts & Progress */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Learning Analytics */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Weekly Learning Hours</h3>
                    <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1 outline-none">
                      <option>This Week</option>
                      <option>Last Week</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={learningData}>
                        <defs>
                          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5B4CF5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#5B4CF5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                        <Area type="monotone" dataKey="hours" stroke="#5B4CF5" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Circular Progress (Skills) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 mb-6">Learning Progress</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {skillData.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center justify-center group">
                        <div className="relative w-24 h-24 mb-3">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                            <motion.circle 
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 251.2 - (251.2 * skill.progress) / 100 }}
                              transition={{ duration: 1.5, delay: index * 0.2 }}
                              cx="48" cy="48" r="40" stroke={skill.color} strokeWidth="8" fill="transparent" 
                              strokeDasharray="251.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-slate-800">{skill.progress}%</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* My Skills & Timeline Row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* My Skills Cards */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-slate-900">My Taught Skills</h3>
                    <button className="text-sm text-[#5B4CF5] font-medium hover:underline">View All</button>
                  </div>
                  
                  {taughtSkills.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">No taught skills added yet.</p>
                  ) : (
                    taughtSkills.map((skill) => (
                      <div key={skill.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">{skill.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{skill.level}</span>
                            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-current"/> {skill.rating}</span>
                            <span>{skill.students} Students</span>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditSkill(skill.title)} className="px-3 py-1.5 bg-indigo-50 text-[#5B4CF5] text-sm font-medium rounded-lg hover:bg-indigo-100">Edit</button>
                          <button onClick={() => handleDeleteSkill(skill.id, skill.title)} className="px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 mb-6">Upcoming Sessions</h3>
                  <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
                    {sessions.length === 0 ? (
                      <p className="text-sm text-slate-500 pl-6">No upcoming sessions.</p>
                    ) : (
                      sessions.map(session => (
                        <div key={session.id} className="relative pl-6">
                          <div className={`absolute w-4 h-4 bg-white border-2 rounded-full -left-[9px] top-1 ${session.color === 'blue' ? 'border-[#5B4CF5]' : 'border-purple-500'}`}></div>
                          <p className={`text-xs font-bold mb-1 ${session.color === 'blue' ? 'text-[#5B4CF5]' : 'text-purple-600'}`}>{session.time}</p>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <h4 className="font-bold text-slate-900">{session.title}</h4>
                            <p className="text-sm text-slate-500 mb-3">with {session.with}</p>
                            {session.type === 'join' ? (
                              <button onClick={() => handleJoin(session.title)} className="w-full py-2 bg-[#5B4CF5] text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors">Join Meeting</button>
                            ) : (
                              <div className="flex gap-2">
                                <button onClick={() => handleAccept(session.id, session.title)} className="flex-1 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors">Accept</button>
                                <button onClick={() => handleDecline(session.id, session.title)} className="flex-1 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors">Decline</button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Recommended Skills Carousel */}
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-4">Recommended for You</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {['AI Prompt Engineering', 'Machine Learning', 'Canva Advanced', 'Excel Mastery', 'Public Speaking', 'Docker Basics'].map((skill, i) => (
                    <div key={i} className="min-w-[240px] bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                      <div className="h-28 bg-slate-200 relative overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i+10}/300/200`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Skill" />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" /> 4.9
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 mb-1 truncate">{skill}</h4>
                        <p className="text-xs text-slate-500 mb-3">by Instructor {i+1}</p>
                        <button onClick={() => handleLearnNow(skill)} className="w-full py-2 bg-slate-50 text-[#5B4CF5] text-sm font-semibold rounded-lg group-hover:bg-[#5B4CF5] group-hover:text-white transition-colors">Learn Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              
              {/* Daily Goal */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                <h3 className="font-bold text-slate-900 mb-2">Daily Goal</h3>
                <p className="text-sm text-slate-500 mb-4">You're almost there!</p>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                    <circle cx="64" cy="64" r="56" stroke="#5B4CF5" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset="105.5" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-800">7<span className="text-lg text-slate-400">/10</span></span>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700">Tasks Completed</p>
              </div>

              {/* Achievement Badges */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Badges</h3>
                  <button className="text-slate-400 hover:text-[#5B4CF5]"><ChevronRight className="w-5 h-5"/></button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: '🏆', name: 'First Teacher' },
                    { icon: '🔥', name: '30 Day Streak' },
                    { icon: '💎', name: 'Top Mentor' },
                    { icon: '🚀', name: 'Rising Star' },
                    { icon: '🎖️', name: 'React Expert' }
                  ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                      <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 group-hover:bg-[#5B4CF5]/10 transition-all border border-slate-100">
                        {badge.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 leading-tight">{badge.name}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center text-center group cursor-pointer justify-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-slate-200 transition-all border border-dashed border-slate-300">
                      <span className="text-slate-400 text-sm font-bold">+3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Messages</h3>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start group cursor-pointer">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=rahul" className="w-10 h-10 rounded-full" alt="User" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm text-slate-900">Rahul S.</h4>
                        <span className="text-xs text-slate-400">2m ago</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-medium text-slate-800">Can we reschedule tomorrow?</p>
                      <button className="text-[11px] text-[#5B4CF5] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Reply</button>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start group cursor-pointer">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=sneha" className="w-10 h-10 rounded-full" alt="User" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm text-slate-900">Sneha K.</h4>
                        <span className="text-xs text-slate-400">1d ago</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">Session Completed! Thanks.</p>
                      <button className="text-[11px] text-[#5B4CF5] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Reply</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Feed Snippet */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Community Activity</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-50">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://i.pravatar.cc/150?u=ankit" className="w-6 h-6 rounded-full" alt="User" />
                      <p className="text-xs text-slate-600"><span className="font-bold text-slate-900">Ankit</span> completed Python Advanced</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleCongratulate} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-medium hover:bg-indigo-100 transition-colors">👏 Congratulate</button>
                      <button onClick={handleLike} className="text-xs bg-rose-50 text-rose-600 px-2 py-1 rounded font-medium hover:bg-rose-100 transition-colors">❤️ Like</button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://i.pravatar.cc/150?u=priya" className="w-6 h-6 rounded-full" alt="User" />
                      <p className="text-xs text-slate-600"><span className="font-bold text-slate-900">Priya</span> shared Web Design Notes</p>
                    </div>
                    <button onClick={handleDownload} className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 rounded font-medium transition-colors">Download</button>
                  </div>
                </div>
                <button onClick={handleViewFeed} className="w-full text-center text-sm font-semibold text-[#5B4CF5] mt-4 pt-2 border-t border-slate-50 hover:underline">View Full Feed</button>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
