import {customAxios} from "./axiosProvider";


// 지금 사용안함
export function BoardsApi(props) {

    customAxios.get("/boards/1", props)
        .then(function (response) {
            console.log(response);
            alert(response);
        })
        .catch(function (error) {
            alert(error);
        });
}