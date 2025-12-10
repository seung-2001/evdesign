import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Container, Button, Form, Input, SubContainer, Title } from "./login.styles";

const Login = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [msg, setMsg] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const regexp = /^[a-zA-Z0-9]{3,20}$/;
    
    if(!regexp.test(memberId)){
      setMsg("아이디는 5자에서 20자 사이입니다.");
      return;
    } else if(!regexp.test(memberPwd)){
      setMsg("비밀번호는 8자에서 20자 사이입니다.");
      return;
    } else {
      setMsg("");
    }
    
    axios.post("http://localhost:8081/auth/login", {
      memberId,
      memberPwd
    })
    .then(result => {
      const data = result.data;
      // console.log('🔍 로그인 응답 전체:', data); 
      // console.log('🔍 role 값:', data.role);  
      // console.log('🔍 role 타입:', typeof data.role);
      const roles = data.role.split(',').map(r => r.trim());
      
      // 권한 체크: ROLE_OPERATOR 또는 ROLE_ADMIN만 로그인 가능
      if (!roles.includes('ROLE_OPERATOR') && !roles.includes('ROLE_ADMIN')) {
        alert("관리자 권한이 없습니다. OPERATOR 또는 ADMIN만 접근 가능합니다.");
        return;
      }
      
      login({
        memberNo: data.memberNo,
        memberName: data.memberName,
        memberId: data.memberId,
        nickname: data.nickname,
        address: data.address,
        phone: data.phone,
        email: data.email,
        role: data.role,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      
      // alert("로그인 성공!");

setTimeout(() => {
  window.location.href = "/";
}, 100);
    })
    .catch(error => {
      if (error.response) {
        alert(error.response.data["error-message"] || "로그인에 실패했습니다.");
      } else {
        alert("서버와의 연결에 실패했습니다.");
      }
    });
  };
  return (
    <Container>
      <SubContainer>
        <Form onSubmit={handleLogin}>
          <Title>관리자 로그인</Title>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setMemberId(e.target.value)}
          />
          <label style={{ fontSize: "13px", color: "red", padding: "4px" }}>
            {msg}
          </label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setMemberPwd(e.target.value)}
          />
          <Button type="submit">로그인</Button>
        </Form>
      </SubContainer>
    </Container>
  );
};

export default Login;