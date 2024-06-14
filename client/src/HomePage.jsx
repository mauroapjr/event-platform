import React, { useState, useEffect } from "react";
import axios from "axios";
import MainBanner from "./components/MainBanner";
import EventsList from "./components/EventList";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/event-admin/get-events"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <MainBanner />
      <EventsList
        events={events}
        fetchCompetitors={() => {}}
        fetchJudges={() => {}}
        handleDeleteEvent={() => {}}
      />
      <Footer />
    </div>
  );
}
