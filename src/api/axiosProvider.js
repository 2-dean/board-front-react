import axios from "axios";
import { getCookie } from "../common/getAccessToken";

export const Api = axios.create({
  baseURL: "http://localhost:8080", // 기본 서버 주소 입력
  withCredentials: true,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

Api.defaults.withCredentials = true;

Api.interceptors.request.use(
  (config) => {
    console.log(
      "[ interceptors.request config 실행] - 요청 바로 직전 axios 설정값에 대해 작성합니다."
    );
    //header에 accessToken 넣어주기
    config.headers.setAuthorization(localStorage.getItem("token"));
    console.log(config);
    return config;
  },
  (error) => {
    console.log("[ interceptors.request ERROR!!! 실행 ] - ");
    return Promise.reject(error);
  }
);

/*
    2. 응답 인터셉터를 작성합니다.

    1) 응답 정성 - 인자값: http response
    2) 응답 에러 - 인자값: http error
*/

Api.interceptors.response.use(
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
