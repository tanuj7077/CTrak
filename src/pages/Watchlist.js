/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle, IoIosClose } from "react-icons/io";

function SearchModal({
  searchModalVisibility,
  toggleSearchModalVisibility,
  handleAdd,
}) {
  const { trending } = useGlobalContext();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
  return (
    <>
      {searchModalVisibility && (
        <div className="searchModal searchModal-watchList">
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
                    <span className="text">Trending Coins</span>
                  </p>
                  <ul className="searchModal-trendingSection-list">
                    {trending.coins.map((coin) => {
                      return (
                        <li
                          key={`treding_${coin.item.id}`}
                          className="searchModal-trendingSection-list-item"
                          onClick={() => {
                            handleAdd(coin.item.id);
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
                        handleAdd(coin.id);
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
            <div className="searchModal-notFound">
              <div className="searchModal-notFound-container">
                <div className="iconContainer">
                  <IoSearch className="icon" />
                </div>
                <p className="heading">No results for '{searchText}'</p>
                <p className="desc">
                  We couldn't find anything matching your search. Try again with
                  a different term.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
function NewWatchlist({ toggleNewWatchlist, watchListData, editMode }) {
  const { setUserData, userData, changeAlert } = useGlobalContext();
  const [name, setName] = useState(editMode ? watchListData.name : "");
  const [desc, setDesc] = useState(editMode ? watchListData.desc : "");

  const handleCreate = async () => {
    let obj = {
      userId: userData._id,
      name: name,
      desc: desc,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/createWatchlist`, obj)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userData);
        changeAlert(res.data.message);
        toggleNewWatchlist();
      });
  };
  const handleEdit = async () => {
    let obj = {
      userId: userData._id,
      watchlistName: name,
      watchlistDesc: desc,
      watchlistId: watchListData._id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/editWatchlist`, obj)
      .then((res) => {
        setUserData(res.data.userData);
        changeAlert(res.data.message);
        toggleNewWatchlist();
      });
  };
  return (
    <div className="newWatchlistModal">
      <p className="newWatchlistModal-heading">
        {editMode ? "Edit Watchlist" : "New Watchlist"}
      </p>
      <div className="watchlistModal-createSection">
        <div className="inputGrp">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputGrp">
          <label>
            Description
            <span> (optional)</span>
          </label>
          <textarea
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
          <button
            className={`${
              ((!editMode && name.length === 0) ||
                (editMode &&
                  name === watchListData.name &&
                  desc === watchListData.desc)) &&
              "disabled"
            }`}
            onClick={() => {
              if (!editMode) {
                name.length > 0 && handleCreate();
              } else {
                (name !== watchListData.name || desc !== watchListData.desc) &&
                  handleEdit();
              }
            }}
          >
            {editMode ? "Save" : "Create"}
          </button>
          <button onClick={toggleNewWatchlist}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
function Watchlist({ pageData }) {
  const { userData, addTab, setUserData, changeAlert, closeTab } =
    useGlobalContext();
  const [watchlistData, setWatchlistData] = useState();
  const [coins, setCoins] = useState([]);
  const [selectCoin, setSelectCoin] = useState(false);
  const [searchModalVisibility, setSearchModalVisibility] = useState(false);
  const [newWatchlistModalVisibility, setNewWatchlistModalVisibility] =
    useState(false);
  const [editMode, setEditMode] = useState(false);
  const toggleSelectCoin = () => {
    setSelectCoin(!selectCoin);
  };
  const toggleSearchModalVisibility = () => {
    setSearchModalVisibility(!searchModalVisibility);
  };
  const toggleNewWatchlist = () => {
    setNewWatchlistModalVisibility(!newWatchlistModalVisibility);
  };
  const getWatchListCoinsData = async (coinList) => {
    if (coinList && coinList.length > 0) {
      let ids = coinList.reduce((prev, curr, idx) => prev + "%2C" + curr, "");
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/coin/getCoinsByIds/${ids}`)
        .then((res) => {
          console.log(res.data);
          setCoins(res.data);
        });
    } else {
      setCoins([]);
    }
  };
  const deleteCoin = async (coinId) => {
    let obj = {
      userId: userData._id,
      watchlistId: watchlistData._id,
      coinId: coinId,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/deleteCoinFromWatchlist`,
        obj
      )
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userData);
      });
  };
  const checkCoinExistanceInWatchlist = (watchlistId, coinId) => {
    let watchlist = userData.watchList.find((item) => {
      return item._id === watchlistId;
    });
    return watchlist.coins.includes(coinId);
  };
  const handleAdd = async (coinId) => {
    let obj = {
      userId: userData._id,
      watchlistId: watchlistData._id,
      coinId: coinId,
    };
    if (!checkCoinExistanceInWatchlist(watchlistData._id, coinId)) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/addtoWatchlist`, obj)
        .then((res) => {
          setUserData(res.data.userData);
          changeAlert(res.data.message);
          toggleSearchModalVisibility();
        });
    } else {
      changeAlert({
        type: "error",
        messages: ["Coin already exists in selected watchlist"],
      });
    }
  };

  const handleDelete = async () => {
    let obj = {
      userId: userData._id,
      watchlistId: watchlistData._id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/deleteWatchlist`, obj)
      .then((res) => {
        console.log(res.data);
        changeAlert(res.data.message);
        setUserData(res.data.userData);
      });
  };
  useEffect(() => {
    console.log(pageData);
    console.log(userData);
    if (pageData.data) {
      let obj = userData.watchList.find((item) => {
        return item._id === pageData.data._id;
      });
      console.log(obj);
      if (obj) {
        getWatchListCoinsData(obj.coins);
        setWatchlistData(obj);
      } else {
        closeTab(pageData.id);
      }
    }
  }, [pageData.data, userData.watchList]);
  return (
    <div className={`page ${pageData.isCurrent ? "" : "page-invisible"}`}>
      <div className="watchlistPage">
        {userData.watchList.length === 0 && (
          <div className="watchlistPage-noWatchlist">No Watchlist</div>
        )}
        {userData.watchList.length > 0 && pageData.data && watchlistData && (
          <div className="watchlistPage-watchlist">
            <div className="watchlistPage-watchlist-top">
              <div className="heading">
                <p className="name">{watchlistData.name}</p>
                <div className="icons">
                  <div
                    className="icons-iconContainer"
                    onClick={() => {
                      setEditMode(true);
                      toggleNewWatchlist();
                    }}
                  >
                    <MdEdit className="icons-icon" />
                  </div>
                  <div className="icons-iconContainer" onClick={handleDelete}>
                    <MdDelete className="icons-icon" />
                  </div>
                  <FaChevronDown
                    className="icons-icon-chevron"
                    onClick={toggleSelectCoin}
                  />
                </div>
                {selectCoin && (
                  <div className="select">
                    <ul className="select-list">
                      {userData.watchList.map((item) => {
                        return (
                          <li
                            className="select-list-item"
                            key={item._id + "watchListSelect"}
                            onClick={() => {
                              toggleSelectCoin();
                              addTab("watchlist", item);
                            }}
                          >
                            {item.name}
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      className="btn"
                      onClick={() => {
                        setEditMode(false);
                        toggleNewWatchlist();
                      }}
                    >
                      New
                    </button>
                  </div>
                )}
              </div>
              <p className="desc">{watchlistData.desc}</p>
              <button className="btn" onClick={toggleSearchModalVisibility}>
                Add Coin
              </button>
            </div>
            <div className="watchlistPage-watchlist-table">
              <div className="cryptoTable">
                <table>
                  <thead>
                    <tr className="header">
                      <td className="header-data header-data-fixed-rank">#</td>
                      <td className="header-data header-data-fixed-name">
                        Coin
                      </td>
                      <td className="header-data header-data-price">Price</td>
                      <td className="header-data">24h %</td>
                      <td className="header-data">Market Cap</td>
                      <td className="header-data">Volume</td>
                      <td className="header-data">24h High</td>
                      <td className="header-data">24h Low</td>
                      <td className="header-data"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {coins &&
                      coins.map((coin) => {
                        return (
                          <tr
                            key={"watchlist_coinTable" + coin.name}
                            className="body-row"
                          >
                            <td className="body-row-cell body-row-cell-fixed-rank">
                              <p className="rank">{coin.market_cap_rank}</p>
                            </td>
                            <td className="body-row-cell body-row-cell-fixed-coin">
                              <div
                                className="coin"
                                onClick={() => addTab("coin", coin)}
                              >
                                <img
                                  src={coin.image}
                                  alt={coin.symbol + "Img"}
                                  className="coin-img"
                                />
                                <div className="coin-name">
                                  <p className="coin-name-full">
                                    {coin.name.length < 27
                                      ? coin.name
                                      : coin.name.substr(0, 26) + "..."}
                                  </p>
                                  <p className="coin-name-symbol">
                                    {coin.symbol}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="body-row-cell">
                              ${coin.current_price}
                            </td>
                            <td
                              className={`body-row-cell body-row-cell-price ${
                                (coin.price_change_percentage_24h < 0 &&
                                  "body-row-cell-price-down") ||
                                (coin.price_change_percentage_24h > 0 &&
                                  "body-row-cell-price-up")
                              }`}
                            >
                              {coin.price_change_percentage_24h !== null &&
                                coin.price_change_percentage_24h > 0 &&
                                "+" +
                                  coin.price_change_percentage_24h.toFixed(2)}
                              {coin.price_change_percentage_24h !== null &&
                                coin.price_change_percentage_24h <= 0 &&
                                coin.price_change_percentage_24h.toFixed(2)}
                              {coin.price_change_percentage_24h === null && "-"}
                            </td>
                            <td className="body-row-cell">{coin.market_cap}</td>
                            <td className="body-row-cell">
                              {coin.total_volume}
                            </td>
                            <td className="body-row-cell">
                              {coin.high_24h}
                              {coin.high_24h === null && "-"}
                            </td>
                            <td className="body-row-cell">
                              {coin.low_24h}
                              {coin.low_24h === null && "-"}
                            </td>
                            <td className="body-row-cell">
                              <MdDelete
                                className="deleteIcon"
                                onClick={() => deleteCoin(coin.id)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {coins && coins.length === 0 && (
                <div className="empty">
                  <div className="empty-container">
                    <div className="iconContainer">
                      <FaStar className="iconContainer-icon"></FaStar>
                    </div>
                    <p className="heading">Watchlist Empty</p>
                    <p className="desc">
                      You can add coins to watchlist by clicking on the button
                      below
                    </p>
                    <button
                      className="btn"
                      onClick={toggleSearchModalVisibility}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <SearchModal
          searchModalVisibility={searchModalVisibility}
          toggleSearchModalVisibility={toggleSearchModalVisibility}
          handleAdd={handleAdd}
        />
        {newWatchlistModalVisibility && (
          <NewWatchlist
            toggleNewWatchlist={toggleNewWatchlist}
            watchListData={watchlistData}
            editMode={editMode}
          />
        )}
      </div>
    </div>
  );
}

export default Watchlist;
