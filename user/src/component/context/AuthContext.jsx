import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[authLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState({
    memberNo: null,
    memberName: null,
    memberId: null,
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
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      role: localStorage.getItem("role"),
    };

    if (storedAuth.memberNo && storedAuth.accessToken) {
      setAuth({ ...storedAuth, isAuthenticated: true });
    }

    setLoading(false);
  }, []);

  const login = (user) => {
    setAuth({ ...user, isAuthenticated: true });
    Object.entries(user).forEach(([key, value]) => localStorage.setItem(key, value));
  };

  const logout = () => {
    setAuth({
      memberNo: null,
      memberName: null,
      memberId: null,
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });
    ["memberNo","memberName","memberId","accessToken","refreshToken","role"].forEach(k => localStorage.removeItem(k));
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
