import React from "react";
import { useGlobalContext } from "../context";
import HomePage from "../pages/HomePage";

function PageContainer() {
  const { pages } = useGlobalContext();
  return (
    <div className="pageContainer">
      {pages.map((pageData) => {
        return <HomePage key={pageData.id} pageData={pageData} />;
      })}
    </div>
  );
}

export default PageContainer;
