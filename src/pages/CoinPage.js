import React, { useState, useEffect } from "react";
import axios from "axios";

const Coin = ({ coinInfo }) => {
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
        <button className="info-item btn">Add to Watchlist</button>
      </div>
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
  return (
    <>
      <div className="coin-price">${price}</div>
      <div className="coin-priceChange">
        <p className="coin-priceChange-topic">price change: </p>
        <p
          className={`coin-priceChange-change ${
            (priceChangePercentage24h < 0 && "coin-priceChange-change-low") ||
            (priceChangePercentage24h > 0 && "coin-priceChange-change-high")
          }`}
        >
          {priceChangePercentage24h !== null
            ? priceChangePercentage24h.toFixed(2)
            : "-"}
        </p>
        <p className="coin-priceChange-time">
          <span className="time">24h</span>
          <span className="dropdownIcon"></span>
        </p>
      </div>
      <div className="coin-progress">
        <p className="coin-progress-level">
          <p className="heading">Low</p>
          <p className="value">{price24hLow}</p>
        </p>
        <div className="coin-progress-graph">
          <span
            style={{ transform: `translateX(${pricePercent + "%"})` }}
          ></span>
        </div>
        <p className="coin-progress-level">
          <p className="heading">High</p>
          <p className="value">{price24hHigh}</p>
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
                <div
                  className={`percent ${
                    marketCapPercent > 0 ? "percent-up" : "percent-down"
                  }`}
                >
                  {marketCapPercent > 0
                    ? "+" + marketCapPercent.toFixed(2)
                    : marketCapPercent.toFixed(2)}
                </div>
                <div className="time">24h</div>
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
          <div className="coinExtraInfo-item">
            <p className="coinExtraInfo-topic">Max Supply: </p>
            <p className="coinExtraInfo-value">{maxSupply}</p>
          </div>
        )}
        {circulatinSupply && (
          <div className="coinExtraInfo-item">
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

function CoinPage({ pageData }) {
  const [coinData, setCoinData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/coin/coin/${pageData.data.id}`)
      .then((res) => {
        setCoinData(res.data);
        console.log(res.data);
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
          <div className="coinPage-graph"></div>
          <div className="coinPage-converter"></div>
        </div>
      )}
    </div>
  );
}

export default CoinPage;
