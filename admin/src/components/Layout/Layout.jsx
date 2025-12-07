import React from "react";
import styled from "styled-components";
import { Routes, Route, Router } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// import CarReservation from "../CarReservation/CarReservation";
import ChargingStation from "../ChargingStation/ChargingStation";
import Inquiry from "../Inquiry/Inquiry";
import Message from "../Message/Message";
import Payment from "../Payment/Payment";
import Settings from "../Settings/Settings";
import Help from "../Help/Help";
import MemberManage from "../Member/manage/MemberManage";
import Login from "../Member/login/login";
import MyInfo from "../Member/info/MyInfo";
import SaveCar from "../Cars/SaveCar/SaveCar";

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
                
                {/* 아직 없는 차량 목록 <Route path="/cars" element={<CarList />} /> */}
                {/* 아직 없는 차량 상세보기 <Route path="/cars/:carNo" element={<CarDetails />} /> */}
                <Route path="/cars" element={<SaveCar />} /> {/* 차량 등록/수정 */}
                {/* 아직 없는 차량 예약 관리 <Route path="/car-reservation" element={<CarReservation />} /> */}

                <Route path="/charging-station" element={<ChargingStation />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/message" element={<Message />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/info" element={<MyInfo />} />
                <Route path="/member-manage" element={<MemberManage />} />

            </Routes>
        </StyledLayout>
    );
};

export default Layout;
