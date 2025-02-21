import MainNavigation from "../components/layout/MainNavigation";

const ErrorPage = () => {
    return (
        <>
        <MainNavigation />
        <main>
            <h1>Error!</h1>
            <p>페이지를 찾을 수 없음</p>
        </main>

        </>
    );
}

export default ErrorPage;