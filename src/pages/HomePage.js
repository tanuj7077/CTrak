import React from "react";

function HomePage({ pageData }) {
  return (
    <div className={`page ${pageData.isCurrent ? "" : "page-invisible"}`}>
      <div className="heading">{pageData.type}</div>
      <input type="text" />
    </div>
  );
}

export default HomePage;
