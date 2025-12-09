import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import KakaoMap from "../Map/KakaoMap";
import {
    Container,
    PageTitle,
    MainLayout,
    LeftPanel,
    RightPanel,
    SearchBar,
    SearchInput,
    SearchButton,
    StationDetailCard,
    StationImage,
    StationInfoBox,
    StationName,
    StationAddress,
    StationMeta,
    TypeBadge,
    StatusBadge,
    StationListContainer,
    StationListItem,
    StationListInfo,
    StationListName,
    StationListAddress,
    StationListBadge,
    BackButton,
    ReviewSection,
    ReviewItem,
    ReviewHeader,
    ReviewAuthor,
    ReviewDate,
    ReviewTitle,
    ReviewContent,
    ReviewActions,
    ReviewActionButton,
    ReviewForm,
    ReviewTitleInput,
    ReviewTextarea,
    ReviewSubmitButton,
    NoReviews,
    ErrorMessage,
    EmptyState,
} from "./StationInfo.styles";

const API_BASE_URL = "http://localhost:8081";

// 충전기 타입 코드 매핑
const CHARGER_TYPE_MAP = {
    "01": "DC차데모",
    "02": "AC완속",
    "03": "DC차데모+AC3상",
    "04": "DC콤보",
    "05": "DC차데모+DC콤보",
    "06": "DC차데모+AC3상+DC콤보",
    "07": "AC3상",
    "08": "DC콤보(완속)",
    "09": "NACS",
    10: "DC콤보+NACS",
};

// 충전기 타입 라벨 가져오기
const getChargerTypeLabel = (type) => {
    if (!type) return "-";
    return CHARGER_TYPE_MAP[type] || type;
};

// 급속 충전기인지 확인 (AC완속, DC콤보(완속) 제외)
const isFastCharger = (type) => {
    return type && type !== "02" && type !== "08";
};

const StationInfoPage = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    // 리뷰 관련 상태
    const [reviews, setReviews] = useState([]);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [editingReviewNo, setEditingReviewNo] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [reviewMsg, setReviewMsg] = useState(""); // 리뷰 유효값 검증 메시지

    // 반경 필터링된 충전소 상태
    const [filteredStations, setFilteredStations] = useState(null);

    // 리뷰 작성 폼 표시 여부
    const [showReviewForm, setShowReviewForm] = useState(false);

    // 충전소 목록 조회
    const fetchStations = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/station`);
            const data = Array.isArray(response.data) ? response.data : [];
            setStations(data);
            // 초기에는 리스트만 보여줌
            setSelectedStation(null);
        } catch (err) {
            console.error("충전소 목록 조회 실패:", err);
            setError("충전소 목록을 불러오는데 실패했습니다.");
            setStations([]);
        } finally {
            setLoading(false);
        }
    };

    // 충전소 검색
    const searchStations = async () => {
        if (!searchKeyword.trim()) {
            fetchStations();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/station/search`, {
                params: { keyword: searchKeyword.trim() },
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setStations(data);
            // 검색 후에도 리스트만 보여줌
            setSelectedStation(null);
        } catch (err) {
            console.error("충전소 검색 실패:", err);
            setError("충전소 검색에 실패했습니다.");
            setStations([]);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 조회
    useEffect(() => {
        fetchStations();
    }, []);

    // 검색 핸들러
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchStations();
        }
    };

    // 리뷰 조회
    const fetchReviews = async (stationNo) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/station/reviews/${stationNo}`
            );
            setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("리뷰 조회 실패:", err);
            setReviews([]);
        }
    };

    // 선택된 충전소 변경 시 리뷰 조회 및 폼 초기화
    useEffect(() => {
        if (selectedStation?.stationNo) {
            fetchReviews(selectedStation.stationNo);
        } else {
            setReviews([]);
        }
        // 충전소 변경 시 리뷰 작성 폼 닫기
        setShowReviewForm(false);
        setEditingReviewNo(null);
        setEditContent("");
        setReviewMsg("");
    }, [selectedStation?.stationNo]);

    // 리뷰 등록
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        // 유효값 검증
        const trimmedTitle = reviewTitle.trim();
        const trimmedContent = reviewContent.trim();
        
        if (!selectedStation) {
            setReviewMsg("충전소를 선택해주세요.");
            return;
        }
        
        if (!trimmedTitle) {
            setReviewMsg("리뷰 제목을 입력해주세요.");
            return;
        }
        
        if (trimmedTitle.length < 2 || trimmedTitle.length > 100) {
            setReviewMsg("리뷰 제목은 2자 이상 100자 이하로 입력해주세요.");
            return;
        }
        
        if (!trimmedContent) {
            setReviewMsg("리뷰 내용을 입력해주세요.");
            return;
        }
        
        if (trimmedContent.length < 5 || trimmedContent.length > 1000) {
            setReviewMsg("리뷰 내용은 5자 이상 1000자 이하로 입력해주세요.");
            return;
        }
        
        setReviewMsg(""); // 검증 통과 시 메시지 초기화

        // 로그인 체크
        if (!auth.isAuthenticated || !auth.accessToken) {
            alert("리뷰를 작성하려면 로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            await axios.post(
                `${API_BASE_URL}/station/reviews`,
                {
                    stationNo: selectedStation.stationNo,
                    reviewTitle: reviewTitle.trim(),
                    reviewContent: reviewContent.trim(),
                    memberNo: auth.memberNo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );
            setReviewTitle("");
            setReviewContent("");
            setReviewMsg(""); // 성공 시 메시지 초기화
            setShowReviewForm(false); // 폼 닫기
            fetchReviews(selectedStation.stationNo);
            alert("리뷰가 등록되었습니다.");
        } catch (err) {
            console.error("리뷰 등록 실패:", err);
            
            let errorMessage = "리뷰 등록에 실패했습니다.";
            if (err.response?.data) {
                const serverMessage = err.response.data;
                errorMessage = typeof serverMessage === "string" 
                    ? serverMessage 
                    : serverMessage?.message || serverMessage?.["error-message"] || errorMessage;
            }
            
            alert(errorMessage);
        }
    };

    // 리뷰 수정
    const handleReviewUpdate = async (review) => {
        // 유효값 검증
        const trimmedContent = editContent.trim();
        
        if (!trimmedContent) {
            setReviewMsg("리뷰 내용을 입력해주세요.");
            return;
        }
        
        if (trimmedContent.length < 5 || trimmedContent.length > 1000) {
            setReviewMsg("리뷰 내용은 5자 이상 1000자 이하로 입력해주세요.");
            return;
        }
        
        setReviewMsg(""); // 검증 통과 시 메시지 초기화

        if (!auth.isAuthenticated || !auth.accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        
        // 권한 체크 (본인 확인)
        if (String(review.memberNo) !== String(auth.memberNo)) {
            alert("본인이 작성한 리뷰만 수정할 수 있습니다.");
            setEditingReviewNo(null);
            setEditContent("");
            return;
        }

        const updateData = {
            reviewNo: review.reviewNo,
            stationNo: selectedStation.stationNo,
            reviewTitle:
                review.reviewTitle || `${selectedStation.stationName} 리뷰`,
            reviewContent: editContent.trim(),
            memberNo: review.memberNo,
        };
        console.log("리뷰 수정 데이터:", updateData);

        try {
            await axios.put(`${API_BASE_URL}/station/reviews`, updateData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            setEditingReviewNo(null);
            setEditContent("");
            setReviewMsg(""); // 성공 시 메시지 초기화
            fetchReviews(selectedStation.stationNo);
            alert("리뷰가 수정되었습니다.");
        } catch (err) {
            console.error("리뷰 수정 실패:", err);
            
            let errorMessage = "리뷰 수정에 실패했습니다.";
            if (err.response?.data) {
                const serverMessage = err.response.data;
                errorMessage = typeof serverMessage === "string" 
                    ? serverMessage 
                    : serverMessage?.message || serverMessage?.["error-message"] || errorMessage;
            }
            
            alert(errorMessage);
        }
    };

    // 리뷰 삭제
    const handleReviewDelete = async (reviewNo) => {
        if (!window.confirm("리뷰를 삭제하시겠습니까?")) return;

        if (!auth.isAuthenticated || !auth.accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/station/reviews/${reviewNo}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            fetchReviews(selectedStation.stationNo);
            alert("리뷰가 삭제되었습니다.");
        } catch (err) {
            console.error("리뷰 삭제 실패:", err);
            
            let errorMessage = "리뷰 삭제에 실패했습니다.";
            if (err.response?.data) {
                const serverMessage = err.response.data;
                errorMessage = typeof serverMessage === "string" 
                    ? serverMessage 
                    : serverMessage?.message || serverMessage?.["error-message"] || errorMessage;
            }
            
            alert(errorMessage);
        }
    };

    // 수정 모드 시작
    const startEdit = (review) => {
        setEditingReviewNo(review.reviewNo);
        setEditContent(review.reviewContent);
        setReviewMsg(""); // 수정 모드 시작 시 메시지 초기화
        setShowReviewForm(false); // 수정 중에는 작성 폼 닫기
    };

    // 수정 모드 취소
    const cancelEdit = () => {
        setEditingReviewNo(null);
        setEditContent("");
        setReviewMsg(""); // 취소 시 메시지 초기화
    };

    // 날짜 포맷
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // 반경 필터 콜백 - 지도에서 필터링된 마커를 받아서 리스트 업데이트
    const handleFilteredMarkersChange = (filteredMarkers) => {
        if (filteredMarkers.length === stations.length) {
            // 전체 표시일 때는 null로 설정
            setFilteredStations(null);
        } else {
            // 필터링된 마커의 id로 충전소 필터링
            const filteredIds = filteredMarkers.map((m) => m.id);
            const filtered = stations.filter((s) => filteredIds.includes(s.stationNo));
            setFilteredStations(filtered);
        }
    };

    // 왼쪽 리스트에 표시할 충전소 (필터링 적용)
    const displayStations = filteredStations !== null ? filteredStations : stations;

    // KakaoMap용 마커 데이터 변환
    const mapMarkers = stations.map((station) => ({
        id: station.stationNo,
        lat: station.stationLat,
        lng: station.stationLng,
        name: station.stationName,
        address: station.stationAddress,
        type: station.stationType,
        data: station, // 원본 데이터 저장
    }));

    // 선택된 마커 데이터
    const selectedMapMarker = selectedStation
        ? {
              id: selectedStation.stationNo,
              lat: selectedStation.stationLat,
              lng: selectedStation.stationLng,
              name: selectedStation.stationName,
              address: selectedStation.stationAddress,
              type: selectedStation.stationType,
              data: selectedStation,
          }
        : null;

    // 마커 클릭 핸들러
    const handleMarkerClick = (markerData) => {
        setSelectedStation(markerData.data);
    };

    // 마커 선택 핸들러 (하단 리스트)
    const handleMarkerSelect = (markerData) => {
        setSelectedStation(markerData.data);
    };

    // 인포윈도우 내용 생성
    const getInfoWindowContent = (markerData) => {
        const chargerLabel = getChargerTypeLabel(markerData.type);
        const isFast = isFastCharger(markerData.type);
        return `
            <div style="padding: 10px; min-width: 180px;">
                <strong style="font-size: 13px;">${markerData.name}</strong>
                <p style="font-size: 11px; color: #666; margin: 4px 0;">${
                    markerData.address || ""
                }</p>
                <span style="
                    display: inline-block;
                    padding: 2px 6px;
                    border-radius: 10px;
                    font-size: 10px;
                    background-color: ${isFast ? "#dbeafe" : "#f3f4f6"};
                    color: ${isFast ? "#1e40af" : "#374151"};
                ">${chargerLabel}</span>
            </div>
        `;
    };

    if (loading && stations.length === 0) {
        return (
            <Container>
                <PageTitle>충전소 정보</PageTitle>
                <p style={{ textAlign: "center", padding: "2rem" }}>
                    로딩 중...
                </p>
            </Container>
        );
    }

    if (error && stations.length === 0) {
        return (
            <Container>
                <PageTitle>충전소 정보</PageTitle>.
                <ErrorMessage>{error}</ErrorMessage>
            </Container>
        );
    }

    return (
        <Container>
            <PageTitle>충전소 정보</PageTitle>

            <MainLayout>
                {/* 왼쪽 패널 - 검색 및 리스트/상세 정보 */}
                <LeftPanel>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            placeholder="충전소 검색..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <SearchButton onClick={searchStations}>
                            검색
                        </SearchButton>
                    </SearchBar>

                    {/* 충전소 선택 전: 리스트 표시 */}
                    {!selectedStation ? (
                        <StationListContainer>
                            {filteredStations !== null && (
                                <div style={{
                                    padding: "0.75rem 1rem",
                                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                    color: "white",
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    borderRadius: "8px",
                                    marginBottom: "0.75rem",
                                    textAlign: "center"
                                }}>
                                    📍 반경 내 {displayStations.length}개 충전소
                                </div>
                            )}
                            {displayStations.length === 0 ? (
                                <EmptyState>
                                    {filteredStations !== null 
                                        ? "반경 내 충전소가 없습니다" 
                                        : "충전소가 없습니다"}
                                </EmptyState>
                            ) : (
                                displayStations.map((station) => (
                                    <StationListItem
                                        key={station.stationNo}
                                        onClick={() =>
                                            setSelectedStation(station)
                                        }
                                    >
                                        <StationListInfo>
                                            <StationListName>
                                                {station.stationName}
                                            </StationListName>
                                            <StationListAddress>
                                                {station.stationAddress ||
                                                    "주소 정보 없음"}
                                            </StationListAddress>
                                        </StationListInfo>
                                        <StationListBadge
                                            $fast={isFastCharger(
                                                station.stationType
                                            )}
                                        >
                                            {getChargerTypeLabel(
                                                station.stationType
                                            )}
                                        </StationListBadge>
                                    </StationListItem>
                                ))
                            )}
                        </StationListContainer>
                    ) : (
                        /* 충전소 선택 후: 상세 카드 표시 */
                        <StationDetailCard>
                            <BackButton
                                onClick={() => setSelectedStation(null)}
                            >
                                ← 목록으로
                            </BackButton>
                            <StationImage
                                src={
                                    selectedStation.stationImage ||
                                    "https://via.placeholder.com/400x200?text=충전소+이미지"
                                }
                                alt={selectedStation.stationName}
                            />
                            <StationInfoBox>
                                <StationName>
                                    {selectedStation.stationName}
                                </StationName>
                                <StationAddress>
                                    {selectedStation.stationAddress ||
                                        "주소 정보 없음"}
                                </StationAddress>
                                <StationMeta>
                                    <TypeBadge
                                        $fast={isFastCharger(
                                            selectedStation.stationType
                                        )}
                                    >
                                        {getChargerTypeLabel(
                                            selectedStation.stationType
                                        )}
                                    </TypeBadge>
                                    <StatusBadge
                                        $available={
                                            selectedStation.stationStatus ===
                                            "Y"
                                        }
                                    >
                                        {selectedStation.stationStatus === "Y"
                                            ? "이용가능"
                                            : "이용불가"}
                                    </StatusBadge>
                                </StationMeta>
                            </StationInfoBox>

                            {/* 리뷰 섹션 */}
                            <ReviewSection>
                                <h3>리뷰</h3>
                                {reviews.length === 0 ? (
                                    <NoReviews>아직 리뷰가 없습니다.</NoReviews>
                                ) : (
                                    reviews.map((review) => (
                                        <ReviewItem key={review.reviewNo}>
                                            <ReviewHeader>
                                                <ReviewAuthor>
                                                    회원 {review.memberNo}
                                                </ReviewAuthor>
                                                <ReviewDate>
                                                    {formatDate(
                                                        review.reviewDate
                                                    )}
                                                </ReviewDate>
                                            </ReviewHeader>
                                            <ReviewTitle>
                                                {review.reviewTitle}
                                            </ReviewTitle>
                                            {editingReviewNo ===
                                            review.reviewNo ? (
                                                <>
                                                    {reviewMsg && (
                                                        <div style={{
                                                            fontSize: "0.875rem",
                                                            color: "#dc2626",
                                                            padding: "0.5rem",
                                                            marginBottom: "0.5rem",
                                                            backgroundColor: "#fee2e2",
                                                            borderRadius: "6px",
                                                            textAlign: "center"
                                                        }}>
                                                            {reviewMsg}
                                                        </div>
                                                    )}
                                                    <ReviewTextarea
                                                        placeholder="리뷰 내용을 수정해주세요 (5-1000자)"
                                                        value={editContent}
                                                        onChange={(e) => {
                                                            setEditContent(e.target.value);
                                                            setReviewMsg(""); // 입력 시 에러 메시지 초기화
                                                        }}
                                                    />
                                                    <ReviewActions>
                                                        <ReviewActionButton
                                                            onClick={() =>
                                                                handleReviewUpdate(
                                                                    review
                                                                )
                                                            }
                                                        >
                                                            저장
                                                        </ReviewActionButton>
                                                        <ReviewActionButton
                                                            onClick={() => {
                                                                cancelEdit();
                                                                setReviewMsg(""); // 취소 시 메시지 초기화
                                                            }}
                                                        >
                                                            취소
                                                        </ReviewActionButton>
                                                    </ReviewActions>
                                                </>
                                            ) : (
                                                <>
                                                    <ReviewContent>
                                                        {review.reviewContent}
                                                    </ReviewContent>
                                                    {/* 본인이 작성한 리뷰만 수정/삭제 버튼 표시 */}
                                                    {auth.isAuthenticated && 
                                                     String(review.memberNo) === String(auth.memberNo) && (
                                                        <ReviewActions>
                                                            <ReviewActionButton
                                                                onClick={() =>
                                                                    startEdit(
                                                                        review
                                                                    )
                                                                }
                                                            >
                                                                수정
                                                            </ReviewActionButton>
                                                            <ReviewActionButton
                                                                onClick={() =>
                                                                    handleReviewDelete(
                                                                        review.reviewNo
                                                                    )
                                                                }
                                                            >
                                                                삭제
                                                            </ReviewActionButton>
                                                        </ReviewActions>
                                                    )}
                                                </>
                                            )}
                                        </ReviewItem>
                                    ))
                                )}
                            </ReviewSection>

                            {/* 리뷰 작성 토글 버튼 */}
                            <button
                                type="button"
                                onClick={() => {
                                    if (!editingReviewNo) {
                                        setShowReviewForm(!showReviewForm);
                                        setReviewMsg(""); // 폼 토글 시 메시지 초기화
                                    }
                                }}
                                disabled={!!editingReviewNo}
                                style={{
                                    width: "100%",
                                    padding: "0.875rem",
                                    background: editingReviewNo 
                                        ? "#e5e7eb" 
                                        : showReviewForm 
                                            ? "#e5e7eb" 
                                            : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                    color: editingReviewNo 
                                        ? "#9ca3af" 
                                        : showReviewForm 
                                            ? "#374151" 
                                            : "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    cursor: editingReviewNo ? "not-allowed" : "pointer",
                                    transition: "all 0.2s",
                                    marginTop: "1rem",
                                    opacity: editingReviewNo ? 0.6 : 1,
                                }}
                            >
                                {editingReviewNo 
                                    ? "⚠️ 리뷰 수정 중에는 새 리뷰를 작성할 수 없습니다" 
                                    : showReviewForm 
                                        ? "✕ 작성 취소" 
                                        : "✏️ 리뷰 작성하기"}
                            </button>

                            {/* 리뷰 작성 폼 */}
                            {showReviewForm && (
                                <ReviewForm onSubmit={handleReviewSubmit}>
                                    {reviewMsg && (
                                        <div style={{
                                            fontSize: "0.875rem",
                                            color: "#dc2626",
                                            padding: "0.5rem",
                                            marginBottom: "0.5rem",
                                            backgroundColor: "#fee2e2",
                                            borderRadius: "6px",
                                            textAlign: "center"
                                        }}>
                                            {reviewMsg}
                                        </div>
                                    )}
                                    <ReviewTitleInput
                                        type="text"
                                        placeholder="리뷰 제목을 입력해주세요 (2-100자)"
                                        value={reviewTitle}
                                        onChange={(e) => {
                                            setReviewTitle(e.target.value);
                                            setReviewMsg(""); // 입력 시 에러 메시지 초기화
                                        }}
                                    />
                                    <ReviewTextarea
                                        placeholder="리뷰 내용을 작성해주세요 (5-1000자)"
                                        value={reviewContent}
                                        onChange={(e) => {
                                            setReviewContent(e.target.value);
                                            setReviewMsg(""); // 입력 시 에러 메시지 초기화
                                        }}
                                    />
                                    <ReviewSubmitButton
                                        type="submit"
                                        disabled={
                                            !reviewTitle.trim() ||
                                            !reviewContent.trim()
                                        }
                                    >
                                        리뷰 등록
                                    </ReviewSubmitButton>
                                </ReviewForm>
                            )}
                        </StationDetailCard>
                    )}
                </LeftPanel>

                {/* 오른쪽 패널 - 지도 */}
                <RightPanel>
                    <KakaoMap
                        markers={mapMarkers}
                        selectedMarker={selectedMapMarker}
                        onMarkerClick={handleMarkerClick}
                        onMarkerSelect={handleMarkerSelect}
                        center={{ lat: 36.2683, lng: 127.6358 }}
                        level={14}
                        showOptions={true}
                        showMarkerList={false}
                        enableClustering={true}
                        clusterMinLevel={9}
                        getInfoWindowContent={getInfoWindowContent}
                        minHeight="100%"
                        mapId="station-map"
                        enableRadiusFilter={true}
                        onFilteredMarkersChange={handleFilteredMarkersChange}
                    />
                </RightPanel>
            </MainLayout>
        </Container>
    );
};

export default StationInfoPage;
