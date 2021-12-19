import React from "react";
import { useGlobalContext } from "./context";
import TopNav from "./components/TopNav";

function Layout() {
  const {} = useGlobalContext();
  return (
    <div className="layout">
      <TopNav />
    </div>
  );
}

export default Layout;
