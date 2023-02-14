import {customAxios} from "./axiosConfig";
import {useSetRecoilState} from "recoil";
import {loginState} from "../store/Atom";

export function LoginApi(props) {

    const setIsLogin = useSetRecoilState(loginState);

    customAxios.post("/login", props)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log("로그인성공");

                // access token 있으면 로그인 상태 바꿔주기
                setIsLogin(true);

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}