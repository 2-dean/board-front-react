import {Api} from "./axiosProvider";


// Back 에서 데이터 받아온 다음에 boardState에 저장해주기
export function BoardsApi() {
    console.log("BoardsApi 시작===================")

    return Api.get("/boards/1")
        .then((response) => {
            console.log("[ Axios - BoardsApi ] 시작");
            console.log(response);
            console.log(response.data.list); // 게시글 목록
            console.log("[ Axios - BoardsApi ] 데이터 목록에 담기");
            return response.data.list;
        })
        .catch((error) => {
            console.log("[ Axios - BoardsApi ] error 발생");
            console.log(error)
           return  alert("Axios error");
        });


}

