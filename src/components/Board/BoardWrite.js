import {useRef} from "react";

const BoardWrite = () => {
    const inputRef = useRef();

    const userImageSubmitHandler = () => {
        alert("제출");
        console.log("userIdCardSubmitHandler 실행");
    }

    return (
        <>
        <h2>BoardWritePage</h2>


            <div>미리보기영역</div>
            <form encType="multipart/form-data">
                <input type="text" name="title" placeholder="제목"/>
                <textarea name="content" placeholder="내용"/>
                <input type="text" name="name" placeholder="작성자"/>
                <input type="file" name="file"/>
            <button onClick={userImageSubmitHandler}>제출하기</button>
            </form>

        </>
    );
};


export default BoardWrite;