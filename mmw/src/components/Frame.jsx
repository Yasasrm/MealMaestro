import React from "react";
import logo from "../assets/logo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
// import Home from "./Home";
// import DietForm from "./DietForm";
// import MealPlanList from "./MealCard";

function Frame() {
  return (
    <div className="frame">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              alt="Meal Maestro Logo"
              height="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/dietary-form">
                Dietary Form
              </Nav.Link>
              <Nav.Link as={Link} to="/meal-plans">
                Meal Plans
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </div>
  );
}

export default Frame;
