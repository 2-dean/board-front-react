import { Navigate, useLocation } from "react-router-dom";
import {useRecoilValue} from "recoil";
import {userState} from "../../store/Atom";


/**
 * 1. 인증 체크하는 RequireAuth HOC(Component) 만들기
 * @param children
 * @returns {*|JSX.Element}
 * @constructor
 */

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("authToken"); // 예제: 로그인 여부 확인
    const location = useLocation();
    const loginUser = useRecoilValue(userState);

    if (loginUser.id === null) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
