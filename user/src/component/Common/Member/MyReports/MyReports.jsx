import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "../../Styles/Styles";
import { AuthContext } from "../../../context/AuthContext";
import {
    PageWrapper,
    Title,
    Subtitle,
    FilterContainer,
    FilterButton,
    ReportList,
    ReportCard,
    ReportHeader,
    ReportTitle,
    BadgeContainer,
    TypeBadge,
    StatusBadge,
    ReportContent,
    ReportFooter,
    ReportDate,
    ActionButtons,
    ViewButton,
    DeleteButton,
    EmptyMessage,
    LoadingMessage,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
    ModalRow,
    ModalLabel,
    ModalValue,
    BackButton,
} from "./MyReports.styles";
const apiUrl = window.ENV?.API_URL || "http://127.0.0.1:8081";


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

const MyReports = () => {
    const navigate = useNavigate();
    const { auth, isAuthLoading } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("전체");
    const [selectedReport, setSelectedReport] = useState(null);

    // 로그인 체크 - 로딩 완료 후에만 체크
    useEffect(() => {
        if (!isAuthLoading && !auth.isAuthenticated) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [isAuthLoading, auth.isAuthenticated, navigate]);

    // 신고/문의 목록 조회
    const fetchMyReports = async () => {
        if (!auth.accessToken) return;

        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/reports/my`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setReports(data);
        } catch (err) {
            console.error("신고/문의 목록 조회 실패:", err);
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth.accessToken) {
            fetchMyReports();
        }
    }, [auth.accessToken]);

    // 필터링된 목록
    const filteredReports = reports.filter((report) => {
        if (filter === "전체") return true;
        // reportType 또는 reportCategory로 필터링 (영문/한글 모두 지원)
        const type = report.reportType || report.reportCategory || "";
        if (filter === "신고") {
            return type === "REPORT" || type === "신고";
        }
        if (filter === "문의") {
            return type === "INQUIRY" || type === "문의";
        }
        return true;
    });

    // 삭제 처리
    const handleDelete = async (reportNo) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`${apiUrl}/reports`, {
                params: { reportNo },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            alert("삭제되었습니다.");
            fetchMyReports();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        }
    };

    // 날짜 포맷팅
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    };

    // 상세보기 모달 열기
    const openModal = (report) => {
        setSelectedReport(report);
    };

    // 상세보기 모달 닫기
    const closeModal = () => {
        setSelectedReport(null);
    };

    // 인증 로딩 중이거나 데이터 로딩 중일 때
    if (isAuthLoading || loading) {
        return (
            <Container>
                <PageWrapper>
                    <Title>나의 신고/문의</Title>
                    <Subtitle>My Reports & Inquiries</Subtitle>
                    <LoadingMessage>로딩 중...</LoadingMessage>
                </PageWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <PageWrapper>
                <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>

                <Title>나의 신고/문의</Title>
                <Subtitle>My Reports & Inquiries</Subtitle>

                <FilterContainer>
                    <FilterButton
                        $active={filter === "전체"}
                        onClick={() => setFilter("전체")}
                    >
                        전체
                    </FilterButton>
                    <FilterButton
                        $active={filter === "신고"}
                        onClick={() => setFilter("신고")}
                    >
                        신고
                    </FilterButton>
                    <FilterButton
                        $active={filter === "문의"}
                        onClick={() => setFilter("문의")}
                    >
                        문의
                    </FilterButton>
                </FilterContainer>

                {filteredReports.length === 0 ? (
                    <EmptyMessage>
                        {filter === "전체"
                            ? "작성한 신고/문의가 없습니다."
                            : `작성한 ${filter}가 없습니다.`}
                    </EmptyMessage>
                ) : (
                    <ReportList>
                        {filteredReports.map((report) => (
                            <ReportCard key={report.reportNo}>
                                <ReportHeader>
                                    <ReportTitle>
                                        {report.reportTitle}
                                    </ReportTitle>
                                    <BadgeContainer>
                                        <TypeBadge
                                            $type={getReportTypeLabel(
                                                report.reportType || report.reportCategory
                                            )}
                                        >
                                            {getReportTypeLabel(
                                                report.reportType || report.reportCategory
                                            )}
                                        </TypeBadge>
                                        <StatusBadge
                                            $status={report.status || "PENDING"}
                                        >
                                            {getStatusLabel(report.status)}
                                        </StatusBadge>
                                    </BadgeContainer>
                                </ReportHeader>

                                <ReportContent>
                                    {report.reportContent}
                                </ReportContent>

                                <ReportFooter>
                                    <ReportDate>
                                        {formatDate(report.reportDate)}
                                    </ReportDate>
                                    <ActionButtons>
                                        <ViewButton
                                            onClick={() => openModal(report)}
                                        >
                                            상세보기
                                        </ViewButton>
                                        {report.status === "PENDING" && (
                                            <DeleteButton
                                                onClick={() =>
                                                    handleDelete(
                                                        report.reportNo
                                                    )
                                                }
                                            >
                                                삭제
                                            </DeleteButton>
                                        )}
                                    </ActionButtons>
                                </ReportFooter>
                            </ReportCard>
                        ))}
                    </ReportList>
                )}

                {/* 상세보기 모달 */}
                {selectedReport && (
                    <ModalOverlay onClick={closeModal}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <ModalTitle>상세 내용</ModalTitle>
                                <CloseButton onClick={closeModal}>
                                    ×
                                </CloseButton>
                            </ModalHeader>
                            <ModalBody>
                                <ModalRow>
                                    <ModalLabel>유형</ModalLabel>
                                    <BadgeContainer>
                                        <TypeBadge
                                            $type={getReportTypeLabel(
                                                selectedReport.reportType || selectedReport.reportCategory
                                            )}
                                        >
                                            {getReportTypeLabel(
                                                selectedReport.reportType || selectedReport.reportCategory
                                            )}
                                        </TypeBadge>
                                        <StatusBadge
                                            $status={
                                                selectedReport.status ||
                                                "PENDING"
                                            }
                                        >
                                            {getStatusLabel(
                                                selectedReport.status
                                            )}
                                        </StatusBadge>
                                    </BadgeContainer>
                                </ModalRow>
                                <ModalRow>
                                    <ModalLabel>제목</ModalLabel>
                                    <ModalValue>
                                        {selectedReport.reportTitle}
                                    </ModalValue>
                                </ModalRow>
                                <ModalRow>
                                    <ModalLabel>내용</ModalLabel>
                                    <ModalValue
                                        style={{ whiteSpace: "pre-wrap" }}
                                    >
                                        {selectedReport.reportContent}
                                    </ModalValue>
                                </ModalRow>
                                <ModalRow>
                                    <ModalLabel>등록일</ModalLabel>
                                    <ModalValue>
                                        {formatDate(selectedReport.reportDate)}
                                    </ModalValue>
                                </ModalRow>
                                {selectedReport.boardNo &&
                                    selectedReport.boardNo !== 0 && (
                                        <ModalRow>
                                            <ModalLabel>
                                                관련 게시글 번호
                                            </ModalLabel>
                                            <ModalValue>
                                                #{selectedReport.boardNo}
                                            </ModalValue>
                                        </ModalRow>
                                    )}
                            </ModalBody>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </PageWrapper>
        </Container>
    );
};

export default MyReports;
