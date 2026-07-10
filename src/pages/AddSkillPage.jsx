import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import { 
  UploadCloud, CheckCircle2, ChevronDown, Lightbulb, 
  X, Info, Check, Plus, Search, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIES = [
  'Programming', 'Design', 'Music', 'Languages', 'Photography', 
  'Finance', 'AI', 'Marketing', 'Business', 'Fitness', 
  'Cooking', 'Gaming', 'Data Science', 'Cyber Security', 
  'Mobile Development', 'Cloud Computing', 'DevOps'
];

const EXPERIENCES = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const AVAILABILITIES = [
  { id: 'Weekdays', icon: '☀' },
  { id: 'Weekends', icon: '🌙' },
  { id: 'Evenings', icon: '🕒' },
  { id: 'Anytime', icon: '🌍' }
];
const MODES = [
  { id: 'Online', icon: '💻' },
  { id: 'Offline', icon: '🏢' },
  { id: 'Hybrid', icon: '🔄' }
];
const DURATIONS = ['30 Minutes', '45 Minutes', '1 Hour', '90 Minutes', '2 Hours', 'Custom'];
const LANGUAGES = ['English', 'Hindi', 'Marathi', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];

export default function AddSkillPage() {
  const navigate = useNavigate();
  
  // -- Form State --
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    experience: 'Beginner',
    yearsExp: 0,
    description: '',
    availability: [],
    mode: '',
    duration: '1 Hour',
    languages: ['English'],
    thumbnail: null,
    difficulty: 0,
    tags: [],
  });

  // -- UI State --
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const [tagInput, setTagInput] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [activeTip, setActiveTip] = useState(null);

  // Auto-resize description
  const descriptionRef = useRef(null);
  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + 'px';
    }
  }, [formData.description]);

  // -- Handlers --
  const handleThumbnailUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large. Maximum size is 5MB.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnail: imageUrl }));
      toast.success('Thumbnail uploaded successfully!');
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !formData.tags.includes(val)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const toggleAvailability = (avail) => {
    setFormData(prev => {
      const isSelected = prev.availability.includes(avail);
      return {
        ...prev,
        availability: isSelected ? prev.availability.filter(a => a !== avail) : [...prev.availability, avail]
      };
    });
  };

  const toggleLanguage = (lang) => {
    setFormData(prev => {
      const isSelected = prev.languages.includes(lang);
      return {
        ...prev,
        languages: isSelected ? prev.languages.filter(l => l !== lang) : [...prev.languages, lang]
      };
    });
  };

  // Validation
  const isValid = 
    formData.name.length >= 3 &&
    formData.category !== '' &&
    formData.description.length >= 100 &&
    formData.mode !== '' &&
    formData.thumbnail !== null;

  const handlePublish = () => {
    if (!isValid) return;

    // Create a new skill card object
    const newSkill = {
      id: Date.now().toString(),
      name: 'You (Current User)',
      teaching: [formData.name],
      wants: ['Various Skills'], // Just a placeholder
      rating: 0,
      location: 'Local',
      swaps: 0,
      avatar: 'https://i.pravatar.cc/150?u=currentUser',
      category: formData.category || 'Other',
      level: formData.experience,
      mode: 'Online',
      availability: formData.availability.length > 0 ? formData.availability : ['Anytime'],
      dateAdded: Date.now(),
      profession: 'Student'
    };

    const saved = localStorage.getItem('addedSkills');
    let existingSkills = [];
    if (saved) {
      try {
        existingSkills = JSON.parse(saved);
      } catch(e) {}
    }
    
    existingSkills.push(newSkill);
    localStorage.setItem('addedSkills', JSON.stringify(existingSkills));

    setIsPublishModalOpen(true);
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const handlePreview = () => {
    toast('Preview mode toggled', { icon: '👁️' });
  };

  const filteredCategories = CATEGORIES.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()));

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col text-[#111827]"
    >
      <Toaster position="bottom-right" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative pt-20 pb-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-indigo-200/40 blur-[100px] -z-10 pointer-events-none"></div>
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-purple-200/40 blur-[120px] -z-10 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-700 font-semibold text-sm mb-6">
              ✨ Share Your Knowledge
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Add a New Skill
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Help students discover your expertise, build your profile, and start exchanging knowledge with people around the world.
            </motion.p>
          </div>
        </div>

        {/* Form and Preview Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Section (65% on Desktop) */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-8 space-y-8">
              
              <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
                <div className="space-y-8">
                  
                  {/* Skill Name */}
                  <div>
                    <label className="block text-[15px] font-semibold text-slate-900 mb-2">Skill Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lightbulb className="h-5 w-5 text-indigo-400" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Example: React.js Development"
                        className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-[15px] font-medium transition-all"
                      />
                    </div>
                    {formData.name.length > 0 && formData.name.length < 3 && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><X className="w-4 h-4" /> Minimum 3 characters required</p>
                    )}
                  </div>

                  {/* Category & Experience Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Category Dropdown */}
                    <div className="relative">
                      <label className="block text-[15px] font-semibold text-slate-900 mb-2">Category <span className="text-red-500">*</span></label>
                      <button 
                        type="button"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="w-full h-14 px-4 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-[15px] font-medium transition-all"
                      >
                        <span className={formData.category ? 'text-slate-900' : 'text-slate-400'}>
                          {formData.category || 'Select a category'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isCategoryOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                          >
                            <div className="p-2 border-b border-slate-100">
                              <div className="relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                  type="text" 
                                  placeholder="Search categories..."
                                  value={categorySearch}
                                  onChange={e => setCategorySearch(e.target.value)}
                                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm"
                                />
                              </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {filteredCategories.map(cat => (
                                <button
                                  key={cat}
                                  onClick={() => { setFormData({ ...formData, category: cat }); setIsCategoryOpen(false); setCategorySearch(''); }}
                                  className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-between"
                                >
                                  {cat}
                                  {formData.category === cat && <Check className="w-4 h-4 text-indigo-600" />}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <label className="block text-[15px] font-semibold text-slate-900 mb-2">Years of Experience</label>
                      <input 
                        type="number" 
                        min="0" max="30"
                        value={formData.yearsExp}
                        onChange={(e) => setFormData({ ...formData, yearsExp: parseInt(e.target.value) || 0 })}
                        className="w-full h-14 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-[15px] font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Experience Level Segmented Buttons */}
                  <div>
                    <label className="block text-[15px] font-semibold text-slate-900 mb-2">Experience Level</label>
                    <div className="flex flex-wrap sm:flex-nowrap bg-slate-50 p-1.5 rounded-2xl border border-slate-200 gap-1.5">
                      {EXPERIENCES.map(exp => (
                        <button
                          key={exp}
                          onClick={() => setFormData({ ...formData, experience: exp })}
                          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                            formData.experience === exp 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-[15px] font-semibold text-slate-900">Skill Description <span className="text-red-500">*</span></label>
                      <span className={`text-xs font-medium ${formData.description.length < 100 || formData.description.length > 1000 ? 'text-red-500' : 'text-slate-400'}`}>
                        {formData.description.length}/1000
                      </span>
                    </div>
                    <textarea 
                      ref={descriptionRef}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what you'll teach, your teaching style, prerequisites, tools used, expected outcomes, and what learners can expect after completing your sessions..."
                      className="w-full min-h-[160px] p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-[15px] transition-all resize-none leading-relaxed"
                    />
                    {formData.description.length > 0 && formData.description.length < 100 && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><X className="w-4 h-4" /> Description is too short (min 100 characters)</p>
                    )}
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-[15px] font-semibold text-slate-900 mb-2">Availability</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {AVAILABILITIES.map(avail => (
                        <button
                          key={avail.id}
                          onClick={() => toggleAvailability(avail.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.availability.includes(avail.id)
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                            : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-2xl mb-2">{avail.icon}</span>
                          <span className="text-sm font-semibold">{avail.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Teaching Mode & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[15px] font-semibold text-slate-900 mb-2">Teaching Mode <span className="text-red-500">*</span></label>
                      <div className="flex flex-col gap-3">
                        {MODES.map(mode => (
                          <button
                            key={mode.id}
                            onClick={() => setFormData({ ...formData, mode: mode.id })}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                              formData.mode === mode.id
                              ? 'border-purple-600 bg-purple-50 shadow-[0_0_15px_rgba(147,51,234,0.1)]'
                              : 'border-slate-100 bg-white hover:border-purple-200'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${formData.mode === mode.id ? 'bg-purple-100' : 'bg-slate-50'}`}>
                              {mode.icon}
                            </div>
                            <span className={`text-base font-semibold ${formData.mode === mode.id ? 'text-purple-700' : 'text-slate-700'}`}>{mode.id}</span>
                            {formData.mode === mode.id && <CheckCircle2 className="w-5 h-5 text-purple-600 ml-auto" />}
                          </button>
                        ))}
                      </div>
                      {formData.mode === '' && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><X className="w-4 h-4" /> Please select a teaching mode</p>
                      )}
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="block text-[15px] font-semibold text-slate-900 mb-2">Session Duration</label>
                        <select 
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full h-14 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-[15px] font-medium transition-all appearance-none cursor-pointer"
                        >
                          {DURATIONS.map(dur => <option key={dur} value={dur}>{dur}</option>)}
                        </select>
                      </div>

                      {/* Language Selection */}
                      <div className="relative">
                        <label className="block text-[15px] font-semibold text-slate-900 mb-2">Preferred Languages</label>
                        <button 
                          type="button"
                          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                          className="w-full min-h-[56px] px-4 py-2 flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                        >
                          {formData.languages.length === 0 ? (
                            <span className="text-slate-400 text-[15px] font-medium">Select languages</span>
                          ) : (
                            formData.languages.map(lang => (
                              <span key={lang} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-semibold flex items-center gap-1">
                                {lang}
                                <X className="w-3 h-3 cursor-pointer hover:text-indigo-900" onClick={(e) => { e.stopPropagation(); toggleLanguage(lang); }} />
                              </span>
                            ))
                          )}
                          <ChevronDown className={`w-5 h-5 text-slate-400 ml-auto transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isLanguageOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                              className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden max-h-60 overflow-y-auto"
                            >
                              {LANGUAGES.map(lang => (
                                <button
                                  key={lang}
                                  onClick={() => toggleLanguage(lang)}
                                  className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-between"
                                >
                                  {lang}
                                  {formData.languages.includes(lang) && <Check className="w-4 h-4 text-indigo-600" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-[15px] font-semibold text-slate-900 mb-2">Skill Thumbnail <span className="text-red-500">*</span></label>
                    <div className="relative border-2 border-dashed border-slate-300 rounded-[24px] p-10 text-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-colors group cursor-pointer overflow-hidden">
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp, image/gif"
                        onChange={handleThumbnailUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {formData.thumbnail ? (
                        <div className="absolute inset-0 w-full h-full">
                          <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover opacity-30 group-hover:opacity-10 transition-opacity" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                                <UploadCloud className="w-8 h-8 text-indigo-600" />
                             </div>
                             <p className="text-[16px] font-bold text-slate-900">Replace Image</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-100 group-hover:bg-white group-hover:shadow-md rounded-full flex items-center justify-center transition-all">
                            <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          </div>
                          <div>
                            <p className="text-[16px] font-bold text-slate-900 mb-1">Click to upload or drag and drop</p>
                            <p className="text-[14px] text-slate-500">JPG, PNG, WEBP or GIF (max. 5MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {!formData.thumbnail && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><X className="w-4 h-4" /> Please upload a thumbnail image</p>
                    )}
                  </div>

                  {/* Skill Difficulty */}
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="block text-[15px] font-semibold text-slate-900">Skill Difficulty</label>
                      <span className="text-sm font-bold text-indigo-600">{DIFFICULTIES[formData.difficulty]}</span>
                    </div>
                    <div className="relative pt-1">
                      <input
                        type="range"
                        min="0"
                        max="3"
                        step="1"
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                      />
                      <div className="flex justify-between text-xs text-slate-400 font-medium mt-2 px-1">
                        {DIFFICULTIES.map(diff => <span key={diff}>{diff}</span>)}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-[15px] font-semibold text-slate-900 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <AnimatePresence>
                        {formData.tags.map(tag => (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                            key={tag} 
                            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[14px] font-medium flex items-center gap-2 border border-slate-200"
                          >
                            {tag}
                            <X className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => removeTag(tag)} />
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Type a tag and press Enter... (e.g. Hooks, Tailwind)"
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-[14px] transition-all"
                    />
                  </div>

                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-8 border-t border-slate-200">
                <button onClick={handleSaveDraft} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-700 text-[15px] font-bold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                  Save Draft
                </button>
                <button onClick={handlePreview} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 text-white text-[15px] font-bold hover:bg-slate-900 transition-all shadow-md">
                  Preview
                </button>
                <div className="w-full sm:flex-1"></div>
                <button 
                  onClick={handlePublish} 
                  disabled={!isValid}
                  className={`w-full sm:w-auto px-10 py-4 rounded-xl text-[16px] font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    isValid 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_8px_25px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 active:translate-y-0' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Publish Skill
                </button>
              </div>

            </motion.div>

            {/* Live Preview Section (35% on Desktop) */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Live Preview</h3>
              </div>
              
              {/* Card Preview */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
                
                {/* Thumbnail */}
                <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                  {formData.thumbnail ? (
                    <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-300">
                      <UploadCloud className="w-12 h-12 mb-2 opacity-50" />
                      <span className="font-semibold text-sm">Image Preview</span>
                    </div>
                  )}
                  
                  {formData.mode && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[12px] font-bold text-slate-900">{formData.mode}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[12px] font-bold uppercase tracking-wider rounded-lg border border-indigo-100">
                      {formData.category || 'Category'}
                    </span>
                    <div className="flex text-yellow-400">
                      {'★★★★★'.split('').map((star, i) => <span key={i} className="text-sm">{star}</span>)}
                    </div>
                  </div>

                  <h4 className="text-[20px] font-bold text-slate-900 mb-1 leading-tight line-clamp-2">
                    {formData.name || 'Skill Name'}
                  </h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><span className="text-indigo-600">★</span> {formData.experience}</span>
                    <span className="flex items-center gap-1"><span className="text-purple-600">⏱</span> {formData.duration}</span>
                    {formData.yearsExp > 0 && <span>{formData.yearsExp} Yrs Exp</span>}
                  </div>
                  
                  <p className="text-[14px] text-slate-600 line-clamp-3 mb-6 min-h-[60px] leading-relaxed">
                    {formData.description || 'Description will appear here. Write a great summary to attract learners...'}
                  </p>

                  {/* Tags Preview */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {formData.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold rounded border border-slate-200">
                          {tag}
                        </span>
                      ))}
                      {formData.tags.length > 4 && (
                        <span className="px-2 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold rounded border border-slate-200">
                          +{formData.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Instructor Preview */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/150?u=current_user" alt="Instructor" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div>
                        <p className="text-[14px] font-bold text-slate-900">Current User</p>
                        <p className="text-[12px] text-slate-500 font-medium">Instructor</p>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="bg-white border-t border-slate-200 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            {/* Why Teach */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Teach on SkillSwap?</h2>
                <p className="text-slate-600 text-lg">Join a community of knowledge seekers and sharers.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: '🌍', title: 'Reach Thousands', desc: 'Connect with a global audience of passionate learners looking for your exact skills.' },
                  { icon: '🤝', title: 'Build Your Network', desc: 'Meet like-minded professionals and form connections that last beyond the session.' },
                  { icon: '🔄', title: 'Learn While Teaching', desc: 'Exchange your expertise for new skills in return. The ultimate win-win scenario.' }
                ].map((feature, i) => (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="bg-slate-50 rounded-[24px] p-8 text-center border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Teaching Tips */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Teaching Tips</h2>
              <div className="space-y-4">
                {[
                  { q: 'How to write a good description?', a: 'Be specific about what you will teach. Outline a mini-curriculum, mention prerequisites, and highlight the practical outcomes.' },
                  { q: 'How should I price free sessions?', a: 'SkillSwap is about exchanging knowledge. If you are teaching for free, ask for a skill in return or ask for reviews to build your reputation.' },
                  { q: 'Best thumbnail practices', a: 'Use high-quality images related to your skill. Include minimal text and ensure the central subject is clear even at small sizes.' },
                  { q: 'How to attract more learners', a: 'Keep your availability updated, respond quickly to messages, and ask your previous learners to leave positive reviews.' }
                ].map((faq, i) => (
                  <div key={i} className={`bg-white border rounded-2xl overflow-hidden hover:border-[#5B5BFF] transition-colors group cursor-pointer ${activeTip === i ? 'border-[#5B5BFF] shadow-sm' : 'border-slate-200'}`} onClick={() => setActiveTip(activeTip === i ? null : i)}>
                    <div className="p-6 flex justify-between items-center">
                      <h4 className={`text-lg font-bold transition-colors ${activeTip === i ? 'text-[#5B5BFF]' : 'text-[#111827]'}`}>{faq.q}</h4>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeTip === i ? 'rotate-180 text-[#5B5BFF]' : 'text-slate-400 group-hover:text-[#5B5BFF]'}`} />
                    </div>
                    <AnimatePresence>
                      {activeTip === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Success Modal */}
      <AnimatePresence>
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsPublishModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white rounded-[32px] p-10 w-full max-w-md shadow-2xl text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 -z-10"></div>
              
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-xl mb-6 relative mt-12">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping opacity-20"></div>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Check className="w-8 h-8" strokeWidth={3} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">🎉 Skill Published!</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">Your skill is now visible to the community. Get ready to start exchanging knowledge!</p>
              
              <div className="space-y-3">
                <button onClick={() => navigate('/dashboard')} className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[16px] font-bold shadow-lg shadow-indigo-600/30 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                  Go to Dashboard
                </button>
                <button onClick={() => setIsPublishModalOpen(false)} className="w-full py-4 rounded-xl bg-white border border-slate-200 text-slate-700 text-[16px] font-bold hover:bg-slate-50 transition-all">
                  View Skill Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

