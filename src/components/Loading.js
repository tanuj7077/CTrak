import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { isLoading } = useGlobalContext();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  return (
    <>
      <div
        className={`loadingAnim ${
          (!loading || location.pathname.split("/").map(String)[1] === "") &&
          "loadingAnim-invisible"
        }`}
      ></div>
    </>
  );
};

export default Loading;
