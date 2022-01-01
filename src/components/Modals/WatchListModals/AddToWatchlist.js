import React, { useState } from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";
import { GrClear } from "react-icons/gr";
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
    <div className="createWatchlist">
      <div className="heading">Create Watchlist</div>
      <IoIosClose className="closeIcon" onClick={toggleCreateMode} />
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
function AddToWatchlist({ coin }) {
  const {
    selectWatchlistModal,
    toggleSelectWatchlistModal,
    userData,
    setUserData,
    changeAlert,
  } = useGlobalContext();
  const [createMode, setCreateMode] = useState(false);
  const toggleCreateMode = () => {
    setCreateMode(!createMode);
  };
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
          changeAlert(res.data.message);
          toggleSelectWatchlistModal();
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
          {!createMode &&
            userData &&
            userData.watchList &&
            userData.watchList.length > 0 && (
              <div className="selectWatchlist">
                <div className="selectWatchlist-heading">Select watchlist</div>
                <IoIosClose
                  className="closeIcon"
                  onClick={toggleSelectWatchlistModal}
                />
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
                <button onClick={toggleCreateMode}>New</button>
              </div>
            )}
          {createMode && <CreateSection toggleCreateMode={toggleCreateMode} />}
          {userData && userData.watchList.length === 0 && !createMode && (
            <div className="emptyWatchlist">
              <div className="emptyWatchlist-container">
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
          <div className="overlay" onClick={toggleSelectWatchlistModal}></div>
        </div>
      )}
    </>
  );
}

export default AddToWatchlist;
