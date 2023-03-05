import {useRecoilState} from "recoil";
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
            <tr>
                <td>글번호가져오기</td>
                <td>제목</td>
                <td>작성자</td>
                <td>시간</td>
            </tr>
          {/*  {boards.map((board) => (
                <Board
                    key={board.idx}
                    idx={board.idx}
                    title={board.title}
                    name={board.name}
                    saveDate={board.saveDate}
                />
            ))}*/}

        {/*<Paging/>*/}
        </>
    );
}

export default BoardList;