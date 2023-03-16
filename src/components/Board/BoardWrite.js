import { useRef } from "react";

import classes from "./BoardWrite.module.css";
import axios from "axios";
import {getCookie} from "../../common/getAccessToken";
import {Api} from "../../api/axiosProvider";

const BoardWrite = () => {
  console.log("[ BoardWrite ] 실행 ");

  const inputTitle = useRef();
  const inputContent = useRef();
  const inputName = useRef();
  const inputFile = useRef();

  const formData = new FormData(); // formData 생성

  const fileChange = event => {
    console.log("[ BoardWrite ] ")
    console.log(event);
    console.log(event.target);
    console.log(event.target.files);

    formData.append("file", event.target.files[0]); // 이미지 파일 값 할당
    console.log("[fileChange] formData 확인")
    console.log(formData);
  }

  const userImageSubmitHandler = (event) => {
    event.preventDefault();
    console.log("userImageSubmitHandler 실행");
    alert("제출");
    formData.append("title", inputTitle.current.value);
    formData.append("content", inputContent.current.value);
    formData.append("name", inputName.current.value);

    console.log("formData 확인")
    console.log(formData);

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
      })
      .catch((err) => {
        console.log("ERROR 발생");
      });
  };

  return (
    <div className={classes.container}>
      <h2>BoardWritePage</h2>

      <form encType="multipart/form-data" method="post">
        <label htmlFor="text" />
        <input type="text" name="title" placeholder="제목" ref={inputTitle} />
        <br />
        <textarea name="content" placeholder="내용" ref={inputContent} />
        <br />
        <input type="text" name="name" placeholder="작성자" ref={inputName} disabled />
        <br />
        <input type="file" name="file" ref={inputFile} onChange={fileChange}/>
        <br />
        <button onClick={userImageSubmitHandler}>제출하기</button>
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