import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Search, SlidersHorizontal, ChevronDown, MapPin, 
  Star, CheckCircle2, MessageSquare, Filter, X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockUsers } from "../data/mockUsers";

// Custom Hooks
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function ExplorePage() {
  const navigate = useNavigate();

  // State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');

  // Extract unique colleges and cities
  const allColleges = useMemo(() => [...new Set(mockUsers.map(u => u.college).filter(Boolean))], []);
  const allCities = useMemo(() => [...new Set(mockUsers.map(u => u.location).filter(Boolean))], []);

  const toggleArrayItem = (setter, item) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const filteredAndSortedCards = useMemo(() => {
    let result = [...mockUsers];

    // Search
    if (debouncedSearchQuery) {
      const q = debouncedSearchQuery.toLowerCase();
      result = result.filter(card => 
        card.name.toLowerCase().includes(q) ||
        (card.location && card.location.toLowerCase().includes(q)) ||
        (card.college && card.college.toLowerCase().includes(q)) ||
        (card.branch && card.branch.toLowerCase().includes(q)) ||
        (card.bio && card.bio.toLowerCase().includes(q)) ||
        (card.teaching && card.teaching.some(s => s.toLowerCase().includes(q))) ||
        (card.wants && card.wants.some(s => s.toLowerCase().includes(q)))
      );
    }

    if (selectedLevels.length > 0) result = result.filter(card => selectedLevels.includes(card.level));
    if (selectedMode) result = result.filter(card => card.mode === selectedMode);
    if (selectedAvailability.length > 0) result = result.filter(card => selectedAvailability.some(avail => card.availability && card.availability.includes(avail)));
    if (minRating > 0) result = result.filter(card => card.rating >= minRating);
    if (selectedColleges.length > 0) result = result.filter(card => selectedColleges.includes(card.college));
    if (selectedCities.length > 0) result = result.filter(card => selectedCities.includes(card.location));

    // Sort
    switch (sortBy) {
      case 'Newest':
        result.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
      case 'Highest Rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'Most Swaps':
        result.sort((a, b) => b.swaps - a.swaps);
        break;
      case 'Recently Active':
        result.sort((a, b) => (a.status === 'Online' ? -1 : 1));
        break;
      case 'Alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [debouncedSearchQuery, selectedLevels, selectedMode, selectedAvailability, minRating, selectedColleges, selectedCities, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <Toaster position="top-right" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-slate-800">Filters</h2>
          <button onClick={() => setIsFilterOpen(true)} className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:text-[#5B5BFF]">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`fixed inset-0 z-50 bg-white/80 backdrop-blur-md transition-transform transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-1/4 md:bg-transparent md:backdrop-blur-none md:block shrink-0 h-screen md:h-auto overflow-y-auto md:overflow-visible`}>
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100 h-full md:h-auto overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="text-xl font-bold text-slate-800">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-800 mb-6 hidden md:block">Filters</h2>

            {/* Experience Level */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Experience</h3>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedLevels.includes(level)} onChange={() => toggleArrayItem(setSelectedLevels, level)} className="w-4 h-4 rounded text-[#5B5BFF] focus:ring-[#5B5BFF]/50 border-slate-300" />
                    <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Mode</h3>
              <div className="space-y-2">
                {['Online', 'Offline', 'Hybrid'].map(mode => (
                  <label key={mode} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="mode" checked={selectedMode === mode} onChange={() => setSelectedMode(selectedMode === mode ? null : mode)} onClick={() => setSelectedMode(selectedMode === mode ? null : mode)} className="w-4 h-4 text-[#5B5BFF] focus:ring-[#5B5BFF]/50 border-slate-300" />
                    <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Availability</h3>
              <div className="space-y-2">
                {['Weekdays', 'Weekends', 'Anytime'].map(avail => (
                  <label key={avail} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedAvailability.includes(avail)} onChange={() => toggleArrayItem(setSelectedAvailability, avail)} className="w-4 h-4 rounded text-[#5B5BFF] focus:ring-[#5B5BFF]/50 border-slate-300" />
                    <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">{avail}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 4.5, 5].map(rating => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="rating" checked={minRating === rating} onChange={() => setMinRating(minRating === rating ? 0 : rating)} onClick={() => setMinRating(minRating === rating ? 0 : rating)} className="w-4 h-4 text-[#F59E0B] focus:ring-[#F59E0B]/50 border-slate-300" />
                    <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors flex items-center gap-1">
                      {rating} <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* College */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">College</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto hide-scrollbar pr-2">
                {allColleges.map(college => (
                  <label key={college} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedColleges.includes(college)} onChange={() => toggleArrayItem(setSelectedColleges, college)} className="w-4 h-4 rounded text-[#5B5BFF] focus:ring-[#5B5BFF]/50 border-slate-300" />
                    <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors truncate">{college}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">City</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto hide-scrollbar pr-2">
                {allCities.map(city => (
                  <label key={city} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedCities.includes(city)} onChange={() => toggleArrayItem(setSelectedCities, city)} className="w-4 h-4 rounded text-[#5B5BFF] focus:ring-[#5B5BFF]/50 border-slate-300" />
                    <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors truncate">{city}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 min-w-0 flex flex-col gap-6">
          
          {/* Header row: Search, Results, Sort */}
          <div className="bg-white p-4 rounded-[20px] shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, college, skills..."
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#5B5BFF]/50 focus:border-[#5B5BFF] transition-all"
              />
            </div>

            <div className="flex items-center justify-between w-full lg:w-auto gap-4">
              <span className="text-slate-600 font-medium whitespace-nowrap">Results ({filteredAndSortedCards.length})</span>
              
              <div className="relative group z-30">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Sort: {sortBy}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {['Newest', 'Highest Rated', 'Most Swaps', 'Recently Active', 'Alphabetical'].map(s => (
                    <button key={s} onClick={() => setSortBy(s)} className={`w-full text-left px-4 py-2 text-[14px] hover:bg-slate-50 transition-colors ${sortBy === s ? 'text-[#5B5BFF] font-semibold' : 'text-slate-600'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAndSortedCards.map((card, i) => (
                <motion.div 
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-xl hover:shadow-[#5B5BFF]/10 border border-slate-100 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col group cursor-pointer"
                  onClick={() => navigate(`/profile/${card.id}`)}
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative shrink-0">
                      <img src={card.avatar} alt={card.name} className="w-16 h-16 rounded-full object-cover border-[3px] border-slate-50 shadow-sm transition-transform group-hover:scale-105" />
                      {card.status === 'Online' && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#5B5BFF] transition-colors truncate">{card.name}</h3>
                        <div className="flex items-center gap-1 text-[#F59E0B] bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold">{card.rating}</span>
                        </div>
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium truncate mt-0.5">{card.college}</p>
                      <p className="text-[13px] text-slate-400 truncate">{card.branch} • {card.year}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{card.location}</span></span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700 whitespace-nowrap">{card.swaps} Swaps</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex-1 space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Teaching</p>
                      <div className="flex flex-wrap gap-1.5">
                        {card.teaching?.slice(0, 3).map(s => (
                          <span key={s} className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-100">
                            {s}
                          </span>
                        ))}
                        {card.teaching?.length > 3 && (
                          <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded-lg border border-slate-100">
                            +{card.teaching.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Learning</p>
                      <div className="flex flex-wrap gap-1.5">
                        {card.wants?.slice(0, 3).map(s => (
                          <span key={s} className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg border border-purple-100">
                            {s}
                          </span>
                        ))}
                        {card.wants?.length > 3 && (
                          <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded-lg border border-slate-100">
                            +{card.wants.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/profile/${card.id}`); }} 
                      className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-700 text-[14px] font-semibold hover:bg-slate-100 border border-slate-200 transition-all text-center"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/messages/${card.id}`); toast.success(`Started a chat with ${card.name}!`); }} 
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] text-white text-[14px] font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Start Chat
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredAndSortedCards.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No results found</h3>
                <p className="text-slate-500 max-w-md">We couldn't find any skill swappers matching your current filters. Try adjusting your search or removing some filters.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLevels([]);
                    setSelectedMode(null);
                    setSelectedAvailability([]);
                    setMinRating(0);
                    setSelectedColleges([]);
                    setSelectedCities([]);
                  }} 
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}
