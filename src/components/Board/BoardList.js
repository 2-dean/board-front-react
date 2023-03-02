import BoardItem from "./BoardItem";
import {useRecoilValue} from "recoil";
import {boardList} from "../../store/Atom";

const BoardList = () => {
    const boards = useRecoilValue(boardList);
console.log("================= BoardList-============")
    console.log(boards)

    return (
        <>
        <ul>
            <li>
                글번호 / 제목 / 작성자 / 시간
            </li>
            {boards.map((board) => (
                <BoardItem
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