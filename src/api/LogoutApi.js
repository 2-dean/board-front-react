import { Api } from "./axiosProvider";

export function LogoutApi() {
  Api.post("/logout")
    .then((response) => {
      console.log("[ LogoutApi ] /logout API 응답 옴 ");
      console.log(response);
    })
    .catch((error) => {
      alert("[ LogoutApi ERROR ]\n" + error);
    });
}