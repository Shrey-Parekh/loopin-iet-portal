
import Header from '../components/Header';
import { Bell, Clock, User, ChevronRight, AlertCircle, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: 'Tech Workshop: Introduction to AI',
      content: 'Join us for an exciting workshop on Artificial Intelligence basics. Perfect for beginners who want to dive into the world of AI! This comprehensive session will cover machine learning fundamentals, neural networks, and practical applications.',
      date: '2024-06-25',
      priority: 'high',
      author: 'Tech Team',
      category: 'Workshop',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Committee Meeting Minutes Available',
      content: 'The minutes from our last committee meeting are now available in the member portal. Check out all the important decisions made regarding upcoming events, budget allocations, and new initiatives.',
      date: '2024-06-23',
      priority: 'medium',
      author: 'Secretary',
      category: 'Meeting',
      readTime: '2 min read'
    },
    {
      id: 3,
      title: 'New Member Registration Open',
      content: 'We are now accepting applications for new committee members. Apply before the deadline and join our amazing team! We are looking for passionate individuals in various roles including technical, marketing, and event management.',
      date: '2024-06-20',
      priority: 'high',
      author: 'HR Team',
      category: 'Registration',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'Annual Tech Symposium 2024',
      content: 'Save the date! Our annual tech symposium is scheduled for July 15th. This year\'s theme focuses on emerging technologies and their impact on society. Registration opens next week.',
      date: '2024-06-18',
      priority: 'medium',
      author: 'Events Team',
      category: 'Event',
      readTime: '2 min read'
    },
    {
      id: 5,
      title: 'Summer Internship Opportunities',
      content: 'Exciting internship opportunities are now available with our partner companies. Applications are open for students interested in gaining real-world experience in technology and engineering fields.',
      date: '2024-06-15',
      priority: 'high',
      author: 'Career Services',
      category: 'Opportunities',
      readTime: '5 min read'
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4">
              Latest Updates
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Announcements</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, events, and important information from the IET Committee
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {announcements.map((announcement) => {
              const priorityStyles = getPriorityStyles(announcement.priority);
              return (
                <Card 
                  key={announcement.id} 
                  className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 ${priorityStyles.border} bg-white`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {priorityStyles.icon}
                        <div>
                          <CardTitle className="text-xl font-semibold text-[#333333] group-hover:text-[#4f1b59] transition-colors">
                            {announcement.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {announcement.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{announcement.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${priorityStyles.badge} font-medium text-xs`}>
                        {announcement.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(announcement.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium text-[#4f1b59]">{announcement.author}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Newsletter subscription */}
          <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <Bell className="w-12 h-12 text-[#4f1b59] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-[#333333]">
              Never Miss an Update
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Subscribe to get notifications about new announcements and important updates
            </p>
            <Button className="bg-[#4f1b59] hover:bg-[#3d1445] text-white px-8 py-3">
              Subscribe to Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
