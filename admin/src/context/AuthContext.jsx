import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    memberNo: null,
    memberName: null,
    memberId: null,
    nickname: null,
    address: null,
    phone: null,
    email: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: null, // 초기값 null로 변경 -> 로딩 상태 표시 가능
  });

  useEffect(() => {
    // 로컬스토리지에 토큰/정보가 있는지 확인
    const storedAuth = {
      memberNo: localStorage.getItem("memberNo"),
      memberName: localStorage.getItem("memberName"),
      memberId: localStorage.getItem("memberId"),
      nickname: localStorage.getItem("nickname"),
      address: localStorage.getItem("address"),
      phone: localStorage.getItem("phone"),
      email: localStorage.getItem("email"),
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      role: localStorage.getItem("role"),
    };

    if (storedAuth.memberNo && storedAuth.accessToken) {
      setAuth({ ...storedAuth, isAuthenticated: true });
    } else {
      setAuth({ ...storedAuth, isAuthenticated: false });
    }
  }, []);

  const login = (user) => {
    setAuth({
      ...user,
      isAuthenticated: true,
    });

    Object.keys(user).forEach((key) => {
      localStorage.setItem(key, user[key] || "");
    });
  };

  const logout = () => {
    setAuth({
      memberNo: null,
      memberName: null,
      memberId: null,
      nickname: null,
      address: null,
      phone: null,
      email: null,
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });

    ["memberNo","memberName","memberId","nickname","address","phone","email","accessToken","refreshToken","role"].forEach(k => localStorage.removeItem(k));
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
