import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Board from "../Board/Board";
import SaveCar from "../Cars/SaveCar/SaveCar";
import ChargingStation from "../ChargingStation/ChargingStation";
import Header from "../Header/Header";
import Inquiry from "../Inquiry/Inquiry";
import MyInfo from "../Member/info/MyInfo";
import Login from "../Member/login/login";
import MemberManage from "../Member/manage/MemberManage";
import NoticeRoutes from "../Notice/NoticeRoutes";
import Payment from "../Payment/Payment";
import ReserveDetails from "../Reserve/ReserveDetails/ReserveDetails";
import ReserveList from "../Reserve/ReserveList/ReserveList";
import Settings from "../Settings/Settings";
import Sidebar from "../Sidebar/Sidebar";

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
                
                {/* 차량 관련 */}
                <Route path="/cars" element={<SaveCar />} />
                
                {/* 예약 관련 */}
                <Route path="/reserve/operator/reserve-manage" element={<ReserveList />} />
                <Route path="/reserve/details/:reserveNo" element={<ReserveDetails />} />

                {/* 기타 */}
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