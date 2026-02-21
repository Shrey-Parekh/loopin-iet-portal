import Header from '../components/Header';
import { Bell, Clock, User, ChevronRight, AlertCircle, Star, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAnnouncements } from '@/hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

const sortOptions = [
  { value: 'date_desc', label: 'Newest First' },
  { value: 'date_asc', label: 'Oldest First' },
  { value: 'priority', label: 'Priority' },
];

const priorityOrder = { high: 1, medium: 2, low: 3 };

const Announcements = () => {
  const { data, loading, error } = useAnnouncements();
  const [sortBy, setSortBy] = useState('date_desc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortHighlight, setSortHighlight] = useState(false);

  const announcements = useMemo(() => {
    if (!data) return [];
    let arr = [...data];
    if (sortBy === 'date_asc') {
      arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'date_desc') {
      arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'priority') {
      arr.sort((a, b) =>
        (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
      );
    }
    return arr;
  }, [data, sortBy]);

  // Animate highlight when sort changes
  useEffect(() => {
    if (!dropdownOpen) {
      setSortHighlight(true);
      const timeout = setTimeout(() => setSortHighlight(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [sortBy]);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': 
        return {
          badge: 'bg-red-50 text-red-700 border border-red-200',
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          border: 'border-l-red-500'
        };
      case 'medium': 
        return {
          badge: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
          icon: <Star className="w-4 h-4 text-yellow-500" />,
          border: 'border-l-yellow-500'
        };
      default: 
        return {
          badge: 'bg-gray-50 text-gray-700 border border-gray-200',
          icon: <Bell className="w-4 h-4 text-gray-500" />,
          border: 'border-l-gray-500'
        };
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3e8ff 25%, #e0c3fc 50%, #d4b5f7 75%, #fff 100%)' }}>
      {/* Revolutionary Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.08, 0.15, 0.08], 
            scale: [0.8, 1.2, 0.8], 
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.06, 0.12, 0.06], 
            scale: [0.9, 1.1, 0.9], 
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2,
            times: [0, 0.5, 1]
          }}
          className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#e0c3fc] to-[#a259c6] blur-3xl"
        />

        {/* Secondary ambient orbs */}
        <motion.div
          animate={{ 
            opacity: [0.04, 0.08, 0.04],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 90, 180],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[25%] left-[-20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#e0c3fc] blur-3xl"
        />
        
        <motion.div
          animate={{ 
            opacity: [0.03, 0.07, 0.03],
            scale: [0.7, 1.2, 0.7],
            rotate: [180, 270, 360],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-[15%] right-[-25%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#d4b5f7] blur-3xl"
        />

        {/* Enhanced floating particles with varied sizes and movements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? 'w-3 h-3 bg-white/20' : 
                i % 3 === 1 ? 'w-2 h-2 bg-[#a259c6]/30' : 
                'w-1 h-1 bg-[#4f1b59]/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40 - Math.random() * 20, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.4, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Sophisticated geometric patterns */}
        <div className="absolute inset-0 opacity-8">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-[#a259c6]/30 rounded-full"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [0.9, 1.2, 0.9],
              opacity: [0.04, 0.08, 0.04]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/3 right-1/3 w-32 h-32 border-2 border-[#4f1b59]/25 rounded-full"
          />
          <motion.div 
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.07, 0.03]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 right-1/4 w-24 h-24 border border-[#a259c6]/20 rounded-full"
          />
          
          {/* Additional decorative elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.02, 0.06, 0.02]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute top-3/4 left-1/6 w-28 h-28 border border-[#e0c3fc]/30 rounded-full"
          />
        </div>
                
        {/* Enhanced gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>
      <Header />
      <div className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Latest Updates
            </motion.span>
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-[#2d1b3d] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Announcements
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Stay updated with the latest news, events, and important information from the IET Committee
            </motion.p>
          </motion.div>

          {/* Sorting Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-end mb-8 max-w-4xl mx-auto"
          >
            <div className="relative">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4f1b59] ${sortHighlight ? 'ring-2 ring-[#a259c6]/40' : ''}`}
                onClick={() => setDropdownOpen((open) => !open)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span>Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
                    tabIndex={-1}
                  >
                    {sortOptions.map(opt => (
                      <li
                        key={opt.value}
                        className={`px-4 py-3 cursor-pointer hover:bg-[#f3eafd] transition-colors text-sm ${sortBy === opt.value ? 'bg-[#f8f5fc] font-semibold text-[#4f1b59]' : 'text-gray-700'}`}
                        onClick={() => { setSortBy(opt.value); setDropdownOpen(false); }}
                        role="option"
                        aria-selected={sortBy === opt.value}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {loading && (
            <div className="text-center text-lg text-gray-400 animate-pulse">Loading announcements...</div>
          )}
          {error && (
            <div className="text-center text-red-500">{error}</div>
          )}
          <AnimatePresence>
            {!loading && !error && announcements.length === 0 && (
              <motion.div
                className="text-center text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No announcements found.
              </motion.div>
            )}
            {!loading && !error && announcements.map((announcement: any, idx: number) => {
              const priorityStyles = getPriorityStyles(announcement.priority);
              return (
                <div className="py-6 md:py-8" key={announcement.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ delay: idx * 0.08, duration: 0.5, type: 'spring', stiffness: 120 }}
                  >
                    <motion.div
                      className={`group hover:shadow-2xl transition-all duration-200 cursor-pointer border-l-4 ${priorityStyles.border} bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20`}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.12)' }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            {priorityStyles.icon}
                            <div>
                              <CardTitle className="text-xl font-semibold text-[#333333] group-hover:text-[#4f1b59] transition-colors">
                                {announcement.title}
                              </CardTitle>
                              <div className="flex items-center space-x-4 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {announcement.category || 'General'}
                                </Badge>
                                <span className="text-xs text-gray-500">{announcement.readTime || ''}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${priorityStyles.badge} font-medium text-xs`}>
                            {announcement.priority?.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {announcement.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(announcement.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span className="font-medium text-[#4f1b59]">{announcement.author || 'IET Committee'}</span>
                            </div>
                          </div>
                          <motion.button
                            className="text-[#a259c6] hover:bg-[#a259c6] hover:text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            Read More
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </motion.button>
                        </div>
                      </CardContent>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
