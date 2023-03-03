import {Api} from "./axiosProvider";
import {useNavigate} from "react-router";
import {useRecoilState} from "recoil";
import {userState} from "../store/Atom";


// 지금 사용안함
export function LoginApi() {
    const [loginUser, setLoginUser] = useRecoilState(userState);
    console.log("LoginApi 호출")

    const navigate = useNavigate();

    console.log("[ LoginForm ] isLogin : " + loginUser.isLogin);


    Api.post("/login", loginUser)
        .then((response) => {

            console.log(response);

            if (response.status === 200) {
                const token = response.headers.get('Authorization');
                const expireTime = response.headers.get('expireTime');
                console.log("Header access 토큰 :" + token);
                setLoginUser({
                    id: loginUser.id,
                    password: loginUser.password,
                    name: null,
                    isLogin: true,
                })
                //localStorage 에 저장
                localStorage.setItem("token", token);
                localStorage.setItem("token", token);
                navigate("/board");
            }

        }).catch((response) => {
        console.log(response);
        if (response.response.status === 500) {
            alert("로그인 정보를 확인하세요.")
            console.log("isLogin:" + loginUser.isLogin);
        }
    });

}