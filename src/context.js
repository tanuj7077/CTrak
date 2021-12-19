import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(0);
  const [tabs, setTabs] = useState();

  const changeAlert = (msg) => {
    setAlert(msg);
    setShowAlert(1);
  };
  const addTab = () => {};
  const checkTabExistance = (id) => {};
  const closeTab = () => {};
  const changeCurrentTab = (id) => {};
  /*
  const login = (loginUsername, loginPassword) => {
    const data = {
      username: loginUsername,
      password: loginPassword,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signin`, data)
      .then((res) => {
        changeAlert(res.data.msg);
        if (res.data.msg.type === "success") {
          setUserData(res.data.userData);
          setIsLoggedIn(true);
          setLoginModalVisible(false);
        }
      });
  };
  const signup = (registerUsername, registerPassword) => {
    const data = {
      username: registerUsername,
      password: registerPassword,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, data)
      .then((res) => {
        changeAlert(res.data.msg);
      });
  };
  const logout = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/auth/signout`)
        .then((res) => {
          if (res.data.success) {
            changeAlert(res.data.msg);
            setUserData({});
            setIsLoggedIn(false);
            //changeAlert(res.data.message);
            //return <Redirect to="/" exact />;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };*/
  const calculateTimeDifference = (date) => {};
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        changeAlert,
        setShowAlert,
        isLoading,
        setIsLoading,
        tabs,
        setTabs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
