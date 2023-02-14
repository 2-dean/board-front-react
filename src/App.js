import {Route, Routes} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Mypage from "./components/Mypage";
import MainPage from "./components/main";
import BoardPage from "./components/Board";
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
