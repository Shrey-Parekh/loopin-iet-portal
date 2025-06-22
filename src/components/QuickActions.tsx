
import { Users, Calendar, FileText, MessageSquare, Settings, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const QuickActions = () => {
  const sectionRef = useScrollAnimation();
  
  const actions = [
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know our amazing committee members',
      href: '/team',
      color: 'bg-[#4f1b59] dark:bg-purple-600'
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Discover exciting events and workshops',
      href: '/events',
      color: 'bg-blue-600 dark:bg-blue-500'
    },
    {
      icon: FileText,
      title: 'Newsletter Archive',
      description: 'Read our latest newsletters and updates',
      href: '/newsletter',
      color: 'bg-green-600 dark:bg-green-500'
    },
    {
      icon: MessageSquare,
      title: 'Announcements',
      description: 'Stay updated with latest announcements',
      href: '/announcements',
      color: 'bg-orange-600 dark:bg-orange-500'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Celebrate our accomplishments',
      href: '/achievements',
      color: 'bg-purple-600 dark:bg-purple-500'
    },
    {
      icon: Settings,
      title: 'Contact Us',
      description: 'Get in touch with our team',
      href: '/contact',
      color: 'bg-gray-700 dark:bg-gray-600'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#333333] dark:text-white transition-colors duration-300">
            Quick Actions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Everything you need to stay connected with the IET Committee
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {actions.map((action, index) => (
            <Link key={index} to={action.href} className="group">
              <Card className="h-full border border-gray-200 dark:border-gray-700 hover:border-[#4f1b59] dark:hover:border-purple-400 hover:shadow-lg dark:hover:shadow-purple-500/10 transition-all duration-300 bg-white dark:bg-gray-800 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color} transition-transform duration-300 group-hover:scale-110`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-[#333333] dark:text-white group-hover:text-[#4f1b59] dark:group-hover:text-purple-400 transition-colors duration-300">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                        {action.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-[#4f1b59] dark:text-purple-400 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="mr-2">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
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
