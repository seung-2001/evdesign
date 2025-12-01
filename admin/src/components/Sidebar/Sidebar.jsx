import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
    width: 250px;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    height: calc(100vh - 70px);
    position: fixed;
    left: 0;
    top: 70px;
    overflow-y: auto;
`;

const SidebarNav = styled.nav`
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
`;

const SidebarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 0.875rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    color: #4b5563;
    gap: 0.75rem;
    text-decoration: none;

    &:hover {
        background-color: #f3f4f6;
    }

    &.active {
        background-color: #eff6ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
    }
`;

const SidebarIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
`;

const SidebarLabel = styled.span`
    font-size: 0.9375rem;
    font-weight: 500;
`;

const SidebarDivider = styled.div`
    height: 1px;
    background-color: #e5e7eb;
    margin: 0.5rem 1.5rem;
`;

const Sidebar = () => {
    const menuItems = [
        { path: "/dashboard", icon: "grid", label: "Dashboard" },
        { path: "/car-reservation", icon: "car", label: "차량 예약신청 관리" },
        { path: "/charging-station", icon: "charging", label: "충전소 관리" },
        { path: "/inquiry", icon: "alert", label: "신고/문의 관리" },
        { path: "/message", icon: "envelope", label: "Message" },
        { path: "/payment", icon: "credit-card", label: "Payment" },
        { path: "/settings", icon: "gear", label: "Settings" },
    ];

    const helpItem = { path: "/help", icon: "question", label: "Help" };

    const getIcon = (iconName) => {
        const icons = {
            grid: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            ),
            flask: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M9 2v7.5a2.5 2.5 0 0 1-5 0V2"></path>
                    <path d="M9 2h6"></path>
                    <path d="M14 2v7.5a2.5 2.5 0 0 0 5 0V2"></path>
                    <path d="M5 10h14"></path>
                    <path d="M12 10v12"></path>
                    <path d="M12 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8"></path>
                </svg>
            ),
            calendar: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            ),
            car: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <path d="m12 15 5-5"></path>
                    <path d="M17 15l-5-5"></path>
                    <circle cx="7.5" cy="17.5" r="2.5"></circle>
                    <circle cx="16.5" cy="17.5" r="2.5"></circle>
                </svg>
            ),
            envelope: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            "credit-card": (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        ry="2"
                    ></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
            gear: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                </svg>
            ),
            question: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            ),
            charging: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
            ),
            alert: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            ),
        };
        return icons[iconName] || null;
    };

    return (
        <StyledSidebar>
            <SidebarNav>
                {menuItems.map((item) => (
                    <SidebarLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/dashboard"}
                    >
                        <SidebarIcon>{getIcon(item.icon)}</SidebarIcon>
                        <SidebarLabel>{item.label}</SidebarLabel>
                    </SidebarLink>
                ))}
                <SidebarDivider />
                <SidebarLink to={helpItem.path}>
                    <SidebarIcon>{getIcon(helpItem.icon)}</SidebarIcon>
                    <SidebarLabel>{helpItem.label}</SidebarLabel>
                </SidebarLink>
            </SidebarNav>
        </StyledSidebar>
    );
};

export default Sidebar;
