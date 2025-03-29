import React, { useContext, useState } from "react";
import { MealPlanContext } from "../context/MealPlanContext";

function DietForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity: "sedentary",
    diet: "none",
    allergies: "",
    restrictions: "",
    goal: "weight_loss",
    meals: "",
    budget: "mid",
  });
  const { setMealPlanList } = useContext(MealPlanContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");

    try {
      console.log(JSON.stringify(formData)); // delete
      const response = await fetch("http://localhost:5000/getMealPlan", {
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
      console.log("Response from server:", result[0].MealPlan);
      alert("Form submitted successfully!");

      setMealPlanList(result[0].MealPlan);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form!");
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
