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
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <QuickActions />
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
  );
};

export default Index;
