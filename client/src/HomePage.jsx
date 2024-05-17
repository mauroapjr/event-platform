import React from "react";
import MainBanner from "./components/MainBanner";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  return (
    <div>
      <MainBanner />
      <EventList />
      <Footer />
    </div>
  );
}
