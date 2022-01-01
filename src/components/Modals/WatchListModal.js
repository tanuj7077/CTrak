import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { GrClear } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
function CreateSection({ toggleCreateMode }) {
  const { setUserData, userData } = useGlobalContext();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

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
        toggleCreateMode();
      });
  };
  return (
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
          className={`${name.length === 0 && "disabled"}`}
          onClick={() => {
            name.length > 0 && handleCreate();
          }}
        >
          Create
        </button>
        <button onClick={toggleCreateMode}>Cancel</button>
      </div>
    </div>
  );
}
function WatchlistCoins({ coinList }) {
  const { addTab, toggleWatchlistModalVisibility } = useGlobalContext();
  const [coins, setCoins] = useState([]);
  let ids = coinList.reduce((prev, curr, idx) => prev + "%2C" + curr, "");
  const getWatchListCoinsData = async () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/coin/getCoinsByIds/${ids}`)
      .then((res) => {
        setCoins(res.data);
      });
  };
  useEffect(() => {
    getWatchListCoinsData();
  }, []);
  return (
    <div className="watchlist-content-list">
      {coins.map((coin) => {
        return (
          <div
            key={`topNavWatchlistCoin_${coin.id}`}
            className="watchlist-content-list-item"
            onClick={() => {
              toggleWatchlistModalVisibility();
              addTab("coin", coin);
            }}
          >
            <div className="left">
              <img src={coin.image} alt={coin.id + "img"} className="img" />
              <div className="textual">
                <p className="textual-name">{coin.name}</p>
                <p className="textual-symbol">{coin.symbol}</p>
              </div>
            </div>
            <div className="right">
              <p className="price">{coin.current_price}</p>
              <p
                className={`change ${
                  (coin.price_change_percentage_24h > 0 && "change-up") ||
                  (coin.price_change_percentage_24h < 0 && "change-down")
                }`}
              >
                {coin.price_change_percentage_24h <= 0 &&
                  coin.price_change_percentage_24h.toFixed(2)}
                {coin.price_change_percentage_24h > 0 &&
                  "+" + coin.price_change_percentage_24h.toFixed(2)}
                %
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function Watchlist({ watchlistData }) {
  const { addTab, toggleWatchlistModalVisibility } = useGlobalContext();
  const [showContent, setShowContent] = useState(false);
  const toggleContentVisibility = () => {
    setShowContent(!showContent);
  };
  return (
    <div className="watchlist">
      <div
        className="watchlist-heading"
        onClick={() => {
          addTab("watchlist", watchlistData);
          toggleWatchlistModalVisibility();
        }}
      >
        <p
          className="name"
          onClick={() => {
            addTab("watchlist", watchlistData);
          }}
        >
          {watchlistData.name}
        </p>
        <div className="actions">
          <FaChevronDown
            className="actions-icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleContentVisibility();
            }}
          />
        </div>
      </div>
      <div
        className={`watchlist-content ${
          showContent && "watchlist-content-visible"
        }`}
      >
        {watchlistData.coins.length === 0 ? (
          <div className="watchlist-content-empty">
            <div className="watchlist-content-empty-container">
              <p className="heading">Watchlist Empty</p>
              <p className="desc">
                You can add coins to watchlist by visiting any coin page. You
                can visit a coin page by using the search feature as well.
              </p>
              <button
                className="btn"
                onClick={() => {
                  addTab("watchlist", watchlistData);
                  toggleWatchlistModalVisibility();
                }}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <WatchlistCoins coinList={watchlistData.coins} />
        )}
      </div>
    </div>
  );
}
function WatchListModal() {
  const { watchlistModalVisibility, userData, toggleWatchlistModalVisibility } =
    useGlobalContext();
  const [createMode, setCreateMode] = useState(false);
  const toggleCreateMode = () => {
    setCreateMode(!createMode);
  };
  return (
    <>
      {watchlistModalVisibility && (
        <>
          <div className="watchlistModal">
            <div className="watchlistModal-heading">Watchlists</div>
            <IoIosClose
              className="watchlistModal-close"
              onClick={toggleWatchlistModalVisibility}
            />
            {userData && userData.watchList.length === 0 && !createMode && (
              <div className="watchlistModal-noWatchlists">
                <div className="watchlistModal-noWatchlists-container">
                  <div className="iconContainer">
                    <GrClear className="icon" />
                  </div>
                  <p className="heading">No watchlist present</p>
                  <p className="desc">
                    You can create multiple watchlists and add crypto assets in
                    them.
                  </p>
                  <button onClick={toggleCreateMode}>Create</button>
                </div>
              </div>
            )}
            {createMode && (
              <CreateSection toggleCreateMode={toggleCreateMode} />
            )}
            {!createMode && userData && userData.watchList.length > 0 && (
              <div className="watchlistModal-watchlistSection">
                <div className="watchlistContainer">
                  <div className="watchlistModal-watchlistSection-list">
                    {userData.watchList.map((item) => {
                      return <Watchlist key={item._id} watchlistData={item} />;
                    })}
                  </div>
                </div>

                <button onClick={toggleCreateMode}>New</button>
              </div>
            )}
          </div>
          <div
            className="watchlistModal-overlay"
            onClick={toggleWatchlistModalVisibility}
          ></div>
        </>
      )}
    </>
  );
}

export default WatchListModal;
