import React, { useState } from "react";

function Search() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for a Crypto Currency..."
        className="search-input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default Search;
