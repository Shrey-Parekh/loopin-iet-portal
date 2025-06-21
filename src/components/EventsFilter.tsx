
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
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#333333] mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white" 
                  : "border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#333333] mb-3">Filter by Time</h3>
          <div className="flex flex-wrap gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.id}
                variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={selectedTimeframe === timeframe.id 
                  ? "bg-[#4f1b59] hover:bg-[#4f1b59]/90 text-white" 
                  : "border-[#4f1b59] text-[#4f1b59] hover:bg-[#4f1b59] hover:text-white"
                }
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsFilter;
