import React from "react";
import TopNav from "./components/TopNav";
import TabContainer from "./containers/TabContainer";
import PageContainer from "./containers/PageContainer";

function Layout() {
  return (
    <div className="layout">
      <TopNav />
      <TabContainer />
      <PageContainer />
    </div>
  );
}

export default Layout;
