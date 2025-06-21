
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Tech Symposium',
      date: '2024-07-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      attendees: 150,
      description: 'A day filled with inspiring talks from industry leaders and innovative workshops.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Coding Bootcamp',
      date: '2024-07-22',
      time: '2:00 PM',
      location: 'Computer Lab',
      attendees: 30,
      description: 'Intensive coding session for beginners to intermediate programmers.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Innovation Challenge',
      date: '2024-08-05',
      time: '9:00 AM',
      location: 'Innovation Hub',
      attendees: 75,
      description: 'Present your innovative ideas and compete for exciting prizes.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#333333] mb-4">Upcoming Events</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't miss out on these exciting opportunities to learn, network, and grow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
            <div className="relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <div className="flex items-center space-x-1 text-sm text-[#4f1b59] font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-[#333333] mb-3 group-hover:text-[#4f1b59] transition-colors duration-200">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attendees expected</span>
                </div>
              </div>
              
              <Button className="w-full bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white group-hover:bg-[#333333] transition-colors duration-300">
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" className="border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white">
          View All Events
        </Button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
