import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import RecentAnnouncements from '../components/RecentAnnouncements';
import UpcomingEvents from '../components/UpcomingEvents';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const quickActionsRef = useScrollAnimation<HTMLDivElement>(0.15, 'animate-fade-in-up');
  const announcementsRef = useScrollAnimation<HTMLDivElement>(0.15, 'animate-fade-in-up-late');
  const eventsRef = useScrollAnimation<HTMLDivElement>(0.15, 'animate-fade-in-up-latest');

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f8f6ff 0%, #f3e8ff 25%, #e0c3fc 50%, #d4b5f7 75%, #fff 100%)' }}>
      {/* Revolutionary Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs with enhanced animations */}
        <div
          className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl opacity-10"
          style={{
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#e0c3fc] to-[#a259c6] blur-3xl opacity-8"
          style={{
            animation: 'float 25s ease-in-out infinite reverse'
          }}
        />

        {/* Secondary ambient orbs */}
        <div
          className="absolute top-[25%] left-[-20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#e0c3fc] blur-3xl opacity-6"
          style={{
            animation: 'float 18s ease-in-out infinite 1s'
          }}
        />
        
        <div
          className="absolute bottom-[15%] right-[-25%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#d4b5f7] blur-3xl opacity-5"
          style={{
            animation: 'float 22s ease-in-out infinite 3s reverse'
          }}
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <div ref={quickActionsRef}>
            <QuickActions />
          </div>
          <div ref={announcementsRef}>
            <RecentAnnouncements />
          </div>
          <div ref={eventsRef}>
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
