import React from "react";
import { useGlobalContext } from "../context";
import HomePage from "../pages/HomePage";
import CoinPage from "../pages/CoinPage";

function PageContainer() {
  const { pages } = useGlobalContext();
  return (
    <div className="pageContainer">
      {pages.map((pageData) => {
        return (
          <div key={pageData.id}>
            {pageData.type === "home" && <HomePage pageData={pageData} />}
            {pageData.type === "coin" && <CoinPage pageData={pageData} />}
          </div>
        );
      })}
    </div>
  );
}
/*
function PageContainer() {
  const { pages } = useGlobalContext();
  return (
    <div className="pageContainer">
      {pages.map((pageData) => {
        return (
          <>
            {pageData.type === "home" && (
              <HomePage key={pageData.id} pageData={pageData} />
            )}
            {pageData.type === "coin" && (
              <CoinPage key={pageData.id} pageData={pageData} />
            )}
          </>
        );
      })}
    </div>
  );
}*/

export default PageContainer;
