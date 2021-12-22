import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <div className="coinPage">
        {coinData && (
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
          ></p>
        )}
      </div>
    </div>
  );
}

export default CoinPage;
