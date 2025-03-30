import React, { createContext, useState, useContext } from 'react';
import Info from '../components/Info';

export const InfoContext = createContext();

export function InfoProvider({ children }) {
  const [show, setShow] = useState(false);
  const [infoTopic, setInfoTopic] = useState(" ");
  const [infoMessage, setInfoMessage] = useState(" ");

  return (
    <InfoContext.Provider value={{ show, setShow, infoTopic, setInfoTopic, infoMessage, setInfoMessage}}>
      {children}
      <Info />
    </InfoContext.Provider>
  );
}

export function useOffcanvas() {
  return useContext(InfoContext);
}