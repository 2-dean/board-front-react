import {Route, Routes} from "react-router-dom";

import LoginPage from "./page/LoginPage";
import Mypage from "./page/Mypage";
import MainPage from "./page/MainPage";
import BoardPage from "./page/BoardPage";
import {RecoilRoot} from "recoil";


function App() {
    return (
        <RecoilRoot>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/my-page" element={<Mypage/>}/>
                <Route path="/board" element={<BoardPage/>}/>
            </Routes>
        </RecoilRoot>
    );
}

export default App;
