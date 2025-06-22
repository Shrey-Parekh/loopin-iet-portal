
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Tech Symposium',
      date: '2024-07-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      attendees: 150,
      description: 'A day filled with inspiring talks from industry leaders and innovative workshops that will shape the future of technology.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Coding Bootcamp',
      date: '2024-07-22',
      time: '2:00 PM',
      location: 'Computer Lab',
      attendees: 30,
      description: 'Intensive coding session for beginners to intermediate programmers. Learn, practice, and build amazing projects.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Innovation Challenge',
      date: '2024-08-05',
      time: '9:00 AM',
      location: 'Innovation Hub',
      attendees: 75,
      description: 'Present your innovative ideas and compete for exciting prizes. Show the world your creativity and problem-solving skills.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don't miss out on these exciting opportunities to learn, network, and grow with the IET community
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: 'var(--secondary-color)' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1 shadow-sm">
                  <div className="flex items-center space-x-1 text-sm font-medium" style={{ color: 'var(--secondary-color)' }}>
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" style={{ color: 'var(--secondary-color)' }} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" style={{ color: 'var(--secondary-color)' }} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" style={{ color: 'var(--secondary-color)' }} />
                    <span>{event.attendees} attendees expected</span>
                  </div>
                </div>
                
                <Button className="w-full font-medium transition-all duration-200 hover:shadow-md" style={{ background: 'var(--secondary-color)', color: 'white' }}>
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild
            variant="outline" 
            className="border-2 font-medium hover:bg-gray-50 transition-all duration-200"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}
          >
            <Link to="/events">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
