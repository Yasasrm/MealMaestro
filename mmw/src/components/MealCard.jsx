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
import { InfoContext } from "../context/InfoContext";
import { UserContext } from "../context/UserContext";
import QuickInput from "./QuickInput";

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
          <pre>{mealPlan.Ingredients.replace(/, /g, ",\n")}</pre>
          <h5>How to Make:</h5>
          <pre>{mealPlan.HowToMake.replace(/(\d\.)/g, "\n$1")}</pre>
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
  const [selectedMealPlans, setSelectedMealPlans] = useState([]);
  const { suggestedPlan } = useContext(MealPlanContext);
  const { showMessage, setLoading } = useContext(NotificationContext);
  const { setShow, setInfoTopic, setInfoMessage } = useContext(InfoContext);
  const { isCurentMealPlanSaved, setIsCurentMealPlanSaved, uemail } = useContext(UserContext);
  const API_URL = process.env.REACT_APP_API_URL;
  const handleShow = (t, m) => {
    setInfoTopic(t);
    setInfoMessage(m);
    setShow(true);
  };
  const handleClose = () => {
    setInfoTopic("");
    setInfoMessage("");
    setShow(false);
  };

  const handleCheckboxChange = (mealPlanNumber, isSelected) => {
    if (isSelected) {
      setSelectedMealPlans((prevState) => [...prevState, mealPlanNumber]);
    } else {
      setSelectedMealPlans((prevState) =>
        prevState.filter((number) => number !== mealPlanNumber)
      );
    }
  };

  const saveMealPlan = async (name, data) => {
    setLoading(true);
    console.log({ email: uemail, meals: data, plan: name });
    try {
      const response = await fetch(`${API_URL}/api/meals/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: uemail, meals: data, plan: name }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      const result = await response.json();
      console.log(result.mealPlan.meals);
      setIsCurentMealPlanSaved(true);
      setLoading(false);
      showMessage("Meal plan saved!");
    } catch (error) {
      setIsCurentMealPlanSaved(false);
      console.error("Error submitting form:", error);
      setLoading(false);
      showMessage("ERROR: Submition failed. Please try again!");
    }
  };

  const handleSave = () => {
    handleShow(
      "Save meal plan",
      <QuickInput
        textLabel={"Meal plan name"}
        dataToProcess={suggestedPlan}
        processingFunction={saveMealPlan}
        exitFunction={handleClose}
      />
    );
  };

  const handleGenerateShoppingList = async () => {
    const selectedMealPlansData = suggestedPlan.MealArray.filter((mealPlan) =>
      selectedMealPlans.includes(mealPlan.MealPlanNumber)
    );
    const ingredients = selectedMealPlansData
      .map((mealPlan) => mealPlan.Ingredients)
      .join(", ");
    console.log(ingredients);
    showMessage("Please wait!");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/ai/getShoppingList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      const result = await response.json();
      setLoading(false);
      showMessage("Shopping list generated!");
      handleShow("Shopping list", <pre>{result}</pre>);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      showMessage("ERROR: Submition failed. Please try again!");
    }
  };

  const handleShowInfo = () => {
    setShow(true);
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 text-center">
        <ButtonGroup aria-label="MealListButtons">
          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={!suggestedPlan.MealArray || isCurentMealPlanSaved}
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
          <Button variant="secondary" onClick={handleShowInfo} className="ml-3">
            Info
          </Button>
        </ButtonGroup>
      </div>
      <Row className="justify-content-center">
        {suggestedPlan.MealArray &&
          suggestedPlan.MealArray.map((mealPlan) => (
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
