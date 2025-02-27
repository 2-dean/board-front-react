import classes from "../../style/LoginPage.module.css";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atom";
import { useNavigate } from "react-router";
import axios from "axios";

const JoinForm = () => {
    console.log("===================== JoinForm =====================");

    const [loginUser, setLoginUser] = useRecoilState(userState);

    console.log(
        "[ LoginForm ] loginUser :" +
        loginUser.id +
        ", isLogin : " +
        loginUser.isLogin
    );
    const navigate = useNavigate();

    const idInputRef = useRef(); //useRef 실행 -> 해당 객체를 통해 <input type="text" required id="title" ref={titleInputRef}/> element로 접근가능
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    console.log("[ JoinForm ] 1. 페이지 로드 ");

    //join 회원가입 로직 실행
    const join = (event) => {
        console.log("[ JoinForm ] 2. 로그인 버튼 클릭 ");
        event.preventDefault();

        //입력받은 아이디, 비밀번호 값 추출
        const inputId = idInputRef.current.value;
        const inputPassword = passwordInputRef.current.value;
        const inputName  = nameInputRef.current.value;

        console.log(
            "[ JoinForm ] 3. 입력값 확인 [ID] : " +
            inputId +
            ", [PW] : " +
            inputPassword +
            ", [NAME] : " +
            inputName
        );

        const user = {
            id: inputId,
            password: inputPassword,
            name: inputName
        };

        //login 요청
        console.log("[ JoinForm ] 4. /login API 요청 ");
        axios
            .post("http://localhost:8080/user/join", user)
            .then((response) => {
                console.log("[ JoinForm ] 5. /join API 응답 옴  ");
                console.log(response);

                console.log("[ JoinForm ] 6. AccessToken LocalStorage 저장 ");
                //const token = response.headers.get("authorization");
                //localStorage.setItem("token", token);
                console.log(
                    "[ JoinForm ] LocalStorage Token : " + localStorage.getItem("token")
                );

                console.log("[ LoginForm ] 10. 페이지 이동 ");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
                //TODO id/pw 폼 지워주기
            });
    }; //login

    return (
        <form className={classes.form} onSubmit={join}>
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
            <div className={classes.control}>
                <label>NAME</label>
                <input
                    type="text"
                    required
                    id="name"
                    placeholder="이름을 입력하세요"
                    ref={nameInputRef}
                ></input>
            </div>
            <div className={classes.actions}>
                <button>JOIN!</button>
            </div>
        </form>
    );
};


export default JoinForm;

