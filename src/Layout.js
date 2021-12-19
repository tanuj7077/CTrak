import React from "react";
import { useGlobalContext } from "./context";
import TopNav from "./components/TopNav";
import TabContainer from "./containers/TabContainer";
import PageContainer from "./containers/PageContainer";

function Layout() {
  const {} = useGlobalContext();
  return (
    <div className="layout">
      <TopNav />
      <TabContainer />
      <PageContainer />
    </div>
  );
}

export default Layout;
