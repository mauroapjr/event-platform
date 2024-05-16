import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/Footer.css"; // Custom styles for footer

export default function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Contact Us</h5>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your message"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md={4}>
              <h5>Follow Us</h5>
              <div className="social-links">
                <a href="https://www.facebook.com" className="text-white me-3">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://www.instagram.com" className="text-white me-3">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://www.linkedin.com" className="text-white">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </div>
            </Col>
            <Col md={4}>
              <h5>About Us</h5>
              <p>
                Bateria ao vivo is the all-in-one platform for modern sports
                competitions. We help organizers run sophisticated competitions
                with minimal effort.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
