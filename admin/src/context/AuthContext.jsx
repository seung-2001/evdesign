import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    memberNo: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: false,
});

  useEffect(() => {
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
    }
  }, []);

  const login = (user) => {
    setAuth({
        memberNo: user.memberNo,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        role: user.role, // 있으면보내줌
        isAuthenticated: true,
    });
    localStorage.setItem("memberNo", user.memberNo);
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);
    localStorage.setItem("role", user.role || "");
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
