const BoardItem = (props) => {
    const boardDetail = () => {
        alert("게시글 클릭");
    }

    return (
        <li>
            <a onClick={boardDetail}>
            <span>{props.idx}</span> ||
            <span>{props.title}</span> ||
            <span>{props.name}</span> ||
            <span>{props.saveDate}</span>
            </a>
        </li>
    );
};

export default BoardItem;