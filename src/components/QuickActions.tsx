
import { Users, Calendar, FileText, MessageSquare, Settings, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know our amazing committee members',
      color: 'gradient-primary',
      href: '/team',
      delay: 'delay-100'
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Discover exciting events and workshops',
      color: 'gradient-secondary',
      href: '/events',
      delay: 'delay-200'
    },
    {
      icon: FileText,
      title: 'Newsletter Archive',
      description: 'Read our latest newsletters and updates',
      color: 'gradient-primary',
      href: '/newsletter',
      delay: 'delay-300'
    },
    {
      icon: MessageSquare,
      title: 'Join Discussions',
      description: 'Participate in community conversations',
      color: 'gradient-secondary',
      href: '/discussions',
      delay: 'delay-400'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Celebrate our accomplishments',
      color: 'gradient-primary',
      href: '/achievements',
      delay: 'delay-500'
    },
    {
      icon: Settings,
      title: 'Committee Info',
      description: 'Learn about our mission and values',
      color: 'gradient-secondary',
      href: '/about',
      delay: 'delay-600'
    }
  ];

  return (
    <section className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-black mb-6" style={{ color: 'var(--text-color)' }}>
            Quick <span className="gradient-text">Actions</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-medium" style={{ color: 'var(--text-color)' }}>
            Everything you need to stay connected with the IET Committee
          </p>
          <div className="w-24 h-1 rounded-full mx-auto mt-6" style={{ background: `linear-gradient(135deg, var(--secondary-color) 0%, #6a2c70 100%)` }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card 
                className={`group hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-200 overflow-hidden hover-lift animate-bounce-in ${action.delay} glass`}
              >
                <CardContent className="p-8 relative">
                  <div className="relative z-10">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-purple-700 transition-colors duration-300" style={{ color: 'var(--text-color)' }}>
                          {action.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {action.description}
                        </p>
                        <div className="flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300" style={{ color: 'var(--secondary-color)' }}>
                          <span className="mr-2">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: `linear-gradient(135deg, var(--secondary-color) 0%, #6a2c70 100%)` }}></div>
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
