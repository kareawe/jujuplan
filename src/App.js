import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Section from "./pages/home/Section";
import Auction from "./pages/auction/Auction";
import Plan from "./pages/plan/Plan";
import Login from "./pages/login/Login";
import Guide from "./pages/guide/Guide"; // 새로운 Guide 컴포넌트 추가
import Guide2 from "./pages/auction/Guide"; // 새로운 Guide 컴포넌트 추가
import "./App.css";
import Use from "./pages/use/Use";
import MyPlanner from "./pages/myPlanner/MyPlanner";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [showGuideLink, setShowGuideLink] = useState(false); // 화살표 상태 관리
  const [headerHeight, setHeaderHeight] = useState("auto");

  // Header의 높이를 변경하는 함수
  const handleLinkClick = (height) => {
    setHeaderHeight(height);
  };
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const serviceKey =
          "IfpOKWLaWB%2FNdIaTtdE40OX8CTKJvglSgk9xSPTyav3zLg3cgpKvbAC9%2F9onNutrD3PBFJbiUht2uPAn9FgqoA%3D%3D";

        const now = new Date();
        const baseDate = `${now.getFullYear()}${String(
          now.getMonth() + 1
        ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
        const baseTime = getBaseTime(now);

        const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=100&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=52&ny=38&dataType=json`;

        const response = await axios.get(url);
        if (response.data.response && response.data.response.body) {
          const data = response.data.response.body.items.item;
          const forecastData = {};

          data.forEach((item) => {
            const category = item.category;
            const forecast = forecastData[item.fcstDate + item.fcstTime] || {};

            switch (category) {
              case "POP":
                forecast.pop = item.fcstValue;
                break;
              case "SKY":
                forecast.sky = item.fcstValue;
                break;
              case "TMP":
                forecast.tmp = item.fcstValue;
                break;
              case "PTY":
                forecast.pty = item.fcstValue;
                break;
              default:
                break;
            }

            forecastData[item.fcstDate + item.fcstTime] = forecast;
          });

          const forecastArray = Object.entries(forecastData).map(
            ([key, value]) => ({
              ...value,
              fcstDate: key.slice(0, 8),
              fcstTime: key.slice(8),
            })
          );

          const closestForecast = getClosestForecast(forecastArray);

          if (closestForecast) {
            setWeatherData(closestForecast);
          } else {
            setError("가까운 시간의 예보를 찾을 수 없습니다.");
          }
        } else {
          setError("올바른 응답이 아닙니다.");
        }
      } catch (error) {
        setError(
          "날씨 정보를 가져오는 중 오류가 발생했습니다: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getBaseTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const baseTimes = [
      "0200",
      "0500",
      "0800",
      "1100",
      "1400",
      "1700",
      "2000",
      "2300",
    ];
    let baseTime = baseTimes[0];

    for (let i = 0; i < baseTimes.length; i++) {
      const baseHour = parseInt(baseTimes[i].slice(0, 2), 10);
      if (hours < baseHour || (hours === baseHour && minutes < 45)) {
        break;
      }
      baseTime = baseTimes[i];
    }

    return baseTime;
  };

  const getSkyStatus = (code) => {
    switch (code) {
      case "1":
        return "맑음";
      case "3":
        return "구름 많음";
      case "4":
        return "흐림";
      default:
        return "알 수 없음";
    }
  };

  const getPtyStatus = (code) => {
    switch (code) {
      case "0":
        return "없음";
      case "1":
        return "비";
      case "2":
        return "비/눈";
      case "3":
        return "눈";
      case "4":
        return "소나기";
      default:
        return "알 수 없음";
    }
  };

  const getClosestForecast = (data) => {
    const now = new Date();
    let closest = null;
    let minDiff = Infinity;

    data.forEach((item) => {
      if (!item || !item.fcstDate || !item.fcstTime) {
        console.error("Invalid item:", item);
        return;
      }

      const forecastDateTime = new Date(
        item.fcstDate.slice(0, 4) +
          "-" +
          item.fcstDate.slice(4, 6) +
          "-" +
          item.fcstDate.slice(6, 8) +
          "T" +
          item.fcstTime.slice(0, 2) +
          ":00:00"
      );

      const diff = Math.abs(now - forecastDateTime);

      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    });

    return closest;
  };

  return (
    <Router>
      <div className="App ml-0 mr-0 md:ml-20 md:mr-20 xl:ml-40 xl:mr-40">
        <div
          className="md:absolute mt-0 md:mt-24 md:right-0 md:w-16 xl:right-14 xl:w-24 mr-1 top-0 p-0 pl-2 pt-2 shadow-md"
          style={{
            zIndex: 1000,
          }}
        >
          {error ? (
            error
          ) : loading ? (
            "날씨 정보를 불러오는 중..."
          ) : weatherData ? (
            <div className="flex flex-col items-center text-center w-full md:block weather-info">
              <div className="flex text-center md:block">
                <div className="mb-0 md:mb-0">
                  <div className="mr-4 break-words text-base text-nowrap">
                    <strong style={{ color: "#E99A20" }}>제주도</strong>
                  </div>
                </div>
                <div className="flex md:block">
                  <div className="mr-4 pt-1 pb-1 break-words text-xs text-nowrap md:text-base">
                    <strong
                      style={{
                        color: "#E99A20",
                      }}
                    >
                      현재 기온
                    </strong>
                    <div>
                      {weatherData.tmp ? weatherData.tmp + "°C" : "정보 없음"}
                    </div>
                  </div>
                  <div className="wavy-border" />
                  <div className="mr-4 pt-1 pb-1 break-words text-xs text-nowrap md:text-base">
                    <strong
                      style={{
                        color: "#E99A20",
                      }}
                    >
                      강수확률
                    </strong>
                    <div>{weatherData.pop}%</div>
                  </div>
                  <div className="wavy-border" />
                  <div className="mr-4 pt-1 pb-1 break-words text-xs text-nowrap md:text-base">
                    <strong
                      style={{
                        color: "#E99A20",
                      }}
                    >
                      하늘상태
                    </strong>
                    <div>{getSkyStatus(weatherData.sky)}</div>
                  </div>
                  <div className="wavy-border" />
                  <div className="mr-4 pt-1 pb-1 break-words text-xs text-nowrap md:text-base">
                    <strong
                      style={{
                        color: "#E99A20",
                      }}
                    >
                      강수형태
                    </strong>
                    <div>{getPtyStatus(weatherData.pty)}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "날씨 정보를 찾을 수 없습니다."
          )}
        </div>
        <Header
          name={name}
          setName={setName}
          handleLinkClick={handleLinkClick}
          headerHeight={headerHeight}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/auction"
              element={
                <Auction
                  setName={setName}
                  showGuideLink={showGuideLink}
                  setShowGuideLink={setShowGuideLink}
                />
              }
            />
            <Route
              path="/myList"
              element={<MyPlanner />}
              handleLinkClick={handleLinkClick}
            />
            <Route path="/plan" element={<Plan name={name} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide2" element={<Guide2 />} />
            <Route path="/use" element={<Use />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
