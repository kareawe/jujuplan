import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-9 w-full text-white">
      {/* 이용문의 정보 */}
      <div className="text-center mt-2">
        <h2 className="text-xl font-semibold">이용 문의</h2>
        <p>
          메일:{" "}
          <a href="mailto:Support@kypl.com" className="underline text-blue-400">
            Support@kypl.com
          </a>
        </p>
        <p>제주플랜 여행 계획 플랫폼</p>
        <p>“Everything about traveling to Jeju Island!”</p>
      </div>

      {/* 고객지원 정보 */}
      <div className="mt-4 text-center text-sm">
        <h3 className="text-lg font-medium">고객지원</h3>
        <p>운영 시간: 월~금 09:00 - 18:00</p>
        <p>주말 및 공휴일 휴무</p>
        <p>빠른 응답을 원하시면 이메일로 문의 바랍니다.</p>
      </div>

      {/* 저작권 정보 */}
      <div className="mt-6 text-center text-xs border-t border-gray-600 pt-4">
        <p>© 2024 KYPL. All rights reserved.</p>
        <p>제주플랜 - 제주 여행을 계획하는 최고의 방법</p>
      </div>
    </footer>
  );
};

export default Footer;
