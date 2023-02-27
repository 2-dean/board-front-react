import {getCookie} from "./getAccessToken";
import {useRecoilState} from "recoil";
import {useCookies} from "react-cookie";
import {tokenState} from "../store/Atom";

const accessToken = getCookie("accessToken");
const refreshToken = getCookie("refreshToken");

export const AuthProvider = (props) => {
    const [token, setToken] = useRecoilState(tokenState); // 토큰이 없거나 저정되어있는 토큰
    const [removeCookie] = useCookies(['accessToken']);

    const userIsLoggedIn = !!token; //빈 문자열이 아니면 false

    const logoutHandler = () => {
        removeCookie('accessToken');
        removeCookie('refreshToken')
    };

    const loginHandler = (accessToken) => {
        setToken(accessToken);
    }


};



