import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { IoSearch } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import Asset2 from "../assets/logo/Asset3.svg";
import axios from "axios";

function TopNav() {
  const {
    toggleSearchModalVisibility,
    toggleLoginModalVisibility,
    toggleWatchlistModalVisibility,
    isLoggedIn,
    logout,
  } = useGlobalContext();
  const [globalData, setGlobalData] = useState();
  const getGlobalData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/coin/globalData`)
      .then((res) => {
        if (res.data.status.error_code === 0) {
          setGlobalData(res.data.data);
        }
      });
  };
  useEffect(() => {
    getGlobalData();
  }, []);
  return (
    <div className="topNav">
      <div className="topNav-content">
        <div className="topNav-content-left">
          <div className="topNav-content-left-logo">
            <img src={Asset2} alt="" className="icon" />
            <p className="text">CoinTracker</p>
          </div>
        </div>
        <div className="topNav-content-right">
          <div
            className="topNav-content-right-item"
            onClick={toggleSearchModalVisibility}
          >
            <span>Search</span>
            <IoSearch className="icon" />
          </div>
          {isLoggedIn && (
            <div
              className="topNav-content-right-item"
              onClick={toggleWatchlistModalVisibility}
            >
              <span>Watchlist</span>
              <FaListUl className="icon" />
            </div>
          )}

          {isLoggedIn ? (
            <div className="topNav-content-right-item" onClick={logout}>
              <span>Logout</span>
              <IoMdLogOut className="icon" />
            </div>
          ) : (
            <div
              className="topNav-content-right-item"
              onClick={toggleLoginModalVisibility}
            >
              <span>Login</span>
              <AiOutlineLogin className="icon" />
            </div>
          )}
        </div>
      </div>
      {globalData && (
        <div className="topNav-global">
          <div className="topNav-global-slider">
            <p className="globalItem">
              <span className="globalItem-topic">Active Cryptos:</span>
              <span className="globalItem-value">
                {globalData.active_cryptocurrencies}
              </span>
            </p>
            <p className="globalItem">
              <span className="globalItem-topic">Active Exchanges:</span>
              <span className="globalItem-value">
                {globalData.active_exchanges}
              </span>
            </p>
            <p className="globalItem">
              <span className="globalItem-topic">Market Cap:</span>
              <span className="globalItem-value">
                ${globalData.quote.USD.total_market_cap.toFixed(2)}
              </span>
            </p>
            <p className="globalItem">
              <span className="globalItem-topic">24h Vol:</span>
              <span className="globalItem-value">
                ${globalData.quote.USD.total_volume_24h.toFixed(2)}
              </span>
            </p>
            <p className="globalItem">
              <span className="globalItem-topic">Dominance:</span>
              <span className="globalItem-value">
                BTC: {globalData.btc_dominance.toFixed(2)}% ETH:{" "}
                {globalData.eth_dominance.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopNav;
