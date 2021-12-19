import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../context";

const Alert = () => {
  const { alert, showAlert, setShowAlert } = useGlobalContext();

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(0);
      }, 3000);
    }
  }, [showAlert]);
  return (
    <>
      {showAlert && alert ? (
        <div
          className={`alertBox ${
            alert.type === "error" ? "alertBox-error" : "alertBox-success"
          }`}
        >
          {alert.messages.map((item, i) => {
            return (
              <span
                key={`alert-${i}`}
                className={`alertText ${
                  alert.type === "error"
                    ? "alertText-error"
                    : "alertText-success"
                }`}
              >
                {item}
              </span>
            );
          })}
          <IoClose className="alertClose" onClick={() => setShowAlert(0)} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Alert;
