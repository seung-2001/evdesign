import { useContext, useState, useEffect } from "react";
import { Container } from "../../Styles/Styles";
import { AuthContext } from "../../../context/AuthContext";
import {
    FormWrapper,
    Title,
    Subtitle,
    InfoGroup,
    Label,
    Input,
    ButtonGroup,
    UpdateButton,
    CancelButton,
    FullWidthButton,
    Modal,
    ModalContent,
    ModalTitle,
    ModalInput,
    ModalButtonGroup,
    ModalButton,
    ModalCancelButton
} from './MyInfo.styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyInfo = () => {
    const navi = useNavigate();
    const { auth, authLoading } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasLicense, setHasLicense] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    

    useEffect(() => {
        
        if(authLoading) return;

        if(!auth.isAuthenticated) {
            alert("로그인을 해주세요!");
            navi("../login");
            return;
        }

        const fn1 = async () => {
           const result = await axios.get("http://localhost:8081/member/info", {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });
            
            setUserInfo(result.data);
            setLoading(false);   
        }
        fn1();
    }, [auth.isAuthenticated, authLoading]);

    useEffect(() => {
        const fetchLicense = async () => {
            const result = await axios.get(
                `http://localhost:8081/member/hasLicense/${auth.memberNo}`,
                {
                    headers: { Authorization: `Bearer ${auth.accessToken}` }
                }
            );
            setHasLicense(result.data); 
        };

        fetchLicense();
    }, []);

    const handleUpdate = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordConfirm = async () => {
        try {
            // 비밀번호 확인 API 호출
            const result = await axios.post(
                "http://localhost:8081/member/verify-password",
                { password },
                { headers: { Authorization: `Bearer ${auth.accessToken}` } }
            );
            
            if (result.data.success) {
                setShowPasswordModal(false);
                setPassword("");
                alert("회원확인이 완료되었습니다.");
                navi("/update");
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error("비밀번호 확인 실패:", error.response);
            const errorMessage = error.response?.data?.["error-message"] ||
                                 error.response?.daya?.message ||
                                 "비밀번호 확인실패"
            setErrMsg(errorMessage);
            alert(errorMessage);
            
        }
    };

    const handleModalClose = () => {
        setShowPasswordModal(false);
        setPassword("");
    };

    const handleCancel = () => navi("/");

    if (loading) {
        return (
            <Container>
                <FormWrapper>
                    <Title>로딩 중...</Title>
                </FormWrapper>
            </Container>
        );
    }

    if (!userInfo) {
        return (
            <Container>
                <FormWrapper>
                    <Title>사용자 정보를 불러올 수 없습니다.</Title>
                </FormWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <FormWrapper>
                <Title>마이페이지</Title>
                <Subtitle>My Page</Subtitle>

                <InfoGroup>
                    <Label>사용자 아이디</Label>
                    <Input type="text" readOnly >
                        {userInfo.memberId}
                    </Input>
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 이름</Label>
                    <Input type="text" readOnly >
                        {userInfo.memberName}
                    </Input>
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 닉네임</Label>
                    <Input type="text" readOnly>
                        {userInfo.nickname}
                    </Input>
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 주소</Label>
                    <Input type="text" readOnly>
                    {userInfo.address}
                    </Input>
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 전화번호</Label>
                    <Input type="text" readOnly>
                    {userInfo.phone}
                    </Input>
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 이메일</Label>
                    <Input type="text" readOnly >
                    {userInfo.email}
                    </Input>
                </InfoGroup>

                <InfoGroup>
                    <FullWidthButton 
                        onClick={() => navi("/infoLicense")}
                        disabled={hasLicense}
                        $primary={!hasLicense} 
                    >
                        {hasLicense ? "운전면허 인증완료" : "운전면허 인증하기"}
                    </FullWidthButton>
                    <FullWidthButton onClick={() => navi("/myReports")}>
                        내 신고 보기
                    </FullWidthButton>
                </InfoGroup>

                <ButtonGroup>
                    <UpdateButton onClick={handleUpdate}>정보 수정</UpdateButton>
                    <CancelButton onClick={handleCancel}>취소</CancelButton>
                </ButtonGroup>
            </FormWrapper>

            {/* 비밀번호 확인 모달 */}
            {showPasswordModal && (
                <Modal onClick={handleModalClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>비밀번호 확인</ModalTitle>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            정보 수정을 위해 비밀번호를 입력해주세요.
                        </p>
                        <ModalInput
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handlePasswordConfirm();
                                }
                            }}
                        />
                        <ModalButtonGroup>
                            <ModalButton onClick={handlePasswordConfirm}>확인</ModalButton>
                            <ModalCancelButton onClick={handleModalClose}>취소</ModalCancelButton>
                        </ModalButtonGroup>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

export default MyInfo;