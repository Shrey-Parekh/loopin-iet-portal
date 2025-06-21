
import { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b-2 border-[#4f1b59] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#4f1b59] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-[#333333]">LoopIn</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="/team" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium">
              Team
            </a>
            <a href="/events" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium">
              Events
            </a>
            <a href="/newsletter" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium">
              Newsletter
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button className="bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white">
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-[#333333] hover:text-[#4f1b59] hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium px-4 py-2">
                Home
              </a>
              <a href="/team" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium px-4 py-2">
                Team
              </a>
              <a href="/events" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium px-4 py-2">
                Events
              </a>
              <a href="/newsletter" className="text-[#333333] hover:text-[#4f1b59] transition-colors duration-200 font-medium px-4 py-2">
                Newsletter
              </a>
              <div className="flex flex-col space-y-2 px-4">
                <Button variant="outline" className="border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button className="bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white w-full">
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
