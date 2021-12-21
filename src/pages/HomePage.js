import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import { coinGeckoApi, coinTypes } from "../components/Utilities/constants";

function HomePage({ pageData }) {
  const [categories, setCategories] = useState([]);
  const [listData, setListData] = useState({
    category: "",
    order: "market_cap_desc",
    per_page: 10,
    page: 1,
  });
  const [coins, setCoins] = useState([]);
  const changeListData = (type, value) => {
    if (type === "category") {
      let newListData = { ...listData };
      newListData.category = value;
      setListData(newListData);
    }
  };
  const getCoins = async () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/coin/coinList`, listData)
      .then((res) => {
        console.log(res.data);
        setCoins(res.data);
      });
  };
  useEffect(() => {
    getCoins();
  }, [listData]);
  return (
    <div className={`page ${pageData.isCurrent ? "" : "page-invisible"}`}>
      <div className="homePage">
        <Search />
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
                  onClick={() => changeListData("category", coin.value)}
                >
                  {coin.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="cryptoTable">
          <table>
            <thead>
              <tr className="header">
                <td className="header-data header-data-fixed-rank">#</td>
                <td className="header-data header-data-fixed-name">Name</td>
                {/* decide on left position from measuring distance between 
                table left and Name left */}
                <td className="header-data">Price</td>
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
                    <tr className="body-row">
                      <td className="body-row-cell body-row-cell-fixed-rank">
                        <p className="rank">{coin.market_cap_rank}</p>
                      </td>
                      <td className="body-row-cell body-row-cell-fixed-coin">
                        <div className="coin">
                          <img
                            src={coin.image}
                            alt={coin.symbol + "Img"}
                            className="coin-img"
                          />
                          <div className="coin-name">
                            <p className="coin-name-full">{coin.name}</p>
                            <p className="coin-name-symbol">{coin.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="body-row-cell">${coin.current_price}</td>
                      <td className="body-row-cell">
                        <p className="coin-percentage">
                          {coin.price_change_percentage_24h}
                        </p>
                      </td>
                      <td className="body-row-cell">{coin.market_cap}</td>
                      <td className="body-row-cell">{coin.total_volume}</td>
                      <td className="body-row-cell">{coin.high_24h}</td>
                      <td className="body-row-cell">{coin.low_24h}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
