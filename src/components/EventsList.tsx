import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvents } from '@/hooks/useApi';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import React from 'react';
import { motion } from 'framer-motion';

interface EventsListProps {
  selectedCategory: string;
  selectedTimeframe: string;
  deleteMode?: boolean;
  setDeleteMode?: (v: boolean) => void;
}

const getEventStatus = (dateStr: string) => {
  const eventDate = new Date(dateStr);
  const now = new Date();
  // Remove time for comparison (set to midnight)
  eventDate.setHours(0,0,0,0);
  now.setHours(0,0,0,0);
  if (eventDate > now) return 'Upcoming';
  if (eventDate.getTime() === now.getTime()) return 'Ongoing';
  return 'Completed';
};

const EventsList = ({ selectedCategory, selectedTimeframe, deleteMode = false, setDeleteMode }: EventsListProps) => {
  const { data: events, loading, error, mutate } = useEvents();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);

  // Filter events by status (timeframe) and category
  const filteredEvents = Array.isArray(events) ? events.filter((event: any) => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    const status = getEventStatus(event.date);
    let timeframeMatch = true;
    if (selectedTimeframe === 'upcoming') {
      timeframeMatch = status === 'Upcoming' || status === 'Ongoing';
    } else if (selectedTimeframe === 'past') {
      timeframeMatch = status === 'Completed';
    }
    return categoryMatch && timeframeMatch;
  }) : [];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      workshop: 'bg-blue-100 text-blue-800',
      seminar: 'bg-green-100 text-green-800',
      competition: 'bg-red-100 text-red-800',
      networking: 'bg-purple-100 text-purple-800',
      social: 'bg-yellow-100 text-yellow-800',
      career: 'bg-pink-100 text-pink-800',
      technical: 'bg-indigo-100 text-indigo-800',
      conference: 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
  };
  const handleDelete = async () => {
    for (const id of selected) {
      await fetch(`https://loopin-iet-portal-1.onrender.com/api/events/${id}`, { method: 'DELETE' });
    }
    setSelected([]);
    setShowDialog(false);
    if (setDeleteMode) setDeleteMode(false);
    if (mutate) mutate();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden bg-white/80 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <Skeleton className="w-full h-56" />
            <CardContent className="p-6">
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 animate-fade-in-up text-red-500 flex flex-col items-center gap-2"><span className='text-4xl'>😕</span>Error loading events: {error}</div>;
  }

  if (!filteredEvents.length) {
    return (
      <div className="text-center py-12 animate-fade-in-up flex flex-col items-center gap-2">
        <span className='text-4xl'>🎉</span>
        <p className="text-xl text-gray-500">No events found matching your criteria.</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters to see more events.</p>
      </div>
    );
  }

  return (
    <>
      {deleteMode && (
        <>
          {/* Floating bar for delete actions */}
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="flex items-center justify-between bg-white/95 border border-red-200 shadow-xl rounded-2xl px-6 py-3 gap-4 animate-fade-in-up">
              <span className="text-base font-bold text-red-700">
                {selected.length} event{selected.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="px-5 py-2 rounded-full font-bold"
                  disabled={selected.length === 0}
                  onClick={() => setShowDialog(true)}
                >
                  Delete Selected
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-full"
                  onClick={() => { setSelected([]); if (setDeleteMode) setDeleteMode(false); }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event{selected.length > 1 ? 's' : ''}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the selected event{selected.length > 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Yes, Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event: any, i: number) => {
          const status = getEventStatus(event.date);
          const checked = selected.includes(event.id);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={!deleteMode ? { scale: 1.04, boxShadow: '0 8px 32px 0 rgba(162,89,198,0.18)' } : undefined}
              className="overflow-visible"
            >
              <Card
                className={`group overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border transition-all duration-200 relative
                  ${deleteMode ?
                    checked ? 'border-4 border-red-500 bg-red-100 scale-[1.035] ring-4 ring-red-200' : 'border-2 border-red-200 hover:border-red-400 hover:bg-red-50/40' :
                    'border-purple-100 hover:scale-[1.04] hover:shadow-purple-300/40 hover:border-purple-400'}
                  ${checked && deleteMode ? 'shadow-lg shadow-red-200/60' : ''}
                  animate-fade-in-up`}
                style={{ animationDelay: `${i * 60}ms` }}
                tabIndex={deleteMode ? 0 : -1}
                aria-selected={checked}
                onKeyDown={e => {
                  if (deleteMode && (e.key === ' ' || e.key === 'Enter')) handleSelect(event.id);
                }}
                onClick={deleteMode ? () => handleSelect(event.id) : undefined}
              >
                {deleteMode && (
                  <motion.div
                    className="absolute top-4 left-4 z-20 bg-white/95 rounded-full p-2 shadow-lg transition-all duration-200"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Checkbox checked={checked} onCheckedChange={() => handleSelect(event.id)} className="h-6 w-6 transition-all duration-200" />
                  </motion.div>
                )}
                <div className={`relative overflow-hidden ${deleteMode ? 'opacity-70 pointer-events-none select-none' : ''}`}>
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'}
                    alt={event.title}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getCategoryColor(event.category)}>{status}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold drop-shadow-lg">{event.title}</h3>
                  </div>
                </div>
                <CardContent className={`p-6 ${deleteMode ? 'opacity-60 pointer-events-none select-none' : ''}`}>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{event.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
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
                  {!deleteMode && (
                    (() => {
                      if (status === 'Completed') {
                        return (
                          <Button className="w-full font-bold bg-gradient-to-r from-purple-600 to-[#4f1b59] text-white" disabled>
                            Event Ended
                          </Button>
                        );
                      } else if (event.link) {
                        return (
                          <Button className="w-full font-bold bg-gradient-to-r from-purple-600 to-[#4f1b59] hover:from-[#4f1b59] hover:to-purple-600 text-white transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg" asChild>
                            <a href={event.link} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                              Register Now
                            </a>
                          </Button>
                        );
                      } else {
                        return (
                          <Button className="w-full font-bold bg-gradient-to-r from-purple-600 to-[#4f1b59] text-white" disabled>
                            Register Now
                          </Button>
                        );
                      }
                    })()
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s both; }
        .animate-fade-in-up { animation: fadeInUp 0.8s both; }
        .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: none; } }
      `}</style>
    </>
  );
};

export default EventsList;
