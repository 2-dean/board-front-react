import classes from "../../page/style/LoginPage.module.css";
import {useRef} from "react";
import {useRecoilState} from "recoil";
import {userState} from "../../store/Atom";
import {useNavigate} from "react-router";
import {onLogin} from "../../api/RefreshToken";


const LoginForm = () => {
    console.log("===================== LoginForm =====================");
    const [loginUser, setLoginUser] = useRecoilState(userState);
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

        console.log("[ LoginForm ] ID : " + inputId + ", PW : " + inputPassword);

        const user = {
            id: inputId,
            password: inputPassword
        }

        //login 요청
        console.log("[ LoginForm ] /login API 요청 =================")
        onLogin(user);

        //recoil Atom 에 로그인 상태 반영
        setLoginUser({
            id: user.id,
            password: user.password,
            name: null,
            isLogin: true,
        })

        console.log("[ LoginForm - 로그인완료 ] loginUser :" + loginUser.id + ", isLogin : " + loginUser.isLogin);

        navigate("/board")
    }; //login


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