
import { Bell, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RecentAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: 'Tech Workshop: Introduction to AI',
      content: 'Join us for an exciting workshop on Artificial Intelligence basics. Perfect for beginners!',
      date: '2024-06-25',
      priority: 'high',
      author: 'Tech Team'
    },
    {
      id: 2,
      title: 'Committee Meeting Minutes Available',
      content: 'The minutes from our last committee meeting are now available in the member portal.',
      date: '2024-06-23',
      priority: 'medium',
      author: 'Secretary'
    },
    {
      id: 3,
      title: 'New Member Registration Open',
      content: 'We are now accepting applications for new committee members. Apply before the deadline!',
      date: '2024-06-20',
      priority: 'high',
      author: 'HR Team'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-[#4f1b59]" />
          <h2 className="text-3xl font-bold text-[#333333]">Recent Announcements</h2>
        </div>
        <button className="text-[#4f1b59] hover:text-[#4f1b59]/80 font-medium flex items-center space-x-1 transition-colors duration-200">
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="group hover:shadow-md transition-all duration-300 cursor-pointer border-l-4 border-l-[#4f1b59]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg group-hover:text-[#4f1b59] transition-colors duration-200">
                  {announcement.title}
                </CardTitle>
                <Badge className={getPriorityColor(announcement.priority)}>
                  {announcement.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4">
                {announcement.content}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                  <span>by {announcement.author}</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecentAnnouncements;
