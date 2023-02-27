import {useEffect, useRef} from "react";

import classes from "./style/LoginPage.module.css";
import {userState} from "../store/Atom";
import {useRecoilState, useResetRecoilState} from "recoil";
import {customAxios} from "../api/axiosProvider";

import {useNavigate} from "react-router";
import {getCookie} from "../common/getAccessToken";


const LoginPage = () => {
    console.log("===================== LoginPage =====================");
    const [loginUser, setLoginUser] = useRecoilState(userState);
    const userLogout = useResetRecoilState(userState); //loginUser 상태 초기화

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    const navigate = useNavigate();

    console.log("[ LoginPage ] accessToken : " + accessToken);
    console.log("[ LoginPage ] refreshToken : " + refreshToken);
    console.log("[ LoginPage ] isLogin : " + loginUser.isLogin);

    //access 없으면 refresh 확인 후 access 재발급
    //refresh도 없으면 로그아웃
    useEffect(() => {
        //login 중인데 [Login] 페이지 접근
        if(accessToken !== null) {
            alert("잘못된 접근입니다. [로그인 중  id : " + loginUser.id + " ] mypage 로 이동합니다.");
            navigate("/my-page")
        }

        if(accessToken === null && refreshToken === null)  {
            userLogout();
        }
    }, []);
    console.log("[ LoginPage ] isLogin : " + loginUser.isLogin);


    const idInputRef = useRef(); //useRef 실행 -> 해당 객체를 통해 <input type="text" required id="title" ref={titleInputRef}/> element로 접근가능
    const passwordInputRef = useRef();

    //login 실행
    const login = (event) => {
        event.preventDefault();

        //입력받은 아이디, 비밀번호 값 추출
        const inputId = idInputRef.current.value;
        const inputPassword = passwordInputRef.current.value;

        let user = {
            id: inputId,
            password: inputPassword,
        };
        console.log("입력받은 ID : " + inputId + ", PW : " + inputPassword);

        // 백엔드 서버로 login 요청
        customAxios.post("/login", user)
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                console.log("Axios 요청 성공");
                console.log("loginUser : " + loginUser)

                // 로그인 상태 변경
                 setLoginUser({
                    id: user.id,
                    password: user.password,
                    name: null,
                    isLogin: true,
                })

                // Mypage로 이동
                navigate("/my-page");


            }
            }).catch((response)=>{
                // TODO 백에서 이상하게 넘겨준듯?
            console.log(response)
            console.log(response.response.status)
            console.log(response.response.data)
            if (response.response.status === 500) {
                console.log("Password 가 틀립니다.");
                console.log("isLogin:" + loginUser.isLogin);
            }
        });

    }

        return (
            <section className={classes.login}>
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
