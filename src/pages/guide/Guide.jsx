import React from "react";

const Guide = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        {/* 페이지 제목 */}
        <h1 className="text-4xl font-bold text-center text-black-600 mb-8">
          고객지원
        </h1>

        {/* 고객지원 정보 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            고객지원 안내
          </h2>
          <p>
            제주플랜 고객지원 센터는 여러분의 질문과 문제 해결을 돕기 위해
            최선을 다하고 있습니다. 아래의 연락처를 통해 문의해 주세요.
          </p>
          <ul className="mt-4 text-lg">
            <li>
              📧 이메일:{" "}
              <a
                href="mailto:Support@kypl.com"
                className="text-blue-500 underline"
              >
                Support@kypl.com
              </a>
            </li>
            <li>
              📞 전화:{" "}
              <a href="tel:123-456-7890" className="text-blue-500 underline">
                123-456-7890
              </a>
            </li>
            <li>🕒 운영 시간: 월~금 09:00 - 18:00</li>
            <li>📅 주말 및 공휴일 휴무</li>
          </ul>
        </div>

        {/* 자주 묻는 질문 (FAQ) */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            자주 묻는 질문 (FAQ)
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              <strong>Q: 고객지원 운영 시간은 언제인가요?</strong>
            </li>
            <p>
              A: 고객지원 센터는 월요일부터 금요일까지 09:00에서 18:00까지
              운영되며, 주말 및 공휴일은 휴무입니다.
            </p>

            <li>
              <strong>Q: 제주플랜에서 제공하는 서비스는 무엇인가요?</strong>
            </li>
            <p>
              A: 제주플랜은 제주도 여행 계획을 쉽게 세울 수 있도록 도와주는
              플랫폼으로, 숙박, 관광지, 교통 정보를 한곳에서 관리할 수 있습니다.
            </p>

            <li>
              <strong>Q: 어떻게 고객지원에 문의할 수 있나요?</strong>
            </li>
            <p>
              A: 이메일 Support@kypl.com으로 보내거나 123-456-7890으로 전화해
              주시면 됩니다.
            </p>
          </ul>
        </div>

        {/* 문의 양식 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            문의 양식
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-md"
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-md"
                placeholder="이메일 주소를 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                문의 내용
              </label>
              <textarea
                id="message"
                className="w-full p-3 border rounded-md"
                rows="5"
                placeholder="문의 내용을 입력하세요"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              문의하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Guide;
