// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import EventsList from "./EventList";
// import CompetitorsList from "./CompetitorList";
// import AddCompetitorForm from "./AddCompetitorForm";
// import JudgesList from "./JudgesList";
// import AddJudgeForm from "./AddJudgeForm";
// import GeneratePDFButton from "./GeneratePDFButton";
// import RoundsDisplay from "./RoundsDisplay";

// const categories = ["Shortboard", "Longboard"];
// const subCategories = ["Men", "Women"];
// const ageCategories = [
//   "Open",
//   "Sub12",
//   "Sub14",
//   "Sub18",
//   "Professional",
//   "+40",
//   "+45",
//   "+50",
//   "+60",
//   "+65",
//   "+70",
// ];

// const EventManagement = () => {
//   const [events, setEvents] = useState([]);
//   const [competitors, setCompetitors] = useState([]);
//   const [judges, setJudges] = useState([]);
//   const [rounds, setRounds] = useState([]);
//   const [eventId, setEventId] = useState(null);
//   const [name, setName] = useState("");
//   const [date, setDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedEventName, setSelectedEventName] = useState("");
//   const [showRounds, setShowRounds] = useState(false);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/event-admin/get-events"
//       );
//       setEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const fetchCompetitors = async (eventId, eventName) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/event-admin/get-competitors/${eventId}`
//       );
//       setCompetitors(response.data);
//       setEventId(eventId);
//       setSelectedEventName(eventName);
//     } catch (error) {
//       console.error("Error fetching competitors:", error);
//     }
//   };

//   const fetchJudges = async (eventId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/event-admin/get-judges/${eventId}`
//       );
//       setJudges(response.data);
//     } catch (error) {
//       console.error("Error fetching judges:", error);
//     }
//   };

//   const handleCreateEvent = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:3000/event-admin/create-event", {
//         name,
//         date,
//         location,
//       });
//       alert("Event created successfully");
//       setName("");
//       setDate("");
//       setLocation("");
//       fetchEvents();
//     } catch (error) {
//       console.error("Error creating event:", error);
//       alert("Error creating event");
//     }
//   };

//   const handleDeleteEvent = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/event-admin/delete-event/${id}`
//       );
//       alert("Event deleted successfully");
//       fetchEvents();
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       alert("Error deleting event");
//     }
//   };

//   const handleDeleteCompetitor = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/event-admin/delete-competitor/${id}`
//       );
//       alert("Competitor deleted successfully");
//       fetchCompetitors(eventId, selectedEventName);
//     } catch (error) {
//       console.error("Error deleting competitor:", error);
//       alert("Error deleting competitor");
//     }
//   };

//   const handleDeleteJudge = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/event-admin/delete-judge/${id}`
//       );
//       alert("Judge deleted successfully");
//       fetchJudges(eventId);
//     } catch (error) {
//       console.error("Error deleting judge:", error);
//       alert("Error deleting judge");
//     }
//   };

//   const handleSaveRounds = async () => {
//     try {
//       const roundsPayload = rounds.map((round) => ({
//         name: round.name,
//         category: round.category,
//         sub_category: round.sub_category,
//         board_type: round.board_type,
//         gender: round.gender,
//         age_category: round.age_category,
//         heats: round.heats.map((heat) => ({
//           id: heat.id,
//           heat_name: heat.name, // Ensure heat_name is correctly set
//           competitors: heat.competitors.map((competitor) => ({
//             id: competitor.id,
//             name: competitor.name,
//           })),
//         })),
//       }));

//       console.log("Rounds payload:", roundsPayload);

//       const response = await axios.post(
//         "http://localhost:3000/event-admin/save-rounds",
//         {
//           eventId,
//           rounds: roundsPayload,
//         }
//       );

//       alert("Rounds saved successfully");

//       // Update rounds state with the saved payload
//       setRounds(roundsPayload);
//     } catch (error) {
//       console.error("Error saving rounds:", error);
//       alert("Error saving rounds");
//     }
//   };

//   const handleCreateRounds = () => {
//     if (!eventId) {
//       alert("Please select an event first.");
//       return;
//     }

//     const competitorsByCategory = {};

//     competitors.forEach((competitor) => {
//       const key = `${competitor.category}-${competitor.sub_category}-${competitor.board_type}-${competitor.gender}-${competitor.age_category}`;
//       if (!competitorsByCategory[key]) {
//         competitorsByCategory[key] = [];
//       }
//       competitorsByCategory[key].push(competitor);
//     });

//     const newRounds = [];

//     Object.keys(competitorsByCategory).forEach((key) => {
//       const competitorsList = competitorsByCategory[key];
//       const heats = [];

//       for (let i = 0; i < competitorsList.length; i += 4) {
//         const heatCompetitors = competitorsList.slice(i, i + 4);

//         heats.push({
//           id: `heat-${heats.length + 1}`,
//           name: `Heat ${heats.length + 1}`,
//           competitors: heatCompetitors,
//         });
//       }

//       newRounds.push({
//         id: `round-${newRounds.length + 1}`,
//         name: `Round 1 (${key})`,
//         category: competitorsList[0].category,
//         sub_category: competitorsList[0].sub_category,
//         board_type: competitorsList[0].board_type,
//         gender: competitorsList[0].gender,
//         age_category: competitorsList[0].age_category,
//         heats,
//       });
//     });

//     setRounds(newRounds);
//     console.log("Created rounds:", newRounds);
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     const sourceRoundIndex = parseInt(source.droppableId.split("-")[1]);
//     const sourceHeatIndex = parseInt(source.droppableId.split("-")[3]);
//     const destRoundIndex = parseInt(destination.droppableId.split("-")[1]);
//     const destHeatIndex = parseInt(destination.droppableId.split("-")[3]);

//     const sourceRound = rounds[sourceRoundIndex];
//     const destRound = rounds[destRoundIndex];
//     const sourceHeat = sourceRound.heats[sourceHeatIndex];
//     const destHeat = destRound.heats[destHeatIndex];

//     const [movedCompetitor] = sourceHeat.competitors.splice(source.index, 1);
//     destHeat.competitors.splice(destination.index, 0, movedCompetitor);

//     const newRounds = [...rounds];
//     newRounds[sourceRoundIndex] = {
//       ...sourceRound,
//       heats: [...sourceRound.heats],
//     };
//     newRounds[destRoundIndex] = { ...destRound, heats: [...destRound.heats] };

//     setRounds(newRounds);

//     console.log("Updated rounds after drag and drop:", newRounds);
//   };

//   return (
//     <Container className="mt-5">
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
//         <button type="submit" className="btn btn-primary mt-3">
//           Create Event
//         </button>
//       </form>

//       <EventsList
//         events={events}
//         fetchCompetitors={(id, name) => {
//           setCompetitors([]);
//           fetchCompetitors(id, name);
//         }}
//         fetchJudges={fetchJudges}
//         handleDeleteEvent={handleDeleteEvent}
//       />

//       {eventId ? (
//         <>
//           <h3>Manage Competitors for {selectedEventName}</h3>
//           <AddCompetitorForm
//             eventId={eventId}
//             fetchCompetitors={fetchCompetitors}
//             selectedEventName={selectedEventName}
//             heats={rounds.flatMap((round) => round.heats)}
//           />

//           <CompetitorsList
//             competitors={competitors}
//             selectedEventName={selectedEventName}
//             handleDeleteCompetitor={handleDeleteCompetitor}
//           />

//           <h3>Manage Judges for {selectedEventName}</h3>
//           <AddJudgeForm eventId={eventId} fetchJudges={fetchJudges} />

//           <JudgesList
//             judges={judges}
//             selectedEventName={selectedEventName}
//             handleDeleteJudge={handleDeleteJudge}
//           />

//           <h3>Rounds</h3>
//           <button className="btn btn-primary mb-0" onClick={handleCreateRounds}>
//             Create Round and Heat
//           </button>
//           <button className="btn btn-success mt-0" onClick={handleSaveRounds}>
//             Save Rounds
//           </button>
//           <GeneratePDFButton eventId={eventId} rounds={rounds} />

//           <Button
//             className="btn btn-info mt-3"
//             onClick={() => setShowRounds(!showRounds)}
//           >
//             {showRounds ? "Hide Saved Rounds" : "View Saved Rounds"}
//           </Button>

//           {showRounds && <RoundsDisplay eventId={eventId} />}

//           <DragDropContext onDragEnd={onDragEnd}>
//             {rounds.map((round, roundIndex) => (
//               <div key={roundIndex}>
//                 <h4 className="mt-4 mb-3">{round.name}</h4>
//                 <Row>
//                   {round.heats.map((heat, heatIndex) => (
//                     <Col key={heatIndex} sm={12} md={6} lg={4} className="mb-4">
//                       <Droppable
//                         droppableId={`round-${roundIndex}-heat-${heatIndex}`}
//                       >
//                         {(provided) => (
//                           <Card
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                           >
//                             <Card.Body>
//                               <Card.Title>Heat {heatIndex + 1}</Card.Title>
//                               <ul>
//                                 {heat.competitors.map((competitor, idx) => (
//                                   <Draggable
//                                     key={competitor.id}
//                                     draggableId={`competitor-${competitor.id}`}
//                                     index={idx}
//                                   >
//                                     {(provided) => (
//                                       <li
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                       >
//                                         {competitor.name}
//                                       </li>
//                                     )}
//                                   </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                               </ul>
//                             </Card.Body>
//                           </Card>
//                         )}
//                       </Droppable>
//                     </Col>
//                   ))}
//                 </Row>
//               </div>
//             ))}
//           </DragDropContext>
//         </>
//       ) : (
//         <p className="mt-4">
//           Please select an event to manage competitors and judges.
//         </p>
//       )}
//     </Container>
//   );
// };

// export default EventManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EventsList from "./EventList";
import CompetitorsList from "./CompetitorList";
import AddCompetitorForm from "./AddCompetitorForm";
import JudgesList from "./JudgesList";
import AddJudgeForm from "./AddJudgeForm";
import GeneratePDFButton from "./GeneratePDFButton";
import RoundsDisplay from "./RoundsDisplay";

const categories = ["Shortboard", "Longboard"];
const subCategories = ["Men", "Women"];
const ageCategories = [
  "Open",
  "Sub12",
  "Sub14",
  "Sub18",
  "Professional",
  "+40",
  "+45",
  "+50",
  "+60",
  "+65",
  "+70",
];

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [judges, setJudges] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const [showRounds, setShowRounds] = useState(false);

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

  const handleSaveRounds = async () => {
    try {
      const roundsPayload = rounds.map((round) => ({
        name: round.name,
        category: round.category,
        sub_category: round.sub_category,
        board_type: round.board_type,
        gender: round.gender,
        age_category: round.age_category,
        heats: round.heats.map((heat) => ({
          id: heat.id,
          heat_name: heat.name,
          competitors: heat.competitors.map((competitor) => ({
            id: competitor.id,
            name: competitor.name,
          })),
        })),
      }));

      console.log("Rounds payload:", roundsPayload);

      const response = await axios.post(
        "http://localhost:3000/event-admin/save-rounds",
        {
          eventId,
          rounds: roundsPayload,
        }
      );

      alert("Rounds saved successfully");
      fetchRoundsAfterSave();
    } catch (error) {
      console.error("Error saving rounds:", error);
      alert("Error saving rounds");
    }
  };

  const fetchRoundsAfterSave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/event-admin/get-rounds/${eventId}`
      );
      const roundsData = response.data;
      console.log("Fetched rounds data after save:", roundsData);
  
      const processedRounds = roundsData.map((round) => {
        const processedHeats = (round.heats || []).map((heat) => {
          const processedCompetitors = (heat.competitors || []).map((competitor) => ({
            id: competitor.id,
            name: competitor.name,
          }));
          return {
            id: heat.id,
            name: heat.heat_name,
            competitors: processedCompetitors,
          };
        });
        console.log("Processed heats for round:", processedHeats);
        return {
          id: round.id,
          name: round.round_name,
          category: round.category,
          sub_category: round.sub_category,
          board_type: round.board_type,
          gender: round.gender,
          age_category: round.age_category,
          heats: processedHeats,
        };
      });
  
      console.log("Processed rounds after save:", processedRounds);
      setRounds(processedRounds);
    } catch (error) {
      console.error("Error fetching rounds after save:", error);
    }
  };
  

  const handleCreateRounds = () => {
    if (!eventId) {
      alert("Please select an event first.");
      return;
    }

    const competitorsByCategory = {};

    competitors.forEach((competitor) => {
      const key = `${competitor.category}-${competitor.sub_category}-${competitor.board_type}-${competitor.gender}-${competitor.age_category}`;
      if (!competitorsByCategory[key]) {
        competitorsByCategory[key] = [];
      }
      competitorsByCategory[key].push(competitor);
    });

    const newRounds = [];

    Object.keys(competitorsByCategory).forEach((key) => {
      const competitorsList = competitorsByCategory[key];
      const heats = [];

      for (let i = 0; i < competitorsList.length; i += 4) {
        const heatCompetitors = competitorsList.slice(i, i + 4);

        heats.push({
          id: `heat-${heats.length + 1}`,
          name: `Heat ${heats.length + 1}`,
          competitors: heatCompetitors,
        });
      }

      newRounds.push({
        id: `round-${newRounds.length + 1}`,
        name: `Round 1 (${key})`,
        category: competitorsList[0].category,
        sub_category: competitorsList[0].sub_category,
        board_type: competitorsList[0].board_type,
        gender: competitorsList[0].gender,
        age_category: competitorsList[0].age_category,
        heats,
      });
    });

    setRounds(newRounds);
    console.log("Created rounds:", newRounds);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceRoundIndex = parseInt(source.droppableId.split("-")[1]);
    const sourceHeatIndex = parseInt(source.droppableId.split("-")[3]);
    const destRoundIndex = parseInt(destination.droppableId.split("-")[1]);
    const destHeatIndex = parseInt(destination.droppableId.split("-")[3]);

    const sourceRound = rounds[sourceRoundIndex];
    const destRound = rounds[destRoundIndex];
    const sourceHeat = sourceRound.heats[sourceHeatIndex];
    const destHeat = destRound.heats[destHeatIndex];

    const [movedCompetitor] = sourceHeat.competitors.splice(source.index, 1);
    destHeat.competitors.splice(destination.index, 0, movedCompetitor);

    const newRounds = [...rounds];
    newRounds[sourceRoundIndex] = {
      ...sourceRound,
      heats: [...sourceRound.heats],
    };
    newRounds[destRoundIndex] = { ...destRound, heats: [...destRound.heats] };

    setRounds(newRounds);
  };

  return (
    <Container className="mt-5">
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

      <EventsList
        events={events}
        fetchCompetitors={(id, name) => {
          setCompetitors([]);
          fetchCompetitors(id, name);
        }}
        fetchJudges={fetchJudges}
        handleDeleteEvent={handleDeleteEvent}
      />

      {eventId ? (
        <>
          <h3>Manage Competitors for {selectedEventName}</h3>
          <AddCompetitorForm
            eventId={eventId}
            fetchCompetitors={fetchCompetitors}
            selectedEventName={selectedEventName}
            heats={rounds.flatMap((round) => round.heats)}
          />

          <CompetitorsList
            competitors={competitors}
            selectedEventName={selectedEventName}
            handleDeleteCompetitor={handleDeleteCompetitor}
          />

          <h3>Manage Judges for {selectedEventName}</h3>
          <AddJudgeForm eventId={eventId} fetchJudges={fetchJudges} />

          <JudgesList
            judges={judges}
            selectedEventName={selectedEventName}
            handleDeleteJudge={handleDeleteJudge}
          />

          <h3>Rounds</h3>
          <button className="btn btn-primary mb-0" onClick={handleCreateRounds}>
            Create Round and Heat
          </button>
          <button className="btn btn-success mt-0" onClick={handleSaveRounds}>
            Save Rounds
          </button>
          <GeneratePDFButton eventId={eventId} rounds={rounds} />

          <Button
            className="btn btn-info mt-3"
            onClick={() => setShowRounds(!showRounds)}
          >
            {showRounds ? "Hide Saved Rounds" : "View Saved Rounds"}
          </Button>

          {showRounds && <RoundsDisplay eventId={eventId} />}

          <DragDropContext onDragEnd={onDragEnd}>
            {rounds.map((round, roundIndex) => (
              <div key={roundIndex}>
                <h4 className="mt-4 mb-3">{round.name}</h4>
                <Row>
                  {round.heats.map((heat, heatIndex) => (
                    <Col key={heatIndex} sm={12} md={6} lg={4} className="mb-4">
                      <Droppable
                        droppableId={`round-${roundIndex}-heat-${heatIndex}`}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <Card.Body>
                              <Card.Title>Heat {heatIndex + 1}</Card.Title>
                              <ul>
                                {heat.competitors.map((competitor, idx) => (
                                  <Draggable
                                    key={competitor.id}
                                    draggableId={`competitor-${competitor.id}`}
                                    index={idx}
                                  >
                                    {(provided) => (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {competitor.name}
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </ul>
                            </Card.Body>
                          </Card>
                        )}
                      </Droppable>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </DragDropContext>
        </>
      ) : (
        <p className="mt-4">
          Please select an event to manage competitors and judges.
        </p>
      )}
    </Container>
  );
};

export default EventManagement;

