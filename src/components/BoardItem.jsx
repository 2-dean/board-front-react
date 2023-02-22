const BoardItem = (props) => {

    return (
        <li>
            <span>{props.idx}</span> ||
            <span>{props.title}</span> ||
            <span>{props.name}</span> ||
            <span>{props.saveDate}</span>
        </li>
    );
};

export default BoardItem;