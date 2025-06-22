import { Users, Calendar, FileText, MessageSquare, Settings, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know our amazing committee members.',
      href: '/team',
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500'
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Discover exciting events and workshops.',
      href: '/events',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Newsletter Archive',
      description: 'Read our latest newsletters and updates.',
      href: '/newsletter',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      icon: MessageSquare,
      title: 'Announcements',
      description: 'Stay updated with the latest announcements.',
      href: '/announcements',
      color: 'bg-gradient-to-br from-orange-500 to-amber-500'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Celebrate our accomplishments and milestones.',
      href: '/achievements',
      color: 'bg-gradient-to-br from-rose-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'Contact Us',
      description: 'Get in touch with our team for any inquiries.',
      href: '/contact',
      color: 'bg-gradient-to-br from-gray-700 to-gray-800'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#333333] dark:text-white">
            Explore LoopIn
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to stay connected and engaged with the IET Committee, all in one place.
          </p>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {actions.map((action, index) => (
            <Link key={index} to={action.href} className="group block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Card className="h-full border border-gray-200/80 dark:border-gray-700/60 bg-white dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.color} text-white shadow-lg mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <action.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#333333] dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                      {action.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="mr-2">Explore</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
