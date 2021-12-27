import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const toggleLoginModalVisibility = () => {
    setLoginModalVisible(!loginModalVisible);
  };

  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(0);
  const [pages, setPages] = useState([
    {
      id: 1,
      type: "home",
      isCurrent: true,
      data: null,
    },
  ]);
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
  };

  const changeAlert = (msg) => {
    setAlert(msg);
    setShowAlert(1);
  };
  const addTab = (type, data) => {
    let newPages = [...pages];
    let obj = {
      id: new Date().getTime(),
      type: type,
      isCurrent: true,
      data: {
        id: data.id,
        symbol: data.symbol,
      },
    };
    newPages.push(obj);
    let changedValue = newPages.map((item) => {
      let newObj;
      if (item.id !== obj.id) {
        newObj = { ...item };
        newObj.isCurrent = false;
      } else {
        newObj = { ...item };
      }
      return newObj;
    });
    setPages(changedValue);
    //setPages(newPages);
  };
  const checkTabExistance = (id) => {};
  const closeTab = (id) => {
    const index = pages.findIndex((page) => page.id === id);
    const currentIndex = pages.findIndex((page) => page.isCurrent);
    let newPages = pages.slice();
    newPages.splice(index, 1);
    let newCurrentId;
    if (newPages.length >= 1) {
      if (currentIndex > index) {
        newCurrentId = newPages[currentIndex - 1].id;
      } else if (currentIndex === index) {
        if (currentIndex - 1 >= 0) {
          newCurrentId = newPages[currentIndex - 1].id;
        } else {
          newCurrentId = newPages[currentIndex].id;
        }
      } else {
        newCurrentId = newPages[currentIndex].id;
      }
      let changedValue = newPages.map((item) => {
        let obj;
        if (item.id === newCurrentId) {
          obj = { ...item };
          obj.isCurrent = true;
        } else {
          obj = { ...item };
          obj.isCurrent = false;
        }
        return obj;
      });
      setPages(changedValue);
    }
  };
  const changeCurrentTab = (id) => {
    let changedValue = pages.map((item) => {
      let obj;
      if (item.id === id) {
        obj = { ...item };
        obj.isCurrent = true;
      } else {
        obj = { ...item };
        obj.isCurrent = false;
      }
      return obj;
    });
    setPages(changedValue);
  };
  const closeAll = () => {
    setPages([]);
  };
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setUserData,
        changeAlert,
        setShowAlert,
        isLoading,
        setIsLoading,
        pages,
        addTab,
        checkTabExistance,
        closeTab,
        changeCurrentTab,
        closeAll,
        loginModalVisible,
        toggleLoginModalVisibility,
        login,
        signup,
        logout,
        alert,
        showAlert,
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
