import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CarReservation from "../Reserve/ReserveList/ReserveList";
import ChargingStation from "../ChargingStation/ChargingStation";
import Header from "../Header/Header";
import Inquiry from "../Inquiry/Inquiry";
import MyInfo from "../Member/info/MyInfo";
import Login from "../Member/login/login";
import MemberManage from "../Member/manage/MemberManage";
import NoticeRoutes from "../Notice/NoticeRoutes";  // ← 이것만!
// Notice, NoticeDetail, NoticeInsert, NoticeUpdate import 삭제
import Payment from "../Payment/Payment";
import Settings from "../Settings/Settings";
import SaveCar from "../Cars/SaveCar/SaveCar";
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
                <Route path="/cars" element={<SaveCar />} />
                <Route path="/charging-station" element={<ChargingStation />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/info" element={<MyInfo />} />
                <Route path="/member-manage" element={<MemberManage />} />
                <Route path="/board" element={<Board />} />
                <Route path="/notice/*" element={<NoticeRoutes />} />
            </Routes>
        </StyledLayout>
    );
};

export default Layout;