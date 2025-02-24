import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Layout from "./components/layout/Layout";
import LoginPage from "./page/LoginPage";

import BoardDetail from "./components/board/BoardDetail";
import BoardPage from "./page/BoardPage";
import ErrorPage from "./page/ErrorPage";
import BoardWrite from "./components/board/BoardWrite";
import UserJoin from "./page/UserJoin";
import Dashboard from "./page/Dashboard";
import RequireAuth from "./components/common/RequireAuth";

import BmVhc from "./page/BmVhc";
import BmDrv from "./page/BmDrv";

// 로그인 여부에 따라 접근 제한
export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RequireAuth><Layout /></RequireAuth>, // ✅ RequireAuth를 Layout에 적용
            errorElement: <ErrorPage />,
            children: [
                { path: "/dashboard", element: <Dashboard /> },
                { path: "/bm/vhcl", element: <BmVhc /> },
                { path: "/bm/drv", element: <BmDrv /> },

                { path: "/boards", element: <BoardPage /> },
                { path: "/board/:boardIdx", element: <BoardDetail /> },
                { path: "/board/write", element: <BoardWrite /> },
                { path: "/write", element: <BoardWrite /> },
            ],
        },
        { path: "/login", element: <LoginPage /> }, // ✅ 로그인은 인증 없이 접근 가능해야 함
        { path: "/join", element: <UserJoin /> },   // ✅ 회원가입도 인증 없이 접근 가능
    ]);


    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
}
