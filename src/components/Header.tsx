
import { useState } from 'react';
import { Menu, X, User, LogIn, FileText, Users, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/98 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-lg">L</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800">
                LoopIn
              </span>
              <span className="text-xs text-gray-500 font-medium">IET Committee</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-gray-700 hover:text-purple-700 transition-all duration-300 font-medium group py-2"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/team" 
              className="relative text-gray-700 hover:text-purple-700 transition-all duration-300 font-medium group py-2"
            >
              Team
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/events" 
              className="relative text-gray-700 hover:text-purple-700 transition-all duration-300 font-medium group py-2"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/newsletter" 
              className="relative text-gray-700 hover:text-purple-700 transition-all duration-300 font-medium group py-2"
            >
              Newsletter
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              asChild
              variant="outline" 
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300 transition-all duration-300"
            >
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button 
              asChild
              className="gradient-primary text-white hover:opacity-90 transition-all duration-300 border-0"
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
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-purple-700 hover:bg-gray-100 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-200 py-4 animate-fade-in rounded-b-lg shadow-lg">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-purple-700 transition-colors duration-300 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-4 h-4 mr-3" />
                Home
              </Link>
              <Link 
                to="/team" 
                className="text-gray-700 hover:text-purple-700 transition-colors duration-300 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-4 h-4 mr-3" />
                Team
              </Link>
              <Link 
                to="/events" 
                className="text-gray-700 hover:text-purple-700 transition-colors duration-300 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="w-4 h-4 mr-3" />
                Events
              </Link>
              <Link 
                to="/newsletter" 
                className="text-gray-700 hover:text-purple-700 transition-colors duration-300 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="w-4 h-4 mr-3" />
                Newsletter
              </Link>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                <Button asChild variant="outline" className="border border-gray-300 text-gray-700 hover:bg-gray-50 w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="gradient-primary text-white w-full">
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
