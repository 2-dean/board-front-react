import {customAxios} from "./axiosProvider";

export function UserApi(props) {

    customAxios.post("/users", props)
        .then(function (response) {
            console.log(response);
            alert(response);
        })
        .catch(function (error) {
            alert(error);
        });
}