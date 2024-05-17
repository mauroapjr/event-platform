import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/Footer.css"; 

export default function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Fale conosco:</h5>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Seu nome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Seu email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Sua mensagem"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar
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
              <h5>Sobre nós</h5>
              <p>
                Bateria ao vivo é uma plataforma feita para surfistas por
                surfistas. Nos dedicamos a conectar apaixonados pelo surf, desde
                fãs ávidos que nunca perdem uma competição, até aqueles que
                gostam de acompanhar os eventos ocasionalmente.          
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
