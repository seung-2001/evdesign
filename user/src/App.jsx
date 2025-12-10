import { Route, Routes } from "react-router-dom";
import BoardDetail from "./component/Common/Board/BoardDetail";
import BoardInsert from "./component/Common/Board/BoardInsert";
import BoardList from "./component/Common/Board/BoardList";
import BoardUpdate from "./component/Common/Board/BoardUpdate";
import Car from "./component/Common/Car/Car/Car";
import CarDetails from "./component/Common/Car/CarDetails/CarDetails";
import SaveCar from "../../admin/src/components/Cars/SaveCar/SaveCar";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import MainContent from "./component/Common/MainContent/MainContent";
import ChangePassword from "./component/Common/Member/changePassword/ChangePassword";
import MyInfo from "./component/Common/Member/info/MyInfo";
import Join from "./component/Common/Member/Join/Join";
import InfoLicenseCertification from "./component/Common/Member/License/InfoLicense";
import Login from "./component/Common/Member/login/login";
import MyReports from "./component/Common/Member/MyReports/MyReports";
import UpdateMember from "./component/Common/Member/updateMember/UpdateMember";
import Notice from "./component/Common/Notice/Notice";
import NoticeDetail from "./component/Common/Notice/NoticeDetail";
import Report from "./component/Common/Report/Report";
import StationInfo from "./component/Common/Station/StationInfo";
import { AuthProvider } from "./component/context/AuthContext";
import ReserveCar from "./component/Common/Reserve/ReserveCar/ReserveCar";

const App = () => {

    return (
        <AuthProvider>
            <br />
            <Header />
            <Routes>
                <Route path="/" element={<MainContent />} />

                {/* 회원 관련 */}
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route
                    path="/infoLicense"
                    element={<InfoLicenseCertification />}
                />
                <Route path="/info" element={<MyInfo />} />
                <Route path="/update" element={<UpdateMember />} />
                <Route path="/changePwd" element={<ChangePassword />} />
                <Route path="/myReports" element={<MyReports />} />

                {/* 게시판 */}
                <Route path="/boardList" element={<BoardList />} />
                <Route path="/boardInsert" element={<BoardInsert />} />
                <Route path="/boardDetail/:boardNo" element={<BoardDetail />} />
                <Route path="/boardUpdate/:boardNo" element={<BoardUpdate />} />

                {/* 공지사항 */}
                <Route path="/notice">
                    <Route index element={<Notice />} />
                    <Route path=":noticeNo" element={<NoticeDetail />} />
                </Route>

                {/* 자동차 */}
                <Route path="/car">
                  <Route index element={<Car />} />
                  <Route path="/car/:carNo" element={<CarDetails />} />
                  <Route path="save" element={<SaveCar />} />
                </Route>
                <Route path="reserve/:carNo" element={<ReserveCar />} />
                

                {/* 충전소 */}
                <Route path="/station">
                    <Route path="info" element={<StationInfo />} />
                </Route>

                {/* 신고/문의 */}
                <Route path="/report" element={<Report />} />
                <Route path="/report/:boardNo" element={<Report />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
};

export default App;
