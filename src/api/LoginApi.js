import {Api} from "./axiosProvider";
import {useNavigate} from "react-router";
import {useRecoilState} from "recoil";
import {userState} from "../store/Atom";


// 지금 사용안함
export function LoginApi() {
    const [loginUser, setLoginUser] = useRecoilState(userState);
    console.log("LoginApi 호출")

    const navigate = useNavigate();
    console.log(1);
    console.log("[ LoginForm ] isLogin : " + loginUser.isLogin);
    console.log(2);
    console.log(3);
    console.log(4);


    Api.post("/login", loginUser)
        .then((response) => {

            console.log(response);

            if (response.status === 200) {
                const token = response.headers.get('Authorization');
                console.log("Header access 토큰 :" + token);
                setLoginUser({
                    id: loginUser.id,
                    password: loginUser.password,
                    name: null,
                    isLogin: true,
                })
                //localStorage 에 저장
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