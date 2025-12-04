import React, { useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
    Container,
    PageTitle,
    PageSubtitle,
    TabContainer,
    Tab,
    InfoSection,
    InfoRow,
    InfoLabel,
    InfoDivider,
    InfoValue,
    SectionTitle,
    ReasonList,
    ReasonItem,
    ReasonHeader,
    ReasonLeft,
    RadioButton,
    ReasonTitle,
    ExpandIcon,
    ReasonDescription,
    AdditionalInput,
    TextareaLabel,
    Textarea,
    TitleInput,
    ButtonGroup,
    CancelButton,
    SubmitButton,
    SuccessMessage,
} from "./Report.styles";

const API_BASE_URL = "http://localhost:8081";

// 신고 사유 목록
const REPORT_REASONS = [
    {
        id: 1,
        title: "스팸홍보/도배글입니다.",
        description:
            "사행성 오락이나 도박을 홍보하거나 권장하는 내용 등의 부적절한 스팸 홍보 행위",
    },
    {
        id: 2,
        title: "청소년에게 유해한 내용입니다.",
        description:
            "음란물, 폭력적인 내용 등 청소년에게 유해한 정보를 포함하고 있는 게시물",
    },
    {
        id: 3,
        title: "불법정보를 포함하고 있습니다.",
        description:
            "저작권 침해, 불법 복제물 유포, 불법 광고 등 법률에 위반되는 정보",
    },
    {
        id: 4,
        title: "욕설/비방표현이 있습니다.",
        description:
            "특정인이나 단체를 비방하거나 욕설, 혐오 표현이 포함된 게시물",
    },
    {
        id: 5,
        title: "개인 정보 노출 게시물입니다.",
        description:
            "타인의 개인정보(전화번호, 주소, 사진 등)를 동의 없이 노출한 게시물",
    },
];

// 문의 유형 목록
const INQUIRY_TYPES = [
    {
        id: 1,
        title: "서비스 이용 문의",
        description: "서비스 이용 방법, 기능 관련 문의",
    },
    {
        id: 2,
        title: "충전소 관련 문의",
        description: "충전소 위치, 운영시간, 고장 신고 등",
    },
    {
        id: 3,
        title: "결제/환불 문의",
        description: "결제 오류, 환불 요청 등 결제 관련 문의",
    },
    {
        id: 4,
        title: "회원 정보 문의",
        description: "회원가입, 탈퇴, 개인정보 변경 등",
    },
    {
        id: 5,
        title: "기타 문의",
        description: "기타 서비스 관련 문의사항",
    },
];

const ReportPage = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { postId } = useParams();

    // URL에서 전달받은 게시글 정보 (예: /report?postId=123&postTitle=제목&type=REPORT)
    const searchParams = new URLSearchParams(location.search);
    const postTitle = searchParams.get("postTitle") || "{게시글 제목}";
    const initialType = searchParams.get("type") || "REPORT";

    const [activeTab, setActiveTab] = useState(initialType); // 'REPORT' or 'INQUIRY'
    const [selectedReason, setSelectedReason] = useState(null);
    const [expandedReason, setExpandedReason] = useState(null);
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const currentReasons =
        activeTab === "REPORT" ? REPORT_REASONS : INQUIRY_TYPES;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedReason(null);
        setExpandedReason(null);
        setInquiryTitle("");
        setAdditionalInfo("");
    };

    const handleReasonClick = (reasonId) => {
        setSelectedReason(reasonId);
        setExpandedReason(expandedReason === reasonId ? null : reasonId);
    };

    const handleExpandClick = (e, reasonId) => {
        e.stopPropagation();
        setExpandedReason(expandedReason === reasonId ? null : reasonId);
    };

    const handleSubmit = async () => {
        // 디버깅용 로그
        console.log("현재 auth 상태:", auth);
        console.log("accessToken:", auth.accessToken);

        // 로그인 체크
        if (!auth.isAuthenticated || !auth.accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        if (!selectedReason) {
            alert(
                activeTab === "REPORT"
                    ? "신고 사유를 선택해주세요."
                    : "문의 유형을 선택해주세요."
            );
            return;
        }

        if (activeTab === "INQUIRY" && !inquiryTitle.trim()) {
            alert("문의 제목을 입력해주세요.");
            return;
        }

        if (activeTab === "INQUIRY" && !additionalInfo.trim()) {
            alert("문의 내용을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);

        const selectedReasonData = currentReasons.find(
            (r) => r.id === selectedReason
        );

        try {
            await axios.post(
                `${API_BASE_URL}/reports`,
                {
                    memberNo: auth.memberNo,
                    boardNo: activeTab === "REPORT" ? postId || null : null, // 문의 시 null
                    reportCategory: activeTab, // 'REPORT' or 'INQUIRY'
                    reportTitle:
                        activeTab === "REPORT"
                            ? selectedReasonData.title
                            : inquiryTitle.trim(),
                    reportContent:
                        additionalInfo.trim() || selectedReasonData.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );

            setIsSuccess(true);
        } catch (err) {
            console.error("등록 실패:", err);
            alert(
                activeTab === "REPORT"
                    ? "신고 등록에 실패했습니다. 다시 시도해주세요."
                    : "문의 등록에 실패했습니다. 다시 시도해주세요."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (isSuccess) {
        return (
            <Container>
                <SuccessMessage>
                    <h2>
                        {activeTab === "REPORT"
                            ? "✓ 신고가 접수되었습니다"
                            : "✓ 문의가 접수되었습니다"}
                    </h2>
                    <p>
                        {activeTab === "REPORT"
                            ? "신고 내용은 검토 후 처리됩니다."
                            : "문의 내용은 확인 후 답변 드리겠습니다."}
                    </p>
                    <SubmitButton onClick={() => navigate(-1)}>
                        돌아가기
                    </SubmitButton>
                </SuccessMessage>
            </Container>
        );
    }

    return (
        <Container>
            <PageTitle>
                {activeTab === "REPORT" ? "신고하기" : "문의하기"}
            </PageTitle>
            <PageSubtitle>
                {activeTab === "REPORT" ? "Report" : "Inquiry"}
            </PageSubtitle>

            {/* 탭 선택 */}
            <TabContainer>
                <Tab
                    $active={activeTab === "REPORT"}
                    onClick={() => handleTabChange("REPORT")}
                >
                    신고
                </Tab>
                <Tab
                    $active={activeTab === "INQUIRY"}
                    onClick={() => handleTabChange("INQUIRY")}
                >
                    문의
                </Tab>
            </TabContainer>

            {/* 신고일 경우 게시글 정보 표시 */}
            {activeTab === "REPORT" && (
                <InfoSection>
                    <InfoRow>
                        <InfoLabel>작성자</InfoLabel>
                        <InfoDivider>|</InfoDivider>
                        <InfoValue>비공개</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>내 용</InfoLabel>
                        <InfoDivider>|</InfoDivider>
                        <InfoValue>{postTitle}</InfoValue>
                    </InfoRow>
                </InfoSection>
            )}

            <SectionTitle>
                {activeTab === "REPORT" ? "사유선택" : "문의 유형"}
            </SectionTitle>

            <ReasonList>
                {currentReasons.map((reason) => (
                    <ReasonItem
                        key={reason.id}
                        $selected={selectedReason === reason.id}
                        $isInquiry={activeTab === "INQUIRY"}
                    >
                        <ReasonHeader
                            onClick={() => handleReasonClick(reason.id)}
                        >
                            <ReasonLeft>
                                <RadioButton
                                    $selected={selectedReason === reason.id}
                                    $isInquiry={activeTab === "INQUIRY"}
                                />
                                <ReasonTitle>{reason.title}</ReasonTitle>
                            </ReasonLeft>
                            <ExpandIcon
                                $expanded={expandedReason === reason.id}
                                onClick={(e) => handleExpandClick(e, reason.id)}
                            >
                                ∨
                            </ExpandIcon>
                        </ReasonHeader>
                        <ReasonDescription
                            $expanded={expandedReason === reason.id}
                        >
                            {reason.description}
                        </ReasonDescription>
                    </ReasonItem>
                ))}
            </ReasonList>

            {/* 문의일 경우 제목 입력 */}
            {activeTab === "INQUIRY" && (
                <AdditionalInput>
                    <TextareaLabel>문의 제목 *</TextareaLabel>
                    <TitleInput
                        type="text"
                        placeholder="문의 제목을 입력해주세요"
                        value={inquiryTitle}
                        onChange={(e) => setInquiryTitle(e.target.value)}
                    />
                </AdditionalInput>
            )}

            <AdditionalInput>
                <TextareaLabel>
                    {activeTab === "REPORT"
                        ? "추가 설명 (선택사항)"
                        : "문의 내용 *"}
                </TextareaLabel>
                <Textarea
                    placeholder={
                        activeTab === "REPORT"
                            ? "신고 사유에 대한 추가 설명이 있다면 작성해주세요..."
                            : "문의 내용을 상세히 작성해주세요..."
                    }
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                />
            </AdditionalInput>

            <ButtonGroup>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
                <SubmitButton
                    onClick={handleSubmit}
                    disabled={!selectedReason || isSubmitting}
                    $isInquiry={activeTab === "INQUIRY"}
                >
                    {isSubmitting
                        ? "처리중..."
                        : activeTab === "REPORT"
                        ? "신고하기"
                        : "문의하기"}
                </SubmitButton>
            </ButtonGroup>
        </Container>
    );
};

export default ReportPage;
