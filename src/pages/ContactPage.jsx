import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, MessageCircle, Send, UploadCloud,
  ChevronDown, Instagram, Linkedin, Github, Twitter,
  Clock, AlertCircle, Users, Zap, Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQS = [
  { q: 'How does SkillSwap work?', a: 'SkillSwap connects you with people who want to learn what you know, and can teach what you want to learn. It is a 1-to-1 knowledge exchange.' },
  { q: 'Can I earn certificates?', a: 'Yes! Upon completing verified learning tracks with a mentor, you can earn certificates to showcase on your profile.' },
  { q: 'Is it free?', a: 'SkillSwap is completely free to use. You exchange your time and knowledge instead of money.' },
  { q: 'How are swaps approved?', a: 'When you request a swap, the other person reviews your profile and request. If they accept, you can schedule your first session.' },
  { q: 'Can I become a mentor?', a: 'Absolutely. Once you reach 1000 XP in a specific skill, you automatically unlock Mentor status for that skill.' }
];

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', topic: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', topic: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
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
      
      <main className="flex-grow pt-24 pb-20">
        
        {/* Hero Section */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-4"
          >
            Let's Connect
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Questions? Feedback? Suggestions? Partnerships? We'd love to hear from you. Get in touch.
          </motion.p>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Mail, title: 'Email', value: 'support@skillswap.com', sub: 'Reply within 24 hrs', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Phone, title: 'Phone', value: '+91 98765 43210', sub: 'Mon-Fri from 8am to 5pm', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: MapPin, title: 'Location', value: 'Mumbai, India', sub: 'HQ Office', color: 'text-rose-500', bg: 'bg-rose-50' },
              { icon: MessageCircle, title: 'Live Chat', value: 'Available', sub: '9 AM - 9 PM', color: 'text-purple-500', bg: 'bg-purple-50' }
            ].map((card, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i*0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform group cursor-pointer"
              >
                <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{card.title}</h3>
                <p className="font-medium text-slate-700 mb-1">{card.value}</p>
                <p className="text-sm text-slate-500">{card.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-indigo-500/5 border border-slate-100 relative overflow-hidden"
            >
              {isSuccess && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">We've received your message and will get back to you shortly.</p>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                    <input type="text" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input type="email" required value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input type="text" required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all" placeholder="How can we help?" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Topic</label>
                  <select required value={formData.topic} onChange={e=>setFormData({...formData, topic: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all appearance-none">
                    <option value="" disabled>Select a topic</option>
                    <option value="Support">Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Report User">Report User</option>
                    <option value="Feedback">Feedback</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold text-slate-700">Message</label>
                    <span className="text-xs text-slate-400 font-medium">{formData.message.length}/500</span>
                  </div>
                  <textarea required maxLength={500} value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] outline-none transition-all min-h-[150px] resize-none" placeholder="Tell us more about your inquiry..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Screenshot (Optional)</label>
                  <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-[#5B4CF5] hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                    <UploadCloud className="w-8 h-8 mb-2 group-hover:text-[#5B4CF5] transition-colors" />
                    <span className="text-sm font-medium">Click to upload or drag & drop</span>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#5B4CF5] hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5B4CF5]/30 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right Side: FAQ, Socials, Map */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="lg:col-span-5 space-y-8"
            >
              
              {/* Extras Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="bg-indigo-50 text-[#5B4CF5] p-2 rounded-lg"><Clock className="w-5 h-5"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Working Hours</h4>
                    <p className="text-xs text-slate-500">24/7 Support</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="bg-rose-50 text-rose-500 p-2 rounded-lg"><AlertCircle className="w-5 h-5"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Emergency</h4>
                    <p className="text-xs text-slate-500">Fast Priority</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="bg-green-50 text-green-500 p-2 rounded-lg"><Users className="w-5 h-5"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Community</h4>
                    <p className="text-xs text-slate-500">10k+ Members</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="bg-yellow-50 text-yellow-600 p-2 rounded-lg"><Zap className="w-5 h-5"/></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Response Time</h4>
                    <p className="text-xs text-slate-500">&lt; 2 Hours</p>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                      >
                        <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 text-sm text-slate-600 border-t border-slate-100 bg-white">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Connect with us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, color: 'hover:text-pink-600 hover:bg-pink-50' },
                    { icon: Linkedin, color: 'hover:text-blue-600 hover:bg-blue-50' },
                    { icon: Github, color: 'hover:text-slate-900 hover:bg-slate-100' },
                    { icon: Twitter, color: 'hover:text-sky-500 hover:bg-sky-50' },
                  ].map((social, i) => (
                    <a key={i} href="#" className={`w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 transition-all ${social.color}`}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-200 rounded-[24px] h-64 overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Map" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/50 transition-colors">
                  <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-slate-900">
                    <MapPin className="w-5 h-5 text-rose-500" /> Mumbai, India
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

      </main>
      <Footer />
    </motion.div>
  );
}
