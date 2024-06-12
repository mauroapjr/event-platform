// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Badge } from "react-bootstrap";

// const events = [
//   { name: "FESURFING JUNIOR AIR SHOW 2024", status: "LIVE" },
//   { name: "Maresias Shootout 2024", status: "LIVE" },
//   { name: "2024 Infratores da Divisa Contest", status: "LIVE" },
// ];

// export default function EventList() {
//   const [events, setEvents] = useState([]);

//   useEffect (() => {
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

//   return (
//     <>
//       <Container className="my-5">
//       <Row>
//         {events.map((event) => (
//           <Col key={event.id} sm={12} md={6} lg={4} className="mb-4">
//             <Card>
//               <Card.Body>
//                 <Badge bg="success" className="mb-2">
//                   LIVE
//                 </Badge>
//                 <Card.Title>{event.name}</Card.Title>
//                 <Card.Text>
//                   Date: {new Date(event.date).toLocaleDateString()}
//                   <br />
//                   Location: {event.location}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//     </>
//   );
// }

import React from 'react';


const EventsList = ({ events, fetchCompetitors, fetchJudges, handleDeleteEvent }) => {
  return (
    <div>
      <h3>Existing Events</h3>
      {events.length === 0 ? (
        <p>No events available. Please create an event.</p>
      ) : (
        <ul className="list-group">
          {events.map((event) => (
            <li
              key={event.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                fetchCompetitors(event.id, event.name);
                fetchJudges(event.id);
              }}
            >
              {event.name}
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent click event
                  handleDeleteEvent(event.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsList;