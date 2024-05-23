import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [competitorName, setCompetitorName] = useState('');
  const [createdBy, setCreatedBy] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/event-admin/get-events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchCompetitors = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:3000/event-admin/get-competitors/${eventId}`);
      setCompetitors(response.data);
      setEventId(eventId); 
    } catch (error) {
      console.error('Error fetching competitors:', error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/event-admin/create-event', { name, date, location, created_by: createdBy });
      alert('Event created successfully');
      setName('');
      setDate('');
      setLocation('');
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/event-admin/delete-event/${id}`);
      alert('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  const handleAddCompetitor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/event-admin/add-competitor', { name: competitorName, event_id: eventId });
      alert('Competitor added successfully');
      setCompetitorName('');
      fetchCompetitors(eventId);
    } catch (error) {
      console.error('Error adding competitor:', error);
      alert('Error adding competitor');
    }
  };

  const handleDeleteCompetitor = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/event-admin/delete-competitor/${id}`);
      alert('Competitor deleted successfully');
      fetchCompetitors(eventId);
    } catch (error) {
      console.error('Error deleting competitor:', error);
      alert('Error deleting competitor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Events</h2>
      <form onSubmit={handleCreateEvent} className="mb-4">
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Location:</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Event</button>
      </form>

      <h3>Existing Events</h3>
      {events.length === 0 ? (
        <p>No events available. Please create an event.</p>
      ) : (
        <ul className="list-group">
          {events.map((event) => (
            <li
              key={event.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${eventId === event.id ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => fetchCompetitors(event.id)}
            >
              {event.name}
              <button className="btn btn-danger" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {eventId ? (
        <>
          <h3>Manage Competitors</h3>
          <form onSubmit={handleAddCompetitor} className="mb-4">
            <div className="form-group">
              <label>Competitor Name:</label>
              <input
                type="text"
                className="form-control"
                value={competitorName}
                onChange={(e) => setCompetitorName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Add Competitor</button>
          </form>

          <h3>Existing Competitors</h3>
          <ul className="list-group">
            {competitors.map((competitor) => (
              <li key={competitor.id} className="list-group-item d-flex justify-content-between align-items-center">
                {competitor.name}
                <button className="btn btn-danger" onClick={() => handleDeleteCompetitor(competitor.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4">Please select an event to manage competitors.</p>
      )}
    </div>
  );
};

export default EventManagement;

