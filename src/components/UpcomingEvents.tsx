
import { Calendar, MapPin, Users, Clock, ArrowRight, Star } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
      delay: 'delay-100'
    },
    {
      id: 2,
      title: 'Coding Bootcamp',
      date: '2024-07-22',
      time: '2:00 PM',
      location: 'Computer Lab',
      attendees: 30,
      description: 'Intensive coding session for beginners to intermediate programmers. Learn, practice, and build amazing projects.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      delay: 'delay-200'
    },
    {
      id: 3,
      title: 'Innovation Challenge',
      date: '2024-08-05',
      time: '9:00 AM',
      location: 'Innovation Hub',
      attendees: 75,
      description: 'Present your innovative ideas and compete for exciting prizes. Show the world your creativity and problem-solving skills.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop',
      delay: 'delay-300'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-black text-gray-800 mb-6">
            Upcoming <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss out on these exciting opportunities to learn, network, and grow with the IET community
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className={`group hover:shadow-2xl transition-all duration-700 overflow-hidden hover-lift animate-bounce-in ${event.delay} bg-white/90 backdrop-blur-sm border-0`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                
                {/* Floating date badge */}
                <div className="absolute top-4 right-4 glass rounded-xl px-4 py-2 animate-float">
                  <div className="flex items-center space-x-2 text-white font-bold">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Popularity indicator */}
                <div className="absolute top-4 left-4 flex items-center space-x-1 glass rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-bold">Hot</span>
                </div>
              </div>
              
              <CardContent className="p-8 relative">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">{event.attendees} attendees expected</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-primary text-white font-bold py-3 hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 group">
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
              
              {/* Animated bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
            </Card>
          ))}
        </div>

        <div className="text-center animate-bounce-in delay-600">
          <Button 
            asChild
            variant="outline" 
            className="border-3 border-orange-400 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <Link to="/events">
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
