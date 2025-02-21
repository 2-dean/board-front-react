import classes from "../../style/style/LoginPage.module.css";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/Atom";
import { useNavigate } from "react-router";
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
    const inputCompCd = idInputRef.current.value;
    const inputId = idInputRef.current.value;
    const inputPassword = passwordInputRef.current.value;

    console.log(
      "[ LoginForm ] 3. 입력값 확인 [COMP_CD] : " + inputCompCd + ",[ID] : " +inputId + ", [PW] : " +inputPassword
    );

    const user = {
        comp_cd: inputCompCd,
        user_id: inputId,
        pwd: inputPassword,
    };

    //login 요청
    console.log("[ LoginForm ] 4. /login API 요청 ");
    axios
      .post("http://localhost:8080/session/Login/actionLogin.do", user, { withCredentials: true })
      .then((response) => {
        console.log("[ LoginForm ] 5. /login API 응답 옴  ");
        console.log(response);

        console.log("[ LoginForm ] 6. AccessToken LocalStorage 저장 ");
        const token = response.headers.get("authorization");
        localStorage.setItem("token", token);
        console.log(
          "[ LoginForm ] LocalStorage Token : " + localStorage.getItem("token")
        );

        console.log("[ LoginForm ] 7. recoil 에 로그인 상태 반영 ");
        setLoginUser({
            comp_cd: user.comp_cd,
            id: user.user_id,
            password: user.pwd,
            name: user.name,
            isLogin: true,
        });

        console.log(
          "[ LoginForm ] 8. 로그인 상태 확인 loginUser : " + loginUser.id +  ", isLogin : " + loginUser.isLogin
        );
        console.log("[ LoginForm ] 10. 페이지 이동 ");
        navigate("/dashboard");

      })
      .catch((error) => {
        console.log(error);
        //TODO id/pw 폼 지워주기
      });
  }; //login

  return (
      <form className={classes.form} onSubmit={login}>
          <div className={classes.control}>
              <h1>Login</h1>
          </div>
          <div className={classes.control}>
              <label htmlFor="id">회사코드</label>
              <input
                  type="text"
                  required
                  id="comp_cd"
                  placeholder="회사코드 입력하세요"
                  ref={idInputRef}
              ></input>
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


/*
axios.interceptors.response.use((response) => {
    console.log(
        "[ LoginForm interceptors.response 실행 ] 0. http status === 200, 응답 "
    );
    return response;
},(error) => {
    console.log(
        "[ LoginForm interceptors.response 실행 ] 에러발생 "
    );
    console.log(error);

    switch (error.response.status) {
        case 500 : alert("[LoginForm interceptors]비밀번호가 일치하지 않습니다.")
    }
})*/
