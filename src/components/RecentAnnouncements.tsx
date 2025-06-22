
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
      author: 'Tech Team'
    },
    {
      id: 2,
      title: 'Committee Meeting Minutes Available',
      content: 'The minutes from our last committee meeting are now available in the member portal. Check out all the important decisions made.',
      date: '2024-06-23',
      priority: 'medium',
      author: 'Secretary'
    },
    {
      id: 3,
      title: 'New Member Registration Open',
      content: 'We are now accepting applications for new committee members. Apply before the deadline and join our amazing team!',
      date: '2024-06-20',
      priority: 'high',
      author: 'HR Team'
    }
  ];

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': 
        return {
          badge: 'bg-red-50 text-red-700 border border-red-200',
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          border: 'border-l-red-500'
        };
      case 'medium': 
        return {
          badge: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
          icon: <Star className="w-4 h-4 text-yellow-500" />,
          border: 'border-l-yellow-500'
        };
      default: 
        return {
          badge: 'bg-gray-50 text-gray-700 border border-gray-200',
          icon: <Bell className="w-4 h-4 text-gray-500" />,
          border: 'border-l-gray-500'
        };
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--secondary-color)' }}>
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-color)' }}>
                Recent Announcements
              </h2>
              <p className="text-gray-600 mt-1">Stay updated with our latest news</p>
            </div>
          </div>
          <button className="group flex items-center space-x-2 font-medium transition-colors duration-200" style={{ color: 'var(--secondary-color)' }}>
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => {
            const priorityStyles = getPriorityStyles(announcement.priority);
            return (
              <Card 
                key={announcement.id} 
                className={`group hover:shadow-md transition-all duration-300 cursor-pointer border-l-4 ${priorityStyles.border} bg-white`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {priorityStyles.icon}
                      <CardTitle className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <Badge className={`${priorityStyles.badge} font-medium text-xs`}>
                      {announcement.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>by</span>
                        <span className="font-medium" style={{ color: 'var(--secondary-color)' }}>{announcement.author}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" style={{ color: 'var(--secondary-color)' }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentAnnouncements;
