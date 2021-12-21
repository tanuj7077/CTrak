import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

function Tab({ tabData, deleteTab }) {
  const { changeCurrentTab } = useGlobalContext();
  //console.log(tabData);
  return (
    <div className={`tab ${tabData.isCurrent ? "tab-current" : ""}`}>
      <div className="tab-content" onClick={() => changeCurrentTab(tabData.id)}>
        <div className="tab-content-heading"></div>
        <div className="tab-content-subheading">
          {tabData.type === "home" && "Home"}
        </div>
      </div>
      {tabData.type !== "home" && (
        <IoIosClose
          className="tab-close"
          onClick={() => deleteTab(tabData.id)}
        />
      )}
    </div>
  );
}

export default Tab;
