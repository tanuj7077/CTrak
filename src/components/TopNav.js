import React from "react";
import { useGlobalContext } from "../context";

function TopNav() {
  const {
    toggleSearchModalVisibility,
    toggleLoginModalVisibility,
    isLoggedIn,
    logout,
  } = useGlobalContext();
  return (
    <div className="topNav">
      <div className="topNav-content">
        <div className="topNav-content-left">
          <div className="topNav-content-left-logo">CoinTracker</div>
        </div>
        <div className="topNav-content-right">
          {/* <div className="topNav-content-right-item">Home</div> */}
          <div
            className="topNav-content-right-item"
            onClick={toggleSearchModalVisibility}
          >
            Search
          </div>
          {isLoggedIn && (
            <div className="topNav-content-right-item">Watchlist</div>
          )}

          {isLoggedIn ? (
            <div className="topNav-content-right-item" onClick={logout}>
              Logout
            </div>
          ) : (
            <div
              className="topNav-content-right-item"
              onClick={toggleLoginModalVisibility}
            >
              Login
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
