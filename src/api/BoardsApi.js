import {customAxios} from "./axiosProvider";
import {useRecoilState} from "recoil";
import {boardList} from "../store/Atom";
import {useEffect} from "react";


// Back 에서 데이터 받아온 다음에 boardState에 저장해주기
export function BoardsApi(props) {
    const [boards, setBoards] = useRecoilState(boardList);

    //TODO 페이지 번호 넘겨받아야함
    useEffect(() => {
        customAxios.get("/boards/1", props)
            .then((response) => {
                console.log("[ Axios - BoardsApi ] 시작");
                console.log(response);
                console.log(response.data.list); // 게시글 목록
                return response.data.list;
            })
            .then((data) => {
                console.log("[ Axios - BoardsApi ] 데이터 목록에 담기");
                const boardsList = data;

                console.log(boardsList)
                setBoards(boardsList); // 무한반복
            })
            .catch((error) => {
                alert("Axios error");
                console.log("[ Axios - BoardsApi ] error 발생");
                console.log(error)
            });

    }, [] );
}