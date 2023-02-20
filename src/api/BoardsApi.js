import {customAxios} from "./axiosProvider";


// 지금 사용안함
export function BoardsApi(props) {

    customAxios.get("/boards/1", props)
        .then(function (response) {
            console.log("BoardsApi 시작");
            console.log(response);
        })
        .catch(function (error) {
            alert(error);
        });
}