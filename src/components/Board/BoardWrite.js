import { useEffect, useRef, useState } from "react";

import classes from "./BoardWrite.module.css";
import axios from "axios";
import { getCookie } from "../../common/getAccessToken";
import { useRecoilState } from "recoil";
import { userState } from "../../store/Atom";
import { Api } from "../../api/axiosProvider";
import {useNavigate} from "react-router";

const BoardWrite = () => {
  console.log("[ BoardWrite ] 실행 ");

  const [loginUser, setLoginUser] = useRecoilState(userState);
  const [imgSrc, setImgSrc]: any = useState(null);
  const [uploadFile, setUploadFile]: any = useState(null);

  const inputTitleRef = useRef();
  const inputContentRef = useRef();

  const navigate = useNavigate();


  console.log(
    "[ BoardWrite ] LOGIN USER : " +
      loginUser.id +
      " | " +
      loginUser.name +
      " | "
  );

  useEffect(() => {
    console.log(
      "[ BoardWrite ] /user (loginUser 정보) API 요청 ID 보내서 user 정보 가져옴  "
    );

    Api.post("/user/" + loginUser.id)
      .then((response) => {
        console.log("[ BoardWrite ] /user (loginUser 정보) API 응답 옴  ");
        console.log(response);
        const name = response.data.name;
        setLoginUser({
          id: loginUser.id,
          password: loginUser.password,
          name: name,
          idx: response.data.idx,
          isLogin: true,
        });
      })
      .catch((error) => {
        console.log("[ BoardWrite ] 9. /user ERROR 발생 ");
        console.log(error);
      });
  }, []);

  // 파일선택 클릭시 마다
  const fileChange = (event) => {
    event.preventDefault();
    console.log("[ BoardWrite - fileChange ] 파일 첨부 됨 ");
    console.log(event);
    console.log(event.target);
    console.log(event.target.files);

    const file = event.target.files[0];
    setUploadFile(file); // 이미지 파일 값 할당

    // 첨부파일 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  // 제출버튼
  const userImageSubmitHandler = (event) => {
    event.preventDefault();
    alert("제출");
    console.log("userImageSubmitHandler 실행 ==== 입력값 확인 ");
    console.log("title : " + inputTitleRef.current.value);
    console.log("content : " + inputContentRef.current.value);
    console.log("loginUser.idx : " + loginUser.idx);

    const inputTitle = inputTitleRef.current.value;
    const inputContent = inputContentRef.current.value;

    const formData = new FormData();
    formData.append("title", inputTitle);
    formData.append("content", inputContent);
    formData.append("userIdx", loginUser.idx);
    formData.append("name", loginUser.name);
    formData.append("file", uploadFile);

    console.log(formData);
    console.log("[ userImageSubmitHandler ] formData.entries 확인 ");
    console.log(formData.entries());


    const config = {
      baseURL: "http://localhost:8080", // 기본 서버 주소 입력
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token"), // 토큰 넣어주기
        "Content-Type": "multipart/form-data", // 데이터 형식 지정
      },
    };

    /// api 통신
    axios
      .post("/board/new", formData, config)
      .then((response) => {
        console.log("/board/new  응답옴");
        console.log(response);
        if(response.status === 200) {
          navigate("/board")
        }
      })
      .catch((error) => {
        console.log("/board/new  ERROR 발생");
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      <h2>BoardWritePage</h2>

      <form
        onSubmit={userImageSubmitHandler}
        encType="multipart/form-data"
        method="post"
      >
        <label htmlFor="text" />
        <input
          type="text"
          name="title"
          placeholder="제목"
          ref={inputTitleRef}
        />
        <br />
        <textarea name="content" placeholder="내용" ref={inputContentRef} />
        <br />
        <input type="hidden" name="userIdx" value={loginUser.idx} />
        <input type="text" name="name" placeholder={loginUser.name} disabled />
        <br />
        <img src={imgSrc} alt="첨부파일" />
        <br />
        <input type="file" name="file" accept="image/*" onChange={fileChange} />
        <br />
        <button type="submit">제출하기</button>
      </form>
    </div>
  );
};


axios.interceptors.response.use(
    function (response) {
      //  http status가 200인 경우 응답 바로 직전에 대해 작성합니다 .then() 으로 이어집니다.
      console.log(
          "[ interceptors.response 실행 ] 0. http status === 200, 응답 직전 "
      );
      console.log(response);
      return response;
    },
    async function (error) {
      //http status가 200이 아닌 경우 응답 에러 처리를 작성합니다. .catch() 으로 이어집니다.
      console.log("[ interceptors.response ] 0. http status !== 200");
      console.log(error);
      console.log(error.response);

      if (error.response.status === 406) {
        //const { config, response: {status},} = error;

        console.log(
            "[ interceptors.response ] !!!! 406 ERROR  ======> 리프레시 토큰 발급"
        );

        const newAccessToken = error.response.headers.get("authorization");
        console.log(
            "[ interceptors.response ] 1. 새 AccessToken : " + newAccessToken
        );
        console.log(
            "[ interceptors.response ] 2. AccessToken LocalStorage 저장 "
        );
        localStorage.setItem("token", newAccessToken);

        console.log(
            "[ interceptors.response ] 3. LocalStorage Token : " +
            localStorage.getItem("token")
        );
        console.log(
            "[ interceptors.response ] 4. newRefresh Token : " +
            getCookie("refreshToken")
        );

        console.log(
            "[ interceptors.response ] 5. error.config(origin API 정보)를 다시 요청"
        );

        //return axios(origi)
      } else {
        console.log("그 외 오류발생");
        console.log(error);
      }

      return Promise.reject(error);
    }
);


export default BoardWrite;