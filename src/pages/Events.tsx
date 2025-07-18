import { useState } from 'react';
import Header from '../components/Header';
import EventsFilter from '../components/EventsFilter';
import EventsList from '../components/EventsList';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Events = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');
  const [deleteMode, setDeleteMode] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }} className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.07, scale: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }} className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.06, scale: 1 }} transition={{ duration: 2.2, delay: 1.1, ease: 'easeOut' }} className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
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
                selectedTimeframe={selectedTimeframe}
                setSelectedTimeframe={setSelectedTimeframe}
              />
            </motion.div>
            {isLoggedIn && (
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
          <div className="mt-8">
            <EventsList 
              selectedTimeframe={selectedTimeframe}
              selectedCategory={"all"}
              deleteMode={deleteMode}
              setDeleteMode={setDeleteMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
