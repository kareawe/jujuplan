import {React, useState} from "react";
import SlidebarPlanner from './SlidebarPlanner';

function Slidebar({ selectedDates, onDrop, style }) {  // style prop 추가
  const [title, setTitle] = useState('Planner');
  const [isEditing, setIsEditing] = useState(false);
  const [isInfoWindowVisible, setIsInfoWindowVisible] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'kypl',
        url: './plan',
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  };

  const handleDrop = (updatedLists) => {
    onDrop(updatedLists);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleInfoClick = () => {
    setIsInfoWindowVisible(true);
  };

  const handleCloseInfoWindow = () => {
    setIsInfoWindowVisible(false);
  };

  return (
    <div className="font-sans bg-gray-200 w-full shadow-md border pt-16 rounded-r-xl md:pt-0" style={style}> {/* 부모로부터 받은 style 적용 */}
      <div className="flex justify-center text-2xl font-bold mb-6 text-gray-800">
        <div className='mr-2 w-8 h-0'></div>
        
        <div className="relative text-2xl pt-6 pb-4 flex items-center justify-center">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-2xl font-bold text-center bg-gray-200 h-10"
            />
          ) : (
            <span className='text-2xl font-bold'>{title}</span>
          )}
          <button 
            onClick={handleEditClick} 
            className="ml-2 mt-2 text-sm text-black hover:text-blue-600 transition"
          >
            <i className="fas fa-edit w-8 h-0 text-xl"></i>
          </button>
          
          <button
            onClick={handleInfoClick}
            className="absolute -right-20 w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-gray-400 transition"
          >
            ?
          </button> 
        </div>
      </div>
      <SlidebarPlanner selectedDates={selectedDates} onDrop={handleDrop} />
      <div className="flex justify-center items-center h-16">
        <button
          className="w-1/2 h-full bg-blue-500 text-white rounded-lg flex items-center justify-center shadow hover:bg-blue-600 transition"
          onClick={handleShare}
        >
          저장하기
        </button>
      </div>

      {isInfoWindowVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h2 className="text-xl font-bold mb-4">플래너 사용방법</h2>
            <p className="mb-4">
              {/* 안내 문구들 */}
            </p>
            <button
              onClick={handleCloseInfoWindow}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slidebar;
