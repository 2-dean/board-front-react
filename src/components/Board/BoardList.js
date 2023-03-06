import Board from "./Board";
import {boardPageListState} from "../../store/Atom";
import {useRecoilValue} from "recoil";

const BoardList = () => {
    console.log("================= BoardList-============")
    const boardPageList = useRecoilValue(boardPageListState);
    console.log("게시글 전체 목록=====================");



   return (
        <>
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
                {boardPageList.map((board) => (
                    <Board
                        key={board.idx}
                        idx={board.idx}
                        title={board.title}
                        name={board.name}
                        saveDate={board.saveDate}
                    />

                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td>게시판 아래</td>
                </tr>
                </tfoot>
            </table>

        </>
    );
}

export default BoardList;