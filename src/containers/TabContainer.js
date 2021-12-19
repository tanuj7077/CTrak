import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import Tab from "../components/Tab";

function TabContainer() {
  const { pages, closeTab, closeAll } = useGlobalContext();
  const deleteTab = (id) => {
    closeTab(id);
  };
  return (
    <div className="tabContainer">
      Tab Container
      {pages.map((tab) => {
        return <Tab key={tab.id} tabData={tab} deleteTab={deleteTab} />;
      })}
      <div className="a" onClick={closeAll}>
        CloseAll
      </div>
    </div>
  );
}

export default TabContainer;
