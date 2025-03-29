import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { MealPlanContext } from "../context/MealPlanContext";
import { NotificationContext } from "../context/NotificationContext";

// MealCard Component
const MealCard = ({ mealPlan, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const mealImage = require(`../assets/${mealPlan.MealIconId}.png`);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(mealPlan.MealPlanNumber, !isChecked);
  };

  return (
    <>
      <Card className="meal-card shadow-sm" style={{ maxWidth: "300px" }}>
        <Card.Header>
          <span className="badge bg-secondary position-absolute top-0 start-0 m-2">
            {mealPlan.MealPlanNumber}
          </span>
          <span className="position-absolute top-0 end-0 m-2">
            <Form.Check
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </span>
          <Card.Title className="text-center mt-2">
            {mealPlan.MealShortName}
          </Card.Title>
        </Card.Header>
        <Card.Body
          className="position-relative"
          onClick={() => setShowModal(true)}
        >
          <Card.Img
            variant="top"
            src={mealImage}
            className="mt-3"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
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

// MealPlanList Component
const MealPlanList = () => {
  const { mealPlanList } = useContext(MealPlanContext);
  const { showMessage, setLoading } = useContext(NotificationContext);
  const [selectedMealPlans, setSelectedMealPlans] = useState([]);

  const handleCheckboxChange = (mealPlanNumber, isSelected) => {
    if (isSelected) {
      setSelectedMealPlans((prevState) => [...prevState, mealPlanNumber]);
    } else {
      setSelectedMealPlans((prevState) =>
        prevState.filter((number) => number !== mealPlanNumber)
      );
    }
  };

  const handleSave = () => {
    showMessage("Please wait!");
    setLoading(true);
    console.log("Saving meal plans:", selectedMealPlans);
    setLoading(false);
    showMessage("Meal plan saved!");
  };

  const handleGenerateShoppingList = () => {
    const selectedMealPlansData = mealPlanList.filter((mealPlan) =>
      selectedMealPlans.includes(mealPlan.MealPlanNumber)
    );
    const ingredients = selectedMealPlansData
      .map((mealPlan) => mealPlan.Ingredients)
      .join(", ");
    showMessage("Please wait!");
    setLoading(true);
    console.log("Generated shopping list:", ingredients);
    setLoading(false);
    showMessage("Shopping list generated!");
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 text-center">
        <ButtonGroup aria-label="MealListButtons">
          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={selectedMealPlans.length === 0}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={handleGenerateShoppingList}
            disabled={selectedMealPlans.length === 0}
            className="ml-3"
          >
            Generate Shopping List
          </Button>
        </ButtonGroup>
      </div>
      <Row className="justify-content-center">
        {mealPlanList.map((mealPlan) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={mealPlan.MealPlanNumber}
            className="mb-4"
          >
            <MealCard
              mealPlan={mealPlan}
              onCheckboxChange={handleCheckboxChange}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MealPlanList;
