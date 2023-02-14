const BoardPage = () => {
    return(
        <div>
            <h1>게시판 >> 로그인된 사용자만</h1>
            <table>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                </tr>
                <tr>
                    <td>가져올 제목 </td>
                    <td>가져올 작성자</td>
                    <td>가져올 작성일자</td>
                </tr>
            </table>
        </div>
    );
}

export default BoardPage;