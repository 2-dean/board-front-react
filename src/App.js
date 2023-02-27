import {Route, Routes} from "react-router-dom";

import LoginPage from "./page/LoginPage";
import Mypage from "./page/Mypage";
import MainPage from "./page/MainPage";
import BoardPage from "./page/BoardPage";
import {RecoilRoot} from "recoil";
import Layout from "./components/Layout/Layout";

//로그인 여부에 따라 메뉴 보이는 거 다르게
function App() {
    return (

        <RecoilRoot>
            <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/my-page" element={<Mypage/>}/>
                <Route path="/board" element={<BoardPage/>} errorElement={<LoginPage/>}/>
            </Routes>
            </Layout>
        </RecoilRoot>


    );
}

export default App;
