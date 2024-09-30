import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Auction = ({ setName, showGuideLink, setShowGuideLink }) => {
  const [auctionPrices, setAuctionPrices] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      const dateString = `${year}년 ${month < 10 ? "0" + month : month}월 ${
        day < 10 ? "0" + day : day
      }일`;
      const timeString = `${hours}:${minutes}:${seconds}`;
      setCurrentDate(dateString);
      setCurrentTime(timeString);

      const startDateTime = new Date("2024-06-30T09:00:00");
      const endDateTime = new Date("2025-07-30T18:00:00");

      if (now >= startDateTime && now <= endDateTime) {
        setIsInputEnabled(true);
      } else {
        setIsInputEnabled(false);
      }
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const saveValue = () => {
    if (!isInputEnabled) {
      alert("지금은 경매 시간이 아닙니다.");
      return;
    }

    const enteredValue = parseInt(inputValue);
    if (enteredValue % 10000 !== 0) {
      alert("금액은 만원 단위로 입력해주세요.");
      return;
    }
    const key = `${selectedCategory}_${selectedRegion}`;
    setAuctionPrices((prevState) => {
      const currentAuction = prevState[key] || {};
      const { maxValue, secondMaxValue } = currentAuction;

      if (!maxValue || enteredValue > maxValue) {
        return {
          ...prevState,
          [key]: {
            maxValue: enteredValue,
            secondMaxValue:
              maxValue !== undefined
                ? enteredValue !== maxValue
                  ? maxValue
                  : secondMaxValue
                : secondMaxValue,
          },
        };
      } else if (
        !secondMaxValue ||
        (enteredValue > secondMaxValue && enteredValue !== maxValue)
      ) {
        return {
          ...prevState,
          [key]: {
            ...currentAuction,
            secondMaxValue: enteredValue,
          },
        };
      }

      return prevState;
    });

    setInputValue("");
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveValue();
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const currentKey = `${selectedCategory}_${selectedRegion}`;
  const currentAuction = auctionPrices[currentKey] || {};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-center px-6 relative">
          {/* 왼쪽 빈 공간 대신 절대 위치로 왼쪽에 배치 */}
          <div className="absolute left-6"></div>

          {/* 중앙에 위치한 제목 */}
          <h1 className="text-3xl font-bold">광고 경매장</h1>

          {/* 오른쪽 네비게이션을 절대 위치로 설정 */}
          <nav className="absolute right-6">
            <ul className="flex space-x-4">
              <li>
                <Link to="/Guide2" className="underline">
                  안내 설명서
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-6 flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6">
          <div className="text-center mb-6">
            <div className="text-xl text-gray-700 mb-2">{currentDate}</div>
            <div className="text-2xl text-gray-800 font-semibold">
              {currentTime}
            </div>
          </div>
          <div className="auction-info text-center mb-6">
            {selectedRegion && selectedCategory && (
              <div className="mb-4">
                <p className="text-lg mb-2">
                  최고 입찰가:{" "}
                  <span id="maxValue" className="font-semibold text-green-600">
                    {numberWithCommas(currentAuction.maxValue || 0)}원
                  </span>
                </p>
                <p className="text-lg">
                  2번째 높은 입찰가:{" "}
                  <span
                    id="secondMaxValue"
                    className="font-semibold text-yellow-600"
                  >
                    {numberWithCommas(currentAuction.secondMaxValue || 0)}원
                  </span>
                </p>
              </div>
            )}
            <div className="flex justify-center mb-4">
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className="border rounded p-2 mx-2 w-48 text-l"
              >
                <option value="">지역 선택</option>
                <option value="제주시">제주시</option>
                <option value="서귀포시">서귀포시</option>
              </select>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border rounded p-2 mx-2 w-48 text-l"
              >
                <option value="">업종 선택</option>
                <option value="한식">한식</option>
                <option value="중식/양식/일식">중식/양식/일식</option>
                <option value="숙박">숙박</option>
                <option value="기타">기타</option>
              </select>
            </div>
            {selectedRegion && selectedCategory && (
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  id="bidInput"
                  placeholder="만원 단위 금액을 입력하세요"
                  className="border rounded p-2 w-full max-w-md mx-2 mb-4 text-lg"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  id="bidbutton"
                  onClick={saveValue}
                  className={`border rounded p-2 w-full max-w-md mx-2 mb-4 text-lg transition-colors duration-300 ${
                    isInputEnabled
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isInputEnabled}
                >
                  저장하기
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auction;
