import React from "react";
import styled from "styled-components";
import { Routes, Route, Router } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import CarReservation from "../CarReservation/CarReservation";
import ChargingStation from "../ChargingStation/ChargingStation";
import Inquiry from "../Inquiry/Inquiry";
import Message from "../Message/Message";
import Payment from "../Payment/Payment";
import Settings from "../Settings/Settings";
import Help from "../Help/Help";

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/car-reservation" element={<CarReservation />} />
                <Route path="/charging-station" element={<ChargingStation />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/message" element={<Message />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
            </Routes>
        </StyledLayout>
    );
};

export default Layout;
