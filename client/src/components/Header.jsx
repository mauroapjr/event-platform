import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">BATERIA AO VIVO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#find-event">Eventos ao vivo</Nav.Link>
              <Nav.Link href="#for-orgs">Eventos passados </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item href="#login-judges">
                  Login para Juízes
                </NavDropdown.Item>
                <NavDropdown.Item href="#login-admin">
                  Login para Admin
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
