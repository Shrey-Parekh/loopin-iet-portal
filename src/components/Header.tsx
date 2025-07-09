import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, User, LogIn, FileText, Users, Calendar, Settings, MessageSquare, Phone, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    // Check login state from localStorage
    setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for login/logout changes across tabs
  useEffect(() => {
    const syncLogin = () => setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
    window.addEventListener('storage', syncLogin);
    return () => window.removeEventListener('storage', syncLogin);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Newsletter', href: '/newsletter', icon: FileText },
    { name: 'Announcements', href: '/announcements', icon: MessageSquare },
    { name: 'Contact', href: '/contact', icon: Phone }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300 font-['Comic Relief',cursive] font-bold",
      isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl border-b-2 border-purple-200/40 dark:border-purple-900/40" : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md shadow border-b border-gray-200/80 dark:border-gray-800/80"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#333333] dark:text-white">LoopIn</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">IET Committee</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href} 
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors duration-200 relative overflow-hidden group",
                  location.pathname === item.href
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute left-4 right-4 bottom-1 h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full opacity-70" />
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <Avatar className="cursor-pointer border-2 border-purple-500 shadow-sm">
                  <motion.div
                    whileHover={{ scale: 1.13, rotate: 8 }}
                    whileTap={{ scale: 0.97, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <User className="w-7 h-7 text-purple-600" />
                  </motion.div>
                </Avatar>
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-auto">
                  <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-purple-50">Profile</Link>
                  <button
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                    onClick={() => { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('userId'); setIsLoggedIn(false); }}
                  >Logout</button>
                </div>
              </div>
            ) : (
            <Button 
              asChild
              variant="outline" 
                className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-200 shadow-sm"
            >
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden w-80",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col space-y-2 pb-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center relative group overflow-hidden",
                  location.pathname === item.href
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="relative z-10">{item.name}</span>
                <span className="absolute left-4 right-4 bottom-2 h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full opacity-70" />
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 flex flex-col space-y-3">
              {isLoggedIn ? (
                <div className="relative group">
                  <Avatar className="cursor-pointer border-2 border-purple-500 shadow-sm mx-auto" onClick={() => setShowProfileModal(true)}>
                    <motion.div
                      whileHover={{ scale: 1.13, rotate: 8 }}
                      whileTap={{ scale: 0.97, rotate: -8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <User className="w-7 h-7 text-purple-600" />
                    </motion.div>
                  </Avatar>
                  {/* Change the dropdown div to be absolutely positioned, centered horizontally, and with a higher z-index. */}
                  {showProfileModal && (
                    <>
                      <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowProfileModal(false)} />
                      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 p-6 flex flex-col items-center">
                        <Link to="/profile" className="block w-full px-4 py-4 text-gray-700 hover:bg-purple-50 rounded-lg text-base font-semibold text-center mb-2" onClick={() => setShowProfileModal(false)}>Profile</Link>
                        <button
                          className="w-full text-center px-4 py-4 text-red-600 hover:bg-red-50 rounded-lg text-base font-semibold"
                          onClick={() => { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('userId'); setIsLoggedIn(false); setShowProfileModal(false); }}
                        >Logout</button>
                        <button className="mt-4 text-xs text-gray-400 hover:text-gray-700" onClick={() => setShowProfileModal(false)}>Close</button>
                      </div>
                    </>
                  )}
              </div>
              ) : (
                <Button asChild variant="outline" className="w-full text-purple-600 border-purple-500 shadow-sm">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
