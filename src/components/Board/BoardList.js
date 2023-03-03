import Board from "./Board";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardList} from "../../store/Atom";
import {useEffect} from "react";
import {BoardsApi} from "../../api/BoardsApi";

const BoardList = () => {
    console.log("================= BoardList-============")
    const [boards, setBoards] = useRecoilState(boardList);

    useEffect(() => {
        console.log("BoardApi 요청>>>>>>>.")
        BoardsApi().then(res => {
            setBoards(res);
        })
    },[]);

    console.log(boards);

    return (
        <>
        <ul>
            <li>
                글번호 / 제목 / 작성자 / 시간
            </li>
            {boards.map((board) => (
                <Board
                    key={board.idx}
                    idx={board.idx}
                    title={board.title}
                    name={board.name}
                    saveDate={board.saveDate}
                />
            ))}
        </ul>
        {/*<Paging/>*/}
        </>
    );
}

export default BoardList;