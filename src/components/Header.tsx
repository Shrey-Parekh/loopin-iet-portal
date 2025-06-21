
import { useState } from 'react';
import { Menu, X, User, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-white animate-float" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                LoopIn
              </span>
              <span className="text-xs text-gray-500 font-medium">IET Committee</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/team" 
              className="relative text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold group"
            >
              Team
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/events" 
              className="relative text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold group"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/newsletter" 
              className="relative text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold group"
            >
              Newsletter
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button className="gradient-primary text-white hover:scale-105 transition-all duration-300 hover:shadow-xl border-0">
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 hover:scale-110"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-orange-200 py-6 animate-fade-in rounded-b-2xl shadow-xl">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-semibold px-4 py-3 rounded-xl hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/team" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-semibold px-4 py-3 rounded-xl hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                to="/events" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-semibold px-4 py-3 rounded-xl hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/newsletter" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-semibold px-4 py-3 rounded-xl hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Newsletter
              </Link>
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-orange-200">
                <Button variant="outline" className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button className="gradient-primary text-white w-full">
                  <User className="w-4 h-4 mr-2" />
                  Sign Up
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
