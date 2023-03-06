import {Route, Routes} from "react-router-dom";

import LoginPage from "./page/LoginPage";
import Mypage from "./page/Mypage";
import MainPage from "./page/MainPage";
import BoardPage from "./page/BoardPage";
import {RecoilRoot} from "recoil";
import Layout from "./components/Layout/Layout";
import {onSilentRefresh} from "./api/RefreshToken";


//로그인 여부에 따라 메뉴 보이는 거 다르게
function App () {
    function componentDidMount() {
        onSilentRefresh();
    }

/*    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage/>,
        },
        {
            path: "/login",
            element: <LoginPage/>,
            errorElement: <MainPage/>,
        },
        {
            path: "/board",
            children: [
                { path: "/products", element: <Board /> }
            ]
        }

    ])*/

    return (

        <RecoilRoot>
            <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>} errorElement={<MainPage/>} />
               {/* <Route element={<PrivateRoute isLogin={isLogin} />}>*/}
                    <Route path="/my-page" element={<Mypage/>}  errorElement={<LoginPage/>}/>
                    <Route path="/board" element={<BoardPage />} errorElement={<LoginPage/>}>
                      {/*  <Route path=":boardIdx" element={<BoardPage />} />*/}
             {/*       </Route>*/}
                </Route>
               {/* <Route path="/login" element={<PrivateRoute isPrivate={true}/>} errorElement={<MainPage/>} />*/}

            </Routes>
            </Layout>
        </RecoilRoot>


    );
}

export default App;
