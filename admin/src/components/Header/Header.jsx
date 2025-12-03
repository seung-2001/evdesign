import React, { useEffect, useState, useMemo, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSearch } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    height: 70px;
    position: sticky;
    top: 0;
    z-index: 100;
`;

const HeaderLeft = styled.div`
    flex: 0 0 auto;
`;

const BrandName = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2563eb;
    margin: 0;
    cursor: pointer;
`;

const HeaderCenter = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0 2rem;
`;

const SearchBar = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
    display: flex;
    align-items: center;
`;

const SearchIcon = styled.svg`
    position: absolute;
    left: 12px;
    color: #9ca3af;
    pointer-events: none;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #2563eb;
    }
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 0 0 auto;
`;

const LoginButton = styled.button`
    padding: 0.625rem 1.5rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1d4ed8;
    }
`;

const NotificationIcon = styled.div`
    position: relative;
    cursor: pointer;
    color: #4b5563;
    transition: color 0.2s;

    &:hover {
        color: #2563eb;
    }
`;

const NotificationBadge = styled.span`
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background-color: #fbbf24;
    border-radius: 50%;
    border: 2px solid #ffffff;
`;

const ProfilePicture = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #4b5563;
    transition: background-color 0.2s;
    position: relative;

    &:hover {
        background-color: #d1d5db;
    }
`;

const ProfileMenu = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    overflow: hidden;
    z-index: 200;
`;

const MenuItem = styled.div`
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #4b5563;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f3f4f6;
    }
`;

const UserInfo = styled.div`
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.875rem;
    color: #1f2937;
    font-weight: 500;
`;

// URL 경로별 검색 설정
const SEARCH_CONFIG = {
    "/charging-station": {
        placeholder: "충전소명 또는 주소로 검색...",
        type: "station",
    },
    "/car-reservation": {
        placeholder: "차량 예약 검색...",
        type: "reservation",
    },
    "/inquiry": {
        placeholder: "신고/문의 검색...",
        type: "report",
    },
    "/message": {
        placeholder: "메시지 검색...",
        type: "message",
    },
    "/payment": {
        placeholder: "결제 내역 검색...",
        type: "payment",
    },
    "/member-manage" :{
        placeholder:"회원 검색...",
        type:"payment",
    },
    default: {
        placeholder: "검색...",
        type: "default",
    },
};

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchKeyword, setSearchKeyword, clearSearch } = useSearch();
    const { auth, logout } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // 현재 경로에 맞는 검색 설정 가져오기
    const searchConfig = useMemo(() => {
        return SEARCH_CONFIG[location.pathname] || SEARCH_CONFIG.default;
    }, [location.pathname]);

    // 경로가 바뀌면 검색어 초기화
    useEffect(() => {
        setInputValue("");
        clearSearch();
    }, [location.pathname]);

    // 검색어 입력 핸들러
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setSearchKeyword(e.target.value.trim());
    };

    // Enter 키 또는 검색 실행
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchKeyword(inputValue.trim());
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout();
            setShowProfileMenu(false);
        }
    };

    const handleBrandClick = () => {
        navigate("/dashboard");
    };

    return (
        <StyledHeader>
            <HeaderLeft>
                <BrandName onClick={handleBrandClick}>Evision.</BrandName>
            </HeaderLeft>
            <HeaderCenter>
                <SearchBar>
                    <SearchIcon
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </SearchIcon>
                    <SearchInput
                        type="text"
                        placeholder={searchConfig.placeholder}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </SearchBar>
            </HeaderCenter>
            <HeaderRight>
                {auth.isAuthenticated ? (
                    <>
                        <NotificationIcon>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <NotificationBadge />
                        </NotificationIcon>
                        <ProfilePicture 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
                            tabIndex={0}
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {showProfileMenu && (
                                <ProfileMenu>
                                    <UserInfo>
                                        {auth.memberName || auth.memberId}
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                                            {auth.role}
                                        </div>
                                    </UserInfo>
                                    <MenuItem onClick={() => { navigate("/info"); setShowProfileMenu(false); }}>
                                        프로필
                                    </MenuItem>
                                    <MenuItem onClick={() => { navigate("/settings"); setShowProfileMenu(false); }}>
                                        설정
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout} style={{ color: '#ef4444' }}>
                                        로그아웃
                                    </MenuItem>
                                </ProfileMenu>
                            )}
                        </ProfilePicture>
                    </>
                ) : (
                    <LoginButton onClick={handleLogin}>로그인</LoginButton>
                )}
            </HeaderRight>
        </StyledHeader>
    );
};

export default Header;