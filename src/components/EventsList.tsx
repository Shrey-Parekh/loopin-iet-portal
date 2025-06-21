
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EventsListProps {
  selectedCategory: string;
  selectedTimeframe: string;
}

const EventsList = ({ selectedCategory, selectedTimeframe }: EventsListProps) => {
  const events = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      category: 'workshop',
      date: '2024-07-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Tech Lab 1',
      attendees: 25,
      maxAttendees: 30,
      description: 'Hands-on workshop covering machine learning fundamentals, neural networks, and practical AI applications.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
      status: 'upcoming',
      price: 'Free',
      organizer: 'Tech Team'
    },
    {
      id: 2,
      title: 'Industry Leaders Seminar',
      category: 'seminar',
      date: '2024-07-22',
      time: '2:00 PM - 5:00 PM',
      location: 'Main Auditorium',
      attendees: 150,
      maxAttendees: 200,
      description: 'Meet and learn from successful professionals in the tech industry. Featuring CEOs and senior engineers.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
      status: 'upcoming',
      price: 'Free',
      organizer: 'Events Team'
    },
    {
      id: 3,
      title: 'Hackathon 2024',
      category: 'competition',
      date: '2024-08-05',
      time: '9:00 AM - 9:00 PM',
      location: 'Innovation Hub',
      attendees: 45,
      maxAttendees: 60,
      description: '24-hour coding competition with exciting themes and valuable prizes. Team up and innovate!',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      status: 'upcoming',
      price: '$10',
      organizer: 'Competition Committee'
    },
    {
      id: 4,
      title: 'Alumni Networking Night',
      category: 'networking',
      date: '2024-06-15',
      time: '6:00 PM - 9:00 PM',
      location: 'Student Center',
      attendees: 80,
      maxAttendees: 100,
      description: 'Connect with IET alumni working in top tech companies. Great opportunity for career advice and mentoring.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
      status: 'past',
      price: 'Free',
      organizer: 'Alumni Relations'
    },
    {
      id: 5,
      title: 'Welcome Social Mixer',
      category: 'social',
      date: '2024-06-01',
      time: '7:00 PM - 10:00 PM',
      location: 'Rooftop Terrace',
      attendees: 60,
      maxAttendees: 80,
      description: 'Welcome new members with games, food, and fun activities. Get to know your fellow committee members!',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
      status: 'past',
      price: 'Free',
      organizer: 'Social Committee'
    }
  ];

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    const timeframeMatch = selectedTimeframe === 'all' || event.status === selectedTimeframe;
    return categoryMatch && timeframeMatch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      workshop: 'bg-blue-100 text-blue-800',
      seminar: 'bg-green-100 text-green-800',
      competition: 'bg-red-100 text-red-800',
      networking: 'bg-purple-100 text-purple-800',
      social: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No events found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters to see more events.</p>
        </div>
      ) : (
        filteredEvents.map((event) => (
          <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className={getCategoryColor(event.category)}>
                        <Tag className="w-3 h-3 mr-1" />
                        {event.category}
                      </Badge>
                      {event.status === 'past' && (
                        <Badge variant="outline" className="ml-2">Past Event</Badge>
                      )}
                    </div>
                    <span className="text-lg font-bold text-[#4f1b59]">{event.price}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#333333] mb-3 group-hover:text-[#4f1b59] transition-colors duration-200">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} attendees</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Organized by {event.organizer}</span>
                    <Button 
                      className="bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white"
                      disabled={event.status === 'past'}
                    >
                      {event.status === 'past' ? 'Event Ended' : 'Register Now'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventsList;
