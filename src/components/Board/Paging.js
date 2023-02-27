import Pagination from "react-js-pagination";
import {useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {pageInfo} from "../../store/Atom";

const Paging = () => {
    const [pageContent, setPageContent] = useRecoilState(pageInfo);


    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {

        setPage(page);
    };

return (
    <div>
        <Pagination
            activePage={pageContent.pageNum}       // 현재 페이지
            //itemsCountPerPage={4}   // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={pageContent.total}   // 총 아이템 갯수
            pageRangeDisplayed={pageContent.pageSize}  // paginator의 페이지 범위
            prevPageText={"‹"}        // "이전"을 나타낼 텍스트
            nextPageText={"›"}      // "다음"을 나타낼 텍스트
            onChange={handlePageChange}
        />
    </div>
);

};
export default Paging;