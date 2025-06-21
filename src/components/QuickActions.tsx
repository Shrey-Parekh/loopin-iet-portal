
import { Users, Calendar, FileText, MessageSquare, Settings, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know our amazing committee members',
      color: 'bg-blue-500',
      href: '/team'
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Discover exciting events and workshops',
      color: 'bg-green-500',
      href: '/events'
    },
    {
      icon: FileText,
      title: 'Newsletter Archive',
      description: 'Read our latest newsletters and updates',
      color: 'bg-purple-500',
      href: '/newsletter'
    },
    {
      icon: MessageSquare,
      title: 'Join Discussions',
      description: 'Participate in community conversations',
      color: 'bg-orange-500',
      href: '/discussions'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Celebrate our accomplishments',
      color: 'bg-yellow-500',
      href: '/achievements'
    },
    {
      icon: Settings,
      title: 'Committee Info',
      description: 'Learn about our mission and values',
      color: 'bg-gray-500',
      href: '/about'
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#333333] mb-4">Quick Actions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need to stay connected with the IET Committee
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-[#4f1b59]/20 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#333333] mb-2 group-hover:text-[#4f1b59] transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
