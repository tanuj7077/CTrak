import React from "react";
import { useGlobalContext } from "../context";
import HomePage from "../pages/HomePage";
import CoinPage from "../pages/CoinPage";
import Watchlist from "../pages/Watchlist";

function PageContainer() {
  const { pages } = useGlobalContext();
  return (
    <div className="pageContainer">
      {pages.map((pageData) => {
        return (
          <div key={pageData.id}>
            {pageData.type === "home" && <HomePage pageData={pageData} />}
            {pageData.type === "coin" && <CoinPage pageData={pageData} />}
            {pageData.type === "watchlist" && <Watchlist pageData={pageData} />}
          </div>
        );
      })}
    </div>
  );
}

export default PageContainer;
