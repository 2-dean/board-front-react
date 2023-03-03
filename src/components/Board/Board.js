const Board = (props) => {
    const boardDetail = () => {
        alert("게시글 클릭");
    }
//TODO boardListItem 으로바꾸ㅜㅜ
    return (
        <li>
            <a onClick={boardDetail}>
                <span>{props.idx}</span> ||
                <span>{props.title}</span> ||
                <span>{props.name}</span> ||
                <span>{props.saveDate}</span>
            </a>₩
        </li>
    );
};

export default Board;