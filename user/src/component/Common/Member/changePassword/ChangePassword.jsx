import { useContext, useState } from "react";
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
    ErrorMessage,
    SuccessMessage,
} from './ChangePassword.styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
    const navi = useNavigate();
    const { auth } = useContext(AuthContext);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
        setSuccess('');
    };

    const validatePasswords = () => {
        if (!passwords.currentPassword) {
            setError('현재 비밀번호를 입력해주세요.');
            return false;
        }
        if (!passwords.newPassword) {
            setError('새 비밀번호를 입력해주세요.');
            return false;
        }
        if (passwords.newPassword.length < 8) {
            setError('새 비밀번호는 최소 8자 이상이어야 합니다.');
            return false;
        }
        if (passwords.newPassword === passwords.currentPassword) {
            setError('새 비밀번호는 현재 비밀번호와 달라야 합니다.');
            return false;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validatePasswords()) {
            return;
        }

        try {
            await axios.put(
                'http://localhost:8081/member/changePwd',
                {
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                    confirmPassword: passwords.confirmPassword
                },
                {
                    headers: { Authorization: `Bearer ${auth.accessToken}` }
                }
            );
            
            setSuccess('비밀번호가 성공적으로 변경되었습니다.');
            setPasswords({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            
            // 2초 후 마이페이지로 이동
            setTimeout(() => {
                navi('/info');
            }, 2000);
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
            if (error.response?.status === 400) {
                setError('현재 비밀번호가 일치하지 않습니다.');
            } else {
                setError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    

    const handleCancel = () => {
        navi('/mypage');
    };

    return (
        <Container>
            <FormWrapper>
                <Title>비밀번호 변경</Title>
                <Subtitle>Change Password</Subtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <InfoGroup>
                    <Label>현재 비밀번호</Label>
                    <Input
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        placeholder="현재 비밀번호를 입력하세요"
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>새 비밀번호</Label>
                    <Input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        placeholder="새 비밀번호를 입력하세요 (최소 8자)"
                    />
                </InfoGroup>

                <InfoGroup>
                    <Label>새 비밀번호 확인</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        placeholder="새 비밀번호를 다시 입력하세요"
                    />
                </InfoGroup>

                <ButtonGroup>
                    <UpdateButton onClick={handleSubmit}>변경 완료</UpdateButton>
                    <CancelButton onClick={handleCancel}>취소</CancelButton>
                </ButtonGroup>
            </FormWrapper>
        </Container>
    );
};

export default ChangePassword;