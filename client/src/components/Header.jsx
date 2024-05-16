import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function Header () {
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">BATERIA AO VIVO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#find-event">Find an event or organisation</Nav.Link>
            <Nav.Link href="#for-orgs">For organisations</Nav.Link>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="#login-judges">Login for Judges</NavDropdown.Item>
              <NavDropdown.Item href="#login-admin">Login for Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};
