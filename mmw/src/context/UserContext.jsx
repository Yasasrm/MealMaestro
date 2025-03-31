import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [uname, setUname] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [uAge, setUAge] = useState("");
  const [uGender, setUGender] = useState("male");
  const [uWeight, setUWeight] = useState("");
  const [uHeight, setUHeight] = useState("");
  const [uActivity, setUActivity] = useState("sedentary");
  const [uAllergy, setUAllergy] = useState("");
  const [uGoal, setUGoal] = useState("weight_loss");
  const [uTcal, setUTcal] = useState("");
  const [uTcarb, setUTcarb] = useState("");
  const [uTpro, setUTpro] = useState("");
  const [uTfat, setUTfat] = useState("");
  const [isCurentMealPlanSaved, setIsCurentMealPlanSaved] = useState(false);
  return (
    <UserContext.Provider
      value={{
        uname,
        setUname,
        isAuth,
        setIsAuth,
        uAge,
        setUAge,
        uGender,
        setUGender,
        uWeight,
        setUWeight,
        uHeight,
        setUHeight,
        uActivity,
        setUActivity,
        uAllergy,
        setUAllergy,
        uGoal,
        setUGoal,
        uTcal,
        setUTcal,
        uTcarb,
        setUTcarb,
        uTpro,
        setUTpro,
        uTfat,
        setUTfat,
        isCurentMealPlanSaved,
        setIsCurentMealPlanSaved,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
