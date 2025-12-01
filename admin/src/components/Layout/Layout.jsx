import React from "react";
import styled from "styled-components";
import { Routes, Route, Router } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import CarReservation from "../CarReservation/CarReservation";
import ChargingStation from "../ChargingStation/ChargingStation";
import Inquiry from "../Inquiry/Inquiry";
import Message from "../Message/Message";
import Payment from "../Payment/Payment";
import Settings from "../Settings/Settings";
import Help from "../Help/Help";
import MemberManage from "../Member/manage/MemberManage";
import Login from "../Member/login/login";
import MyInfo from "../Member/info/MyInfo";

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

            </Routes>
        </StyledLayout>
    );
};

export default Layout;
