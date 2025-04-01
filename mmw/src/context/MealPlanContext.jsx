import React, { createContext, useState } from 'react'
export const MealPlanContext = createContext();

export const MealPlanProvider = ({children}) => {
    const [suggestedPlan, setSuggestedPlan] = useState([]);
  
    return (
      <MealPlanContext.Provider value={{ suggestedPlan, setSuggestedPlan }}>
        {children}
      </MealPlanContext.Provider>
    );
  };

  export default MealPlanProvider;