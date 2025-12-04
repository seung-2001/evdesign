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

const PageTitle = styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 2rem;
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const FilterContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const FilterButton = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid ${(props) => (props.$active ? "#2563eb" : "#e5e7eb")};
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: ${(props) => (props.$active ? "#2563eb" : "#ffffff")};
    color: ${(props) => (props.$active ? "#ffffff" : "#374151")};

    &:hover {
        background-color: ${(props) => (props.$active ? "#1d4ed8" : "#f3f4f6")};
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

const CategoryBadge = styled.span`
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: ${(props) =>
        props.$category === "신고" ? "#fee2e2" : "#dbeafe"};
    color: ${(props) => (props.$category === "신고" ? "#991b1b" : "#1e40af")};
    white-space: nowrap;
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: ${(props) => {
        if (props.$status === "RESOLVED") return "#d1fae5";
        if (props.$status === "IN_PROGRESS") return "#fef3c7";
        if (props.$status === "REJECTED") return "#fecaca";
        return "#e5e7eb"; // PENDING
    }};
    color: ${(props) => {
        if (props.$status === "RESOLVED") return "#065f46";
        if (props.$status === "IN_PROGRESS") return "#92400e";
        if (props.$status === "REJECTED") return "#dc2626";
        return "#4b5563"; // PENDING
    }};
    white-space: nowrap;
`;

// 상태 영어 -> 한글 변환
const STATUS_MAP = {
    PENDING: "대기",
    IN_PROGRESS: "처리중",
    RESOLVED: "처리완료",
    REJECTED: "반려",
};

const getStatusLabel = (status) => {
    return STATUS_MAP[status] || status || "대기";
};

// 신고 타입 -> 한글 변환
const getReportTypeLabel = (reportType) => {
    if (reportType === "REPORT" || reportType === "신고") return "신고";
    if (reportType === "INQUIRY" || reportType === "문의") return "문의";
    return reportType || "신고";
};

const ActionButtons = styled.div`
    display: flex;
    gap: 0.5rem;
    white-space: nowrap;
    flex-wrap: nowrap;
`;

const ViewButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #2563eb;
    color: #ffffff;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
        background-color: #1d4ed8;
    }
`;

const ProcessButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #10b981;
    color: #ffffff;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
        background-color: #059669;
    }
`;

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

const API_BASE_URL = "http://localhost:8081";

const Inquiry = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("전체"); // '전체', '신고', '문의'

    // 검색 컨텍스트 사용
    const { searchKeyword } = useSearch();
    
    // 인증 컨텍스트 사용
    const { auth } = useContext(AuthContext);

    // 필터링된 목록
    const filteredInquiries = inquiries.filter((inquiry) => {
        if (filter === "전체") return true;
        // reportType 또는 reportCategory로 필터링 (영문/한글 모두 지원)
        const type = inquiry.reportType || inquiry.reportCategory || "";
        if (filter === "신고") {
            return type === "REPORT";
        }
        if (filter === "문의") {
            return type === "INQUIRY";
        }
        return true;
    });

    // 신고/문의 목록 조회 함수
    const fetchInquiries = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/reports`);
            const data = Array.isArray(response.data) ? response.data : [];
            console.log("신고/문의 데이터:", data);
            if (data.length > 0) {
                console.log("첫 번째 항목 전체:", data[0]);
                console.log("reportDate 값:", data[0].reportDate);
                console.log("reportType 값:", data[0].reportType);
            }
            setInquiries(data);
        } catch (err) {
            console.error("신고/문의 목록 조회 실패:", err);
            setError("신고/문의 목록을 불러오는데 실패했습니다.");
            setInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    // 신고/문의 검색 함수
    const searchInquiries = async (keyword) => {
        // 공백 제거
        const trimmedKeyword = keyword.trim();

        // 빈 문자열이면 전체 목록 조회
        if (!trimmedKeyword) {
            fetchInquiries();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/reports`, {
                params: { keyword: trimmedKeyword },
            });
            // 단일 객체 또는 배열 모두 처리
            const data = response.data;
            if (Array.isArray(data)) {
                setInquiries(data);
            } else if (data) {
                setInquiries([data]);
            } else {
                setInquiries([]);
            }
        } catch (err) {
            console.error("신고/문의 검색 실패:", err);
            setError("신고/문의 검색에 실패했습니다.");
            setInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    // 초기 로드
    useEffect(() => {
        fetchInquiries();
    }, []);

    // 검색어 변경 시 검색 API 호출
    useEffect(() => {
        if (searchKeyword) {
            searchInquiries(searchKeyword);
        } else {
            fetchInquiries();
        }
    }, [searchKeyword]);

    // 상세보기 처리
    const handleView = (inquiry) => {
        alert(
            `제목: ${inquiry.reportTitle}\n내용: ${
                inquiry.reportContent
            }\n상태: ${getStatusLabel(inquiry.status)}`
        );
    };

    // 상태 처리하기
    const handleProcess = async (inquiry) => {
        const statusOptions = ["IN_PROGRESS", "RESOLVED", "REJECTED"];
        const statusLabels = {
            IN_PROGRESS: "처리중",
            RESOLVED: "처리완료",
            REJECTED: "반려",
        };

        // 선택 다이얼로그
        const selectedStatus = window.prompt(
            `상태를 변경할 번호를 입력하세요:\n1. 처리중\n2. 처리완료\n3. 반려\n\n현재 상태: ${getStatusLabel(
                inquiry.status
            )}`,
            "1"
        );

        if (!selectedStatus) return; // 취소

        const statusIndex = parseInt(selectedStatus) - 1;
        if (statusIndex < 0 || statusIndex >= statusOptions.length) {
            alert("올바른 번호를 입력해주세요 (1, 2, 3)");
            return;
        }

        const newStatus = statusOptions[statusIndex];

        if (
            !window.confirm(
                `상태를 "${statusLabels[newStatus]}"(으)로 변경하시겠습니까?`
            )
        ) {
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/reports`, {
                reportNo: inquiry.reportNo,
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            alert("상태가 변경되었습니다.");
            // 목록 새로고침
            if (searchKeyword) {
                await searchInquiries(searchKeyword);
            } else {
                await fetchInquiries();
            }
        } catch (err) {
            console.error("상태 변경 실패:", err);
            alert("상태 변경에 실패했습니다.");
        }
    };

    // 날짜 포맷팅
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);

        console.log("날짜 데이터 확인 :", dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    if (loading) {
        return (
            <Container>
                <PageTitle>신고/문의 관리</PageTitle>
                <LoadingMessage>로딩 중...</LoadingMessage>
            </Container>
        );
    }

    return (
        <Container>
            <PageHeader>
                <PageTitle>신고/문의 관리</PageTitle>
                <FilterContainer>
                    <FilterButton
                        $active={filter === "전체"}
                        onClick={() => setFilter("전체")}
                    >
                        전체보기
                    </FilterButton>
                    <FilterButton
                        $active={filter === "신고"}
                        onClick={() => setFilter("신고")}
                    >
                        신고만 보기
                    </FilterButton>
                    <FilterButton
                        $active={filter === "문의"}
                        onClick={() => setFilter("문의")}
                    >
                        문의만 보기
                    </FilterButton>
                </FilterContainer>
            </PageHeader>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>신고자/문의자</th>
                            <th>내용</th>
                            <th>상태</th>
                            <th>등록일시</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="8"
                                    style={{
                                        textAlign: "center",
                                        padding: "2rem",
                                    }}
                                >
                                    {filter === "전체"
                                        ? "신고/문의 내역이 없습니다."
                                        : `${filter} 내역이 없습니다.`}
                                </td>
                            </tr>
                        ) : (
                            filteredInquiries.map((inquiry) => (
                                <tr key={inquiry.reportNo}>
                                    <td>{inquiry.reportNo}</td>
                                    <td>
                                        <CategoryBadge
                                            $category={getReportTypeLabel(
                                                inquiry.reportType ||
                                                    inquiry.reportCategory
                                            )}
                                        >
                                            {getReportTypeLabel(
                                                inquiry.reportType ||
                                                    inquiry.reportCategory
                                            )}
                                        </CategoryBadge>
                                    </td>
                                    <td>{inquiry.reportTitle}</td>
                                    <td>{inquiry.memberNo || "-"}</td>
                                    <td
                                        style={{
                                            maxWidth: "200px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {inquiry.reportContent}
                                    </td>
                                    <td>
                                        <StatusBadge
                                            $status={
                                                inquiry.status || "PENDING"
                                            }
                                        >
                                            {getStatusLabel(inquiry.status)}
                                        </StatusBadge>
                                    </td>
                                    <td>{formatDate(inquiry.reportDate)}</td>
                                    <td>
                                        <ActionButtons>
                                            <ViewButton
                                                onClick={() =>
                                                    handleView(inquiry)
                                                }
                                            >
                                                상세보기
                                            </ViewButton>
                                            {inquiry.status !== "RESOLVED" &&
                                                inquiry.status !==
                                                    "REJECTED" && (
                                                    <ProcessButton
                                                        onClick={() =>
                                                            handleProcess(
                                                                inquiry
                                                            )
                                                        }
                                                    >
                                                        처리하기
                                                    </ProcessButton>
                                                )}
                                        </ActionButtons>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </StyledTable>
            </TableContainer>
        </Container>
    );
};

export default Inquiry;
