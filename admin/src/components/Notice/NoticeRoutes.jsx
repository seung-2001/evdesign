import { Routes, Route } from "react-router-dom";
import Notice from "./Notice";
import NoticeInsert from "./NoticeInsert";
import NoticeUpdate from "./NoticeUpdate";
import NoticeDetail from "./NoticeDetail";

const NoticeRoutes = () => {
    return (
        <Routes>
            <Route index element={<Notice />} />
            <Route path="insert" element={<NoticeInsert />} />
            <Route path="update/:noticeNo" element={<NoticeUpdate />} />
            <Route path=":noticeNo" element={<NoticeDetail />} />
        </Routes>
    );
};

export default NoticeRoutes;