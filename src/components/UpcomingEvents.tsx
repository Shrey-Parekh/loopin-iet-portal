import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUpcomingEvents } from '@/hooks/useApi';
import { Skeleton } from '@/components/ui/skeleton';

const UpcomingEvents = () => {
  const { data: events, loading, error } = useUpcomingEvents();

  if (loading) {
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
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden bg-white dark:bg-gray-800/80">
                <Skeleton className="w-full h-56" />
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full mb-6" />
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error loading events: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500">No upcoming events found.</p>
          </div>
        </div>
      </section>
    );
  }

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
          {events.map((event: any) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/60 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'} 
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
                </div>
                
                <Button asChild className="w-full font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform group-hover:scale-105">
                  {event.link ? (
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <button disabled style={{ width: '100%', background: 'rgba(128,128,128,0.2)', color: '#fff', cursor: 'not-allowed' }}>
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
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
