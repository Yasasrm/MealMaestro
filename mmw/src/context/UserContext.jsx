import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [uemail, setUEmail] = useState("");
  const [uname, setUname] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [uBday, setUBday] = useState("");
  const [uAge, setUAge] = useState("");
  const [uGender, setUGender] = useState("");
  const [uWeight, setUWeight] = useState("");
  const [uHeight, setUHeight] = useState("");
  const [uActivity, setUActivity] = useState("");
  const [uAllergy, setUAllergy] = useState("");
  const [uGoal, setUGoal] = useState("");
  const [uTcal, setUTcal] = useState("");
  const [uTcarb, setUTcarb] = useState("");
  const [uTpro, setUTpro] = useState("");
  const [uTfat, setUTfat] = useState("");
  const [isCurentMealPlanSaved, setIsCurentMealPlanSaved] = useState(false);
  return (
    <UserContext.Provider
      value={{
        uemail,
        setUEmail,
        uname,
        setUname,
        isAuth,
        setIsAuth,uBday, setUBday,
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
