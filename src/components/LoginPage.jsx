import {useRef} from "react";

import classes from "./LoginPage.module.css";
import {loginState} from "../store/Atom";
import {useRecoilState} from "recoil";
import {customAxios} from "../api/axiosConfig";

import {useNavigate} from "react-router";

function LoginPage() {
    console.log("LoginPage.jsx 모듈 실행>>");
    //로그인 상태 확인 > isLogin = true 이면 해당페이지 접근 불가
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const navigate = useNavigate();

    if (isLogin) {
        console.log("isLogin : " + isLogin);
    } else {
        console.log("isLogin : " + isLogin);
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

        // 서버로 POST 요청 전송
        customAxios.post("/login", user)
            .then((res) => {
            console.log(res);

            if (res.status === 200) {
                console.log("로그인");
                setIsLogin(true);
                console.log("isLogin:" + isLogin);
                navigate("/my-page");
            }
                if (res.status === 500) {
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
