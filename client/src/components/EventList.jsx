import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const events = [
  { name: "FESURFING JUNIOR AIR SHOW 2024", status: "LIVE" },
  { name: "Maresias Shootout 2024", status: "LIVE" },
  { name: "2024 Infratores da Divisa Contest", status: "LIVE" },
];

export default function EventList() {
  return (
    <>
      <Container className="my-5">
        <Row>
          {events.map((event, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Badge bg="success" className="mb-2">
                    {event.status}
                  </Badge>
                  <Card.Title>{event.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
