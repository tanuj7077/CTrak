import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// import LoginModal from "./components/Modals/LoginModal";

import Layout from "./Layout";
import Alert from "./components/Alert";
import Loading from "./components/Loading";
import { useGlobalContext } from "./context";

axios.defaults.withCredentials = true;
function App() {
  const { setIsLoading } = useGlobalContext();
  axios.interceptors.request.use((request) => {
    setIsLoading(true);
    return request;
  });
  axios.interceptors.response.use((response) => {
    setIsLoading(false);
    return response;
  });
  return (
    <Switch>
      <Route path="/" exact>
        <Alert />
        <Loading />
        {/* <LoginModal /> */}
        <Layout />
      </Route>
    </Switch>
  );
}

export default App;
