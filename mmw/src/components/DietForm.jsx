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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");

    setMealPlanList([
      {
        MealPlanNumber: 1,
        MealShortName: "Tuna Sandwich",
        MealIconId: 8,
        Ingredients:
          "Bread - 2 slices, Tuna - 100g, Butter - 1 tsp, Salt - 1/2 tsp, Pepper - 1/2 tsp, Apple - 1 medium",
        HowToMake:
          "Mix tuna with butter, salt, and pepper. Spread mixture onto bread slices and make a sandwich. Serve with an apple.",
        TotalCalorie: 400,
      },
      {
        MealPlanNumber: 2,
        MealShortName: "Chicken Rice Bowl",
        MealIconId: 4,
        Ingredients:
          "Rice - 1 cup (200g), Chicken - 150g, Butter - 1 tsp, Salt - 1 tsp, Pepper - 1/2 tsp, Green Chili - 1 small, chopped",
        HowToMake:
          "Cook rice separately. Grill or pan-fry chicken with butter, salt, and pepper. Serve chicken over rice with chopped green chili.",
        TotalCalorie: 600,
      },
      {
        MealPlanNumber: 3,
        MealShortName: "Beans and Rice Bowl",
        MealIconId: 7,
        Ingredients:
          "Rice - 1 cup (200g), Beans - 100g, Butter - 1 tsp, Salt - 1/2 tsp, Pepper - 1/2 tsp, Orange - 1 medium",
        HowToMake:
          "Cook rice separately. Sauté beans with butter, salt, and pepper. Serve beans over rice with a side of orange slices.",
        TotalCalorie: 500,
      },
      {
        MealPlanNumber: 1,
        MealShortName: "Chicken Rice Bowl",
        MealIconId: 4,
        Ingredients:
          "150g Chicken, 200g Rice, 1 Pepper, 1 Green Chili, Salt to taste",
        HowToMake:
          "Cook the rice according to package instructions. In a separate pan, cook the chicken until fully done. Add chopped pepper and green chili to the chicken and sauté until they're slightly softened. Serve the chicken mixture over the rice, seasoning with salt.",
        TotalCalorie: 600,
      },
      {
        MealPlanNumber: 2,
        MealShortName: "Tuna Salad Sandwich",
        MealIconId: 8,
        Ingredients:
          "100g Tuna, 2 slices Bread, 1 Orange, Salt and Pepper to taste",
        HowToMake:
          "Mix tuna with salt and pepper. Spread on one slice of bread, top with the other slice. Serve with an orange on the side.",
        TotalCalorie: 450,
      },
      {
        MealPlanNumber: 3,
        MealShortName: "Fruit and Milk Bowl",
        MealIconId: 1,
        Ingredients: "1 Apple, 1 Orange, 200ml Milk",
        HowToMake:
          "Chop the apple and orange into bite-sized pieces. Combine in a bowl and pour milk over the top.",
        TotalCalorie: 250,
      },
    ]);
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
