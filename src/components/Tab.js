import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

function Tab({ tabData, deleteTab }) {
  const { changeCurrentTab } = useGlobalContext();
  //console.log(tabData);
  return (
    <div className={`tab ${tabData.isCurrent ? "tab-current" : ""}`}>
      <div className="tab-content">
        <div
          className="tab-content-heading"
          onClick={() => changeCurrentTab(tabData.id)}
        >
          Sub
        </div>
        <div className="tab-content-subheading">{tabData.type}</div>
      </div>
      <div className="tab-close" onClick={() => deleteTab(tabData.id)}>
        x
      </div>
    </div>
  );
}

export default Tab;
