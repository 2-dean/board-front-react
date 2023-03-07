import Pagination from "react-js-pagination";
import {useRecoilState, useRecoilValue} from "recoil";
import {activePageState, boardList, boardPageListState} from "../../store/Atom";
import {useEffect} from "react";

const Paging = () => {
   // const [pageContent, setPageContent] = useRecoilState(pageInfo);
    console.log("================= Paging ============")
    const [activePage, setActivePage] = useRecoilState(activePageState);
    const boards = useRecoilValue(boardList);
    const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);

    // 한 페이지랑 보여줄 아이템 갯수
    const itemsCountPerPage = 5;
    const beginBoard = (activePage - 1)  * itemsCountPerPage;
    const endBoard = beginBoard + (itemsCountPerPage);
    //const endBoard = beginBoard + (itemsCountPerPage - 1);

    console.log("총 게시글 수: " + boards.length);
    console.log("beginBoard : " + beginBoard + ", endBoard : " + endBoard);

    console.log(boardPageList);

/*    useEffect(()=> {
        console.log("beginBoard : " + beginBoard + ", endBoard : " + endBoard);
        setBoardPageList(boards.slice(beginBoard, endBoard));
    },[])*/

    const handlePageChange = (activePage) => {
        alert("페이지 변경 : " + activePage);
        setActivePage(activePage);

        console.log("beginBoard : " + beginBoard + ", endBoard : " + endBoard);

        setBoardPageList(boards.slice(beginBoard,endBoard))
        console.log("현재 페이지 번호 : " + activePage);
        console.log("페이지에 보일 게시글들 =======================")
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
            onChange={handlePageChange}
        />
    </div>
);

};
export default Paging;