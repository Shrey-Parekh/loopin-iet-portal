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
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      category: 'Symposium'
    },
    {
      id: 2,
      title: 'Coding Bootcamp',
      date: '2024-07-22',
      time: '2:00 PM',
      location: 'Computer Lab',
      attendees: 30,
      description: 'Intensive coding session for beginners to intermediate programmers. Learn, practice, and build amazing projects.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop',
      category: 'Workshop'
    },
    {
      id: 3,
      title: 'Innovation Challenge',
      date: '2024-08-05',
      time: '9:00 AM',
      location: 'Innovation Hub',
      attendees: 75,
      description: 'Present your innovative ideas and compete for exciting prizes. Show the world your creativity and problem-solving skills.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop',
      category: 'Competition'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#333333] dark:text-white">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't miss out on these exciting opportunities to learn, network, and grow with the IET community.
          </p>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/60 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">{event.category}</div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{event.title}</h3>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                
                <Button asChild className="w-full font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform group-hover:scale-105">
                  <Link to="/events">
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild
            variant="outline"
            className="font-semibold border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-400 dark:hover:text-white transition-all duration-300 px-8 py-3"
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
