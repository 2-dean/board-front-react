import { useRef, useState, useEffect } from "react";
import axios from "axios";

import classes from "./LoginPage.module.css";

function LoginPage() {
  const idInputRef = useRef(); //useRef 실행 -> 해당 객체를 통해 <input type="text" required id="title" ref={titleInputRef}/> element로 접근가능
  const passwordInputRef = useRef();

  const [loginState, setLoginState] = useState(false); //로그인안함 false

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

    // 서버로 POST 요청 전송
    axios({
      method: "post",
      url: "/login",
      baseURL: "http://localhost:8080",
      data: {
        id: inputId,
        password: inputPassword,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("로그인성공");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
