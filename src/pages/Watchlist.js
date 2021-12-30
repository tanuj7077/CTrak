/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

function Watchlist({ pageData }) {
  const { userData, addTab, setUserData } = useGlobalContext();
  const [watchlistData, setWatchlistData] = useState();
  const [coins, setCoins] = useState([]);
  const [selectCoin, setSelectCoin] = useState(false);
  const toggleSelectCoin = () => {
    setSelectCoin(!selectCoin);
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
  useEffect(() => {
    console.log(pageData);
    console.log(userData);
    if (pageData.data) {
      let obj = userData.watchList.find((item) => {
        return item._id === pageData.data._id;
      });
      getWatchListCoinsData(obj.coins);
      setWatchlistData(obj);
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
                  <div className="icons-iconContainer">
                    <MdEdit className="icons-icon" />
                  </div>
                  <div className="icons-iconContainer">
                    <MdDelete className="icons-icon" />
                  </div>
                  <FaChevronDown
                    className="icons-icon"
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
                  </div>
                )}
              </div>
              <p className="desc">{watchlistData.desc}</p>
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
                    <button className="btn">Add</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
