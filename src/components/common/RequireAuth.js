import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atom";

const RequireAuth = ({ children }) => {
    const loginUser = useRecoilValue(userState);
    const location = useLocation();

    //console.log("[RequireAuth] loginUser :: ", loginUser); // ✅ 상태 확인 로그

    // 🔹 loginUser가 존재하지 않거나 id가 없으면 로그인 페이지로 이동
    if (!loginUser || !loginUser.id) {
        console.log("[RequireAuth] 인증되지 않은 사용자, 로그인 페이지로 이동");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
