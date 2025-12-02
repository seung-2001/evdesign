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
    FullWidthButton
} from './MyInfo.styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyInfo = () => {
    const navi = useNavigate();
    const { auth } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasLicense, setHasLicense] = useState(false);

    useEffect(() => {
        console.log("어스는!:",auth);
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
    }, [auth.isAuthenticated]);

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

    const handleUpdate = () => navi("/mypage/edit");
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


                    <FullWidthButton onClick={() => navi("/mypage/posts")}>
                        내 게시물 보기
                    </FullWidthButton>

                    <FullWidthButton onClick={() => navi("/mypage/comments")}>
                        내 댓글 보기
                    </FullWidthButton>
                    <FullWidthButton onClick={() => navi("/mypage/comments")}>
                        내 리뷰 보기
                    </FullWidthButton>
                </InfoGroup>

                <ButtonGroup>
                    <UpdateButton onClick={handleUpdate}>정보 수정</UpdateButton>
                    <CancelButton onClick={handleCancel}>취소</CancelButton>
                </ButtonGroup>
            </FormWrapper>
        </Container>
    );
};

export default MyInfo;
