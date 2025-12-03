import { Route, Routes } from "react-router-dom";
import BoardList from "./component/Common/Board/BoardList";
import Car from "./component/Common/Car/Car";
import CarDetail from "./component/Common/Car/CarDetail/CarDetail";
import SaveCar from "./component/Common/Car/SaveCar/SaveCar";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import MainContent from "./component/Common/MainContent/MainContent";
import MyInfo from "./component/Common/Member/info/Myinfo";
import Join from "./component/Common/Member/Join/Join";
import License from "./component/Common/Member/License/License";
import Login from "./component/Common/Member/login/login";
import MyReports from "./component/Common/Member/MyReports/MyReports";
import Notice from "./component/Common/Notice/Notice";
import NoticeDetail from "./component/Common/Notice/NoticeDetail";
import Report from "./component/Common/Report/Report";
import StationInfo from "./component/Common/Station/StationInfo";
import { AuthProvider } from "./component/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        
        {/* 회원 관련 */}
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/license" element={<License />} />
        <Route path="/info" element={<MyInfo />} />
        <Route path="/myreports" element={<MyReports />} />
        
        {/* 게시판 */}
        <Route path="/boardList" element={<BoardList />} />
        
        {/* 공지사항 */}
        <Route path="/notice">
          <Route index element={<Notice />} />
          <Route path=":noticeNo" element={<NoticeDetail />} />
        </Route>
        
        {/* 자동차 */}
        <Route path="/car">
          <Route index element={<Car />} />
          <Route path="detail" element={<CarDetail />} />
          <Route path="save" element={<SaveCar />} />
        </Route>
        
        {/* 충전소 */}
        <Route path="/station">
          <Route path="info" element={<StationInfo />} />
        </Route>
        
        {/* 신고 */}
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}; 

export default App;