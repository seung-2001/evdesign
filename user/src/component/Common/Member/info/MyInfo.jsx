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
    DeleteButton
} from './MyInfo.styles';
import { useNavigate } from "react-router-dom";


const MyInfo = () => {
    const navi = useNavigate();
    const {auth} = useContext(AuthContext);
    const[active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const handelToggle = () => {
        setActive((active) => !active);
    }
    useEffect(() => {
        console.log("auth:", auth);
        if(!auth.isAuthenticated){
            alert("로그인부터 해주세요");
            navi("../login");
        }
        
    }, [auth.isAuthenticated]);

    const handleUpdate = () => {
        navi("/mypage/edit");
    };

    const handleCancel = () => {
        navi("/");
    };

    

    return (
        <Container>
            <FormWrapper>
                <Title>마이페이지</Title>
                <Subtitle>My Page</Subtitle>

                <InfoGroup>
                    <Label>사용자 아이디</Label>
                    <Input type="text" value={auth.memberId || ''} readOnly />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 이름</Label>
                    <Input type="text" value={auth.memberName || ""} readOnly />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 닉네임</Label>
                    <Input type="text" value={auth.nickname || ""} readOnly />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 주소</Label>
                    <Input type="text" value={auth.address || ""} readOnly />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 전번호</Label>
                    <Input type="text" value={auth.phone || ""} readOnly />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 이메일</Label>
                    <Input type="text" value={auth.email || ""} readOnly />
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