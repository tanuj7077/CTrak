import React from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";

function AddToWatchlist({ coin }) {
  const {
    selectWatchlistModal,
    toggleSelectWatchlistModal,
    userData,
    setUserData,
    changeAlert,
  } = useGlobalContext();
  const checkCoinExistanceInWatchlist = (watchlistId, coinId) => {
    let watchlist = userData.watchList.find((item) => {
      return item._id === watchlistId;
    });
    return watchlist.coins.includes(coinId);
  };
  const handleAdd = async (watchlistId) => {
    let obj = {
      userId: userData._id,
      watchlistId: watchlistId,
      coinId: coin.id,
    };
    if (!checkCoinExistanceInWatchlist(watchlistId, coin.id)) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/addtoWatchlist`, obj)
        .then((res) => {
          console.log(res.data);
          setUserData(res.data.userData);
          //toggleCreateMode();
        });
    } else {
      changeAlert({
        type: "error",
        messages: ["Coin already exists in selected watchlist"],
      });
    }
  };
  return (
    <>
      {selectWatchlistModal && (
        <div className="addToWatchlistModal">
          {userData.watchList.length > 0 ? (
            <div className="selectWatchlist">
              <div className="selectWatchlist-heading">Select watchlist</div>
              <ul className="selectWatchlist-list">
                {userData.watchList.map((watchlist) => {
                  return (
                    <div
                      className="selectWatchlist-list-item"
                      onClick={() => handleAdd(watchlist._id)}
                    >
                      {watchlist.name} ({watchlist.coins.length})
                    </div>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="createWatchlist"></div>
          )}
          <div className="overlay" onClick={toggleSelectWatchlistModal}></div>
        </div>
      )}
    </>
  );
}

export default AddToWatchlist;
