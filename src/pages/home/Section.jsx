import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Section1.css";
import "./Section2.css";

const Section = ({ handleLinkClick }) => {
  const section2Ref = useRef(null);
  const scrollToSection2 = () => {
    if (section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate = useNavigate();

  const handleResultClick = (type) => {
    // Header의 높이를 조정
    handleLinkClick("450px");

    // 이후 페이지 이동
    navigate("/plan", {
      state: { type },
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold h-1/4 text-center mb-4 pt-8">
        맛집 선택하기
      </h1>
      <div className="grid grid-cols-4">
        <div
          className="flex text-center align-middle cursor-pointer"
          onClick={() => handleResultClick("korean")}
        >
          한식
        </div>
        <div
          className="flex text-center align-middle cursor-pointer"
          onClick={() => handleResultClick("western")}
        >
          양식
        </div>
        <div
          className="flex text-center align-middle cursor-pointer"
          onClick={() => handleResultClick("chinese")}
        >
          중식
        </div>
        <div
          className="flex text-center align-middle cursor-pointer"
          onClick={() => handleResultClick("cafe")}
        >
          카페
        </div>
      </div>
    </div>
  );
};

export default Section;
