import classes from "../../page/style/LoginPage.module.css";
import {useEffect, useRef} from "react";
import {Api, customAxios} from "../../api/axiosProvider";
import {useRecoilState} from "recoil";
import {tokenState, userState} from "../../store/Atom";
import {useNavigate} from "react-router";
import {LoginApi} from "../../api/LoginApi";

const LoginForm = () => {
    console.log("===================== LoginForm =====================");
    const [loginUser, setLoginUser] = useRecoilState(userState);
    const [accessToken, setAccessToken] =useRecoilState(tokenState);
    console.log("[ LoginForm ] loginUser :" + loginUser.id + ", isLogin : " + loginUser.isLogin);
    const navigate = useNavigate();

    const idInputRef = useRef(); //useRef 실행 -> 해당 객체를 통해 <input type="text" required id="title" ref={titleInputRef}/> element로 접근가능
    const passwordInputRef = useRef();

    //login 실행
    const login = (event) => {
        event.preventDefault();

        //입력받은 아이디, 비밀번호 값 추출
        const inputId = idInputRef.current.value;
        const inputPassword = passwordInputRef.current.value;

        console.log("입력받은 ID : " + inputId + ", PW : " + inputPassword);

        const user = {
            id: inputId,
            password: inputPassword
        }

        // 백엔드 서버로 login 요청z
        // LoginApi();

        Api.post("/login", user)
            .then((response) => {

                console.log(response);

                if (response.status === 200) {
                    const token = response.headers.get('Authorization');
                    console.log("Header access 토큰 :" + token);
                    setLoginUser({
                        id: user.id,
                        password: user.password,
                        name: null,
                        isLogin: true,
                    })
                    //localStorage 에 저장
                    localStorage.setItem("token", token);
                    setAccessToken({
                        token: token,
                        expirationTime: 1
                    })
                    navigate("/board");
                }

            }).catch((response) => {
                console.log(response);
                if (response.response.status === 500) {
                    alert("로그인 정보를 확인하세요.")
                    console.log("isLogin:" + loginUser.isLogin);
                }
            });

    };





        return (
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
        );
}

export default LoginForm;