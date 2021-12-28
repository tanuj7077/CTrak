/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// import LoginModal from "./components/Modals/LoginModal";

import Layout from "./Layout";
import Alert from "./components/Alert";
import Loading from "./components/Loading";
import { useGlobalContext } from "./context";
import LoginModal from "./components/Modals/LoginModal";
import SearchModal from "./components/Modals/SearchModal";
import WatchListModal from "./components/Modals/WatchListModal";

axios.defaults.withCredentials = true;
function App() {
  const { setIsLoading, setIsLoggedIn, setUserData, isLoggedIn } =
    useGlobalContext();
  axios.interceptors.request.use((request) => {
    setIsLoading(true);
    return request;
  });
  axios.interceptors.response.use((response) => {
    setIsLoading(false);
    return response;
  });
  const getLoggedIn = async () => {
    const loggedInRes = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/auth/loggedIn`
    );
    if (loggedInRes.data.loggedIn) {
      setIsLoggedIn(true);
      setUserData(loggedInRes.data.userData);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      getLoggedIn();
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact>
        <Alert />
        <Loading />
        <LoginModal />
        <SearchModal />
        <WatchListModal />
        <Layout />
      </Route>
    </Switch>
  );
}

export default App;
