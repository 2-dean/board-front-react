import {getCookie} from "./getAccessToken";
import {useCookies} from "react-cookie";
import {useRecoilState} from "recoil";
import {userState} from "../store/Atom";





export const Auth = () => {

    const accessToken = getCookie("accessToken");
    const initialToken = localStorage.getItem("token");

    const [token, setToken] = useRecoilState(initialToken);
    const [loginUser, setLoginUser] = useRecoilState(userState);


    const userIsLoggedIn = !!token; //빈 문자열이 아니면 false

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
        window.location.href = '/';

    };

    const loginHandler = (token) => {
        localStorage.setItem("token", accessToken); //k/v 쌍임

    }

    const LoginUser = () => {
        setLoginUser({
            token: token,
            isLogin: userIsLoggedIn,
            login: loginHandler,
            logout: logoutHandler
        });
    }

};



