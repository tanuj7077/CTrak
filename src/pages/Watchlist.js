import React from "react";

function Watchlist({ pageData }) {
  return (
    <div className={`page ${pageData.isCurrent ? "" : "page-invisible"}`}>
      <div>Watchlist</div>
    </div>
  );
}

export default Watchlist;
