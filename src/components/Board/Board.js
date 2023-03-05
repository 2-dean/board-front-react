import BoardList from "./BoardList";

const Board = (props) => {

        alert("게시글 상세페이지");

    return (
        <div>
        <h2>게시글 상세</h2>
        <table>
            <thead>
            <tr>
                <td>글번호</td>
                <td>제목</td>
                <td>작성자</td>
                <td>시간</td>
            </tr>
            </thead>
            <tbody>
            <BoardList />
            </tbody>
            <tfoot>
            <tr>
                게시판 아래
            </tr>
            </tfoot>
        </table>
        </div>
    );
};

export default Board;