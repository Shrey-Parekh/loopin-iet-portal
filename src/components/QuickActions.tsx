
import { Users, Calendar, FileText, MessageSquare, Settings, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know our amazing committee members',
      href: '/team',
      color: 'bg-[#4f1b59]'
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Discover exciting events and workshops',
      href: '/events',
      color: 'bg-blue-600'
    },
    {
      icon: FileText,
      title: 'Newsletter Archive',
      description: 'Read our latest newsletters and updates',
      href: '/newsletter',
      color: 'bg-green-600'
    },
    {
      icon: MessageSquare,
      title: 'Announcements',
      description: 'Stay updated with latest announcements',
      href: '/announcements',
      color: 'bg-orange-600'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Celebrate our accomplishments',
      href: '/achievements',
      color: 'bg-purple-600'
    },
    {
      icon: Settings,
      title: 'Contact Us',
      description: 'Get in touch with our team',
      href: '/contact',
      color: 'bg-gray-700'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#333333]">
            Quick Actions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay connected with the IET Committee
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {actions.map((action, index) => (
            <Link key={index} to={action.href} className="group">
              <Card className="h-full border border-gray-200 hover:border-[#4f1b59] hover:shadow-lg transition-all duration-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-[#333333] group-hover:text-[#4f1b59] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {action.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-[#4f1b59] group-hover:translate-x-1 transition-transform">
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
