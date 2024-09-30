import React from "react";

function Use() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 플래너 사용법 섹션 */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
            플래너 사용법
          </h2>
          <div className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-6">
              <span className="font-bold text-green-500">
                1. 여행하려는 일자를 선택하세요.(필수)
              </span>
            </p>
            <p className="mb-6">
              <span className="font-bold text-green-500">
                2. 예산을 설정하세요.
              </span>
              <br />
              - 각 일자별로 예산 설정이 가능합니다.
              <br />- 설정을 완료하면 바로 옆에 플래너가 일자별로 생성됩니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-green-500">
                3. 원하는 업장을 찾아보세요.
              </span>
              <br />
              - 상단 검색란에서 직접 검색할 수도 있고, 하단 리스트에 있는 업소를
              선택할 수 있습니다.
              <br />- <span className="font-bold">착한업소 ON/OFF 기능</span>을
              통해 착한 업소만 확인할 수 있습니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-green-500">
                4. 선택한 업장을 드래그(강조)하여 플래너란에 놓아주세요.
              </span>
              <br />- 원하시는 일자에 해당되는 칸에 넣으셔야 제대로 적용됩니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-green-500">
                5. 컬러를 선택해주세요.
              </span>
              <br />- 다른 여행계획과 혼동하지 않기 위해 원하는 색상을 적용할 수
              있습니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-green-500">
                6. 지도란에는 선택한 여행 계획의 루트가 보입니다.
              </span>
            </p>
          </div>
        </div>

        {/* 경매장 사용법 섹션 */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            경매장 사용법
          </h1>
          <div className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-6">
              <span className="font-bold text-blue-500">
                1. 지역과 업종을 선택하세요.
              </span>
              <br />
              - 현재 선택할 수 있는 지역은 제주시와 서귀포시입니다.
              <br />- 업종은 한식, 중식/양식/일식, 숙박, 기타가 있습니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-blue-500">
                2. 만원 단위의 입찰가를 입력하세요.
              </span>
              <br />- 예를 들어, 100,000원을 입찰하려면 "10"을 입력하면 됩니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-blue-500">
                3. 저장하기 버튼을 클릭하여 입찰가를 저장하세요.
              </span>
              <br />- 현재 시간 내에만 입찰가를 저장할 수 있습니다. 경매 시간이
              아닐 때는 저장할 수 없습니다.
            </p>
            <p className="mb-6">
              <span className="font-bold text-blue-500">
                4. 최고 입찰가와 두 번째로 높은 입찰가는 화면에 표시됩니다.
              </span>
            </p>
            <p className="mb-6">
              <span className="font-bold text-blue-500">
                5. 경매 시간은 2024년 00월 00일 00시부터 2099년 00월 00일
                00시까지입니다.
              </span>
              <br />- 이 기간 내에만 입찰할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Use;
