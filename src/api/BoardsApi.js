import {Api} from "./axiosProvider";
import {useRecoilState, useRecoilValue} from "recoil";
import {activePageState, boardListState, boardPageListState} from "../store/Atom";


// Back 에서 데이터 받아온 다음에 boardState에 저장해주기
export function BoardsApi() {
    console.log("BoardsApi 시작===================")

    const [boards, setBoards] = useRecoilState(boardListState);
    const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);
    const activePage = useRecoilValue(activePageState);

    // 페이징 관련
    const itemsCountPerPage = 5;
    const beginBoard = (activePage - 1) * itemsCountPerPage;
    const endBoard = beginBoard + itemsCountPerPage;

   const suspender = Api.get("/boards")
        .then((response) => {

            console.log("[ Boards ] 4. BoardApi 응답옴");
            console.log(response);
            console.log("[ Boards ] 5. 게시글 목록 확인");
            console.log(response.data); // 게시글 목록

            const boardListAll = response.data;
            const boardListCount = response.data.length; // 전체 게시글 갯수

            console.log("[ Boards ] 6. 게시글 전체 갯수 확인");
            console.log("[ Boards ] boardsCount : " + boardListCount);

            console.log("[ Boards ] 7. BoardList 전체 담기");
            setBoards(boardListAll);

            console.log("[ Boards ] 8. setBoardPageList 에 담기");
            console.log(
                "[ Boards ] begin - end : " + beginBoard + " ~ " + endBoard
            );
            console.log(
                "[ Boards ] boards.slice(beginBoard, endBoard) : " +
                boards.slice(beginBoard, endBoard)
            );
            setBoardPageList(boards.slice(beginBoard, endBoard));

            console.log("[ Boards ] 8. setBoardPageList 확인");
            console.log(boardPageList);


        })
        .catch((error) => {
            console.log("[ Axios - BoardsApi ] error 발생");
            console.log(error)
           return  alert("Axios error");
        });

    return {
        read(response) {
            if (response.data.list === null) {
                throw suspender;
            } else {
                return response.data.list;
            }
        }

    }
}



