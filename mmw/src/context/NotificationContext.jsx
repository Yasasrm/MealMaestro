import React, { createContext, useState } from "react";

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
    <NotificationContext.Provider
      value={{
        showModal,
        setShowModal,
        modalMessage,
        showMessage,
        loading,
        setLoading,
      }}
    >
      {children}

      <div
        className={`modal fade ${showModal ? "show d-block" : "d-none"}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {loading ? (
                <div className="text-center">
                  <div
                    className="spinner-grow"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                  {modalMessage.includes("ERROR:") ? (
                    <div className="alert alert-danger" role="alert">
                      {modalMessage}
                    </div>
                  ) : (
                    <div className="alert alert-success" role="alert">
                      {modalMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </NotificationContext.Provider>
  );
}
