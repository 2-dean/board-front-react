import BoardItem from "./BoardItem";
import Paging from "./Paging";

import classes from './BoardList.module.css';

const BooardList = (props) => {

    return (
        <>
        <ul>
            <li>
                글번호 / 제목 / 작성자 / 시간
            </li>
            {props.boards.map((board) => (
                <BoardItem
                    key={board.idx}
                    idx={board.idx}
                    title={board.title}
                    name={board.name}
                    saveDate={board.saveDate}
                />
            ))}
        </ul>
        <Paging/>
        </>
    );
}

export default BooardList;