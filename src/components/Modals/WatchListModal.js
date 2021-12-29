import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { GrClear } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
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
function Watchlist({ watchlistData }) {
  const { userData, setUserData, addTab } = useGlobalContext();
  const handleDelete = async () => {
    let obj = {
      userId: userData._id,
      watchlistId: watchlistData._id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/deleteWatchlist`, obj)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userData);
      });
  };
  const [showContent, setShowContent] = useState(false);
  const toggleContentVisibility = () => {
    setShowContent(!showContent);
  };
  return (
    <div className="watchlist">
      <div className="watchlist-heading">
        <p className="name" onClick={() => addTab("watchlist", watchlistData)}>
          {watchlistData.name}
        </p>
        <div className="actions">
          <MdEdit className="actions-icon" />
          <MdDelete className="actions-icon" onClick={handleDelete} />
          <FaChevronDown
            className="actions-icon"
            onClick={toggleContentVisibility}
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
              <button className="btn">Add</button>
            </div>
          </div>
        ) : (
          <div className="watchlist-content-list"></div>
        )}
      </div>
    </div>
  );
}
function WatchListModal() {
  const { watchlistModalVisibility, toggleWatchlistModalVisibility, userData } =
    useGlobalContext();
  const [createMode, setCreateMode] = useState(false);
  const toggleCreateMode = () => {
    setCreateMode(!createMode);
  };
  return (
    <>
      {watchlistModalVisibility && (
        <div className="watchlistModal">
          <div className="watchlistModal-heading">Watchlist</div>
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
          {createMode && <CreateSection toggleCreateMode={toggleCreateMode} />}
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
      )}
    </>
  );
}

export default WatchListModal;
