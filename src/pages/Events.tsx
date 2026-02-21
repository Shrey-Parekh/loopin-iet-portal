import { useState, useEffect } from 'react';
import Header from '../components/Header';
import EventsFilter from '../components/EventsFilter';
import EventsList from '../components/EventsList';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Events = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteMode, setDeleteMode] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  // Fetch user profile to check department and role
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoggedIn && userId) {
        try {
          const response = await fetch(`https://loopin-iet-portal-1.onrender.com/api/profile/${userId}`);
          if (response.ok) {
            const profile = await response.json();
            setUserProfile(profile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [isLoggedIn, userId]);

  // Check if user can add events (SMCW department and core role)
  const canAddEvents = isLoggedIn && 
    userRole !== 'executive' && 
    userProfile?.department === 'SMCW' && 
    (userProfile?.member_type === 'core' || userProfile?.member_type === 'super_core');

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

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
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
        </div>
                
        {/* Enhanced gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>
      <Header />
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Section Heading with animation */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span 
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg font-dosis"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Events & Workshops
            </motion.span>
            <motion.h1
              className="text-5xl md:text-6xl font-abril font-extrabold text-[#2d1b3d] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Events & Workshops
            </motion.h1>
            <motion.div className="w-24 h-1 bg-gradient-to-r from-[#4f1b59] to-purple-400 mx-auto mt-2 rounded-full" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ transformOrigin: 'left' }} />
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-dosis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover workshops, seminars, and networking opportunities designed to enhance your skills and connect with fellow innovators
            </motion.p>
          </motion.div>
          {/* Filter Bar and Action Buttons Side by Side with animation */}
          <motion.div
            className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
          >
            <motion.div className="flex-1 w-full" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
              <EventsFilter 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTimeframe={selectedTimeframe}
                setSelectedTimeframe={setSelectedTimeframe}
              />
            </motion.div>
            {canAddEvents && (
              <motion.div className="flex flex-row md:flex-col gap-2 md:gap-3 items-center md:items-end min-w-[140px] w-full md:w-auto" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <button
                  className="w-full px-5 py-2 border border-[#4f1b59] text-[#4f1b59] font-semibold rounded-full shadow bg-white hover:bg-[#4f1b59] hover:text-white transition-all text-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40"
                  onClick={() => navigate('/add-event')}
                >
                  + Add Event
                </button>
                <button
                  className={`w-full px-5 py-2 border font-semibold rounded-full shadow bg-white transition-all text-sm focus:outline-none focus:ring-2 focus:ring-[#a259c6]/40 flex items-center justify-center gap-2 ${deleteMode ? 'border-red-600 text-red-600 bg-red-50 scale-105 ring-2 ring-red-200' : 'border-[#a259c6] text-[#a259c6] hover:bg-red-600 hover:text-white'}`}
                  onClick={() => setDeleteMode(dm => !dm)}
                  style={{ transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)' }}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete Event
                </button>
              </motion.div>
            )}
          </motion.div>
          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <div className="mt-8">
              <EventsList 
                selectedTimeframe={selectedTimeframe}
                selectedCategory={selectedCategory}
                deleteMode={deleteMode}
                setDeleteMode={setDeleteMode}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
