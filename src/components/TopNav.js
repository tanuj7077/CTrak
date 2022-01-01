import React from "react";
import { useGlobalContext } from "../context";
import { IoSearch } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import Asset2 from "../assets/logo/Asset3.svg";

function TopNav() {
  const {
    toggleSearchModalVisibility,
    toggleLoginModalVisibility,
    toggleWatchlistModalVisibility,
    isLoggedIn,
    logout,
  } = useGlobalContext();
  return (
    <div className="topNav">
      <div className="topNav-content">
        <div className="topNav-content-left">
          <div className="topNav-content-left-logo">
            <img src={Asset2} alt="" className="icon" />
            <p className="text">CoinTracker</p>
            {/* <div
              className="logo"
              style={{ WebkitMask: `url(${Asset2}) no-repeat center` }}
            ></div> */}
          </div>
        </div>
        <div className="topNav-content-right">
          {/* <div className="topNav-content-right-item">Home</div> */}
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
      <div className="topNav-global">
        <div className="topNav-global-slider">
          <p className="globalItem">
            <span className="globalItem-topic">Cryptos:</span>
            <span className="globalItem-value">15864</span>
          </p>
          <p className="globalItem">
            <span className="globalItem-topic">Exchanges:</span>
            <span className="globalItem-value">447</span>
          </p>
          <p className="globalItem">
            <span className="globalItem-topic">Market Cap:</span>
            <span className="globalItem-value">$2,146,216,890,682</span>
          </p>
          <p className="globalItem">
            <span className="globalItem-topic">24h Vol:</span>
            <span className="globalItem-value">$89,361,246,307</span>
          </p>
          <p className="globalItem">
            <span className="globalItem-topic">Dominance:</span>
            <span className="globalItem-value">BTC: 40.7% ETH: 21.1%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
