import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Container } from "../../Styles/Styles";
import axios from "axios";
import { SubContainer, Form, Title, Input, Button } from "./login.styles";
import {AuthContext } from "../../../context/AuthContext.jsx"

const Login = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [msg, setMsg] = useState("");
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
        const regexp = /^[a-zA-Z0-9]{5,20}$/;
        const regexpPwd = /^[a-zA-Z0-9]{8,20}$/;
        if(!regexp.test(memberId)){
            setMsg("아이디는 5자에서 20자 사이입니다.");
            return
        } else if(!regexpPwd.test(memberPwd)){
            setMsg("비밀번호는 8자에서 20자 입니다.")
            return;
        } else{
            setMsg("");
        }
        axios.post("${apiUrl}/auth/login",{
            memberId,
            memberPwd
        }).then(result =>{
            const { memberNo, memberName, accessToken, refreshToken, role} = result.data;
            login({memberNo, memberName, accessToken, refreshToken, role});
            alert("로그인 성공!");
            window.location.href="/";
        }).catch(error => {
            alert(error.response.data["error-message"]);
        })
  };

  const handleSignup = () => {

    navigate("/join");
  };

  return (
    <Container>
      <SubContainer>
      <Form onSubmit={handleLogin}>
        <Title>로그인</Title>
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

        <Button
          type="button"
          onClick={handleSignup}
          style={{
            marginTop: "10px",
            backgroundColor: "#fff",
            color: "#93c5fd",
            border: "1px solid  #93c5fd",
          }}
        >
          회원가입
        </Button>
      </Form>
      </SubContainer>
    </Container>
  );
};

export default Login;
