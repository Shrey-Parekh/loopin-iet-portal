
import { Bell, Clock, ChevronRight, AlertCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RecentAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: 'Tech Workshop: Introduction to AI',
      content: 'Join us for an exciting workshop on Artificial Intelligence basics. Perfect for beginners who want to dive into the world of AI!',
      date: '2024-06-25',
      priority: 'high',
      author: 'Tech Team',
      delay: 'delay-100'
    },
    {
      id: 2,
      title: 'Committee Meeting Minutes Available',
      content: 'The minutes from our last committee meeting are now available in the member portal. Check out all the important decisions made.',
      date: '2024-06-23',
      priority: 'medium',
      author: 'Secretary',
      delay: 'delay-200'
    },
    {
      id: 3,
      title: 'New Member Registration Open',
      content: 'We are now accepting applications for new committee members. Apply before the deadline and join our amazing team!',
      date: '2024-06-20',
      priority: 'high',
      author: 'HR Team',
      delay: 'delay-300'
    }
  ];

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': 
        return {
          badge: 'bg-red-100 text-red-800 border border-red-200',
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          border: 'border-l-red-500'
        };
      case 'medium': 
        return {
          badge: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
          icon: <Star className="w-4 h-4 text-yellow-500" />,
          border: 'border-l-yellow-500'
        };
      default: 
        return {
          badge: 'bg-gray-100 text-gray-800 border border-gray-200',
          icon: <Bell className="w-4 h-4 text-gray-500" />,
          border: 'border-l-gray-500'
        };
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-800">
                Recent <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Announcements</span>
              </h2>
              <p className="text-gray-600 mt-2">Stay updated with our latest news</p>
            </div>
          </div>
          <button className="group flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 hover:scale-105">
            <span>View All</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="space-y-6">
          {announcements.map((announcement) => {
            const priorityStyles = getPriorityStyles(announcement.priority);
            return (
              <Card 
                key={announcement.id} 
                className={`group hover:shadow-xl transition-all duration-500 cursor-pointer border-l-4 ${priorityStyles.border} hover-lift animate-slide-in-left ${announcement.delay} bg-white/90 backdrop-blur-sm overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {priorityStyles.icon}
                      <CardTitle className="text-xl font-bold group-hover:text-orange-600 transition-colors duration-300">
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <Badge className={`${priorityStyles.badge} font-semibold animate-pulse`}>
                      {announcement.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>by</span>
                        <span className="font-semibold text-orange-600">{announcement.author}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-orange-400 group-hover:translate-x-2 group-hover:text-orange-600 transition-all duration-300" />
                  </div>
                </CardContent>
                
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentAnnouncements;
