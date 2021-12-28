import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import axios from "axios";
import ScrollObserver from "../Utilities/ScrollObserver";

function SearchModal() {
  const {
    searchModalVisibility,
    toggleSearchModalVisibility,
    userData,
    setUserData,
    trending,
    addTab,
  } = useGlobalContext();
  console.log(userData);
  const [searchText, setSearchText] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const handleSearch = (text) => {
    setSearchText(text);
    text.length > 0 &&
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/coin/search/${text}`)
        .then((res) => {
          setSearchResults(res.data);
          console.log(res.data);
        });
  };
  const addToHistory = (coin) => {
    let obj = {
      userId: userData._id,
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/addRecent`, obj)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userData);
      });
  };
  return (
    <>
      {searchModalVisibility && (
        <div className="searchModal">
          {/* <ScrollObserver /> */}
          <div className="searchModal-inputContainer">
            <IoSearch className="searchIcon" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="What are you looking for?"
            />
            <IoIosCloseCircle
              className="closeIcon"
              onClick={toggleSearchModalVisibility}
            />
          </div>
          {searchText.length === 0 && (
            <div className="searchModal-noInput">
              {trending && (
                <div className="searchModal-trendingSection">
                  <p className="searchModal-trendingSection-heading">
                    <span className="text">Trending</span>
                    <FaFire className="icon" />
                  </p>
                  <ul className="searchModal-trendingSection-list">
                    {trending.coins.map((coin) => {
                      return (
                        <li
                          key={`treding_${coin.item.id}`}
                          className="searchModal-trendingSection-list-item"
                          onClick={() => {
                            toggleSearchModalVisibility();
                            addTab("coin", coin.item);
                          }}
                        >
                          <div className="left">
                            <img src={coin.item.thumb} alt="" className="img" />
                            <div className="name">{coin.item.name}</div>
                            <div className="symbol">{coin.item.symbol}</div>
                          </div>
                          <div className="right">
                            <div className="rank">
                              #{coin.item.market_cap_rank}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {userData && userData.recentSearches.length > 0 && (
                <div className="searchModal-recentSection">
                  <p className="searchModal-recentSection-heading">
                    <span className="text">Recent Searches</span>
                    <IoSearch className="icon" />
                  </p>
                  <div className="searchModal-recentSection-listContainer">
                    <ul className="searchModal-recentSection-listContainer-list">
                      {userData.recentSearches.map((coin) => {
                        return (
                          <li
                            key={`recent_${coin.id}`}
                            className="listItem"
                            onClick={() => {
                              toggleSearchModalVisibility();
                              addTab("coin", coin);
                            }}
                          >
                            <img
                              src={coin.image}
                              alt={"recent_" + coin.id + "_img"}
                              className="img"
                            />
                            <p className="symbol">
                              {coin.symbol.length < 8
                                ? coin.symbol
                                : coin.symbol.substr(0, 6) + "..."}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          {searchText.length > 0 && searchResults.length > 0 && (
            <div className="searchModal-results">
              <p className="searchModal-results-heading">
                <span className="text">Crypto Coins</span>
              </p>
              <ul className="searchModal-results-list">
                {searchResults.map((coin) => {
                  return (
                    <li
                      key={`searchResults_${coin.id}`}
                      className="searchModal-results-list-item"
                      onClick={() => {
                        toggleSearchModalVisibility();
                        userData && addToHistory(coin);
                        addTab("coin", coin);
                        setSearchText("");
                      }}
                    >
                      <div className="left">
                        <img src={coin.image} alt="" className="img" />
                        <div className="name">
                          {coin.name.length <= 21
                            ? coin.name
                            : coin.name.substr(0, 17) + "..."}
                        </div>
                        <div className="symbol">{coin.symbol}</div>
                      </div>
                      <div className="right">
                        <div className="rank">#{coin.market_cap_rank}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {searchText.length > 0 && searchResults.length === 0 && (
            <div className="searchModal-notFound">Not Found</div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchModal;
