
import { useState } from 'react';
import Header from '../components/Header';
import EventsFilter from '../components/EventsFilter';
import EventsList from '../components/EventsList';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover workshops, seminars, and networking opportunities designed to enhance your skills and connect with fellow innovators
          </p>
        </div>
        
        <EventsFilter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />
        
        <EventsList 
          selectedCategory={selectedCategory}
          selectedTimeframe={selectedTimeframe}
        />
      </div>
    </div>
  );
};

export default Events;
