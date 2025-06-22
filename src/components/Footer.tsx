import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, HelpingHand, Info } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Team', href: '/team' },
    { name: 'Events', href: '/events' },
    { name: 'Announcements', href: '/announcements' },
  ];

  const resourceLinks = [
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];
  
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Email', href: 'mailto:committee@iet.edu', icon: Mail },
  ];

  const FooterLink = ({ href, children }) => (
    <Link to={href} className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
      {children}
    </Link>
  );

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800/60 mt-20">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#333333] dark:text-white">LoopIn</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">IET Committee</p>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Connecting and empowering the next generation of engineers and innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-[#333333] dark:text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg text-[#333333] dark:text-white mb-4">Resources</h3>
            <nav className="flex flex-col space-y-3">
              {resourceLinks.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </nav>
          </div>

          {/* Social and Contact */}
          <div>
            <h3 className="font-bold text-lg text-[#333333] dark:text-white mb-4">Get in Touch</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-600/50 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Have questions? <a href="mailto:committee@iet.edu" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">Contact our team</a>.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} LoopIn IET Committee. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
            Designed & Developed with ❤️ by the IET Tech Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 