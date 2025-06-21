
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import RecentAnnouncements from '../components/RecentAnnouncements';
import UpcomingEvents from '../components/UpcomingEvents';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <QuickActions />
        <RecentAnnouncements />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Index;
