import React, { useContext, useState } from "react";
import { MealPlanContext } from "../context/MealPlanContext";
import { NotificationContext } from "../context/NotificationContext";
import { InfoContext } from "../context/InfoContext";
import { UserContext } from "../context/UserContext";

function DietForm() {
  const { uname, uAge, uGender, uWeight, uHeight, uActivity, uAllergy, uGoal, setIsCurentMealPlanSaved } =
    useContext(UserContext);
  const [formData, setFormData] = useState({
    name: uname,
    age: uAge,
    gender: uGender,
    weight: uWeight,
    height: uHeight,
    activity: uActivity,
    diet: "none",
    cuisine: "none",
    allergies: uAllergy,
    restrictions: "",
    goal: uGoal,
    meals: "",
    budget: "mid",
  });
  const { setSuggestedPlan } = useContext(MealPlanContext);
  const { showMessage, setLoading } = useContext(NotificationContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const API_URL = process.env.REACT_APP_API_URL;
  const { setShow, setInfoTopic, setInfoMessage } = useContext(InfoContext);
  const handleSetInfo = (t, m) => {
    setInfoTopic(t);
    setInfoMessage(m);
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showMessage("Please wait!");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/getMealPlan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      const result = await response.json();
      console.log(result);
      setSuggestedPlan(result[0]);
      setLoading(false);
      showMessage("Meal plan created. Check your Meal Plan tab");
      handleSetInfo("About this meal plan", <p>{result[0].instruction}</p>);
      setIsCurentMealPlanSaved(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      showMessage("ERROR: Submition failed. Please try again!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Dietary Requirements Form</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 border rounded shadow bg-light"
        style={{ maxWidth: "500px" }}
      >
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Age", name: "age", type: "number", required: true },
          {
            label: "Weight (kg)",
            name: "weight",
            type: "number",
            required: true,
          },
          {
            label: "Height (cm)",
            name: "height",
            type: "number",
            required: true,
          },
          {
            label: "Allergies (comma-separated)",
            name: "allergies",
            type: "text",
          },
          { label: "Food Restrictions", name: "restrictions", type: "text" },
          {
            label: "Preferred Number of Meals",
            name: "meals",
            type: "number",
            min: 1,
            max: 6,
          },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="form-control"
              value={formData[field.name]}
              onChange={handleChange}
              {...(field.required ? { required: true } : {})}
              {...(field.min ? { min: field.min } : {})}
              {...(field.max ? { max: field.max } : {})}
            />
          </div>
        ))}

        {[
          {
            label: "Gender",
            name: "gender",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ],
          },
          {
            label: "Activity Level",
            name: "activity",
            options: [
              { value: "sedentary", label: "Sedentary" },
              { value: "light", label: "Lightly Active" },
              { value: "moderate", label: "Moderately Active" },
              { value: "very_active", label: "Very Active" },
            ],
          },
          {
            label: "Preferred Diet Type",
            name: "diet",
            options: [
              { value: "vegetarian", label: "Vegetarian" },
              { value: "vegan", label: "Vegan" },
              { value: "pescatarian", label: "Pescatarian" },
              { value: "keto", label: "Keto" },
              { value: "paleo", label: "Paleo" },
              { value: "mediterranean", label: "Mediterranean" },
              { value: "none", label: "No Preference" },
            ],
          },
          {
            label: "Preferred Cuisine",
            name: "cuisine",
            options: [
              { value: "italian", label: "Italian" },
              { value: "greek", label: "Greek" },
              { value: "mexican", label: "Mexican" },
              { value: "japanese", label: "Japanese" },
              { value: "indian", label: "Indian" },
              { value: "french", label: "French" },
              { value: "chinese", label: "Chinese" },
              { value: "spanish", label: "Spanish" },
              { value: "thai", label: "Thai" },
              { value: "turkish", label: "Turkish" },
              { value: "american", label: "American" },
              { value: "korean", label: "Korean" },
              { value: "none", label: "No Preference" },
            ],
          },
          {
            label: "Health Goal",
            name: "goal",
            options: [
              { value: "weight_loss", label: "Weight Loss" },
              { value: "muscle_gain", label: "Muscle Gain" },
              { value: "maintenance", label: "Maintenance" },
              { value: "medical", label: "Medical Diet" },
            ],
          },
          {
            label: "Budget",
            name: "budget",
            options: [
              { value: "low", label: "Low-cost" },
              { value: "mid", label: "Mid-range" },
              { value: "high", label: "Premium" },
            ],
          },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <select
              name={field.name}
              className="form-select"
              value={formData[field.name]}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DietForm;
