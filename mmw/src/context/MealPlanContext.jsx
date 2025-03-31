import React, { createContext, useState } from 'react'
export const MealPlanContext = createContext();

export const MealPlanProvider = ({children}) => {
    const [mealPlanList, setMealPlanList] = useState([]);
    const [suggestedPlan, setSuggestedPlan] = useState([]);
  
    return (
      <MealPlanContext.Provider value={{ mealPlanList, setMealPlanList, suggestedPlan, setSuggestedPlan }}>
        {children}
      </MealPlanContext.Provider>
    );
  };

  export default MealPlanProvider;