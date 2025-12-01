import React, { useEffect, useRef, useCallback } from "react";
import {
    MapWrapper,
    MapContainer,
    MapOptions,
    OptionLabel,
    OptionButton,
    MarkerList,
    MarkerListItem,
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
}) => {
    const mapRef = useRef(null);
    const clustererRef = useRef(null);
    const markersRef = useRef([]);
    const infoWindowRef = useRef(null);
    const myLocationMarkerRef = useRef(null);
    const myLocationInfoWindowRef = useRef(null);

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

        // 유효한 좌표가 있는 마커만 필터링
        const validMarkers = markers.filter((m) => m.lat && m.lng);

        if (validMarkers.length === 0) {
            console.log("표시할 마커가 없습니다.");
            return;
        }

        console.log(`${validMarkers.length}개 마커 생성 시작...`);

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
        markers,
        enableClustering,
        clusterMinLevel,
        getInfoWindowContent,
        onMarkerClick,
        mapId,
        center.lat,
        center.lng,
        level,
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
        const validMarkers = markers.filter((m) => m.lat && m.lng);
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
    }, [selectedMarker, markers, getInfoWindowContent]);

    // 현재 위치 표시 함수
    const showMyLocation = useCallback(() => {
        if (!mapRef.current || !window.kakao) return;

        const { kakao } = window;
        const map = mapRef.current;

        // 기존 내 위치 마커 제거
        if (myLocationMarkerRef.current) {
            myLocationMarkerRef.current.setMap(null);
        }
        if (myLocationInfoWindowRef.current) {
            myLocationInfoWindowRef.current.close();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const locPosition = new kakao.maps.LatLng(lat, lon);

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
                    alert(
                        "위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요."
                    );
                }
            );
        } else {
            alert("이 브라우저에서는 위치 서비스를 사용할 수 없습니다.");
        }
    }, []);

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
                    <OptionLabel>옵션</OptionLabel>
                    <OptionButton $active={true}>마커</OptionButton>
                    <OptionButton onClick={showMyLocation}>
                        내 위치
                    </OptionButton>
                </MapOptions>
            )}

            {showMarkerList && markers.length > 0 && (
                <MarkerList>
                    {markers
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
