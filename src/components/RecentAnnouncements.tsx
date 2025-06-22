import { Bell, Clock, ChevronRight, AlertCircle, Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
          badge: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          border: 'border-l-4 border-red-500'
        };
      case 'medium': 
        return {
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
          icon: <Star className="w-5 h-5 text-yellow-500" />,
          border: 'border-l-4 border-yellow-500'
        };
      default: 
        return {
          badge: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
          icon: <Bell className="w-5 h-5 text-blue-500" />,
          border: 'border-l-4 border-blue-500'
        };
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#333333] dark:text-white">
            Recent Announcements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay in the loop with the latest news, updates, and opportunities from the IET Committee.
          </p>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {announcements.map((announcement) => {
            const priorityStyles = getPriorityStyles(announcement.priority);
            return (
              <Card 
                key={announcement.id} 
                className={`group transition-all duration-300 cursor-pointer ${priorityStyles.border} bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-transparent hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xl transform hover:-translate-y-1`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {priorityStyles.icon}
                      <CardTitle className="text-xl font-bold text-[#333333] dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <Badge className={`${priorityStyles.badge} font-semibold text-xs uppercase tracking-wider`}>
                      {announcement.priority}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{announcement.author}</span>
                      </div>
                    </div>
                    <Button variant="link" asChild className="text-purple-600 dark:text-purple-400 group-hover:underline">
                      <Link to="/announcements">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </Button>
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
