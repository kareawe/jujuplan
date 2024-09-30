import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

function SlidebarPlanner({ selectedDates, onDrop }) {
  const [textColor, setTextColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const captureRefs = useRef([]);

  const colors = [
    { name: 'black', value: '#000000' },
    { name: 'Peach', value: '#ffb7b2' },
    { name: 'Light Green', value: '#b5ead7' },
    { name: 'Mint', value: '#9de0ad' },
    { name: 'Pale Blue', value: '#a8e6cf' },
    { name: 'Lavender', value: '#cbaacb' },
    { name: 'Dusky Peach', value: '#e29a86' },
    { name: 'Sky Blue', value: '#a2d5f2' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteItem = (dateIndex, itemIndex) => {
    const updatedDates = selectedDates.map((date, i) => {
      if (i === dateIndex) {
        return {
          ...date,
          items: date.items.filter((_, j) => j !== itemIndex),
        };
      }
      return date;
    });

    onDrop(updatedDates);
  };

  const handleStartTimeChange = (dateIndex, itemIndex, value) => {
    const updatedDates = selectedDates.map((date, i) => {
      if (i === dateIndex) {
        return {
          ...date,
          items: date.items.map((item, j) => {
            if (j === itemIndex) {
              return { ...item, startTime: value };
            }
            return item;
          }),
        };
      }
      return date;
    });

    onDrop(updatedDates);
  };

  const handleEndTimeChange = (dateIndex, itemIndex, value) => {
    const updatedDates = selectedDates.map((date, i) => {
      if (i === dateIndex) {
        return {
          ...date,
          items: date.items.map((item, j) => {
            if (j === itemIndex) {
              return { ...item, endTime: value };
            }
            return item;
          }),
        };
      }
      return date;
    });

    onDrop(updatedDates);
  };

  const handleCaptureAllClick = async () => {
    try {
      await document.fonts.ready; // 모든 폰트가 로드될 때까지 대기
      const canvases = await Promise.all(
        captureRefs.current.map(ref => ref && html2canvas(ref, { useCORS: true, allowTaint: true, scale: 2 }))
      );

      const combinedCanvas = document.createElement('canvas');
      const context = combinedCanvas.getContext('2d');
      const totalHeight = canvases.reduce((sum, canvas) => sum + canvas.height, 0);
      const maxWidth = Math.max(...canvases.map(canvas => canvas.width));

      combinedCanvas.width = maxWidth;
      combinedCanvas.height = totalHeight;

      let yOffset = 0;
      canvases.forEach(canvas => {
        context.drawImage(canvas, 0, yOffset);
        yOffset += canvas.height;
      });

      const dataUrl = combinedCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'JejuPlan.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Capture failed:', error);
    }
  };

  return (
    <div className="pl-6 pr-6 pb-6 space-y-6 h-full overflow-y-auto mt-6 mb-6 rounded-lg" style={{ maxHeight: '500px' }}>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        style={{ backgroundColor: textColor, focusRingColor: `${textColor}80` }}
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        컬러 선택
      </button>
      {showColorPicker && (
        <div ref={colorPickerRef} className="absolute bg-white border rounded p-4 shadow-lg z-10">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <div
                key={color.value}
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{ backgroundColor: color.value }}
                onClick={() => {
                  setTextColor(color.value);
                  setShowColorPicker(false);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
      {selectedDates.map((date, dateIndex) => (
        <div
          className="text-center p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
          key={dateIndex}
          onDrop={(e) => {
            e.preventDefault();
            onDrop(dateIndex);
          }}
          onDragOver={(e) => e.preventDefault()}
          ref={(el) => (captureRefs.current[dateIndex] = el)}
        >
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>{date.date}</h3>
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>{date.cost}원</h3>
          </div>
          {date.items && date.items.map((item, itemIndex) => (
            <div className="flex justify-between items-center mt-4 cursor-pointer md:pl-0 pr-28 md:pr-0" key={itemIndex}>
              <div className="flex min-w-[2rem] items-center justify-center w-8 h-8 rounded-full text-white font-bold text-nowrap" style={{ backgroundColor: textColor, focusRingColor: `${textColor}80` }}>
                {itemIndex + 1}
              </div>
              <div className="relative flex border-2 min-w-[14rem] border-gray-200 rounded-lg p-0 w-72 md:w-64 h-24 text-sm font-semibold bg-white shadow-sm">
                <div className="h-full w-2 mr-3 rounded-l" style={{ backgroundColor: textColor }}></div>
                <div className='w-full max-w-56 pr-0 p-3 pl-0'>
                  <div className="text-gray-800 w-4/4 flex justify-between overflow-hidden text-ellipsis whitespace-nowrap">
                    <p className='max-w-56 overflow-hidden text-ellipsis whitespace-nowrap hover:overflow-visible hover:text-clip hover:text-wrap hover:text-left'>{item.name}</p>
                    <button
                      className="px-2 py-1 overflow-hidden text-white text-xs mr-1 rounded-md hover:opacity-75 transition-colors duration-200 ease-in-out shadow focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{ backgroundColor: textColor, focusRingColor: `${textColor}80` }}
                      onClick={() => handleDeleteItem(dateIndex, itemIndex)}
                    >
                      삭제
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap text-left">
                    {item.address}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-1 pl-3 rounded-b-lg">
                    <input
                      className="w-20 sm:w-28 p-1 pl-0 border border-gray-300 rounded-md text-xs"
                      type="time"
                      value={item.startTime || ''}
                      onChange={(e) => handleStartTimeChange(dateIndex, itemIndex, e.target.value)}
                    />
                    <span className="mx-1">-</span>
                    <input
                      className="w-20 sm:w-28 p-1 pl-0 border border-gray-300 rounded-md text-xs"
                      type="time"
                      value={item.endTime || ''}
                      onChange={(e) => handleEndTimeChange(dateIndex, itemIndex, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {selectedDates[0] && (
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleCaptureAllClick}
      >
        전체 캡처
      </button>)}
    </div>
  );
}

export default SlidebarPlanner;
