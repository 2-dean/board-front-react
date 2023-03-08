import classes from "../../page/style/LoginPage.module.css";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/Atom";
import { useNavigate } from "react-router";
import { onLoginSuccess } from "../../api/RefreshToken";
import axios from "axios";

const LoginForm = () => {
  console.log("===================== LoginForm =====================");
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
  console.log("[ LoginForm ] 1. 페이지 로드 ");
  //login 실행
  const login = (event) => {
    console.log("[ LoginForm ] 2. 로그인 버튼 클릭 ");
    event.preventDefault();

    //입력받은 아이디, 비밀번호 값 추출
    const inputId = idInputRef.current.value;
    const inputPassword = passwordInputRef.current.value;

    console.log(
      "[ LoginForm ] 3. 입력값 확인 [ID] : " +
        inputId +
        ", [PW] : " +
        inputPassword
    );

    const user = {
      id: inputId,
      password: inputPassword,
    };

    //login 요청
    console.log("[ LoginForm ] 4. /login API 요청 ");
    axios
      .post("http://localhost:8080/login", user, { withCredentials: true })
      .then((response) => {
        console.log("[ LoginForm ] 5. /login API 응답 옴  ");
        console.log(response);

        console.log("[ LoginForm ] 6. AccessToken LocalStorage 저장 ");
        const token = response.headers.get('Authorization');
        localStorage.setItem("token", token);
        console.log("[ LoginForm ] LocalStorage Token : " + localStorage.getItem("token"));

        console.log("[ LoginForm ] 7. recoil 에 로그인 상태 반영 ");
        setLoginUser({
          id: user.id,
          password: user.password,
          name: null,
          isLogin: true,
        });

        console.log(
          "[ LoginForm ] 8. 로그인 상태 확인 loginUser : " +
            loginUser.id +
            ", isLogin : " +
            loginUser.isLogin
        );

        console.log("[ LoginForm ] 9. 페이지 이동 ");
        //navigate("/boards");
      })
      .catch((error) => {
        alert("로그인 정보를 확인하세요.");
        console.log(error);
      });
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
};

export default LoginForm;