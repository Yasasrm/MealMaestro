import React, { useState } from 'react'
import { Card, Button, Row, Col, Modal } from "react-bootstrap";

const MealCard = ({ mealPlan }) => {
  const [showModal, setShowModal] = useState(false);

  const mealImage = require(`../assets/${mealPlan.MealIconId}.png`);

  return (
    <>
      <Card className="meal-card shadow-sm" style={{ maxWidth: "300px" }} onClick={() => setShowModal(true)}>
        <Card.Body className="position-relative">
          <span className="badge bg-primary position-absolute top-0 start-0 m-2">
            {mealPlan.MealPlanNumber}
          </span>
          <span className="position-absolute top-0 end-0 m-2">
            <input type="checkbox" />
          </span>
          <Card.Title className="text-center mt-2">{mealPlan.MealShortName}</Card.Title>
          <Card.Img variant="top" src={mealImage} className="mt-3" style={{ maxHeight: "200px", objectFit: "cover" }} />
        </Card.Body>
        <Card.Footer className="text-center bg-light">
          <strong>Total Calories: {mealPlan.TotalCalorie} kcal</strong>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{mealPlan.MealShortName} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Ingredients:</h5>
          <p>{mealPlan.Ingredients}</p>
          <h5>How to Make:</h5>
          <p>{mealPlan.HowToMake}</p>
          <h5>Total Calories:</h5>
          <p>{mealPlan.TotalCalorie} kcal</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const MealPlanList = ({ mealPlans }) => {
  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        {mealPlans.map((mealPlan) => (
          <Col sm={12} md={6} lg={4} xl={3} key={mealPlan.MealPlanNumber} className="mb-4">
            <MealCard mealPlan={mealPlan} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MealPlanList;