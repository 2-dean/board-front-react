import Pagination from "react-js-pagination";
import {useRecoilState, useRecoilValue} from "recoil";
import {activePageState, boardList, boardPageListState} from "../../store/Atom";
import {useEffect} from "react";
import {Api} from "../../api/axiosProvider";

const Paging = () => {
   // const [pageContent, setPageContent] = useRecoilState(pageInfo);
    console.log("================= Paging =================")
    const [activePage, setActivePage] = useRecoilState(activePageState);
    const [boards, setBoards] = useRecoilState(boardList);
    const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);

    // 한 페이지랑 보여줄 아이템 갯수
    const itemsCountPerPage = 5;
    const beginBoard = (activePage - 1)  * itemsCountPerPage;
    const endBoard = beginBoard + (itemsCountPerPage);
    //const endBoard = beginBoard + (itemsCountPerPage - 1);

    console.log("[ Paging ] 0. 총 게시글 수: " + boards.length);
    console.log("[ Paging ] 1. beginBoard : " + beginBoard + ", endBoard : " + endBoard);



    const pageChangeHandler = (activePage) => {
        setActivePage(activePage);
        console.log("[ Paging - pageChangeHandler ] 4. 페이지 변경! [ 페이지 : " + activePage + " ] Recoil 에 반영");
        console.log("[ Paging - pageChangeHandler ] 5. 페이지당 보일 게시글 번호 확인 \n " +
                                                        " \t\t\t\t beginBoard : " + beginBoard + ", endBoard : " + endBoard);
        console.log("[ Paging - pageChangeHandler ] 6. [ 페이지 : " + activePage + " ] 해당 게시글 boardPageList 에 담기");
        setBoardPageList(boards.slice(beginBoard,endBoard))

        console.log("[ Paging - pageChangeHandler ] 페이지에 보일 게시글들 확인 =======================")
        console.log(boardPageList);
    };


return (
    <div>
        <Pagination
            activePage={activePage}       // 현재 페이지
            itemsCountPerPage={itemsCountPerPage}   // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={boards.length}   // 총 아이템 갯수
            pageRangeDisplayed={5}  // paginator의 페이지 범위
            prevPageText={"‹"}        // "이전"을 나타낼 텍스트
            nextPageText={"›"}      // "다음"을 나타낼 텍스트
            onChange={pageChangeHandler}
        />
    </div>
);

};
export default Paging;