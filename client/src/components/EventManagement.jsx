import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import RoundsDisplay from "./RoundsDisplay";
import EventsList from "./EventsList"; 



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
  const [showRounds, setShowRounds] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [competitorName, setCompetitorName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [subCategory, setSubCategory] = useState(subCategories[0]);
  const [boardType, setBoardType] = useState(categories[0]);
  const [gender, setGender] = useState(subCategories[0]);
  const [ageCategory, setAgeCategory] = useState(ageCategories[0]);
  const [judgeName, setJudgeName] = useState("");
  const [createdBy, setCreatedBy] = useState(1);
  const [selectedEventName, setSelectedEventName] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event-admin/get-events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // const fetchEvents = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3000/event-admin/get-events"
  //     );
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };

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
      setCategory(categories[0]);
      setSubCategory(subCategories[0]);
      setBoardType(categories[0]);
      setGender(subCategories[0]);
      setAgeCategory(ageCategories[0]);
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

  const handleSaveRounds = async () => {
    try {
      await axios.post(
        "http://localhost:3000/event-admin/save-rounds",
        {
          eventId,
          rounds: rounds.map((round) => ({
            name: round.name,
            category: round.category,
            sub_category: round.sub_category,
            board_type: round.board_type,
            gender: round.gender,
            age_category: round.age_category,
            heats: round.heats.map((heat) => ({
              heat_name: heat.name,
              competitors: heat.competitors.map((competitor) => ({
                id: competitor.id,
                name: competitor.name,
              })),
            })),
          })),
        }
      );
      alert("Rounds saved successfully");
    } catch (error) {
      console.error("Error saving rounds:", error);
      alert("Error saving rounds");
    }
  };
   
  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/event-admin/generate-rounds-pdf`,
        {
          eventId,
          rounds
        },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rounds.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF");
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

  
  
  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const sourceHeatId = result.source.droppableId.split('-')[1];
    const destinationHeatId = result.destination.droppableId.split('-')[1];

    const sourceRoundIndex = rounds.findIndex((round) =>
      round.heats.some((heat) => heat.id === parseInt(sourceHeatId))
    );
    const destinationRoundIndex = rounds.findIndex((round) =>
      round.heats.some((heat) => heat.id === parseInt(destinationHeatId))
    );

    if (sourceRoundIndex === -1 || destinationRoundIndex === -1) {
      return;
    }

    const sourceRound = rounds[sourceRoundIndex];
    const destinationRound = rounds[destinationRoundIndex];

    const sourceHeat = sourceRound.heats.find(
      (heat) => heat.id === parseInt(sourceHeatId)
    );
    const destinationHeat = destinationRound.heats.find(
      (heat) => heat.id === parseInt(destinationHeatId)
    );

    const [movedItem] = sourceHeat.competitors.splice(result.source.index, 1);
    destinationHeat.competitors.splice(result.destination.index, 0, movedItem);

    const updatedRounds = rounds.map((round) => {
      if (round.id === sourceRound.id) {
        return sourceRound;
      }
      if (round.id === destinationRound.id) {
        return destinationRound;
      }
      return round;
    });

    setRounds(updatedRounds);

    // Send the update to the backend
    try {
      await axios.post('http://localhost:3000/event-admin/move-competitor', {
        fromHeatId: sourceHeatId,
        toHeatId: destinationHeatId,
        competitorId: movedItem.id,
      });
    } catch (error) {
      console.error('Error moving competitor:', error);
      // Optionally, revert the state change if the backend update fails
      setRounds(rounds);
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

          <h3>Rounds</h3>
          <button className="btn btn-primary mb-0" onClick={handleCreateRounds}>
            Create Rounds
          </button>
          <button className="btn btn-success mt-0" onClick={handleSaveRounds}>
            Save Rounds
          </button>
          {/* <button className="btn btn-info mt-0" onClick={handleFetchRounds}>
            Show All Rounds
          </button> */}

          <button className="btn btn-secondary mt-0" onClick={handleGeneratePDF}>
            Generate PDF
          </button>

          <RoundsDisplay eventId={eventId} />

          <DragDropContext onDragEnd={handleDragEnd}>
            {rounds.map((round) => (
              <Droppable droppableId={round.id.toString()} key={round.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mb-4"
                  >
                    <h4>{round.name}</h4>
                    {round.heats.map((heat, index) => (
                      <Droppable droppableId={`heat-${heat.id}`} key={heat.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="list-group mb-3"
                          >
                            <h5>Heat {index + 1}</h5>
                            {heat.competitors.map((competitor, idx) => (
                              <Draggable
                                key={competitor.id}
                                draggableId={competitor.id.toString()}
                                index={idx}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="list-group-item"
                                  >
                                    {competitor.name}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>

          {showRounds && (
            <>
              <h3>Rounds for {selectedEventName}</h3>
              {rounds.map((round, roundIndex) => (
                <div key={roundIndex} className="mb-4">
                  <h4>
                    Round {roundIndex + 1} ({round.category}, {round.sub_category}, {round.board_type}, {round.gender}, {round.age_category})
                  </h4>
                  {round.heats.map((heat, heatIndex) => (
                    <div key={heatIndex} className="mb-2">
                      <h5>Heat {heatIndex + 1}</h5>
                      <ul className="list-group">
                        {heat.competitors.map((competitor, competitorIndex) => (
                          <li key={competitorIndex} className="list-group-item">
                            {competitor.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
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







