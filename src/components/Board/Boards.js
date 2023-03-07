import {boardPageListState} from "../../store/Atom";
import {useRecoilValue} from "recoil";
import BoardList from "./BoardList";

const Boards = () => {
    console.log("================= Boards =====================")
    const boardPageList = useRecoilValue(boardPageListState);


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
                    <BoardList
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

export default Boards;