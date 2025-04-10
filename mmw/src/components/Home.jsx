import React, { useContext } from "react";
import CalendarGrid from "./CalendarGrid";
import { UserContext } from "../context/UserContext";

function Home() {
  const { isAuth } = useContext(UserContext);
  return (
    isAuth ? <CalendarGrid/> : <h1>Please create a profile</h1>
  );
}

export default Home;