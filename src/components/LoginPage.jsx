import {useRef} from "react";

import classes from "./LoginPage.module.css";
import {loginState, userState} from "../store/Atom";
import {useRecoilState} from "recoil";
import {customAxios} from "../api/axiosProvider";

import {useNavigate} from "react-router";
import {accessToken, getCookie} from "./getAccessToken";

function LoginPage() {
    console.log("===================== LoginPage =====================");
    //로그인 상태 확인 > isLogin = true 이면 해당페이지 접근 불가
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [loginUser, setLoginUser] = useRecoilState(userState);
    const accessToken = getCookie("accessToken");

    const navigate = useNavigate();


    if(accessToken !== null){
        console.log("accessToken : " + accessToken);
    } else {
        console.log("accessToken 없음")
    }


    if (isLogin) {
        console.log("[LoginPage] isLogin : " + isLogin);
        console.log("[LoginPage] loginUser ID: " + loginUser.id + ", PW: " + loginUser.password + ", isLogin: " + loginUser.isLogin);
    } else {
        console.log("[LoginPage] isLogin : " + isLogin);
    }

    const idInputRef = useRef(); //useRef 실행 -> 해당 객체를 통해 <input type="text" required id="title" ref={titleInputRef}/> element로 접근가능
    const passwordInputRef = useRef();

    //login 실행
    const login = (event) => {
        event.preventDefault();
        //입력받은 아이디, 비밀번호
        const inputId = idInputRef.current.value;
        const inputPassword = passwordInputRef.current.value;

        let user = {
            id: inputId,
            password: inputPassword,
        };
        console.log("입력받은 ID : " + inputId + ", PW : " + inputPassword);

        setLoginUser(inputId, inputPassword, true);
        console.log("loginUser ID: " + loginUser);


        // 서버로 POST 요청 전송
        customAxios.post("/login", user)
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                console.log("Axios 요청 성공");
                setIsLogin(true);
                console.log("isLogin:" + isLogin);
                navigate("/my-page");
            }
                if (response.status === 500) {
                console.log("Password 가 틀립니다.");
                console.log("isLogin:" + isLogin);
            }
        })

    }

        return (
            <section>
                <form className={classes.form} onSubmit={login}>
                    <div className={classes.control}>
                        <h1>Login</h1>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            required
                            id="id"
                            placeholder="아이디를 입력하세요"
                            ref={idInputRef}
                        ></input>
                    </div>
                    <div className={classes.control}>
                        <label>PW</label>
                        <input
                            type="password"
                            required
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            ref={passwordInputRef}
                        ></input>
                    </div>
                    <div className={classes.actions}>
                        <button>Login</button>
                    </div>
                </form>
            </section>
        );
    }

    export default LoginPage;
