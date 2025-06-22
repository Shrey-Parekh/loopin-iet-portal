
import { useState } from 'react';
import Header from '../components/Header';
import EventsFilter from '../components/EventsFilter';
import EventsList from '../components/EventsList';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4">
              Events & Workshops
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Upcoming Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
    </div>
  );
};

export default Events;
