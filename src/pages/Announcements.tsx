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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4">
              Latest Updates
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Announcements</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, events, and important information from the IET Committee
            </p>
          </div>

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
                    <Card
                      className={`group hover:shadow-2xl transition-all duration-200 cursor-pointer border-l-4 ${priorityStyles.border} bg-white rounded-2xl`}
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
                          <Button variant="ghost" size="sm" className="text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
                            Read More
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>

          {/* Newsletter subscription */}
          <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <Bell className="w-12 h-12 text-[#4f1b59] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-[#333333]">
              Never Miss an Update
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Subscribe to get notifications about new announcements and important updates
            </p>
            <Button className="bg-[#4f1b59] hover:bg-[#3d1445] text-white px-8 py-3">
              Subscribe to Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
