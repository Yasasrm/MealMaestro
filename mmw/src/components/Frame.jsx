import React from "react";
import logo from "../assets/logo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
// import Home from "./Home";
// import DietForm from "./DietForm";
// import MealCard from "./MealCard";
import MealPlanList from "./MealCard";

function Frame() {
    const mPlan = [
        {
          "MealPlanNumber": 1,
          "MealShortName": "Milk Drink",
          "MealIconId": 2,
          "Ingredients": "Milk - 250ml, Sugar - 1 tsp, Butter - 5g",
          "HowToMake": "Warm the milk, add sugar, and stir well. Enjoy with a small piece of butter on the side.",
          "TotalCalorie": 200
        },
        {
          "MealPlanNumber": 2,
          "MealShortName": "Chicken Rice",
          "MealIconId": 2,
          "Ingredients": "Rice - 150g, Chicken - 100g, Green Chili - 1, Salt - to taste, Butter - 10g",
          "HowToMake": "Cook rice separately. In a pan, cook the chicken with salt and green chili. Once done, mix with rice and add butter for flavor.",
          "TotalCalorie": 700
        },
        {
          "MealPlanNumber": 3,
          "MealShortName": "Fruit Snack",
          "MealIconId": 2,
          "Ingredients": "Apple - 1, Orange - 1",
          "HowToMake": "Wash and slice the apple. Peel the orange. Eat as a snack.",
          "TotalCalorie": 150
        },
        {
          "MealPlanNumber": 4,
          "MealShortName": "Chicken Rice",
          "MealIconId": 2,
          "Ingredients": "Rice - 100g, Chicken - 150g, Pepper - to taste, Salt - to taste, Butter - 10g",
          "HowToMake": "Cook the rice. In a separate pan, cook the chicken with pepper, salt, and butter. Serve together.",
          "TotalCalorie": 750
        },
        {
          "MealPlanNumber": 5,
          "MealShortName": "Milk Drink",
          "MealIconId": 2,
          "Ingredients": "Milk - 250ml, Sugar - 1 tsp",
          "HowToMake": "Warm the milk and add sugar. Stir well before drinking.",
          "TotalCalorie": 200
        }
      ];

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
        <MealPlanList mealPlans={mPlan}/>
      </Container>
    </div>
  );
}

export default Frame;
