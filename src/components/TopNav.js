import React from "react";
import { useGlobalContext } from "../context";

function TopNav() {
  const { addTab } = useGlobalContext();
  return <div onClick={addTab}>Topnav</div>;
}

export default TopNav;
