import { useState } from 'react';
import Header from '../components/Header';
import EventsFilter from '../components/EventsFilter';
import EventsList from '../components/EventsList';

const Events = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl opacity-15" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl opacity-10" />
        <div className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl opacity-10" />
        <div className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      <Header />
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Heading with animation */}
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-[#4f1b59] text-white rounded-full text-sm font-medium mb-4 shadow-md animate-fade-in">
              Events & Workshops
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-4 tracking-tight animate-fade-in-up">
              Events & Workshops
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4f1b59] to-purple-400 mx-auto mt-2 rounded-full animate-underline" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Discover workshops, seminars, and networking opportunities designed to enhance your skills and connect with fellow innovators
            </p>
          </div>
          {/* Filter Bar with glassy effect and animation */}
          <div className="flex w-full justify-center animate-fade-in-up delay-200">
            <div className="w-full max-w-2xl flex justify-center rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-gray-100 px-4 py-3 scale-100 opacity-100 transition-all duration-700">
          <EventsFilter 
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
          />
            </div>
          </div>
          <div className="mt-8">
          <EventsList 
            selectedTimeframe={selectedTimeframe}
              selectedCategory={"all"}
          />
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s both; }
        .animate-fade-in-up { animation: fadeInUp 0.8s both; }
        .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        .animate-underline { animation: underlineGrow 1s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes underlineGrow { from { width: 0; opacity: 0; } to { width: 6rem; opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Events;
