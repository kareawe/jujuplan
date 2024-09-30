import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { FaPlus } from 'react-icons/fa';
import html2canvas from 'html2canvas';

const MyPlanner = ({ handleLinkClick = () => {} }) => {
  const [myList, setMyList] = useState([
    { id: 1, name: "My list1" },
  ]);

  const navigate = useNavigate();
  const captureRefs = useRef([]);

  const handleResultClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전달되는 것을 막음
    handleResult();
  };

  const handleResult = () => {
    handleLinkClick("450px");

    navigate("/plan");
  };

  const handleCaptureClick = async (index) => {
    const element = captureRefs.current[index];
    if (element) {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `screenshot-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">My Planner</h2>
          <p className="text-gray-600 mb-6">여행 계획을 리스트로 볼 수 있고 저장하는 플래너 저장소</p>
          <div className="block md:flex space-x-4 overflow-x-auto pb-4">
            {myList.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (captureRefs.current[index] = el)}
                className="p-4 bg-gray-50 border mt-8 md:mt-0 border-gray-200 rounded-lg flex flex-col justify-between items-center min-w-[250px] min-h-[400px]"
              >
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <button 
                  onClick={() => handleCaptureClick(index)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Capture
                </button>
              </div>
            ))}
            <div
              onClick={handleResultClick}
              className="flex mt-8 md:mt-0 items-center flex-col justify-between p-4 bg-blue-300 text-white rounded-lg cursor-pointer hover:bg-blue-400 min-w-[250px] min-h-[400px]"
            >
              <FaPlus />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPlanner;
