import {customAxios} from "./axiosProvider";
import {useNavigate} from "react-router";
import {useRecoilState} from "recoil";
import {userState} from "../store/Atom";
import {getCookie} from "../common/getAccessToken";
import {useEffect} from "react";


// 지금 사용안함
export function LoginApi(props) {
    console.log("LoginApi 호출"  )
    const [loginUser, setLoginUser] = useRecoilState(userState);
    console.log(1);
    const navigate = useNavigate();
    console.log(2);
    const accessToken = getCookie("accessToken");
    console.log(3);
/*    console.log("[ LoginForm ] accessToken : " + accessToken);
    console.log("[ LoginForm ] refreshToken : " + refreshToken);*/
    console.log("[ LoginForm ] isLogin : " + loginUser.isLogin);
    console.log(4);

    useEffect(() => {
        customAxios.post("/login", props.user)
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                    console.log("Axios 요청 성공");
                    console.log("loginUser : " + loginUser)

                    // 로그인 상태 변경
                    setLoginUser({
                        id: props.user.id,
                        password: props.user.password,
                        name: null,
                        isLogin: true,
                    })

                    // Mypage로 이동
                    navigate("/board");
                }
                if (accessToken !== null) {
                    localStorage.setItem("token", accessToken); //k/v 쌍임
                }

            }).catch((response) => {
            // TODO 백에서 이상하게 넘겨준듯?
            console.log(response)
            console.log(response.response.status)
            console.log(response.response.data)

            if (response.response.status === 500) {
                console.log("Password 가 틀립니다.");
                console.log("isLogin:" + loginUser.isLogin);
            }
        });

    },[]);
}