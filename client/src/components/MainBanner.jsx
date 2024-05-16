import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import "./MainBanner.css"; 

export default function MainBanner() {
  return (
    <>
      <div className="main-banner d-flex align-items-center">
        <Container className="text-center">
          <Form.Control
            type="text"
            placeholder="Search events and organisations"
            className="mb-4"
            size="lg"
          />
          <h1 className="display-4">
            The all-in-one platform for modern sports competitions
          </h1>
          <p>
            LiveHeats helps organisers run sophisticated competitions with
            minimal effort
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="primary" className="me-3" size="lg">
              Create organisation account
            </Button>
            <Button variant="warning" size="lg">
              Find an event or organisation
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
