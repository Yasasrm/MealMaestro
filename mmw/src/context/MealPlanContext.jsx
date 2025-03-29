import React, { createContext, useState } from 'react'
export const MealPlanContext = createContext();

export const MealPlanProvider = ({children}) => {
    const [mealPlanList, setMealPlanList] = useState([]);
  
    return (
      <MealPlanContext.Provider value={{ mealPlanList, setMealPlanList }}>
        {children}
      </MealPlanContext.Provider>
    );
  };

  export default MealPlanProvider;