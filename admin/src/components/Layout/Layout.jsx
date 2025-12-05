import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CarReservation from "../CarReservation/CarReservation";
import ChargingStation from "../ChargingStation/ChargingStation";
import Header from "../Header/Header";
import Inquiry from "../Inquiry/Inquiry";
import MyInfo from "../Member/info/MyInfo";
import Login from "../Member/login/login";
import MemberManage from "../Member/manage/MemberManage";
import Message from "../Message/Message";
import Notice from "../Notice/Notice";
import NoticeDetail from "../Notice/NoticeDetail";
import NoticeInsert from "../Notice/NoticeInsert";
import NoticeUpdate from "../Notice/NoticeUpdate";
import Payment from "../Payment/Payment";
import Settings from "../Settings/Settings";
import Sidebar from "../Sidebar/Sidebar";
import Board from "../Board/Board"

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f9fafb;
`;

const Layout = () => {
    return (
        <StyledLayout>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/" element={<MemberManage />} />
                <Route path="/car-reservation" element={<CarReservation />} />
                <Route path="/charging-station" element={<ChargingStation />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/message" element={<Message />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/info" element={<MyInfo />} />
                <Route path="/member-manage" element={<MemberManage />} />
                <Route path="/board" element={<Board />} />
                <Route path="/notice">
                <Route index element={<Notice />} />
                <Route path="insert" element={<NoticeInsert />} />
                <Route path="update/:noticeNo" element={<NoticeUpdate />} />
                <Route path=":noticeNo" element={<NoticeDetail />} />
                
</Route>
            </Routes>
        </StyledLayout>
    );
};

export default Layout;
