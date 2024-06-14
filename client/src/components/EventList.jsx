import React from "react";
import { Card, Button } from "react-bootstrap";

const EventsList = ({
  events = [],
  fetchCompetitors,
  fetchJudges,
  handleDeleteEvent,
}) => {
  return (
    <div>
      {events.map((event) => (
        <Card key={event.id} className="mb-3">
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>
              Date: {new Date(event.date).toLocaleDateString()}
            </Card.Text>
            <Card.Text>Location: {event.location}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                fetchCompetitors(event.id, event.name);
                fetchJudges(event.id);
              }}
            >
              Manage
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EventsList;
