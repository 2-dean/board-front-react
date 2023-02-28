import classes from "../../page/style/LoginPage.module.css";
import {useRef} from "react";
import {customAxios} from "../../api/axiosProvider";
import {useRecoilState} from "recoil";
import {userState} from "../../store/Atom";
import {useNavigate} from "react-router";

const LoginForm = () => {
    console.log("===================== LoginForm =====================");
    const [loginUser, setLoginUser] = useRecoilState(userState);
    console.log("loginUser :" + loginUser.isLogin);
    const navigate = useNavigate();

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

        // 백엔드 서버로 login 요청z
        //LoginApi(user);
        customAxios.post("/login", user)
            .then((response) => {

                console.log(response);

                if (response.status === 200) {
                    const token = response.headers.get('accessToken');
                    console.log("Header access토큰 :" + token);
                    setLoginUser({
                        id: user.id,
                        password: user.password,
                        name: null,
                        isLogin: true,
                    })
                    //loacalStorage에 저장
                    localStorage.setItem("token", token); //k/v 쌍임
                    navigate("/board");
                }

            }).catch((response) => {
                console.log(response);
                if (response.response.status === 500) {
                    console.log("Password 가 틀립니다.");
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