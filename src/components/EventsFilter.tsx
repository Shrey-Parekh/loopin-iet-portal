
import { Button } from '@/components/ui/button';

interface EventsFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
}

const EventsFilter = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedTimeframe, 
  setSelectedTimeframe 
}: EventsFilterProps) => {
  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'seminar', label: 'Seminars' },
    { id: 'competition', label: 'Competitions' },
    { id: 'networking', label: 'Networking' },
    { id: 'social', label: 'Social' }
  ];

  const timeframes = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past Events' },
    { id: 'all', label: 'All Time' }
  ];

  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-xl flex flex-row flex-wrap items-center gap-3 px-4 py-3 shadow-lg border border-white/20 transition-all duration-300 justify-center">
      <span className="text-sm font-semibold text-[#4f1b59] mr-2">Show:</span>
      <div className="flex flex-wrap gap-2">
        {timeframes.map((timeframe) => (
          <Button
            key={timeframe.id}
            variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
            onClick={() => setSelectedTimeframe(timeframe.id)}
            className={selectedTimeframe === timeframe.id 
              ? "bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white font-semibold shadow-md px-5 py-2 rounded-full text-sm transition-all"
              : "border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white font-semibold shadow px-5 py-2 rounded-full text-sm transition-all"}
          >
            {timeframe.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EventsFilter;
