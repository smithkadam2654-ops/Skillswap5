import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Repeat, LogOut, User, Bell, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Skills', path: '/explore' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const authenticatedLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Home', path: '/home' }, // Maps to /dashboard or / ? The prompt says Home (/home). Let's use /dashboard for now or just /home
    { name: 'Explore Skills', path: '/explore' },
    { name: 'Add Skills', path: '/add-skill' },
    { name: 'My Skills', path: '/my-skills' },
  ];
  
  // Actually the prompt says: Dashboard, Home, Explore Skills, Add Skills, My Skills, Messages, Notifications, Profile, Logout.
  // We can show some as icons, some as text. Let's make them all text if on mobile, and a mix on desktop.
  // Wait, "The authenticated navbar should contain: Dashboard, Home, Explore Skills, Add Skills, My Skills, Messages, Notifications, Profile, Logout"

  const desktopAuthLinks = [
    { name: 'My Skills', path: '/dashboard' },
    { name: 'Explore Skills', path: '/explore' },
    { name: 'Add Skills', path: '/add-skill' },
  ];

  const navLinks = isAuthenticated ? desktopAuthLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/landing'} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-[#5B4CF5] rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors shadow-md shadow-[#5B4CF5]/20">
                <Repeat size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SkillSwap</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/dashboard' && location.pathname === '/home');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 transition-colors hover:scale-105 active:scale-95 ${isActive ? 'text-[#5B4CF5] font-bold' : 'hover:text-[#5B4CF5]'}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 bottom-0 w-full h-[2px] bg-[#5B4CF5] rounded-t-full shadow-[0_0_8px_rgba(91,76,245,0.6)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-2 text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-full transition-all hover:scale-110 active:scale-95"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-1 border-l border-slate-200 pl-4 ml-4" ref={dropdownRef}>
                
                {/* Messages */}
                <div className="relative">
                  <button onClick={() => setActiveDropdown(activeDropdown === 'messages' ? null : 'messages')} className={`p-2 relative text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-full transition-all hover:scale-110 active:scale-95 ${activeDropdown === 'messages' ? 'text-[#5B4CF5] bg-indigo-50' : ''}`} title="Messages">
                    <MessageSquare size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'messages' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                          <h3 className="font-bold text-slate-900">Messages</h3>
                          <span className="text-xs text-[#5B4CF5] font-semibold cursor-pointer">Mark all read</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          <Link to="/messages" onClick={() => setActiveDropdown(null)} className="block p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50">
                            <div className="flex gap-3">
                              <img src="https://i.pravatar.cc/150?u=a1" className="w-10 h-10 rounded-full" alt="avatar" />
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">Rahul Sharma</h4>
                                <p className="text-xs text-slate-500 truncate mt-0.5">Hey, let's schedule our React session!</p>
                              </div>
                            </div>
                          </Link>
                          <Link to="/messages" onClick={() => setActiveDropdown(null)} className="block p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="flex gap-3">
                              <img src="https://i.pravatar.cc/150?u=b2" className="w-10 h-10 rounded-full" alt="avatar" />
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">Sarah Jenkins</h4>
                                <p className="text-xs text-slate-500 truncate mt-0.5">Thanks for the Python help yesterday.</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <Link to="/messages" onClick={() => setActiveDropdown(null)} className="block p-3 text-center text-sm text-[#5B4CF5] font-semibold hover:bg-indigo-50 transition-colors border-t border-slate-100">View All Messages</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')} className={`p-2 relative text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-full transition-all hover:scale-110 active:scale-95 ${activeDropdown === 'notifications' ? 'text-[#5B4CF5] bg-indigo-50' : ''}`} title="Notifications">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'notifications' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                          <h3 className="font-bold text-slate-900">Notifications</h3>
                          <span className="text-xs text-[#5B4CF5] font-semibold cursor-pointer">Clear</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                              <Repeat size={14} />
                            </div>
                            <div>
                              <p className="text-sm text-slate-700"><strong>David Chen</strong> requested a skill swap.</p>
                              <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative">
                  <button onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')} className={`p-2 relative text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-full transition-all hover:scale-110 active:scale-95 ${activeDropdown === 'profile' ? 'text-[#5B4CF5] bg-indigo-50' : ''}`} title="Profile">
                    <User size={18} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'profile' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-[#5B4CF5] font-bold">
                            SK
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Smith Kadam</h4>
                            <p className="text-xs text-slate-500">Student</p>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link to="/profile" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 hover:text-[#5B4CF5]">
                            <User size={16} /> My Profile
                          </Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 text-left">
                            <LogOut size={16} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <Link
                to="/signup"
                className="ml-4 bg-[#5B4CF5] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#5B4CF5]/25 hover:bg-indigo-600 hover:-translate-y-0.5 transition-all active:scale-95 hover:shadow-[0_0_15px_rgba(91,76,245,0.4)]"
              >
                Join Community
              </Link>
            )}
          </div>

          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-full transition-all"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-500 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-full transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-y-auto"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path === '/dashboard' && location.pathname === '/home');
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 text-sm font-bold rounded-2xl transition-colors ${isActive ? 'bg-indigo-50 text-[#5B4CF5]' : 'text-slate-600 hover:text-[#5B4CF5] hover:bg-indigo-50'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <div className="pt-4 mt-2 border-t border-slate-100 space-y-1">
                  <Link to="/messages" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-colors ${location.pathname === '/messages' ? 'bg-indigo-50 text-[#5B4CF5]' : 'text-slate-600 hover:text-[#5B4CF5] hover:bg-indigo-50'}`}>
                    <MessageSquare size={18} /> Messages
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-[#5B4CF5] hover:bg-indigo-50 rounded-2xl transition-colors text-left">
                    <Bell size={18} /> Notifications
                  </button>
                  <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-colors ${location.pathname.startsWith('/profile') ? 'bg-indigo-50 text-[#5B4CF5]' : 'text-slate-600 hover:text-[#5B4CF5] hover:bg-indigo-50'}`}>
                    <User size={18} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors text-left">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-2 border-t border-slate-100">
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-[#5B4CF5] text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-[#5B4CF5]/25 hover:bg-indigo-600 transition-colors"
                  >
                    Join Community
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
