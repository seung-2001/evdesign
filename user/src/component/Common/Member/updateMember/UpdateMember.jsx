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
    DeleteButton,
    PasswordChangeButton
} from './UpdateMember.styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMember = () => {
    const navi = useNavigate();
    const { auth, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        memberId: '',
        memberName: '',
        nickname: '',
        address: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (!auth.isAuthenticated) {
            alert("로그인을 해주세요!");
            navi("../login");
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const result = await axios.get("http://localhost:8081/member/info", {
                    headers: { Authorization: `Bearer ${auth.accessToken}` }
                });
                
                setFormData({
                    memberId: result.data.memberId,
                    memberName: result.data.memberName,
                    nickname: result.data.nickname,
                    address: result.data.address,
                    phone: result.data.phone,
                    email: result.data.email
                });
                setLoading(false);
            } catch (error) {
                console.error('정보 로드 실패:', error);
                alert('사용자 정보를 불러올 수 없습니다.');
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [auth.isAuthenticated, auth.accessToken, navi]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
    // 보낼 데이터를 DTO 필드명에 맞춰서 구성
    const updateData = {
        newName: formData.memberName,
        newNickname: formData.nickname,
        newAddress: formData.address,
        newPhone: formData.phone,
        newEmail: formData.email
    };
    
    console.log('전송할 데이터:', updateData);  // 확인용
    
    try {
        await axios.put('http://localhost:8081/member/info', updateData, {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        });
        alert('정보가 수정되었습니다.');
        navi('/info');
    } catch (error) {
        console.error('수정 실패:', error);
        alert('정보 수정에 실패했습니다.');
    }
};

    const handleDelete = async () => {
        if (window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            try {
                await axios.delete('http://localhost:8081/member/info', {
                    headers: { Authorization: `Bearer ${auth.accessToken}` },
                    data:{}
                });
                alert('회원 탈퇴가 완료되었습니다.');
                logout();
                navi('/');
            } catch (error) {
                console.error('탈퇴 실패:', error);
                alert(error.response?.data || '회원 탈퇴에 실패했습니다.');
            }
        }
    };

    const handleCancel = () => {
        navi('/info');
    };

    const handlePasswordChange = () => {
        navi('/changePwd');
    };

    if (loading) {
        return (
            <Container>
                <FormWrapper>
                    <Title>로딩 중...</Title>
                </FormWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <FormWrapper>
                <Title>정보 수정</Title>
                <Subtitle>Edit Information</Subtitle>

                <InfoGroup>
                    <Label>사용자 아이디</Label>
                    <Input
                        type="text"
                        name="memberId"
                        value={formData.memberId}
                        disabled
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 이름</Label>
                    <Input
                        type="text"
                        name="memberName"
                        value={formData.memberName}
                        onChange={handleChange}
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 닉네임</Label>
                    <Input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 주소</Label>
                    <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 전화번호</Label>
                    <Input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>사용자 이메일</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </InfoGroup>

                <ButtonGroup>
                    <UpdateButton onClick={handleUpdate}>수정 완료</UpdateButton>
                    <CancelButton onClick={handleCancel}>취소</CancelButton>
                </ButtonGroup>

                <PasswordChangeButton onClick={handlePasswordChange}>
                    비밀번호 변경
                </PasswordChangeButton>

                <DeleteButton onClick={handleDelete}>
                    회원 탈퇴
                </DeleteButton>
            </FormWrapper>
        </Container>
    );
};

export default UpdateMember;