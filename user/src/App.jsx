// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Common/Header/Header";
import Footer from "./component/Common/Footer/Footer";
import MainContent from "./component/Common/MainContent/MainContent";
import Login from "./component/Common/Member/login/login";
import BoardList from "./component/Common/Board/BoardList"
import Notice from "./component/Common/Notice/Notice";
import Car from "./component/Common/Car/Car";
import CarDetail from "./component/Common/Car/CarDetail/CarDetail";
import SaveCar from "./component/Common/Car/SaveCar/SaveCar";
import Join from "./component/Common/Member/Join/Join";
import InfoLicenseCertification from "./component/Common/Member/License/InfoLicense";
import MyInfo from "./component/Common/Member/info/Myinfo";
import MyReports from "./component/Common/Member/MyReports/MyReports";
import StationInfo from "./component/Common/Station/StationInfo";
import Report from "./component/Common/Report/Report";
import { AuthProvider } from "./component/context/AuthContext";
import UpdateMember from "./component/Common/Member/updateMember/updateMember";
import ChangePassword from "./component/Common/Member/changePassword/ChangePassword";





const App = () => {
  return (
    <AuthProvider>
    <> 
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boardList" element={<BoardList />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/car" element={<Car />} />
          <Route path="/carDetail" element={<CarDetail />} />
          <Route path="/saveCar" element={<SaveCar />} />
          <Route path="/join" element={<Join />} />
          <Route path="infoLicense" element={<InfoLicenseCertification/>} />
          <Route path="/info" element={<MyInfo />} />
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/station/info" element={<StationInfo />} />
          <Route path="/report" element={<Report />} />
          <Route path="/update" element={<UpdateMember />} />
          <Route path="/changePwd" element={<ChangePassword />} />
          
        </Routes>
        <Footer />
      
    </>
    </AuthProvider>
  );
}; 

export default App;
