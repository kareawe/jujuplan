import React from "react";
import { Link } from "react-router-dom"; // React Router 사용

function Use() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">경매장 사용법</h1>
        <div className="text-l text-gray-700 max-w-2xl mx-auto">
          <p className="mb-6">
            <span className="font-bold">1. 지역과 업종을 선택하세요.</span>
            <br />- 현재 선택할 수 있는 지역은 제주시와 서귀포시입니다.
            <br />- 업종은 한식, 중식/양식/일식, 숙박, 기타가 있습니다.
          </p>
          <p className="mb-6">
            <span className="font-bold">
              2. 만원 단위의 입찰가를 입력하세요.
            </span>
            <br />- 예를 들어, 100,000원을 입찰하려면 "10"을 입력하면 됩니다.
          </p>
          <p className="mb-6">
            <span className="font-bold">
              3. 저장하기 버튼을 클릭하여 입찰가를 저장하세요.
            </span>
            <br />- 현재 시간 내에만 입찰가를 저장할 수 있습니다. 경매 시간이
            아닐 때는 저장할 수 없습니다.
          </p>
          <p className="mb-6">
            <span className="font-bold">
              4. 최고 입찰가와 두 번째로 높은 입찰가는 화면에 표시됩니다.
            </span>
          </p>
          <p className="mb-6">
            <span className="font-bold">
              5. 경매 시간은 2024년 0월 00일 00시부터 2099년 0월 00일
              00시까지입니다.
            </span>
            <br />- 이 기간 내에만 입찰할 수 있습니다.
          </p>
        </div>

        {/* 경매장으로 돌아가는 버튼 */}
        <div className="mt-10">
          <Link to="/auction">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              경매장으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Use;
