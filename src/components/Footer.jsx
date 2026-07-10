import { Link } from 'react-router-dom';
import { Repeat, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1 space-y-6">
            <Link to={isAuthenticated ? "/dashboard" : "/landing"} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                <Repeat size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SkillSwap</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              A student-driven platform where knowledge is exchanged, not bought. Learn together, teach together, grow together.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link to={isAuthenticated ? "/dashboard" : "/landing"} className="hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link to="/explore" className="hover:text-indigo-600 transition-colors">Explore Skills</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link to="#" className="hover:text-indigo-600 transition-colors">Programming</Link></li>
              <li><Link to="#" className="hover:text-indigo-600 transition-colors">Graphic Design</Link></li>
              <li><Link to="#" className="hover:text-indigo-600 transition-colors">Languages</Link></li>
              <li><Link to="#" className="hover:text-indigo-600 transition-colors">Mathematics</Link></li>
              <li><Link to="#" className="hover:text-indigo-600 transition-colors">Business</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">Subscribe to get the latest updates on new skills and platform features.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white text-slate-900 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm w-full"
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-2xl transition-colors w-full text-sm shadow-md shadow-indigo-200"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 uppercase tracking-widest font-bold">
          <div className="flex items-center space-x-2">
            <span className="text-slate-900">SkillSwap</span>
            <span>&copy; {currentYear} All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
