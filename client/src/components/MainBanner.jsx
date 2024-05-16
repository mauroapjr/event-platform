import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import "./MainBanner";

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
            Sua plataforma completa para competições!
          </h1>
          <p>
            Bateria ao vivo cria e administra campeonatos, mostrando em tempo
            real notas e classificações de juízes e baterias de forma fácil e
            intuitiva
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="primary" className="me-3" size="lg">
              Crie seu Campeonato
            </Button>
            <Button variant="warning" size="lg">
              Encontre seu Campeonato
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
