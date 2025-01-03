import { useState } from 'react';
import SelectPlace from './SelectPlace';
import SelectTime from './SelectTime';
import Slidebar from './Slidebar';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';

function Sidebar({ setSelectedDates, placesData, onFilterChange, name, isKind, selectedDates, handleDropToSlidebar, handleDragStart, onPlaceClick, currentAddress, onSearch, type }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isTime, setIsTime] = useState(true);
  const [isPlace, setIsPlace] = useState(false);
  const [loc, setLoc] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState(0);
  const [items, setItems] = useState([]);
  const [resultDates, setResultDates] = useState([]);

  const handleDates = (childData) => {
    setSelectedDates(childData);
    
    setIsTime(false);
    setIsPlace(true);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(parseInt(event.target.value || '0'));
  };

  const handleItemsChange = (newItems) => {
    setItems(newItems);
  };

  const handleResultDatesChange = (newDates) => {
    setResultDates(newDates);
  };

  const toggleSlidebar = () => {
    setIsOpen(!isOpen);
  };

  const selectTime = () => {
    setIsTime(true);
    setIsPlace(false);
  };

  const selectPlace = () => {
    setIsTime(false);
    setIsPlace(true);
  };

  const selectLoc = (event) => {
    setLoc(event.target.value);
    setIsTime(false);
    setIsPlace(true);
    onSearch(event.target.value);
  };

  return (
    <div className={`block md:flex ${isOpen ? "w-full" : "w-full md:w-1/3"}`}>
      <div className={`flex flex-col ${isOpen ? "w-full md:w-2/4" : "w-full"} h-full border-r-2 border-gray-300 bg-gray-50 shadow-lg`}>
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b-2 border-gray-300">
          <span className="font-bold text-lg text-gray-700">{}</span>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition" onClick={toggleSlidebar}>
            <span className="text-xl text-gray-700">{!isOpen ? <FiChevronRight /> : <FiChevronLeft />}</span>
          </button>
        </div>
        <div className="p-4 bg-gray-100">
          <b>제주</b>
          <div className="relative">
            <input
              id="name"
              type="text"
              className="w-full p-3 pr-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="장소나 식당을 검색하세요."
              onChange={selectLoc}
            />
            <FiSearch className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400 text-2xl" />
          </div>
        </div>
        <div className="flex p-4 bg-white shadow">
          <button
            onClick={selectTime}
            className={`flex-1 p-2 text-center text-nowrap rounded-lg transition ${
              isTime ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            시간선택
          </button>
          <button
            onClick={selectPlace}
            className={`flex-1 p-2 ml-2 text-center text-nowrap rounded-lg transition ${
              isPlace ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            장소선택
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          {isTime ? (
            <SelectTime
              onData={handleDates}
              startDate={startDate}
              duration={duration}
              budget={budget}
              items={items}
              resultDates={resultDates}
              onStartDateChange={handleStartDateChange}
              onDurationChange={handleDurationChange}
              onBudgetChange={handleBudgetChange}
              onItemsChange={handleItemsChange}
              onResultDatesChange={handleResultDatesChange}
            />
          ) : (
            <SelectPlace
              pick={loc}
              onDragStart={handleDragStart}
              placesData={placesData}
              onFilterChange={onFilterChange}
              isKind={isKind}
              onPlaceClick={onPlaceClick}
              type={type}
            />
          )}
        </div>
      </div>
      <div className={`transition-all duration-300 ${isOpen ? "flex-grow" : "w-0"} overflow-hidden`}>
        <Slidebar
          selectedDates={selectedDates}
          onDrop={handleDropToSlidebar}
          style={{ height: isOpen ? '100vh' : 'auto' }}  // height 조정
        />
      </div>
    </div>
  );
}

export default Sidebar;
