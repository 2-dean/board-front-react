import {createBrowserRouter, RouterProvider} from "react-router-dom";

import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import {RecoilRoot} from "recoil";
import Layout from "./components/Layout/Layout";
import {onSilentRefresh} from "./api/RefreshToken";
import BoardDetail from "./components/Board/BoardDetail";
import BoardPage from "./page/BoardPage";
import ErrorPage from "./page/ErrorPage";
import {Suspense} from "react";
import BoardWrite from "./components/Board/BoardWrite";
import UserJoin from "./page/UserJoin";


//로그인 여부에 따라 메뉴 보이는 거 다르게
function App () {
    function componentDidMount() {
        console.log("componentDidMount>>>실행")
        //onSilentRefresh();
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <MainPage/> },
                { path: "/login", element: <LoginPage />},
                { path: "/join", element: <UserJoin />},

                { path: "/boards", element: <BoardPage /> },
                { path: "/board/:boardIdx", element: <BoardDetail /> },
                { path: "/board/write", element: <BoardWrite /> },
                { path: "/write", element: <BoardWrite /> },

            ],
        },
    ]);

    return (
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>

    );
}

export default App;
