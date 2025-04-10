import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const MealPlanLogger = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [otherFoods, setOtherFoods] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const mealPlans = {
    "Plan A": 1200,
    "Plan B": 1500,
    "Plan C": 1800,
  };

  const calculateCalories = () => {
    const extraCalories = otherFoods.split(",").filter(f => f.trim()).length * 100;
    const planCalories = mealPlans[selectedPlan] || 0;
    setTotalCalories(planCalories + extraCalories);
  };

  const saveMealLog = () => {
    const log = {
      plan: selectedPlan,
      otherFoods,
      totalCalories,
    };
    console.log("Saved Meal Log:", log);
    setShowAlert(true);
  };

  return (
    <Container className="mt-4 p-4 border rounded shadow-sm bg-light">
      <h3 className="mb-4">Log Your Meal</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Meal Plan</Form.Label>
          <Form.Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="">-- Choose a meal plan --</option>
            {Object.keys(mealPlans).map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Other Consumed Foods (comma-separated)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="e.g., apple, sandwich, yogurt"
            value={otherFoods}
            onChange={(e) => setOtherFoods(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={calculateCalories}>
              Calculate Calorie
            </Button>
          </Col>
          <Col>
            <Button variant="success" onClick={saveMealLog}>
              Save
            </Button>
          </Col>
        </Row>

        {totalCalories > 0 && (
          <Alert variant="info">
            Total Calories: <strong>{totalCalories}</strong>
          </Alert>
        )}

        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Meal log saved successfully!
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default MealPlanLogger;
