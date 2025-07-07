import { Home, ArrowLeft, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6ff] via-[#f3e8ff] to-[#e0c3fc] relative overflow-hidden">
      {/* Animated blurred background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.13, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#a259c6] to-[#4f1b59] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.09, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#4f1b59] to-[#a259c6] blur-3xl"
        />
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
