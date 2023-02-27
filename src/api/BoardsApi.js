import {customAxios} from "./axiosProvider";
import {useRecoilState} from "recoil";
import {boardList, pageInfo} from "../store/Atom";
import {useEffect} from "react";


// Back 에서 데이터 받아온 다음에 boardState에 저장해주기
export function BoardsApi(props) {
    const [boards, setBoards] = useRecoilState(boardList);
    const [pageContent, setPageContent] = useRecoilState(pageInfo);

    let pageNum = pageContent.pageNum;

    //TODO 페이지 번호 넘겨받아야함
    useEffect(() => {
        customAxios.get("/boards/" + pageNum, props)
            .then((response) => {
                console.log("[ Axios - BoardsApi ] 시작");
                console.log(response);

                setPageContent(
                    {
                        pageNum: response.pageNum,    //현재페이지
                        pageSize: response.pageSize,   //페이지 범위
                        total: response.total,      //총아이템 갯수
                        hasNextPage: response.hasNextPage,     //첫번째 페이지 여부 (이전페이지 노출에사용)
                        hasPreviousPage: response.hasPreviousPage, //마지막 페이지 여부
                    }
                )


                console.log(response.data.list); // 게시글 목록
                return response.data.list;
            })
            .then((data) => {
                console.log("[ Axios - BoardsApi ] 데이터 목록에 담기");
                const boardsList = data;

                console.log(boardsList)
                setBoards(boardsList);

            })
            .catch((error) => {
                alert("Axios error");
                console.log("[ Axios - BoardsApi ] error 발생");
                console.log(error)
            });

    }, [] );
}