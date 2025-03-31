import React, { createContext, useState } from "react";
import Notification from "../components/Notification";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <NotificationContext.Provider value={{showModal, setShowModal, modalMessage, showMessage, loading, setLoading,}}>
      {children}
    <Notification />
    </NotificationContext.Provider>
  );
}
