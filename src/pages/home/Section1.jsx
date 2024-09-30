import { useNavigate } from "react-router-dom";
import "./Section1.css";
import locationsData from "./location.json";

const Section1 = () => {
  const navigate = useNavigate();

  const handleResultClick = (location, event) => {
    event.stopPropagation();
    navigate("/plan", { loc: { location }, state: { center: { coords: { lat: location.coords.lat, lng: location.coords.lng } } } });
  };

  return (
    <section className="h-screen flex justify-center items-center"
    style={{
      backgroundImage: `url('/01.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center" // 50% 투명한 흰색 오버레이
    }}
    >
      
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // 50% 투명한 흰색 오버레이
        }}
      ></div>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-center items-center -mt-10">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start md:pl-5">
            <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-bold text-center md:text-left">함께 만들어가는</h2>
            <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-bold text-center md:text-left">여행 플랜 플랫폼</h2>
            <p className="text-lg md:text-2xl mb-10 text-gray-500 text-center md:text-left">
              온라인에서 함께 손쉽게 스케줄을 만들어보세요.
            </p>
            <div className="w-full pl-20 pr-60 sm:pr-20 md:pr-40 lg:pr-52 xl:pr-60">
              {locationsData.map((location) => (
                <div
                  key={location.id}
                  className="border border-gray-200 rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                  onClick={(event) => handleResultClick(location, event)}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-nowrap">일정 세우러 가기</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
