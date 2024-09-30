import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import Sidebar from "./Sidebar";
import "./Plan.css";
import kind_china from "./서울_중식.json"; // 서울식당.json 파일을 가져옴
import kind_korea from "./서울_한식.json";
import kind_usa from "./서울_양식.json";
import kind_cafe from "./서울_카페.json";
import kind_lodging from "./숙박.json";
import kind_else from "./기타.json";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const JEJU_CENTER = { lat: 33.4996213, lng: 126.5311884 }; // 제주도 중앙 위치

function Plan({ name }) {
  const location = useLocation();
  const [center, setCenter] = useState(JEJU_CENTER);
  const [zoom, setZoom] = useState(10); // 줌 상태 추가
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placesData, setPlacesData] = useState([]);
  const [filteredPlacesData, setFilteredPlacesData] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const mapRef = useRef(null);
  const { type } = location.state || {};
  const geocoder = useRef(null);
  const [isClick, setIsClick] = useState({type});
  const [isKind, setIsKind] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);

  useEffect(() => {
    if (location.state && location.state.center && location.state.center.coords) {
      const initialCenter = {
        lat: location.state.center.coords.lat,
        lng: location.state.center.coords.lng,
      };
      setCenter(initialCenter);
      if (geocoder.current) {
        geocodeLatLng(initialCenter);
      }
    } else {
      console.error("Invalid location state");
    }
  }, [location]);

  useEffect(() => {
    handleFilterChange();
  }, [isClick, isKind]);

  const onLoad = (map) => {
    mapRef.current = map;
    if (type=="korean"){
      geocoder.current = new window.google.maps.Geocoder();
      searchNearbyPlaces(map.getCenter(), 'korean', map.getZoom()); // 기본 검색어를 '한식'으로 설정
    }
    else if (type=="chinese"){
      geocoder.current = new window.google.maps.Geocoder();
      searchNearbyPlaces(map.getCenter(), 'chinese', map.getZoom()); // 기본 검색어를 '한식'으로 설정
    }
    else if (type=="western"){
      geocoder.current = new window.google.maps.Geocoder();
      searchNearbyPlaces(map.getCenter(), 'western', map.getZoom()); // 기본 검색어를 '한식'으로 설정
    }
    else if (type=="cafe"){
      geocoder.current = new window.google.maps.Geocoder();
      searchNearbyPlaces(map.getCenter(), 'cafe', map.getZoom()); // 기본 검색어를 '한식'으로 설정
    }
    
    if (center) {
      geocodeLatLng(center);
    }
  };

  const searchNearbyPlaces = (location, keyword, zoomLevel) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const radius = getRadiusFromZoom(zoomLevel);
    const request = {
      location: location,
      radius: radius,
      keyword: keyword,
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placesInfo = results.map(place => ({
          name: place.name,
          address: place.vicinity,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          rating: place.rating, // 별점 추가
          type: keyword,
          placeId: place.place_id
        }));
        setPlacesData(placesInfo);
        setFilteredPlacesData(placesInfo);
      } else {
        console.error("Places search failed: ", status);
      }
    });
  };

  const getRadiusFromZoom = (zoomLevel) => {
    // 줌 레벨에 따라 반경을 계산합니다 (값은 예시입니다, 조정 가능)
    const zoomRadiusMap = {
      22: 50,
      21: 80,
      20: 100,
      19: 200,
      18: 400,
      17: 500,
      16: 800,
      15: 1000,
      14: 2000,
      13: 5000,
      12: 10000,
      11: 20000,
      10: 30000,
      9: 40000,
      8: 50000,
    };
    return zoomRadiusMap[zoomLevel] || 30000; // 기본값은 30000m
  };

  const handleDragEnd = useCallback(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      const newZoom = mapRef.current.getZoom(); // 현재 줌 레벨을 가져옵니다
      const newCenterLat = newCenter.lat();
      const newCenterLng = newCenter.lng();

      if (newCenterLat !== center.lat || newCenterLng !== center.lng || newZoom !== zoom) {
        const newCenterCoords = {
          lat: newCenterLat,
          lng: newCenterLng,
        };
        setCenter(newCenterCoords);
        setZoom(newZoom); // 줌 상태를 업데이트합니다
        if (searchTerm) {
          handleSearch(searchTerm, newCenterCoords, newZoom);
        } else {
          handleFilterChange(newCenterCoords, newZoom);
        }
        geocodeLatLng(newCenterCoords);
      }
    }
  }, [center, searchTerm, zoom]);

  const geocodeLatLng = (coords) => {
    if (geocoder.current) {
      geocoder.current.geocode({ location: coords }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const addressComponents = results[0].address_components;
            const formattedAddress = formatAddress(addressComponents);
            setCurrentAddress(formattedAddress);
          } else {
            setCurrentAddress('No address found');
          }
        } else {
          setCurrentAddress('Geocoder failed due to: ' + status);
        }
      });
    }
  };

  const formatAddress = (addressComponents) => {
    const country = addressComponents.find(component => component.types.includes("country"))?.long_name || '';
    const administrativeAreaLevel1 = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || '';
    const administrativeAreaLevel2 = addressComponents.find(component => component.types.includes("administrative_area_level_2"))?.long_name || '';
    const locality = addressComponents.find(component => component.types.includes("locality"))?.long_name || '';
    const sublocalityLevel1 = addressComponents.find(component => component.types.includes("sublocality_level_1"))?.long_name || '';

    return `${country} ${administrativeAreaLevel1} ${administrativeAreaLevel2} ${locality} ${sublocalityLevel1}`;
  };

  const getLatLng = (address, geocoder) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
          resolve(null);
        }
      });
    });
  };

  const loadKindPlacesData = async (geocoder, centerCoords, zoomLevel) => {
    let kindPlaces;
    if (isClick === "korean") {
      kindPlaces = kind_korea;
    } else if (isClick === "chinese") {
      kindPlaces = kind_china;
    } else if (isClick === "western") {
      kindPlaces = kind_usa;
    } else if (isClick === "cafe") {
      kindPlaces = kind_cafe;
    } else if (isClick === "lodging") {
      kindPlaces = kind_lodging;
    } else if (isClick === "etc") {
      kindPlaces = kind_else;
    }

    const radius = getRadiusFromZoom(zoomLevel);

    const geocodedPlaces = await Promise.all(
      kindPlaces.map(async (place) => {
        const coords = await getLatLng(place.address, geocoder);
        if (coords && isWithinRadius(centerCoords, coords, radius)) {
          const rating = await getPlaceRating(place.name, coords);
          return {
            ...place,
            location: coords,
            rating: rating || 0, // 별점 추가
          };
        } else {
          console.warn(`Geocoding failed for address: ${place.address}`);
          return null;
        }
      })
    );

    const validPlaces = geocodedPlaces.filter(place => place !== null);
    setPlacesData(validPlaces);
    setFilteredPlacesData(validPlaces);
  };

  const getPlaceRating = (name, coords) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(mapRef.current);
      const request = {
        location: coords,
        radius: '50',
        query: name,
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          resolve(results[0].rating);
        } else {
          resolve(null);
        }
      });
    });
  };

  const isWithinRadius = (center, location, radius) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (location.lat - center.lat) * Math.PI / 180;
    const dLng = (location.lng - center.lng) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(center.lat * Math.PI / 180) * Math.cos(location.lat * Math.PI / 180) * (1 - Math.cos(dLng)) / 2;
    const distance = R * 2 * Math.asin(Math.sqrt(a));
    return distance <= radius / 1000;
  };

  const FilterChange = (category) => {
    setIsClick(category);
  }

  const handleFilterChange = (centerCoords = center, zoomLevel = zoom) => {
    let keyword = '';
    switch (isClick) {
      case 'korean':
        keyword = 'korean';
        break;
      case 'chinese':
        keyword = 'chinese';
        break;
      case 'western':
        keyword = 'western';
        break;
      case 'cafe':
        keyword = 'cafe';
        break;
      case 'lodging':
        keyword = 'lodging';
        break;
      case 'etc':
        keyword = 'etc';
        break;
      default:
        keyword = 'korean';
    }
    if (isKind) {
      loadKindPlacesData(geocoder.current, centerCoords, zoomLevel); // JSON 파일을 로드하여 지도에 표시
    }
    else if (mapRef.current) {
      searchNearbyPlaces(centerCoords, keyword, zoomLevel);
    }
  };

  const handleLoadError = (error) => {
    console.error("Error loading Google Maps API script:", error);
  };

  const handleDragStart = (element) => {
    setDraggedElement(element);
  };

  const handleDropToSlidebar = (index) => {
    if (Array.isArray(index)) {
      setSelectedDates(index);
    } else if (draggedElement) {
      setSelectedDates((prevDates) =>
        prevDates.map((date, i) =>
          i === index ? { ...date, items: [...(date.items || []), draggedElement] } : date
        )
      );
      setDraggedElement(null);
    }
  };

  const handlePlaceClick = async (place) => {
    if (mapRef.current) {
      mapRef.current.panTo(place.location);
    }
    setSelectedPlace(place);
  };

  const handleSearch = (searchTerm, centerCoords = center, zoomLevel = zoom) => {
    setSearchTerm(searchTerm); // 검색어를 상태로 저장
    const radius = getRadiusFromZoom(zoomLevel);
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      query: searchTerm,
      location: centerCoords,
      radius: radius,
      fields: ["name", "geometry", "formatted_address", "rating"], // 별점을 포함하여 검색
    };
    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const place = results[0];
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        const placesInfo = results.map(place => ({
          name: place.name,
          address: place.formatted_address,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          rating: place.rating, // 별점 추가
          placeId: place.place_id
        }));
        setPlacesData(placesInfo);
        setFilteredPlacesData(placesInfo);
      } else {
        console.error("Place search failed: ", status);
      }
    });
  };

  if (!center) {
    return <div>지도를 표시할 위치 정보가 없습니다.</div>;
  }

  const pinkMarkerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  };

  const purpleMarkerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  };

  const yellowMarkerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  };

  const createNaverLink = (placeName) => {
    const query = encodeURIComponent(placeName);
    return `https://search.naver.com/search.naver?query=${query}`;
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

    return (
      <div className="flex space-x-1">
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} fillPercentage={100} />
        ))}
        {partialStar > 0 && <Star fillPercentage={partialStar * 100} />}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={index} fillPercentage={0} />
        ))}
      </div>
    );
  };

  const Star = ({ fillPercentage }) => {
    return (
      <div className="star">
        <div className="star-fill" style={{ width: `${fillPercentage}%` }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.939 1.417 8.461L12 18.897l-7.417 4.926L6 15.362 0 9.423l8.332-1.268L12 .587z" />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="text-gray-400"
        >
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.939 1.417 8.461L12 18.897l-7.417 4.926L6 15.362 0 9.423l8.332-1.268L12 .587z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="block md:flex md:plan-container md:flex-row-reverse">
      
      <div className="map">
        <LoadScript
          googleMapsApiKey="AIzaSyBVjg3-DigyS--LnssAVGa9YM4S2Cod1eY"
          libraries={["places"]}
          onError={handleLoadError}
        >
          <div className="map flex align-middle justify-center md:h-full" style={{ width: "100%" }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onLoad={onLoad}
              onDragEnd={handleDragEnd}
              onZoomChanged={() => {
                if (mapRef.current) {
                  const newZoom = mapRef.current.getZoom();
                  setZoom(newZoom);
                  handleDragEnd(); // 줌 레벨이 변경되었을 때 중심 좌표와 줌 레벨을 기반으로 다시 검색
                }
              }}
            >
              {filteredPlacesData.map((place, index) => (
                <Marker
                  key={index}
                  position={place.location}
                  onClick={() => handlePlaceClick(place)}
                  icon={isClick==="lodging" ? purpleMarkerIcon : (isKind ? pinkMarkerIcon : null)} // tourist 카테고리일 때 핑크색 아이콘 사용
                />
              ))}

              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.location}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="p-4 max-w-xs">
                    <div className="border-b pb-2 mb-2">
                      <h2 className="text-lg font-bold text-gray-800">{selectedPlace.name}</h2>
                    </div>
                    <div className="text-gray-600">
                      <div className="text-base">
                        <p>Rating: {selectedPlace.rating} / 5</p>
                        <StarRating rating={selectedPlace.rating} />
                      </div>
                      <p>{selectedPlace.address}</p>
                      {selectedPlace.주요품목 && selectedPlace.가격 && (
                        <p>{selectedPlace.주요품목} - {selectedPlace.가격}원</p>
                      )}
                      {selectedPlace.연락처 && <p>연락처: {selectedPlace.연락처}</p>}
                      <p>
                        <a
                          href={createNaverLink("제주 " + selectedPlace.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          네이버에서 검색
                        </a>
                      </p>
                    </div>
                  </div>
                </InfoWindow>
              )}

              {selectedDates.map((date, dateIndex) => (
                <React.Fragment key={dateIndex}>
                  {date.items && date.items.map((item, itemIndex) => (
                    item.type==="lodging" ? 
                    <Marker
                      key={`${dateIndex}-${itemIndex}`}
                      position={item.location}
                      onClick={() => setSelectedPlace(item)}
                      icon={purpleMarkerIcon}
                      label={{
                        text: `${dateIndex + 1}`,
                        fontFamily: "Arial", // 글꼴
                        fontSize: "14px", // 글꼴 크기
                        fontWeight: "bold", // 글꼴 두께
                        color: "#fff" // 글꼴 색상
                      }}
                    /> : (
                      item.type ?
                    <Marker
                      key={`${dateIndex}-${itemIndex}`}
                      position={item.location}
                      onClick={() => setSelectedPlace(item)}
                      icon={yellowMarkerIcon}
                      glyph={name}
                      label={{
                        text: `${dateIndex + 1}`,
                        fontFamily: "Arial", // 글꼴
                        fontSize: "16px", // 글꼴 크기
                        fontWeight: "bold", // 글꼴 두께
                        color: "#fff" // 글꼴 색상
                      }}
                    /> :
                    <Marker
                    key={`${dateIndex}-${itemIndex}`}
                    position={item.location}
                    onClick={() => setSelectedPlace(item)}
                    icon={pinkMarkerIcon}
                    label={{
                      text: `${dateIndex + 1}`,
                      fontFamily: "Arial", // 글꼴
                      fontSize: "16px", // 글꼴 크기
                      fontWeight: "bold", // 글꼴 두께
                      color: "#fff" // 글꼴 색상
                    }}
                  />
                  )
                    
                  ))}
                  {date.items && date.items.length > 1 && (
                    <Polyline
                      path={date.items.map(item => item.location)}
                      options={{ strokeColor: "#ff7f00", strokeOpacity: 1.0, strokeWeight: 2 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
      <Sidebar
        currentAddress={currentAddress}
        setSelectedDates={setSelectedDates}
        placesData={placesData}
        onFilterChange={FilterChange}
        name={name}
        isKind={setIsKind}
        selectedDates={selectedDates}
        handleDropToSlidebar={handleDropToSlidebar}
        handleDragStart={handleDragStart}
        onPlaceClick={handlePlaceClick}
        onSearch={handleSearch} // 추가된 부분
        type={type}
      />
    </div>
  );
}

export default Plan;
