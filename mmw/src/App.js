import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frame from "./components/Frame";
import Home from "./components/Home";
import DietaryForm from "./components/DietForm";
import MealPlanList from "./components/MealCard";
import Profile from "./components/Profile";

function App() {
  const mPlan = [
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
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frame />}>
          <Route index element={<Home />} />
          <Route path="dietary-form" element={<DietaryForm />} />
          <Route path="meal-plans" element={<MealPlanList mealPlans={mPlan}/>} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
