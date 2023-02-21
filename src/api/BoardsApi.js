import {customAxios} from "./axiosProvider";
import {useRecoilState, useSetRecoilState} from "recoil";
import {boardList} from "../store/Atom";
import BoardPage from "../page/BoardPage";


// 지금 사용안함
export function BoardsApi(props) {
    const setBoardList = useSetRecoilState(boardList);

    //TODO 페이지 번호 넘겨받아야함
    customAxios.get("/boards/1", props)
        .then(function (response) {
            console.log("BoardsApi 시작");
            console.log(response);
            console.log(response.data.list); // 게시글 목록

            const list = response.data.list;
            setBoardList(
                list.map((list) => {

                }))
        })
        .catch(function (error) {
            alert(error);
        });
}


/*

  idx: {list.idx}
                        title: {list.title}
                        content: {list.content}
                        name: {list.name}
                        saveDate: {list.saveDate}
                        modifyDate: {list.modifyDate}

* */