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
        { path: "/car-reservation", icon: "car", label: "차량 예약신청 관리" },
        { path: "/charging-station", icon: "charging", label: "충전소 관리" },
        { path: "/inquiry", icon: "alert", label: "신고/문의 관리" },
        { path: "/member-manage", icon: "users", label: "회원관리" },
        { path: "/notice", icon: "clipboard", label: "공지사항 관리" },
        { path: "/board", icon: "clipboard", label: "게시판 관리" },
        { path: "/message", icon: "envelope", label: "Message" },
        { path: "/payment", icon: "credit-card", label: "Payment" },
        { path: "/settings", icon: "gear", label: "Settings" },
    ];

    const helpItem = { path: "/help", icon: "question", label: "Help" };

    const getIcon = (iconName) => {
        const icons = {
            car: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <path d="m12 15 5-5"></path>
                    <path d="M17 15l-5-5"></path>
                    <circle cx="7.5" cy="17.5" r="2.5"></circle>
                    <circle cx="16.5" cy="17.5" r="2.5"></circle>
                </svg>
            ),
            charging: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
            ),
            alert: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            ),
            users: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            clipboard: (  // ✅ 추가
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            ),
            envelope: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            "credit-card": (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
            gear: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                </svg>
            ),
            question: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
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
                    <SidebarLink key={item.path} to={item.path}>
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
