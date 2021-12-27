import React from "react";
//import { useGlobalContext } from "./context";
import TopNav from "./components/TopNav";
import TabContainer from "./containers/TabContainer";
import PageContainer from "./containers/PageContainer";
import LoginModal from "./components/Modals/LoginModal";
import Alert from "./components/Alert";

function Layout() {
  //const {} = useGlobalContext();
  return (
    <div className="layout">
      <TopNav />
      <TabContainer />
      <PageContainer />
      <LoginModal />
      <Alert />
    </div>
  );
}

export default Layout;
