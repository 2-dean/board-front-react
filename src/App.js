import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./components/common/RequireAuth";

import Layout from "./components/layout/Layout";

import Dashboard from "./page/Dashboard";
import LoginPage from "./page/LoginPage";
import ErrorPage from "./page/ErrorPage";

import BmVhc from "./page/BmVhc";
import BmDrv from "./page/BmDrv";

import BoardDetail from "./components/board/BoardDetail";
import BoardWrite from "./components/board/BoardWrite";
import UserJoin from "./page/UserJoin";
import loader from "@ibsheet/loader";

loader.config({
    registry: [{
        name: 'ibsheet',
        baseUrl: '/ibsheet',
        theme:"default"
        //plugins: ['common', 'dialog', 'excel']
    }]
});


export default function App() {
/*    const loaderVersion = loader.version;*/

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RequireAuth><Layout /></RequireAuth>, // ✅ RequireAuth를 Layout에 적용
            errorElement: <ErrorPage />,
            children: [
                { path: "/dashboard", element: <Dashboard /> },
                { path: "/bm/drv", element: <BmDrv /> },
                { path: "/bm/vhcl", element: <BmVhc /> },

              /*  { path: "/boards", element: <BoardPage /> },*/
                { path: "/board/:boardIdx", element: <BoardDetail /> },
                { path: "/board/write", element: <BoardWrite /> },
                { path: "/write", element: <BoardWrite /> },
            ],
        },
        { path: "/login", element: <LoginPage /> }, // ✅ 로그인은 인증 없이 접근 가능해야 함
        { path: "/join", element: <UserJoin /> },   // ✅ 회원가입도 인증 없이 접근 가능
    ]);


    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
