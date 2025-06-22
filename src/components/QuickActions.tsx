
import { Users, Calendar, FileText, MessageSquare, Settings, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know our amazing committee members',
      href: '/team'
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Discover exciting events and workshops',
      href: '/events'
    },
    {
      icon: FileText,
      title: 'Newsletter Archive',
      description: 'Read our latest newsletters and updates',
      href: '/newsletter'
    },
    {
      icon: MessageSquare,
      title: 'Join Discussions',
      description: 'Participate in community conversations',
      href: '/discussions'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Celebrate our accomplishments',
      href: '/achievements'
    },
    {
      icon: Settings,
      title: 'Committee Info',
      description: 'Learn about our mission and values',
      href: '/about'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
            Quick Actions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay connected with the IET Committee
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: 'var(--secondary-color)' }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200" style={{ background: 'var(--secondary-color)' }}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {action.description}
                      </p>
                      <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-200" style={{ color: 'var(--secondary-color)' }}>
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
