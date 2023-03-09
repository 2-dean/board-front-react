import {boardPageListState, boardState} from "../../store/Atom";
import {useRecoilValue} from "recoil";
import BoardList from "./BoardList";
import {useEffect} from "react";

const Boards = () => {
    console.log("================= Boards =====================")
    const boardPageList = useRecoilValue(boardPageListState);
    //const board = useRecoilValue(boardState);
    console.log("[ Boards ] 1. Board Page List : \n " + boardPageList);

    useEffect(()=> {
        console.log("[ Boards ] !! componentDidMount !");
        console.log("[ Boards ] 게시글 리스트 확인")
        console.log(boardPageList);


    },[])


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