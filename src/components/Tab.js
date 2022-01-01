import React from "react";
import { useGlobalContext } from "../context";
import { IoIosClose } from "react-icons/io";

function Tab({ tabData, deleteTab }) {
  const { changeCurrentTab } = useGlobalContext();
  return (
    <div
      className={`tab ${tabData.isCurrent ? "tab-current" : ""}`}
      onClick={() => changeCurrentTab(tabData.id)}
    >
      <div className="tab-content">
        <div className="tab-content-heading">
          {tabData.type === "coin" && "Coin"}
        </div>
        <div className="tab-content-subheading">
          {tabData.type === "home" && "Home"}
          {tabData.type === "coin" && tabData.data.symbol}
          {tabData.type === "watchlist" && "Watchlist"}
        </div>
      </div>
      {tabData.type !== "home" && (
        <IoIosClose
          className="tab-close"
          onClick={(e) => {
            e.stopPropagation();
            deleteTab(tabData.id);
          }}
        />
      )}
    </div>
  );
}

export default Tab;
