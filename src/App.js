import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RecoilRoot} from "recoil";

import Layout from "./components/layout/Layout";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";

import BoardDetail from "./components/board/BoardDetail";
import BoardPage from "./page/BoardPage";
import ErrorPage from "./page/ErrorPage";
import BoardWrite from "./components/board/BoardWrite";
import UserJoin from "./page/UserJoin";
import BmVhc from "./page/BmVhc";
import Dashboard from "./page/Dashboard";
import RequireAuth from "./components/common/RequireAuth";





//로그인 여부에 따라 메뉴 보이는 거 다르게
export default function App () {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            errorElement: <ErrorPage />,
            children: [
                /*{ path: "/", element: <MainPage/> },*/
                { path: "/", element: <LoginPage />},
                { path: "/dashboard", element: <RequireAuth><Dashboard /></RequireAuth>},
                /*인증이 필요한 모든 페이지 </RequireAuth>로 감싸~~*/
                { path: "/join", element: <UserJoin />},

                { path: "/bmvhc", element: <BmVhc /> }, //
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

