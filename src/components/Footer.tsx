import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Team', href: '/team' },
  { name: 'Events', href: '/events' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'Announcements', href: '/announcements' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'Email', href: 'mailto:committee@iet.edu', icon: Mail },
];

const Footer = () => {
  return (
    <footer className="bg-[#f9f9fb] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-10 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-[#4f1b59] dark:bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#333333] dark:text-white">LoopIn</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">IET Committee</span>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-600 dark:text-gray-300 hover:text-[#4f1b59] dark:hover:text-purple-400 font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {/* Social Icons */}
        <div className="flex space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#4f1b59] dark:hover:bg-purple-600 hover:text-white text-gray-600 dark:text-gray-300 transition-colors duration-200"
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} LoopIn IET Committee. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 