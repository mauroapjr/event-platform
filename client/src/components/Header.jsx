import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="http://localhost:3001/">BATERIA AO VIVO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/find-event">
                <Nav.Link>Eventos ao vivo</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/for-orgs">
                <Nav.Link>Eventos passados</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <LinkContainer to="/judge/login">
                  <NavDropdown.Item>Login para Juízes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/login">
                  <NavDropdown.Item>Login para Admin</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
