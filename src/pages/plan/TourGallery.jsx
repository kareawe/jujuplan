import React, { useState, useEffect } from "react";
import axios from "axios";

const TourAPIComponent = (keyword) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("핫플"); // 원하는 키워드로 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceKey =
          "MhNi%2Faa5avdm8AaE9MM0xwe3Z7ZuEa%2Fl9LoPlhGVPFT4zT3wgb6o%2BOEQJRoG3QVX0BwFGHmGM4%2FfU%2BUgRarUgw%3D%3D";
        const url = `http://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&keyword=${encodeURIComponent(
          keyword
        )}&_type=json`;
        const response = await axios.get(url);
        setData(response.data.response.body.items.item);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Tour API Data</h1>
      <input
        type="text"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="검색 키워드 입력"
      />
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.galContentId}>
              <h2>{item.galTitle}</h2>
              <img src={item.galWebImageUrl} alt={item.galTitle} />
              <p>{item.galPhotographyLocation}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TourAPIComponent;
