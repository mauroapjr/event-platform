// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const categories = ['Shortboard', 'Longboard'];
// const subCategories = ['Women', 'Men', 'Open', 'Sub12', 'Sub14', 'Sub18', 'Professional', '+40', '+50', '+60'];

// const EventManagement = () => {
//   const [events, setEvents] = useState([]);
//   const [competitors, setCompetitors] = useState([]);
//   const [judges, setJudges] = useState([]);
//   const [eventId, setEventId] = useState(null);
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [location, setLocation] = useState('');
//   const [competitorName, setCompetitorName] = useState('');
//   const [category, setCategory] = useState(categories[0]);
//   const [subCategory, setSubCategory] = useState(subCategories[0]);
//   const [judgeName, setJudgeName] = useState('');
//   const [createdBy, setCreatedBy] = useState(1);
//   const [selectedEventName, setSelectedEventName] = useState('');

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/event-admin/get-events');
//       setEvents(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const fetchCompetitors = async (eventId, eventName) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/event-admin/get-competitors/${eventId}`);
//       setCompetitors(response.data);
//       setEventId(eventId);
//       setSelectedEventName(eventName);
//     } catch (error) {
//       console.error('Error fetching competitors:', error);
//     }
//   };

//   const fetchJudges = async (eventId) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/event-admin/get-judges/${eventId}`);
//       setJudges(response.data);
//     } catch (error) {
//       console.error('Error fetching judges:', error);
//     }
//   };

//   const handleCreateEvent = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/event-admin/create-event', { name, date, location, created_by: createdBy });
//       alert('Event created successfully');
//       setName('');
//       setDate('');
//       setLocation('');
//       fetchEvents();
//     } catch (error) {
//       console.error('Error creating event:', error);
//       alert('Error creating event');
//     }
//   };

//   const handleDeleteEvent = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/event-admin/delete-event/${id}`);
//       alert('Event deleted successfully');
//       fetchEvents();
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Error deleting event');
//     }
//   };

//   const handleAddCompetitor = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/event-admin/add-competitor', { name: competitorName, event_id: eventId, category, sub_category: subCategory });
//       alert('Competitor added successfully');
//       setCompetitorName('');
//       setCategory(categories[0]);
//       setSubCategory(subCategories[0]);
//       fetchCompetitors(eventId, selectedEventName);
//     } catch (error) {
//       console.error('Error adding competitor:', error);
//       alert('Error adding competitor');
//     }
//   };

//   const handleDeleteCompetitor = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/event-admin/delete-competitor/${id}`);
//       alert('Competitor deleted successfully');
//       fetchCompetitors(eventId, selectedEventName);
//     } catch (error) {
//       console.error('Error deleting competitor:', error);
//       alert('Error deleting competitor');
//     }
//   };

//   const handleAddJudge = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/event-admin/add-judge', { name: judgeName, event_id: eventId });
//       alert('Judge added successfully');
//       setJudgeName('');
//       fetchJudges(eventId);
//     } catch (error) {
//       console.error('Error adding judge:', error);
//       alert('Error adding judge');
//     }
//   };

//   const handleDeleteJudge = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/event-admin/delete-judge/${id}`);
//       alert('Judge deleted successfully');
//       fetchJudges(eventId);
//     } catch (error) {
//       console.error('Error deleting judge:', error);
//       alert('Error deleting judge');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Manage Events</h2>
//       <form onSubmit={handleCreateEvent} className="mb-4">
//         <div className="form-group">
//           <label>Event Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label>Date:</label>
//           <input
//             type="date"
//             className="form-control"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label>Location:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">Create Event</button>
//       </form>

//       <h3>Existing Events</h3>
//       {events.length === 0 ? (
//         <p>No events available. Please create an event.</p>
//       ) : (
//         <ul className="list-group">
//           {events.map((event) => (
//             <li
//               key={event.id}
//               className={`list-group-item d-flex justify-content-between align-items-center ${eventId === event.id ? 'active' : ''}`}
//               style={{ cursor: 'pointer' }}
//               onClick={() => {
//                 fetchCompetitors(event.id, event.name);
//                 fetchJudges(event.id);
//               }}
//             >
//               {event.name}
//               <button className="btn btn-danger" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {eventId ? (
//         <>
//           <h3>Manage Competitors for {selectedEventName}</h3>
//           <form onSubmit={handleAddCompetitor} className="mb-4">
//             <div className="form-group">
//               <label>Competitor Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={competitorName}
//                 onChange={(e) => setCompetitorName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Category:</label>
//               <select
//                 className="form-control"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group mt-3">
//               <label>Sub-Category:</label>
//               <select
//                 className="form-control"
//                 value={subCategory}
//                 onChange={(e) => setSubCategory(e.target.value)}
//                 required
//               >
//                 {subCategories.map((subCat) => (
//                   <option key={subCat} value={subCat}>{subCat}</option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary mt-3">Add Competitor</button>
//           </form>

//           <h3>Existing Competitors</h3>
//           <ul className="list-group">
//             {competitors.map((competitor) => (
//               <li key={competitor.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 {competitor.name} (Event: {selectedEventName}, Category: {competitor.category}, Sub-Category: {competitor.sub_category})
//                 <button className="btn btn-danger" onClick={() => handleDeleteCompetitor(competitor.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>

//           <h3>Manage Judges for {selectedEventName}</h3>
//           <form onSubmit={handleAddJudge} className="mb-4">
//             <div className="form-group">
//               <label>Judge Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={judgeName}
//                 onChange={(e) => setJudgeName(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary mt-3">Add Judge</button>
//           </form>

//           <h3>Existing Judges</h3>
//           <ul className="list-group">
//             {judges.map((judge) => (
//               <li key={judge.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 {judge.name} (Event: {selectedEventName})
//                 <button className="btn btn-danger" onClick={() => handleDeleteJudge(judge.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p className="mt-4">Please select an event to manage competitors and judges.</p>
//       )}
//     </div>
//   );
// };

// export default EventManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [judges, setJudges] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [competitorName, setCompetitorName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [boardType, setBoardType] = useState("");
  const [gender, setGender] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [createdBy, setCreatedBy] = useState(1);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [rounds, setRounds] = useState([]);
  const [heats, setHeats] = useState([]);

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

  const fetchCompetitors = async (eventId, eventName) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-competitors/${eventId}`
      );
      setCompetitors(response.data);
      setEventId(eventId);
      setSelectedEventName(eventName);
    } catch (error) {
      console.error("Error fetching competitors:", error);
    }
  };

  const fetchJudges = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-judges/${eventId}`
      );
      setJudges(response.data);
    } catch (error) {
      console.error("Error fetching judges:", error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/event-admin/create-event", {
        name,
        date,
        location,
        created_by: createdBy,
      });
      alert("Event created successfully");
      setName("");
      setDate("");
      setLocation("");
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/event-admin/delete-event/${id}`
      );
      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    }
  };

  const handleAddCompetitor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/event-admin/add-competitor", {
        name: competitorName,
        event_id: eventId,
        category,
        sub_category: subCategory,
        board_type: boardType,
        gender,
        age_category: ageCategory,
      });
      alert("Competitor added successfully");
      setCompetitorName("");
      setCategory("");
      setSubCategory("");
      setBoardType("");
      setGender("");
      setAgeCategory("");
      fetchCompetitors(eventId, selectedEventName);
    } catch (error) {
      console.error("Error adding competitor:", error);
      alert("Error adding competitor");
    }
  };

  const handleDeleteCompetitor = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/event-admin/delete-competitor/${id}`
      );
      alert("Competitor deleted successfully");
      fetchCompetitors(eventId, selectedEventName);
    } catch (error) {
      console.error("Error deleting competitor:", error);
      alert("Error deleting competitor");
    }
  };

  const handleAddJudge = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/event-admin/add-judge", {
        name: judgeName,
        event_id: eventId,
      });
      alert("Judge added successfully");
      setJudgeName("");
      fetchJudges(eventId);
    } catch (error) {
      console.error("Error adding judge:", error);
      alert("Error adding judge");
    }
  };

  const handleDeleteJudge = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/event-admin/delete-judge/${id}`
      );
      alert("Judge deleted successfully");
      fetchJudges(eventId);
    } catch (error) {
      console.error("Error deleting judge:", error);
      alert("Error deleting judge");
    }
  };

  const fetchRounds = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-rounds/${eventId}`
      );
      setRounds(response.data);
    } catch (error) {
      console.error("Error fetching rounds:", error);
    }
  };

  const fetchHeats = async (roundId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-heats/${roundId}`
      );
      setHeats(response.data);
    } catch (error) {
      console.error("Error fetching heats:", error);
    }
  };

  const categories = ["Shortboard", "Longboard"];
  const subCategories = ["Men", "Woman"];
  const ageCategories = [
    "Open",
    "Sub12",
    "Sub14",
    "Sub18",
    "Professional",
    "+40",
    "+50",
    "+60",
  ];

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
        <button type="submit" className="btn btn-primary mt-3">
          Create Event
        </button>
      </form>

      <h3>Existing Events</h3>
      {events.length === 0 ? (
        <p>No events available. Please create an event.</p>
      ) : (
        <ul className="list-group">
          {events.map((event) => (
            <li
              key={event.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                eventId === event.id ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                fetchCompetitors(event.id, event.name);
                fetchJudges(event.id);
              }}
            >
              {event.name}
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {eventId ? (
        <>
          <h3>Manage Competitors for {selectedEventName}</h3>
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
            <div className="form-group mt-3">
              <label>Category:</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Sub Category:</label>
              <select
                className="form-control"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Board Type:</label>
              <select
                className="form-control"
                value={boardType}
                onChange={(e) => setBoardType(e.target.value)}
                required
              >
                <option value="">Select Board Type</option>
                {categories.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Gender:</label>
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                {subCategories.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Age Category:</label>
              <select
                className="form-control"
                value={ageCategory}
                onChange={(e) => setAgeCategory(e.target.value)}
                required
              >
                <option value="">Select Age Category</option>
                {ageCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Competitor
            </button>
          </form>

          <h3>Existing Competitors</h3>
          <ul className="list-group">
            {competitors.map((competitor) => (
              <li
                key={competitor.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {competitor.name} (Event: {selectedEventName}, Category:{" "}
                {competitor.category}, Sub Category: {competitor.sub_category},
                Board Type: {competitor.board_type}, Gender: {competitor.gender}
                , Age Category: {competitor.age_category})
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCompetitor(competitor.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <h3>Manage Judges for {selectedEventName}</h3>
          <form onSubmit={handleAddJudge} className="mb-4">
            <div className="form-group">
              <label>Judge Name:</label>
              <input
                type="text"
                className="form-control"
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Judge
            </button>
          </form>

          <h3>Existing Judges</h3>
          <ul className="list-group">
            {judges.map((judge) => (
              <li
                key={judge.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {judge.name} (Event: {selectedEventName})
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteJudge(judge.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4">
          Please select an event to manage competitors and judges.
        </p>
      )}
    </div>
  );
};

export default EventManagement;
