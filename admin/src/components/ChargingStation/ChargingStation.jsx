import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSearch } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Container = styled.div`
    margin-left: 250px;
    padding: 2rem;
    min-height: calc(100vh - 70px);
    background-color: #f9fafb;
    width: calc(100% - 250px);
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
`;

const AddButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #2563eb;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1d4ed8;
    }
`;

const TableContainer = styled.div`
    overflow-x: auto;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #ffffff;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;

    thead {
        background-color: #f9fafb;
        border-bottom: 2px solid #e5e7eb;
    }

    th {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        color: #374151;
        white-space: nowrap;
    }

    td {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        color: #4b5563;
    }

    td:last-child {
        white-space: nowrap;
    }

    tbody tr {
        transition: background-color 0.2s;

        &:hover {
            background-color: #f9fafb;
        }
    }
`;

const Availability = styled.span`
    font-weight: 500;
    color: ${(props) => (props.$available ? "#059669" : "#dc2626")};
`;

const TypeBadge = styled.span`
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: ${(props) => (props.$fast ? "#dbeafe" : "#f3f4f6")};
    color: ${(props) => (props.$fast ? "#1e40af" : "#374151")};
    white-space: nowrap;
`;

const DeleteButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ef4444;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
        background-color: #dc2626;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
`;

const ModalClose = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    color: #6b7280;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f3f4f6;
    }
`;

const StationForm = styled.form`
    padding: 1.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #2563eb;
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #2563eb;
    }
`;

const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 2rem;
`;

const CancelButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #f3f4f6;
    color: #374151;

    &:hover {
        background-color: #e5e7eb;
    }
`;

const SubmitButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #2563eb;
    color: #ffffff;

    &:hover {
        background-color: #1d4ed8;
    }
`;

const API_BASE_URL = "http://localhost:8081";
// 카카오 REST API 키 (카카오 개발자 콘솔에서 발급받은 키로 변경하세요)
const KAKAO_REST_API_KEY = "YOUR_KAKAO_REST_API_KEY";

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
    "10": "DC콤보+NACS",
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

const LoadingMessage = styled.div`
    padding: 2rem;
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
    padding: 2rem;
    text-align: center;
    color: #dc2626;
    font-size: 0.875rem;
    background-color: #fee2e2;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const ChargingStation = () => {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false);
    const [formData, setFormData] = useState({
        stationName: "",
        stationAddress: "",
        stationType: "01",
        stationLng: "",
        stationLat: "",
    });

    // 검색 컨텍스트 사용
    const { searchKeyword } = useSearch();
    
    // 인증 컨텍스트 사용
    const { auth } = useContext(AuthContext);

    // 충전소 목록 조회 함수
    const fetchStations = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/station`);
            setStations(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("충전소 목록 조회 실패:", err);
            setError("충전소 목록을 불러오는데 실패했습니다.");
            setStations([]);
        } finally {
            setLoading(false);
        }
    };

    // 충전소 검색 함수
    const searchStations = async (keyword) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/station/search`, {
                params: { keyword },
            });
            setStations(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("충전소 검색 실패:", err);
            setError("충전소 검색에 실패했습니다.");
            setStations([]);
        } finally {
            setLoading(false);
        }
    };

    // 초기 로드
    useEffect(() => {
        fetchStations();
    }, []);

    // 검색어 변경 시 검색 API 호출
    useEffect(() => {
        if (searchKeyword) {
            searchStations(searchKeyword);
        } else {
            fetchStations();
        }
    }, [searchKeyword]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 주소로 좌표 검색 (카카오 주소 검색 API)
    const searchAddressToCoordinates = async (address) => {
        if (!address || address.trim() === "") {
            return;
        }

        try {
            setIsLoadingCoordinates(true);
            const encodedAddress = address; // 주소 인코딩

            // API 요청 포맷 설정 (json 또는 xml)
            const format = "json"; // 'json' 또는 'xml'을 선택 가능

            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.${format}`,
                {
                    params: {
                        query: encodedAddress,
                    },
                    headers: {
                        Authorization:
                            "KakaoAK d8000350785e1c69b59055a51e7ca88b",
                    },
                }
            );

            if (response.data.documents && response.data.documents.length > 0) {
                const firstResult = response.data.documents[0];
                const lng = parseFloat(firstResult.x); // 경도
                const lat = parseFloat(firstResult.y); // 위도

                setFormData((prev) => ({
                    ...prev,
                    stationLng: lng.toString(),
                    stationLat: lat.toString(),
                }));

                console.log("좌표 검색 성공:", { lng, lat });
            } else {
                console.warn("주소를 찾을 수 없습니다.");
                alert("주소를 찾을 수 없습니다. 좌표를 수동으로 입력해주세요.");
            }
        } catch (err) {
            console.error("좌표 검색 실패:", err);
            alert("좌표 검색에 실패했습니다. 좌표를 수동으로 입력해주세요.");
        } finally {
            setIsLoadingCoordinates(false);
        }
    };

    // 주소 입력 필드에서 포커스가 벗어날 때 좌표 검색
    const handleAddressBlur = (e) => {
        const address = e.target.value.trim();
        if (address) {
            searchAddressToCoordinates(address);
        }
    };

    // 충전소 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const stationData = {
                stationName: formData.stationName,
                stationAddress: formData.stationAddress,
                stationType: formData.stationType,
                stationLng: formData.stationLng
                    ? parseFloat(formData.stationLng)
                    : null,
                stationLat: formData.stationLat
                    ? parseFloat(formData.stationLat)
                    : null,
            };

            await axios.post(`${API_BASE_URL}/station`, stationData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            alert("충전소가 등록되었습니다.");
            setIsModalOpen(false);

            // 폼 초기화
            setFormData({
                stationName: "",
                stationAddress: "",
                stationType: "01",
                stationLng: "",
                stationLat: "",
            });

            // 목록 새로고침 (검색 상태 유지)
            if (searchKeyword) {
                await searchStations(searchKeyword);
            } else {
                await fetchStations();
            }
        } catch (err) {
            console.error("충전소 등록 실패:", err);
            alert("충전소 등록에 실패했습니다.");
        }
    };

    // 충전소 삭제
    const handleDelete = async (stationNo) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        try {
            await axios.delete(
                `${API_BASE_URL}/station?stationNo=${stationNo}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );
            alert("충전소가 삭제되었습니다.");

            // 목록 새로고침 (검색 상태 유지)
            if (searchKeyword) {
                await searchStations(searchKeyword);
            } else {
                await fetchStations();
            }
        } catch (err) {
            console.error("충전소 삭제 실패:", err);
            alert("충전소 삭제에 실패했습니다.");
        }
    };

    // 날짜 포맷팅
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR");
    };

    if (loading) {
        return (
            <Container>
                <PageHeader>
                    <PageTitle>전기차 충전소 관리</PageTitle>
                </PageHeader>
                <LoadingMessage>로딩 중...</LoadingMessage>
            </Container>
        );
    }

    return (
        <Container>
            <PageHeader>
                <PageTitle>전기차 충전소 관리</PageTitle>
                <AddButton onClick={() => setIsModalOpen(true)}>
                    + 충전소 등록
                </AddButton>
            </PageHeader>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>충전소 ID</th>
                            <th>충전소명</th>
                            <th>주소</th>
                            <th>충전 타입</th>
                            <th>등록일</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "2rem",
                                    }}
                                >
                                    등록된 충전소가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            stations.map((station) => (
                                <tr key={station.stationNo}>
                                    <td>{station.stationNo}</td>
                                    <td>{station.stationName}</td>
                                    <td>{station.stationAddress}</td>
                                    <td>
                                        <TypeBadge
                                            $fast={isFastCharger(station.stationType)}
                                        >
                                            {getChargerTypeLabel(station.stationType)}
                                        </TypeBadge>
                                    </td>
                                    <td>{formatDate(station.registerDate)}</td>
                                    <td>
                                        <Availability
                                            $available={
                                                station.status !== "운영중지"
                                            }
                                        >
                                            {station.status || "-"}
                                        </Availability>
                                    </td>
                                    <td>
                                        <DeleteButton
                                            onClick={() =>
                                                handleDelete(station.stationNo)
                                            }
                                        >
                                            삭제
                                        </DeleteButton>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </StyledTable>
            </TableContainer>

            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>충전소 등록</ModalTitle>
                            <ModalClose onClick={() => setIsModalOpen(false)}>
                                ×
                            </ModalClose>
                        </ModalHeader>
                        <StationForm onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel>충전소명 *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="stationName"
                                    value={formData.stationName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="충전소명을 입력하세요"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>주소 *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="stationAddress"
                                    value={formData.stationAddress}
                                    onChange={handleInputChange}
                                    onBlur={handleAddressBlur}
                                    required
                                    placeholder="주소를 입력하세요 (입력 후 포커스를 벗어나면 좌표가 자동으로 설정됩니다)"
                                    disabled={isLoadingCoordinates}
                                />
                                {isLoadingCoordinates && (
                                    <small
                                        style={{
                                            color: "#6b7280",
                                            fontSize: "0.75rem",
                                            marginTop: "0.25rem",
                                            display: "block",
                                        }}
                                    >
                                        좌표 검색 중...
                                    </small>
                                )}
                                {formData.stationLng &&
                                    formData.stationLat &&
                                    !isLoadingCoordinates && (
                                        <small
                                            style={{
                                                color: "#059669",
                                                fontSize: "0.75rem",
                                                marginTop: "0.25rem",
                                                display: "block",
                                            }}
                                        >
                                            ✓ 좌표가 자동으로 설정되었습니다
                                            (경도: {formData.stationLng}, 위도:{" "}
                                            {formData.stationLat})
                                        </small>
                                    )}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>충전 타입 *</FormLabel>
                                <FormSelect
                                    name="stationType"
                                    value={formData.stationType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {Object.entries(CHARGER_TYPE_MAP).map(([code, label]) => (
                                        <option key={code} value={code}>
                                            {label}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>경도 (Longitude)</FormLabel>
                                <FormInput
                                    type="number"
                                    step="any"
                                    name="stationLng"
                                    value={formData.stationLng}
                                    onChange={handleInputChange}
                                    placeholder="경도를 입력하세요 (선택사항)"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>위도 (Latitude)</FormLabel>
                                <FormInput
                                    type="number"
                                    step="any"
                                    name="stationLat"
                                    value={formData.stationLat}
                                    onChange={handleInputChange}
                                    placeholder="위도를 입력하세요 (선택사항)"
                                />
                            </FormGroup>
                            <FormActions>
                                <CancelButton
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    취소
                                </CancelButton>
                                <SubmitButton type="submit">등록</SubmitButton>
                            </FormActions>
                        </StationForm>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default ChargingStation;
