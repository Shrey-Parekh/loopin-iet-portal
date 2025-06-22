import { useState } from 'react';
import { Menu, X, User, LogIn, FileText, Users, Calendar, Settings, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-[#4f1b59] dark:bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">L</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#333333] dark:text-white transition-colors duration-300">
                LoopIn
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">IET Committee</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href} 
                className="relative text-[#333333] dark:text-gray-300 hover:text-[#4f1b59] dark:hover:text-purple-400 transition-all duration-200 font-medium group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4f1b59] dark:bg-purple-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              asChild
              variant="outline" 
              className="border-[#4f1b59] dark:border-purple-400 text-[#4f1b59] dark:text-purple-400 hover:bg-[#4f1b59] dark:hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button 
              asChild
              className="bg-[#4f1b59] dark:bg-purple-600 hover:bg-[#3d1445] dark:hover:bg-purple-700 text-white transition-all duration-200"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-[#333333] dark:text-gray-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 py-4 rounded-b-lg shadow-lg">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className="transition-colors duration-200 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center text-[#333333] dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-center mb-2">
                  <ThemeToggle />
                </div>
                <Button asChild variant="outline" className="border-[#4f1b59] text-[#4f1b59] w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-[#4f1b59] hover:bg-[#3d1445] text-white w-full">
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
