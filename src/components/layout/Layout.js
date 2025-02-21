import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import LeftMenu from "../common/LeftMenu";
import LogoutArea from "./LogoutArea";
import Logo from "./Logo";
import {useRecoilState} from "recoil";
import {userState} from "../../store/Atom";

const Layout = () => {
    const [loginUser, setLoginUser] = useRecoilState(userState);

    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate();

    const handleMenuClick = (menuItem) => {
        if (!tabs.find((tab) => tab.path === menuItem.path)) {
            setTabs([...tabs, menuItem]);
        }
        setActiveTab(menuItem.path);
        navigate(menuItem.path);
    };
    console.log("loginUser :: ",loginUser)
    return (
        <Fragment>
            <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
                {/* ✅ 로그인 상태일 때만 보이도록 처리 */}
                {loginUser.id !== null && (
                    <div>
                    <Logo />
                    {/* ✅ LeftMenu가 항상 유지되도록 Outlet 외부에 배치 */}
                    <LeftMenu />
                    <LogoutArea />
                </div>
                )}
                <div style={{ flex: 1 }}>
                    <Outlet /> {/* ✅ 페이지 변경 시 이 부분만 변경됨 */}
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;
