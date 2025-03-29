import React from "react";
import logo from "../assets/logo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
// import Home from "./Home";
// import DietForm from "./DietForm";
import MealPlanList from "./MealCard";

function Frame() {
  const mPlan = [
    {
        "MealPlanNumber": 1,
        "MealShortName": "Tuna Sandwich",
        "MealIconId": 8,
        "Ingredients": "Bread - 2 slices, Tuna - 100g, Butter - 1 tsp, Salt - 1/2 tsp, Pepper - 1/2 tsp, Apple - 1 medium",
        "HowToMake": "Mix tuna with butter, salt, and pepper. Spread mixture onto bread slices and make a sandwich. Serve with an apple.",
        "TotalCalorie": 400
    },
    {
        "MealPlanNumber": 2,
        "MealShortName": "Chicken Rice Bowl",
        "MealIconId": 4,
        "Ingredients": "Rice - 1 cup (200g), Chicken - 150g, Butter - 1 tsp, Salt - 1 tsp, Pepper - 1/2 tsp, Green Chili - 1 small, chopped",
        "HowToMake": "Cook rice separately. Grill or pan-fry chicken with butter, salt, and pepper. Serve chicken over rice with chopped green chili.",
        "TotalCalorie": 600
    },
    {
        "MealPlanNumber": 3,
        "MealShortName": "Beans and Rice Bowl",
        "MealIconId": 7,
        "Ingredients": "Rice - 1 cup (200g), Beans - 100g, Butter - 1 tsp, Salt - 1/2 tsp, Pepper - 1/2 tsp, Orange - 1 medium",
        "HowToMake": "Cook rice separately. Sauté beans with butter, salt, and pepper. Serve beans over rice with a side of orange slices.",
        "TotalCalorie": 500
    }
]


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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#dietary-form">Dietary Form</Nav.Link>
              <Nav.Link href="#meal-plans">Meal Plans</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <MealPlanList mealPlans={mPlan} />
        {/* <DietForm/> */}
      </Container>
    </div>
  );
}

export default Frame;
