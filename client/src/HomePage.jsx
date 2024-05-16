import React from 'react';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import EventList from './components/EventList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage () {
  return (
    <div>
      <Header />
      <MainBanner />
      <EventList />
    </div>
  );
};

