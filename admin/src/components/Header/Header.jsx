import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSearch } from "../../context/SearchContext";

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

    &:hover {
        background-color: #d1d5db;
    }
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
    default: {
        placeholder: "검색...",
        type: "default",
    },
};

const Header = () => {
    const location = useLocation();
    const { searchKeyword, setSearchKeyword, clearSearch } = useSearch();
    const [inputValue, setInputValue] = useState("");

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
    };

    // Enter 키 또는 검색 실행
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchKeyword(inputValue.trim());
        }
    };

    return (
        <StyledHeader>
            <HeaderLeft>
                <BrandName>Evision.</BrandName>
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
                <ProfilePicture>
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
                </ProfilePicture>
            </HeaderRight>
        </StyledHeader>
    );
};

export default Header;
