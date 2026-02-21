import { Home, ArrowLeft, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3e8ff 25%, #e0c3fc 50%, #d4b5f7 75%, #fff 100%)' }}>
      {/* Revolutionary Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.12, 0.18, 0.12], 
            scale: [0.8, 1.2, 0.8], 
            rotate: [0, 180, 360],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            opacity: [0.10, 0.15, 0.10], 
            scale: [0.9, 1.1, 0.9], 
            rotate: [360, 180, 0],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2,
            times: [0, 0.5, 1]
          }}
          className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#e0c3fc] to-[#a259c6] blur-3xl"
        />

        {/* Secondary ambient orbs */}
        <motion.div
          animate={{ 
            opacity: [0.06, 0.12, 0.06],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 90, 180],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[30%] left-[-25%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#e0c3fc] blur-3xl"
        />
        
        <motion.div
          animate={{ 
            opacity: [0.05, 0.10, 0.05],
            scale: [0.7, 1.2, 0.7],
            rotate: [180, 270, 360],
            x: [0, -20, 0],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-[20%] right-[-30%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#d4b5f7] blur-3xl"
        />

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? 'w-2 h-2 bg-white/30' : 
                i % 3 === 1 ? 'w-1.5 h-1.5 bg-[#a259c6]/40' : 
                'w-1 h-1 bg-[#4f1b59]/50'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25 - Math.random() * 10, 0],
                x: [0, (Math.random() - 0.5) * 15, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.3, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-8">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#a259c6]/40 rounded-full"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [0.9, 1.2, 0.9],
              opacity: [0.06, 0.12, 0.06]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-[#4f1b59]/35 rounded-full"
          />
        </div>
                
        {/* Enhanced gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-30 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg mx-auto"
      >
        <motion.div
          className="bg-white/70 dark:bg-[#1a1333]/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-[#a259c6]/20 px-10 py-14 md:py-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 select-none"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1 }}
            transition={{ duration: 1.1, type: 'spring', bounce: 0.5 }}
          >
            404
          </motion.h1>
          <motion.div
            className="flex items-center justify-center space-x-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Frown className="w-8 h-8 text-purple-500 dark:text-purple-400 animate-wiggle" />
            <span className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Page Not Found</span>
          </motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-purple-300/30"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30 dark:hover:text-white px-8 py-3 text-base font-semibold transform transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-purple-300/30"
            >
              <Link to="#" onClick={e => { e.preventDefault(); window.history.back(); }}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
