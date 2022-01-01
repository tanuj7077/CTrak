import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { isLoading } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  return (
    <>
      <div
        className={`loadingAnim ${!loading && "loadingAnim-invisible"}`}
      ></div>
    </>
  );
};

export default Loading;
