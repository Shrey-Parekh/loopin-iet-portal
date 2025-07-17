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

interface EventsListProps {
  selectedCategory: string;
  selectedTimeframe: string;
  deleteMode?: boolean;
  setDeleteMode?: (v: boolean) => void;
}

const EventsList = ({ selectedCategory, selectedTimeframe, deleteMode = false, setDeleteMode }: EventsListProps) => {
  const { data: events, loading, error, mutate } = useEvents();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);

  // Filter events by status and category
  const filteredEvents = Array.isArray(events) ? events.filter((event: any) => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    // We'll filter by computed status below
    return categoryMatch;
  }) : [];

  // Helper to compute event status from date
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
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-red-700 font-semibold">Select events to delete</span>
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
            <Card key={event.id} className={`group overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-100 animate-fade-in-up transition-transform duration-300 hover:scale-[1.04] hover:shadow-purple-300/40 hover:border-purple-400 relative ${deleteMode && checked ? 'ring-2 ring-red-400' : ''}`} style={{ animationDelay: `${i * 60}ms` }}>
              {deleteMode && (
                <div className="absolute top-4 left-4 z-20 bg-white/90 rounded-full p-1 shadow">
                  <Checkbox checked={checked} onCheckedChange={() => handleSelect(event.id)} />
                </div>
              )}
              <div className="relative overflow-hidden">
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
              <CardContent className="p-6">
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
                  <Button className="w-full font-bold bg-gradient-to-r from-purple-600 to-[#4f1b59] hover:from-[#4f1b59] hover:to-purple-600 text-white transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg" asChild>
                    <a href="#" tabIndex={-1} aria-disabled>
                      {status === 'Completed' ? 'Event Ended' : 'Register Now'}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
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
