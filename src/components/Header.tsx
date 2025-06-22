import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, User, LogIn, FileText, Users, Calendar, Settings, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '/', icon: Settings },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Newsletter', href: '/newsletter', icon: FileText },
    { name: 'Announcements', href: '/announcements', icon: MessageSquare },
    { name: 'Contact', href: '/contact', icon: Phone }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg" : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md",
      "border-b border-gray-200/80 dark:border-gray-800/80"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
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
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
                  location.pathname === item.href
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-white transition-all duration-200"
            >
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200"
            >
              <Link to="/register">
                <User className="w-4 h-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center",
                    location.pathname === item.href
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 flex flex-col space-y-3">
                <div className="flex justify-between items-center px-4">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Switch Theme</span>
                  <ThemeToggle />
                </div>
                <Button asChild variant="outline" className="w-full text-purple-600 border-purple-500">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full bg-purple-600 text-white">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
