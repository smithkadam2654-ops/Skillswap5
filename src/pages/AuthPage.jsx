import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, EyeOff, Mail, Lock, User, Briefcase, MapPin, 
  BookOpen, Star, Sparkles, CheckCircle2, ChevronRight,
  Shield, AlertCircle, ArrowLeft, Image as ImageIcon,
  Check, Github
} from 'lucide-react';

const FLOATING_ICONS = ['React', 'Python', 'AI', 'Canva', 'Java', 'Photoshop'];
const INTERESTS = ['React', 'Python', 'AI', 'Machine Learning', 'UI/UX', 'Cloud', 'Cybersecurity', 'Java', 'C++', 'Flutter', 'NodeJS'];

import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectMessage = location.state?.message;

  const [view, setView] = useState('signIn'); // signIn, signUp, forgotPassword, verification
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sign Up State
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState(null); // 'available', 'taken', null

  // Verification State
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // Simple password strength calculation
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(Math.min(4, strength));
  }, [password]);

  useEffect(() => {
    if (username.length > 3) {
      // Simulate API call
      const timer = setTimeout(() => {
        setUsernameStatus(username === 'smith' ? 'available' : 'taken');
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameStatus(null);
    }
  }, [username]);

  useEffect(() => {
    let timer;
    if (view === 'verification' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, countdown]);

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleAction = (e, nextView) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (nextView === 'signIn' && view === 'signIn') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate(location.state?.from?.pathname || '/dashboard');
      } else {
        setView(nextView);
      }
    }, 1500);
  };

  const strengthColors = ['bg-slate-200', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];
  const strengthLabels = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white flex"
    >
      
      {/* Left Side - Brand & Features (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#5B4CF5] via-[#7B61FF] to-[#A855F7] p-12 flex-col justify-between relative overflow-hidden text-white">
        
        {/* Floating Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></motion.div>
          <motion.div animate={{ y: [0, 30, 0], x: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 -right-20 w-[30rem] h-[30rem] bg-pink-500/20 rounded-full blur-3xl"></motion.div>
        </div>

        {/* Floating Icons */}
        {FLOATING_ICONS.map((icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, Math.random() * -20 - 10, 0] }}
            transition={{ 
              opacity: { duration: 0.5, delay: i * 0.1 },
              scale: { duration: 0.5, delay: i * 0.1 },
              y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
            }}
            className="absolute bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 font-semibold text-sm shadow-xl"
            style={{ 
              top: `${20 + (i * 12)}%`, 
              left: `${10 + (i % 2 === 0 ? Math.random()*20 : 60 + Math.random()*10)}%` 
            }}
          >
            {icon}
          </motion.div>
        ))}

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16 cursor-pointer" onClick={() => window.location.href='/'}>
            <div className="w-10 h-10 bg-white text-[#5B4CF5] rounded-xl flex items-center justify-center font-bold text-xl"><Sparkles size={20}/></div>
            <span className="text-2xl font-bold tracking-tight">SkillSwap</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              Learn together.<br/>Grow together.
            </h1>
            
            <div className="space-y-4 mb-12">
              {[
                'Exchange Skills with peers',
                'Learn from talented Students',
                'Build a verifiable Portfolio',
                'Earn Reputation & Badges',
                'Join Community Events',
                'Earn verified Certificates'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg text-white/90 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-2/3">
            <div className="flex gap-1 text-yellow-400 mb-3">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current"/>)}
            </div>
            <p className="text-white/90 italic text-sm mb-4">"SkillSwap helped me learn React from a senior while I taught them UI design. Incredible experience!"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">P</div>
              <span className="font-semibold text-sm">Priya Sharma</span>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right space-y-4">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-xs text-white/70 uppercase tracking-wider font-semibold mt-1">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-xs text-white/70 uppercase tracking-wider font-semibold mt-1">Sessions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">4.9★</p>
              <p className="text-xs text-white/70 uppercase tracking-wider font-semibold mt-1">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative">
        <AnimatePresence mode="wait">
          
          {/* SIGN IN */}
          {view === 'signIn' && (
            <motion.div 
              key="signIn" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md"
            >
              {redirectMessage && (
                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#5B4CF5] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700">{redirectMessage}</p>
                </div>
              )}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back 👋</h2>
                <p className="text-slate-500">Sign in to continue your journey</p>
              </div>

              <form onSubmit={(e) => handleAction(e, 'signIn')} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="name@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} required className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#5B4CF5] focus:ring-[#5B4CF5]" />
                    <span className="text-slate-600 font-medium">Remember Me</span>
                  </label>
                  <button type="button" onClick={() => setView('forgotPassword')} className="text-[#5B4CF5] font-semibold hover:underline">Forgot Password?</button>
                </div>

                <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5B4CF5]/30 flex items-center justify-center">
                  {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Sign In'}
                </button>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-sm font-medium text-slate-400">OR</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                  Continue with Google
                </button>
                <button className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
                  <Github className="w-5 h-5" />
                  Continue with GitHub
                </button>
              </div>

              <p className="text-center text-slate-600 mt-8 font-medium">
                Don't have an account? <button onClick={() => setView('signUp')} className="text-[#5B4CF5] font-bold hover:underline">Create Account</button>
              </p>
            </motion.div>
          )}

          {/* SIGN UP */}
          {view === 'signUp' && (
            <motion.div 
              key="signUp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto pr-4 custom-scrollbar"
            >
              <div className="flex items-center mb-6">
                <button onClick={() => setView('signIn')} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 mr-2"><ArrowLeft className="w-5 h-5"/></button>
                <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
              </div>

              <form onSubmit={(e) => handleAction(e, 'verification')} className="space-y-6">
                
                {/* Basic Info */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <h3 className="font-bold text-slate-900 mb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                      <input type="text" required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                      <div className="relative">
                        <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                        {usernameStatus && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                            {usernameStatus === 'available' ? <CheckCircle2 className="w-4 h-4 text-green-500"/> : <AlertCircle className="w-4 h-4 text-red-500"/>}
                          </div>
                        )}
                      </div>
                      {usernameStatus === 'taken' && <p className="text-xs text-red-500 mt-1 font-medium">Already taken</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                      <input type="email" required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Phone (Optional)</label>
                      <input type="tel" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                    </div>
                  </div>
                </div>

                {/* Academic */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <h3 className="font-bold text-slate-900 mb-2">Academic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">College/University</label>
                      <input type="text" required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
                      <input type="text" required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Year of Study</label>
                      <select required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none appearance-none">
                        <option value="">Select Year</option>
                        <option>First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                        <option>Fourth Year</option>
                        <option>Masters</option>
                        <option>Alumni</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <h3 className="font-bold text-slate-900 mb-2">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {/* Password Strength Meter */}
                      {password && (
                        <div className="mt-2">
                          <div className="flex gap-1 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-1">
                            {[0,1,2,3].map(i => (
                              <div key={i} className={`h-full flex-1 transition-colors duration-300 ${passwordStrength > i ? strengthColors[passwordStrength] : 'bg-transparent'}`}></div>
                            ))}
                          </div>
                          <p className={`text-xs font-semibold ${passwordStrength > 0 ? strengthColors[passwordStrength].replace('bg-', 'text-') : 'text-slate-400'}`}>
                            {strengthLabels[passwordStrength]}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
                      <input type={showPassword ? 'text' : 'password'} required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none" />
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1">Interests</h3>
                  <p className="text-xs text-slate-500 mb-4">Select skills you want to learn or teach</p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(interest => (
                      <button 
                        key={interest} type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          selectedInterests.includes(interest) 
                          ? 'bg-indigo-100 border-[#5B4CF5] text-[#5B4CF5]' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 px-2">
                  <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-[#5B4CF5] focus:ring-[#5B4CF5]" />
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    I agree to the <a href="#" className="text-[#5B4CF5] hover:underline">Terms of Service</a> and <a href="#" className="text-[#5B4CF5] hover:underline">Privacy Policy</a>.
                  </p>
                </div>

                <button type="submit" disabled={isLoading} className="w-full py-4 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5B4CF5]/30 flex items-center justify-center mt-4">
                  {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Create Account'}
                </button>
              </form>
            </motion.div>
          )}

          {/* VERIFICATION */}
          {view === 'verification' && (
            <motion.div 
              key="verification" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md text-center"
            >
              <div className="w-20 h-20 bg-indigo-50 text-[#5B4CF5] rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Check your email</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We've sent a verification link to <span className="font-semibold text-slate-900">your email</span>. 
                Please verify your account to continue.
              </p>
              
              <button onClick={() => window.location.href='/dashboard'} className="w-full py-3.5 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5B4CF5]/30 mb-6">
                I've verified my email
              </button>

              <p className="text-sm text-slate-500 font-medium">
                Didn't receive it?{' '}
                {countdown > 0 ? (
                  <span className="text-slate-400">Resend in {countdown}s</span>
                ) : (
                  <button onClick={() => setCountdown(60)} className="text-[#5B4CF5] font-bold hover:underline">Resend Email</button>
                )}
              </p>
            </motion.div>
          )}

          {/* FORGOT PASSWORD */}
          {view === 'forgotPassword' && (
            <motion.div 
              key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md"
            >
              <button onClick={() => setView('signIn')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </button>
              
              <div className="mb-8">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
                <p className="text-slate-500">Enter your email and we'll send you an OTP to reset your password.</p>
              </div>

              <form onSubmit={(e) => handleAction(e, 'signIn')} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="name@example.com" />
                  </div>
                </div>
                
                <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5B4CF5]/30 flex items-center justify-center">
                  {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Send Reset Link'}
                </button>
              </form>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
