/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
//import Search from "../components/Search";
import axios from "axios";
import { coinTypes } from "../components/Utilities/constants";
import { useGlobalContext } from "../context";
//import { FaChevronDown } from "react-icons/fa";

function HomePage({ pageData }) {
  const { addTab } = useGlobalContext();
  //const [categories, setCategories] = useState([]);
  const [listData, setListData] = useState({
    category: "",
    order: "market_cap_desc",
    per_page: 50,
    page: 1,
  });
  const [coins, setCoins] = useState([]);
  const changeListData = (type, value) => {
    if (type === "category") {
      let newListData = { ...listData };
      newListData.category = value;
      newListData.page = 1;
      setListData(newListData);
    }
    if (type === "page") {
      let newListData = { ...listData };
      newListData.page = value;
      setListData(newListData);
    }
  };
  const getCoins = async () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/coin/coinList`, listData)
      .then((res) => {
        setCoins([...coins, ...res.data]);
      });
  };
  useEffect(() => {
    getCoins();
  }, [listData.category, listData.page]);
  return (
    <div className={`page ${pageData.isCurrent ? "" : "page-invisible"}`}>
      <div className="homePage">
        <div className="categoryContainer">
          <div className="categoryContainer-categories">
            {coinTypes.map((coin, idx) => {
              return (
                <button
                  key={coin.name + idx}
                  className={`categoryContainer-categories-category ${
                    listData.category === coin.value
                      ? "categoryContainer-categories-category-current"
                      : ""
                  }`}
                  onClick={() => {
                    setCoins([]);
                    changeListData("category", coin.value);
                  }}
                >
                  {coin.name}
                </button>
              );
            })}
          </div>
        </div>
        {coins && coins.length > 0 && (
          <div className="cryptoTable">
            <table>
              <thead>
                <tr className="header">
                  <td className="header-data header-data-fixed-rank">#</td>
                  <td className="header-data header-data-fixed-name">Coin</td>
                  <td className="header-data header-data-price">Price</td>
                  <td className="header-data">24h %</td>
                  <td className="header-data">Market Cap</td>
                  <td className="header-data">Volume</td>
                  <td className="header-data">24h High</td>
                  <td className="header-data">24h Low</td>
                </tr>
              </thead>
              <tbody>
                {coins &&
                  coins.map((coin) => {
                    return (
                      <tr key={"coinTable" + coin.name} className="body-row">
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
                              <p className="coin-name-symbol">{coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="body-row-cell">${coin.current_price}</td>
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
                            "+" + coin.price_change_percentage_24h.toFixed(2)}
                          {coin.price_change_percentage_24h !== null &&
                            coin.price_change_percentage_24h <= 0 &&
                            coin.price_change_percentage_24h.toFixed(2)}
                          {coin.price_change_percentage_24h === null && "-"}
                        </td>
                        <td className="body-row-cell">{coin.market_cap}</td>
                        <td className="body-row-cell">{coin.total_volume}</td>
                        <td className="body-row-cell">
                          {coin.high_24h}
                          {coin.high_24h === null && "-"}
                        </td>
                        <td className="body-row-cell">
                          {coin.low_24h}
                          {coin.low_24h === null && "-"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {coins && coins.length > 0 && (
          <button
            className="more"
            onClick={() => {
              //setCoins([]);
              changeListData("page", listData.page + 1);
            }}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
