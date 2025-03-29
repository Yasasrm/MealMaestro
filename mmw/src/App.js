import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frame from "./components/Frame";
import Home from "./components/Home";
import DietaryForm from "./components/DietForm";
import MealPlanList from "./components/MealCard";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Home />} />
            <Route path="dietary-form" element={<DietaryForm />} />
            <Route
              path="meal-plans"
              element={<MealPlanList/>}
            />
            <Route path="profile" element={<Profile />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
