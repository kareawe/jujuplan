import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import locationsData from "./location.json";
import i from "./KOREAN.png";
import i2 from "./WESTERN.png";
import i3 from "./CHINESE.png";
import i4 from "./CAFE.png";

const Section1 = ({ handleLinkClick, scrollToSection, scrollToSection2 }) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(2 - (scrollPosition * 2) / 600, 0);
      setBgOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleResultClick = (type) => {
    window.scrollTo(0, 1250);
    handleLinkClick("450px");

    navigate("/plan", {
      state: { type },
    });
  };

  return (
    <section
      className={`section1 fade-in ${inView ? "in-view" : ""}`}
      ref={ref}
    >
      <div className="fixed top-0 left-0 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white bg-opacity-30 backdrop-blur-lg shadow-md z-20 py-4 mx-auto right-0">
        <nav className="flex items-center justify-center space-x-3 text-nowrap sm:space-x-8">
          <Link
            to="/"
            className="text-sm sm:text-lg text-nowrap text-gray-700 hover:text-blue-500 font-medium transition duration-300 ease-in-out transform hover:scale-105"
            onClick={scrollToSection}
          >
            맛집선택하기
          </Link>
          <Link
            to="/"
            className="text-sm sm:text-lg text-nowrap text-gray-700 hover:text-blue-500 font-medium transition duration-300 ease-in-out transform hover:scale-105"
            onClick={scrollToSection2}
          >
            추천여행하기
          </Link>
          <Link
            to="/use"
            className="text-sm sm:text-lg text-nowrap text-gray-700 hover:text-blue-500 font-medium transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleLinkClick("450px")} // 이용방법 클릭 시 헤더 높이 설정
          >
            이용방법
          </Link>
          <Link
            to="/guide"
            className="text-sm sm:text-lg text-nowrap text-gray-700 hover:text-blue-500 font-medium transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleLinkClick("450px")} // 고객지원 클릭 시 헤더 높이 설정
          >
            고객지원
          </Link>
        </nav>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url('/01.jpg')`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: bgOpacity,
          transition: "opacity 0.3s ease-out",
          zIndex: -1,
        }}
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 0,
        }}
      ></div>

      <div
        className="content-wrapper text-center relative z-10"
        style={{ transform: "translateY(-10vh)" }}
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mb-4 font-bold">
          <span style={{ color: "#31A8D9" }}>함께</span> 만들어가는
        </h2>
        <h2 className="text-2xl sm:text-4xl lg:text-6xl mb-6 font-bold">
          여행 <span style={{ color: "#31A8D9" }}>플랫폼</span>
        </h2>
        <p className="text-md sm:text-lg lg:text-2xl mb-6 text-gray-800">
          <span style={{ color: "#E99A20" }}>온라인</span>에서 함께 손쉽게{" "}
          <span style={{ color: "#E99A20" }}>스케줄</span>을 만들어보세요.
        </p>
      </div>

      <div className="w-full max-w-xl px-4 mt-8">
        {locationsData.map((location) => (
          <div
            key={location.id}
            className="border-2 border-gray-200 rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
            onClick={() => handleResultClick("korean")} // "korean"을 전달
            style={{
              backdropFilter: "blur(3px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "translateY(-10vh)",
            }}
          >
            <h3 className="text-md sm:text-lg font-bold">일정 세우러 가기</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const Section2 = React.forwardRef((props, ref) => {
  const { inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className={`h-3/4 mb-40 mt-40 ${inView ? "slide-in-left" : ""}`}
      ref={ref}
    >
      <div className="text-2xl sm:text-3xl font-bold h-1/4 text-center mb-20 pt-8">
        오늘의 추천 여행지
      </div>
      <section className="section h-2/4 pb-1/4">
        <div className="cards">
          <TourGallery keyword="제주" />
        </div>
      </section>
    </div>
  );
});

const Section = React.forwardRef(({ handleLinkClick }, ref) => {
  const navigate = useNavigate();

  const handleResultClick = (type) => {
    window.scrollTo(0, 510);

    handleLinkClick("450px");

    navigate("/plan", {
      state: { type },
    });
  };

  return (
    <div ref={ref}>
      <h1 className="text-2xl sm:text-3xl font-bold h-1/4 text-center mb-20 pt-8">
        맛집 선택하기
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["korean", "western", "chinese", "cafe"].map((category, index) => (
          <div
            key={index}
            className="text-center align-middle cursor-pointer flex flex-col items-center"
            onClick={() => handleResultClick(category)}
          >
            <img
              src={index == 0 ? i : index == 1 ? i2 : index == 2 ? i3 : i4}
              alt=""
              className="w-60 h-60 sm:w-48 sm:h-48 object-cover"
            />
            <div className="text-sm font-bold sm:text-lg mt-2">
              {category === "korean"
                ? "한식"
                : category === "western"
                ? "양식"
                : category === "chinese"
                ? "중식"
                : "카페"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const TourGallery = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomIndices, setRandomIndices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceKey =
          "MhNi%2Faa5avdm8AaE9MM0xwe3Z7ZuEa%2Fl9LoPlhGVPFT4zT3wgb6o%2BOEQJRoG3QVX0BwFGHmGM4%2FfU%2BUgRarUgw%3D%3D";
        const url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&keyword=${encodeURIComponent(
          keyword
        )}&_type=json`;
        const response = await axios.get(url);
        const items = response.data.response.body.items.item;
        if (items && items.length > 0) {
          setData(items);
          setRandomIndices(generateRandomIndices(items.length, 5));
        } else {
          setError("No data found");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  useEffect(() => {
    if (data.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomIndices.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [data.length, randomIndices.length]);

  const generateRandomIndices = (length, count) => {
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * length));
    }
    return Array.from(indices);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + randomIndices.length) % randomIndices.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % randomIndices.length);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentData = data[randomIndices[currentIndex]];

  return (
    <div className="relative">
      <button
        className="nav-btn prev absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={handlePrev}
      >
        <FiChevronLeft />
      </button>
      {currentData && (
        <div className="flex justify-center">
          <img
            src={currentData.galWebImageUrl}
            alt={currentData.galTitle}
            className="w-full max-w-full object-cover"
            style={{ height: "50vh", maxHeight: "70vh" }}
          />
        </div>
      )}
      <button
        className="nav-btn next absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={handleNext}
      >
        <FiChevronRight />
      </button>
      {currentData && (
        <h2 className="text-center text-lg sm:text-xl font-bold mt-4">
          {currentData.galTitle}
        </h2>
      )}
    </div>
  );
};

const Sections = ({ handleLinkClick }) => {
  const sectionRef = useRef(null);
  const section2Ref = useRef(null);

  const scrollToSection = () => {
    handleLinkClick("auto");
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection2 = () => {
    handleLinkClick("auto");
    if (section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Section1
        handleLinkClick={handleLinkClick}
        scrollToSection={scrollToSection}
        scrollToSection2={scrollToSection2}
      />
      <Section2 ref={section2Ref} />
      <Section ref={sectionRef} handleLinkClick={handleLinkClick} />
    </div>
  );
};

export default Sections;
