/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../context";
import AddToWatchlist from "../components/Modals/WatchListModals/AddToWatchlist";

const Coin = ({ coinInfo }) => {
  const { toggleSelectWatchlistModal } = useGlobalContext();
  let img = coinInfo.image.large,
    name = coinInfo.name,
    symbol = coinInfo.symbol,
    rank = coinInfo.market_cap_rank;
  return (
    <div className="coin">
      <img src={img} alt={"coin_" + symbol + "_img"} className="coin-img" />
      <div className="coin-textual">
        <div className="coin-textual-name">{name}</div>
        <div className="coin-textual-info">
          <p className="coin-textual-symbol">{symbol}</p>
          <p className="coin-textual-rank">{rank}</p>
        </div>
        <button className="info-item btn" onClick={toggleSelectWatchlistModal}>
          Add to Watchlist
        </button>
      </div>
      <AddToWatchlist coin={coinInfo} />
    </div>
  );
};
const CurrentPrice = ({ coinInfo }) => {
  let price = coinInfo.market_data.current_price.usd,
    priceChangePercentage24h = coinInfo.market_data.price_change_percentage_24h,
    priceChangePercentage7d = coinInfo.market_data.price_change_percentage_7d,
    priceChangePercentage30d = coinInfo.market_data.price_change_percentage_30d,
    priceChangePercentage1y = coinInfo.market_data.price_change_percentage_1y,
    price24hLow = coinInfo.market_data.low_24h.usd,
    price24hHigh =
      coinInfo.market_data.high_24h.usd < price
        ? price
        : coinInfo.market_data.high_24h.usd,
    pricePercent = ((price - price24hLow) * 100) / (price24hHigh - price24hLow);
  const [pricePercentTime, setPricePercentTime] = useState("24h"); //24h,7d,1m,1y
  const [priceChange, setPriceChange] = useState(priceChangePercentage24h);
  const [selectTime, setSelectTime] = useState(false);
  const toggleSelectTime = () => {
    setSelectTime(!selectTime);
  };
  useEffect(() => {
    pricePercentTime === "24h" && setPriceChange(priceChangePercentage24h);
    pricePercentTime === "7d" && setPriceChange(priceChangePercentage7d);
    pricePercentTime === "30d" && setPriceChange(priceChangePercentage30d);
    pricePercentTime === "1y" && setPriceChange(priceChangePercentage1y);
  }, [pricePercentTime]);
  return (
    <>
      <div className="coin-price">${price}</div>
      <div className="coin-priceChange">
        <p className="coin-priceChange-topic">price change: </p>
        <p
          className={`coin-priceChange-change ${
            (priceChange < 0 && "coin-priceChange-change-low") ||
            (priceChange > 0 && "coin-priceChange-change-high")
          }`}
        >
          {priceChange !== null
            ? priceChange <= 0
              ? priceChange.toFixed(2)
              : "+" + priceChange.toFixed(2)
            : "-"}
        </p>
        <p className="coin-priceChange-time" onClick={toggleSelectTime}>
          <span className="time">24h</span>
          <span className="dropdownIcon"></span>
        </p>
        {selectTime && (
          <div className="timeDropdown">
            <p
              className="timeDropdown-item"
              onClick={() => setPricePercentTime("24h")}
            >
              24h
            </p>
            <p
              className="timeDropdown-item"
              onClick={() => setPricePercentTime("7d")}
            >
              7d
            </p>
            <p
              className="timeDropdown-item"
              onClick={() => setPricePercentTime("30d")}
            >
              30d
            </p>
            <p
              className="timeDropdown-item"
              onClick={() => setPricePercentTime("1y")}
            >
              1y
            </p>
          </div>
        )}
      </div>
      <div className="coin-progress">
        <p className="coin-progress-level">
          <span className="heading">Low</span>
          <span className="value">{price24hLow}</span>
        </p>
        <div className="coin-progress-graph">
          <span
            style={{ transform: `translateX(${pricePercent + "%"})` }}
          ></span>
        </div>
        <p className="coin-progress-level">
          <span className="heading">High</span>
          <span className="value">{price24hHigh}</span>
        </p>
      </div>
    </>
  );
};
const MarketCap = ({ coinInfo }) => {
  let marketCap = coinInfo.market_data.market_cap.usd,
    marketCapPercent = coinInfo.market_data.market_cap_change_percentage_24h;
  return (
    <>
      {marketCap && (
        <div className="coinExtraInfo marketCap">
          <div className="coinExtraInfo-item">
            <p className="coinExtraInfo-topic">Market Cap</p>
            <p className="coinExtraInfo-value">{marketCap}</p>
            {marketCapPercent && (
              <p className="coinExtraInfo-percent">
                <span
                  className={`percent ${
                    marketCapPercent > 0 ? "percent-up" : "percent-down"
                  }`}
                >
                  {marketCapPercent > 0
                    ? "+" + marketCapPercent.toFixed(2)
                    : marketCapPercent.toFixed(2)}
                </span>
                <span className="time">24h</span>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
const Volume = ({ coinInfo }) => {
  let volume = coinInfo.market_data.total_volume.usd,
    fullyDiluted = coinInfo.market_data.fully_diluted_valuation.usd;
  return (
    <>
      <div className="coinExtraInfo volume">
        {volume && (
          <div className="coinExtraInfo-item">
            <p className="coinExtraInfo-topic">Volume</p>
            <p className="coinExtraInfo-value">{volume}</p>
          </div>
        )}
        {fullyDiluted && (
          <div className="coinExtraInfo-item">
            <p className="coinExtraInfo-topic">Fully Diluted Valuation</p>
            <p className="coinExtraInfo-value">{fullyDiluted}</p>
          </div>
        )}
      </div>
    </>
  );
};
const AllTimeData = ({ coinInfo }) => {
  let current = coinInfo.market_data.current_price.usd,
    ath =
      coinInfo.market_data.ath.usd < current
        ? current
        : coinInfo.market_data.ath.usd,
    atl = coinInfo.market_data.atl.usd,
    pricePercent = (current * 100) / ath;

  return (
    <>
      <div className="coinExtraInfo allTimeData">
        {ath && (
          <div className="coinExtraInfo-item coinExtraInfo-item-inline">
            <p className="coinExtraInfo-topic">All Time High: </p>
            <p className="coinExtraInfo-value">{ath}</p>
          </div>
        )}
        {atl && (
          <div className="coinExtraInfo-item coinExtraInfo-item-inline">
            <p className="coinExtraInfo-topic">All Time Low: </p>
            <p className="coinExtraInfo-value">{atl}</p>
          </div>
        )}
        <div className="coinExtraInfo-item">
          <div className="coinExtraInfo-graph">
            <span
              style={{ transform: `translateX(${pricePercent + "%"})` }}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};
const Supply = ({ coinInfo }) => {
  let maxSupply = coinInfo.market_data.max_supply,
    circulatinSupply = coinInfo.market_data.circulating_supply,
    pricePercent = (circulatinSupply * 100) / maxSupply;

  return (
    <>
      <div className="coinExtraInfo allTimeData">
        {maxSupply && (
          <div className="coinExtraInfo-item coinExtraInfo-item-inline">
            <p className="coinExtraInfo-topic">Max Supply: </p>
            <p className="coinExtraInfo-value">{maxSupply}</p>
          </div>
        )}
        {circulatinSupply && (
          <div className="coinExtraInfo-item coinExtraInfo-item-inline">
            <p className="coinExtraInfo-topic">Circulating Supply: </p>
            <p className="coinExtraInfo-value">{circulatinSupply}</p>
          </div>
        )}
        {maxSupply && (
          <div className="coinExtraInfo-item">
            <div className="coinExtraInfo-graph">
              <span
                style={{ transform: `translateX(${pricePercent + "%"})` }}
              ></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const Chart = ({ coinId }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  let options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "#e1e4ea",
        },
      },
      y: {
        grid: {
          display: false,
          color: "#e1e4ea",
        },
      },
    },
  };
  const getHistoricData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/coin/coinHistorical?id=${coinId}&days=${days}`
      )
      .then((res) => {
        setHistoricalData(res.data);
      });
  };
  useEffect(() => {
    getHistoricData();
  }, [days]);
  return (
    <div className="chartContainer">
      <div className="chartContainer-buttons">
        <button
          className={`chartContainer-buttons-btn ${
            days === 1 && "chartContainer-buttons-btn-current"
          }`}
          onClick={() => setDays(1)}
        >
          24 hours
        </button>
        <button
          className={`chartContainer-buttons-btn ${
            days === 7 && "chartContainer-buttons-btn-current"
          }`}
          onClick={() => setDays(7)}
        >
          1 Week
        </button>
        <button
          className={`chartContainer-buttons-btn ${
            days === 30 && "chartContainer-buttons-btn-current"
          }`}
          onClick={() => setDays(30)}
        >
          1 Month
        </button>
        <button
          className={`chartContainer-buttons-btn ${
            days === 180 && "chartContainer-buttons-btn-current"
          }`}
          onClick={() => setDays(180)}
        >
          6 Months
        </button>
        <button
          className={`chartContainer-buttons-btn ${
            days === 365 && "chartContainer-buttons-btn-current"
          }`}
          onClick={() => setDays(365)}
        >
          1 Year
        </button>
      </div>
      <div className="chartContainer-chart">
        {historicalData && (
          <Line
            data={{
              labels: historicalData.prices.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.prices.map((coin) => coin[1]),
                  borderColor: "#3a83e4",
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    </div>
  );
};
/*
const Converter = ({ coinInfo }) => {
  return (
    <div className="converter">
      <p className="converter-heading">
        <span>{coinInfo.symbol} </span>
        to USD Converter
      </p>
    </div>
  );
};*/

function CoinPage({ pageData }) {
  const [coinData, setCoinData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/coin/coin/${pageData.data.id}`)
      .then((res) => {
        setCoinData(res.data);
      });
  }, [pageData.id]);
  return (
    <div className={`page ${pageData.isCurrent ? "" : "page-invisible"}`}>
      {coinData && (
        <div className="coinPage">
          <div className="coinPage-coin">
            <div className="coinPage-coin-info">
              <div className="left">
                <Coin coinInfo={coinData} />
              </div>
              <div className="right">
                <CurrentPrice coinInfo={coinData} />
              </div>
            </div>
            <div className="coinPage-coin-extraInfo">
              <Volume coinInfo={coinData} />
              <AllTimeData coinInfo={coinData} />
              <MarketCap coinInfo={coinData} />
              <Supply coinInfo={coinData} />
            </div>
          </div>

          {coinData && (
            <div className="coinPage-graph">
              <Chart coinId={coinData.id} />
            </div>
          )}

          {/* <div className="coinPage-converter">
            <Converter coinInfo={coinData} />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CoinPage;
