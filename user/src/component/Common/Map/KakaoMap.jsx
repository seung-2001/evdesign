import React, { useEffect, useRef, useCallback, useState, useMemo } from "react";
import {
    MapWrapper,
    MapContainer,
    MapOptions,
    OptionLabel,
    OptionButton,
    MarkerList,
    MarkerListItem,
    RadiusFilterContainer,
    RadiusLabel,
    RadiusSelect,
    FilterInfo,
} from "./KakaoMap.styles";

/**
 * KakaoMap 컴포넌트
 * @param {Object} props
 * @param {Array} props.markers - 마커 데이터 배열 [{ id, lat, lng, name, address, type, data }]
 * @param {Object} props.selectedMarker - 선택된 마커 객체
 * @param {Function} props.onMarkerClick - 마커 클릭 콜백 (marker) => void
 * @param {Function} props.onMarkerSelect - 마커 선택 콜백 (하단 리스트 클릭 시)
 * @param {Object} props.center - 지도 중심 좌표 { lat, lng }
 * @param {number} props.level - 지도 줌 레벨 (기본: 14)
 * @param {boolean} props.showOptions - 옵션 버튼 표시 여부
 * @param {boolean} props.showMarkerList - 하단 마커 리스트 표시 여부
 * @param {boolean} props.enableClustering - 클러스터링 활성화 여부
 * @param {number} props.clusterMinLevel - 클러스터링 최소 레벨 (기본: 9)
 * @param {Function} props.getInfoWindowContent - 인포윈도우 내용 생성 함수 (marker) => string
 * @param {string} props.minHeight - 최소 높이 (기본: 500px)
 * @param {string} props.mapId - 지도 컨테이너 ID (기본: kakao-map)
 */
// Haversine 공식으로 두 좌표 간 거리 계산 (km)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const KakaoMap = ({
    markers = [],
    selectedMarker = null,
    onMarkerClick,
    onMarkerSelect,
    center = { lat: 36.2683, lng: 127.6358 },
    level = 14,
    showOptions = true,
    showMarkerList = true,
    enableClustering = true,
    clusterMinLevel = 9,
    getInfoWindowContent,
    minHeight = "500px",
    mapId = "kakao-map",
    enableRadiusFilter = true, // 반경 필터 활성화 여부
    onFilteredMarkersChange, // 필터링된 마커 변경 콜백
}) => {
    const mapRef = useRef(null);
    const clustererRef = useRef(null);
    const markersRef = useRef([]);
    const infoWindowRef = useRef(null);
    const myLocationMarkerRef = useRef(null);
    const myLocationInfoWindowRef = useRef(null);
    const radiusCircleRef = useRef(null);

    // 내 위치 상태
    const [myLocation, setMyLocation] = useState(null);
    // 반경 필터 상태 (0 = 전체, 1, 3, 5, 10 km)
    const [radiusFilter, setRadiusFilter] = useState(0);
    // 마커 표시 여부
    const [showMarkers, setShowMarkers] = useState(true);

    // 필터링된 마커 계산
    const filteredMarkers = useMemo(() => {
        if (!myLocation || radiusFilter === 0) {
            return markers;
        }

        return markers.filter((marker) => {
            if (!marker.lat || !marker.lng) return false;
            const distance = calculateDistance(
                myLocation.lat,
                myLocation.lng,
                marker.lat,
                marker.lng
            );
            return distance <= radiusFilter;
        });
    }, [markers, myLocation, radiusFilter]);

    // 필터링된 마커 변경 시 콜백 호출
    useEffect(() => {
        if (onFilteredMarkersChange) {
            onFilteredMarkersChange(filteredMarkers);
        }
    }, [filteredMarkers, onFilteredMarkersChange]);

    // 기본 인포윈도우 내용 생성
    const defaultInfoWindowContent = (marker) => `
        <div style="padding: 10px; min-width: 180px;">
            <strong style="font-size: 13px;">${marker.name}</strong>
            ${
                marker.address
                    ? `<p style="font-size: 11px; color: #666; margin: 4px 0;">${marker.address}</p>`
                    : ""
            }
        </div>
    `;

    // 지도 초기화 및 마커 생성
    useEffect(() => {
        const { kakao } = window;
        if (!kakao || !kakao.maps) {
            console.log("카카오맵 SDK가 로드되지 않았습니다.");
            return;
        }

        const mapContainer = document.getElementById(mapId);
        if (!mapContainer) {
            console.log("map 컨테이너를 찾을 수 없습니다.");
            return;
        }

        // 지도가 없으면 생성
        if (!mapRef.current) {
            const mapOption = {
                center: new kakao.maps.LatLng(center.lat, center.lng),
                level: level,
            };
            const map = new kakao.maps.Map(mapContainer, mapOption);
            mapRef.current = map;

            // 줌 컨트롤 추가
            const zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            // 클러스터러 생성 (클러스터링 활성화 시)
            if (enableClustering) {
                const clusterer = new kakao.maps.MarkerClusterer({
                    map: map,
                    averageCenter: true,
                    minLevel: clusterMinLevel,
                    disableClickZoom: true,
                });
                clustererRef.current = clusterer;

                // 클러스터 클릭 시 확대
                kakao.maps.event.addListener(
                    clusterer,
                    "clusterclick",
                    (cluster) => {
                        const newLevel = map.getLevel() - 2;
                        map.setLevel(newLevel, { anchor: cluster.getCenter() });
                    }
                );
            }

            console.log("KakaoMap 초기화 완료!");
        }

        const map = mapRef.current;
        const clusterer = clustererRef.current;

        // 기존 마커 제거
        if (clusterer) {
            clusterer.clear();
        }
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // 인포윈도우 닫기
        if (infoWindowRef.current) {
            infoWindowRef.current.close();
        }

        // 마커 표시가 꺼져있으면 마커 생성 안 함
        if (!showMarkers) {
            console.log("마커 표시가 꺼져있습니다.");
            return;
        }

        // 유효한 좌표가 있는 마커만 필터링 (필터링된 마커 사용)
        const validMarkers = filteredMarkers.filter((m) => m.lat && m.lng);

        if (validMarkers.length === 0) {
            console.log("표시할 마커가 없습니다.");
            return;
        }

        console.log(`${validMarkers.length}개 마커 생성 시작... (반경 필터: ${radiusFilter === 0 ? '전체' : radiusFilter + 'km'})`);

        // 마커 생성
        const kakaoMarkers = [];
        validMarkers.forEach((markerData) => {
            const markerPosition = new kakao.maps.LatLng(
                markerData.lat,
                markerData.lng
            );

            const marker = new kakao.maps.Marker({
                position: markerPosition,
            });

            // 인포윈도우 내용
            const infoContent = getInfoWindowContent
                ? getInfoWindowContent(markerData)
                : defaultInfoWindowContent(markerData);

            const infoWindow = new kakao.maps.InfoWindow({
                content: infoContent,
            });

            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, "click", () => {
                if (infoWindowRef.current) {
                    infoWindowRef.current.close();
                }
                infoWindow.open(map, marker);
                infoWindowRef.current = infoWindow;

                if (onMarkerClick) {
                    onMarkerClick(markerData);
                }
            });

            kakaoMarkers.push(marker);
            markersRef.current.push(marker);
        });

        // 클러스터러에 마커 추가 또는 개별 마커로 표시
        if (clusterer && enableClustering) {
            clusterer.addMarkers(kakaoMarkers);
        } else {
            kakaoMarkers.forEach((marker) => marker.setMap(map));
        }

        console.log(`${validMarkers.length}개 마커 생성 완료!`);
    }, [
        filteredMarkers,
        enableClustering,
        clusterMinLevel,
        getInfoWindowContent,
        onMarkerClick,
        mapId,
        center.lat,
        center.lng,
        level,
        radiusFilter,
        showMarkers,
    ]);

    // 선택된 마커로 이동
    useEffect(() => {
        if (!selectedMarker || !mapRef.current || !window.kakao) return;
        if (!selectedMarker.lat || !selectedMarker.lng) return;

        const { kakao } = window;
        const map = mapRef.current;

        const position = new kakao.maps.LatLng(
            selectedMarker.lat,
            selectedMarker.lng
        );
        map.setCenter(position);
        map.setLevel(3);

        // 해당 마커의 인포윈도우 열기
        const validMarkers = filteredMarkers.filter((m) => m.lat && m.lng);
        const markerIndex = validMarkers.findIndex(
            (m) => m.id === selectedMarker.id
        );

        if (markerIndex >= 0 && markersRef.current[markerIndex]) {
            const marker = markersRef.current[markerIndex];

            if (infoWindowRef.current) {
                infoWindowRef.current.close();
            }

            const infoContent = getInfoWindowContent
                ? getInfoWindowContent(selectedMarker)
                : defaultInfoWindowContent(selectedMarker);

            const infoWindow = new kakao.maps.InfoWindow({
                content: infoContent,
            });

            infoWindow.open(map, marker);
            infoWindowRef.current = infoWindow;
        }
    }, [selectedMarker, filteredMarkers, getInfoWindowContent]);

    // 내 위치 마커 제거 함수
    const clearMyLocation = useCallback(() => {
        if (myLocationMarkerRef.current) {
            myLocationMarkerRef.current.setMap(null);
            myLocationMarkerRef.current = null;
        }
        if (myLocationInfoWindowRef.current) {
            myLocationInfoWindowRef.current.close();
            myLocationInfoWindowRef.current = null;
        }
        if (radiusCircleRef.current) {
            radiusCircleRef.current.setMap(null);
            radiusCircleRef.current = null;
        }
        setMyLocation(null);
        setRadiusFilter(0);
    }, []);

    // 현재 위치 토글 함수
    const toggleMyLocation = useCallback(() => {
        if (!mapRef.current || !window.kakao) return;

        // 이미 내 위치가 표시되어 있으면 제거
        if (myLocation) {
            clearMyLocation();
            return;
        }

        const { kakao } = window;
        const map = mapRef.current;

        if (navigator.geolocation) {
            // 위치 정확도 옵션
            const geoOptions = {
                enableHighAccuracy: true, // 높은 정확도 사용 (GPS)
                timeout: 10000, // 10초 타임아웃
                maximumAge: 0, // 캐시된 위치 사용 안 함
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const accuracy = position.coords.accuracy; // 정확도 (미터)
                    const locPosition = new kakao.maps.LatLng(lat, lon);

                    console.log("위치 정확도:", accuracy, "미터");

                    // 내 위치 저장
                    setMyLocation({ lat, lng: lon });

                    // 내 위치 마커 이미지 (빨간색)
                    const imageSrc =
                        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
                    const imageSize = new kakao.maps.Size(64, 69);
                    const imageOption = {
                        offset: new kakao.maps.Point(27, 69),
                    };
                    const markerImage = new kakao.maps.MarkerImage(
                        imageSrc,
                        imageSize,
                        imageOption
                    );

                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: locPosition,
                        image: markerImage,
                    });
                    myLocationMarkerRef.current = marker;

                    const infoWindow = new kakao.maps.InfoWindow({
                        content:
                            '<div style="padding:10px;font-size:12px;text-align:center;">📍 현재 위치</div>',
                        removable: true,
                    });
                    infoWindow.open(map, marker);
                    myLocationInfoWindowRef.current = infoWindow;

                    map.setCenter(locPosition);
                    map.setLevel(5);

                    console.log("현재 위치:", lat, lon);
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                    let errorMessage = "위치 정보를 가져올 수 없습니다.";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "위치 정보를 사용할 수 없습니다.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "위치 정보 요청 시간이 초과되었습니다.";
                            break;
                    }
                    alert(errorMessage);
                },
                geoOptions // 옵션 전달
            );
        } else {
            alert("이 브라우저에서는 위치 서비스를 사용할 수 없습니다.");
        }
    }, [myLocation, clearMyLocation]);

    // 반경 원 그리기
    useEffect(() => {
        if (!mapRef.current || !window.kakao || !myLocation) return;
        if (radiusFilter === 0) {
            // 반경 필터 해제 시 원 제거
            if (radiusCircleRef.current) {
                radiusCircleRef.current.setMap(null);
                radiusCircleRef.current = null;
            }
            return;
        }

        const { kakao } = window;
        const map = mapRef.current;

        // 기존 원 제거
        if (radiusCircleRef.current) {
            radiusCircleRef.current.setMap(null);
        }

        // 새 원 그리기
        const circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
            radius: radiusFilter * 1000, // km to m
            strokeWeight: 2,
            strokeColor: "#2563eb",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#2563eb",
            fillOpacity: 0.1,
        });
        circle.setMap(map);
        radiusCircleRef.current = circle;

        // 원이 보이도록 지도 레벨 조정
        const bounds = circle.getBounds();
        map.setBounds(bounds);
    }, [myLocation, radiusFilter]);

    // 마커 선택 핸들러 (하단 리스트)
    const handleMarkerSelect = (markerData) => {
        if (onMarkerSelect) {
            onMarkerSelect(markerData);
        }
    };

    return (
        <MapWrapper $minHeight={minHeight}>
            <MapContainer id={mapId} $minHeight={minHeight} />

            {showOptions && (
                <MapOptions>
                    <OptionLabel>지도 옵션</OptionLabel>
                    <OptionButton 
                        $active={showMarkers}
                        onClick={() => setShowMarkers(!showMarkers)}
                    >
                        📍 마커 {showMarkers ? "OFF" : "ON"}
                    </OptionButton>
                    <OptionButton 
                        $active={!!myLocation}
                        onClick={toggleMyLocation}
                    >
                        🎯 내 위치 {myLocation ? "OFF" : "ON"}
                    </OptionButton>
                    
                    {enableRadiusFilter && (
                        <RadiusFilterContainer>
                            <RadiusLabel>🔍 반경 필터</RadiusLabel>
                            <RadiusSelect
                                value={radiusFilter}
                                onChange={(e) => setRadiusFilter(Number(e.target.value))}
                                disabled={!myLocation}
                                title={!myLocation ? "먼저 '내 위치'를 클릭하세요" : ""}
                            >
                                <option value={0}>전체 보기</option>
                                <option value={1}>1km 이내</option>
                                <option value={3}>3km 이내</option>
                                <option value={5}>5km 이내</option>
                                <option value={10}>10km 이내</option>
                            </RadiusSelect>
                        </RadiusFilterContainer>
                    )}
                    
                    {myLocation && radiusFilter > 0 && (
                        <FilterInfo>
                            📌 {filteredMarkers.length}개 발견
                        </FilterInfo>
                    )}
                </MapOptions>
            )}

            {showMarkerList && filteredMarkers.length > 0 && (
                <MarkerList>
                    {filteredMarkers
                        .filter((m) => m.lat && m.lng)
                        .map((markerData) => (
                            <MarkerListItem
                                key={markerData.id}
                                $selected={selectedMarker?.id === markerData.id}
                                onClick={() => handleMarkerSelect(markerData)}
                            >
                                {markerData.name}
                            </MarkerListItem>
                        ))}
                </MarkerList>
            )}
        </MapWrapper>
    );
};

export default KakaoMap;
