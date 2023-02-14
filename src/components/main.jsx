const MainPage = () => {

    function login() {
        // eslint-disable-next-line no-restricted-globals
        location.href="/login"
    }

    return (
        <div>
            <h1>main Page</h1>
            <span>안녕하세용 로그인하세요</span>
            <div>
                <button onClick={login}>로그인하기</button>
            </div>
        </div>
    );
}

export default MainPage;