import {Sidebar, Menu, MenuItem, SubMenu, sidebarClasses} from "react-pro-sidebar";
import {useLocation, useNavigate} from "react-router-dom";
import classes from "./LeftMenu.module.css";

const menuData = [
    { id: 1, name: "기준정보", path: "", menu_level: 1, sort_seq: 1 },
    { id: 3, name: "기사", path: "/task/bm/drv", menu_level: 2, sort_seq: 1, parent_id: 1 },
    { id: 4, name: "차량", path: "/task/bm/vhcl", menu_level: 2, sort_seq: 2, parent_id: 1 },
    { id: 2, name: "환경설정", path: "",                        menu_level: 1, sort_seq: 2 },
    { id: 5, name: "사용자", path: "/task/em/user",             menu_level: 2, sort_seq: 1, parent_id: 2 },
    { id: 6, name: "권한",     path: "",                        menu_level: 2, sort_seq: 2, parent_id: 2 },
    { id: 7, name: "권한그룹", path: "/task/em/auth-group",     menu_level: 3, sort_seq: 1, parent_id: 6 },
    { id: 7, name: "메뉴권한", path: "/task/em/auth-menu",      menu_level: 3, sort_seq: 2, parent_id: 6 },
];

const buildTree = (menuList, parentId = undefined) => {  // ✅ undefined로 변경
    console.log("Filtering parentId:", parentId);  // ✅ 디버깅용 로그 추가

    return menuList
        .filter((item) => item.parent_id === parentId)  // ✅ 부모 ID가 undefined인 항목 찾기
        .map((item) => ({
            ...item,
            children: buildTree(menuList, item.id)
        }));
};

const treeMenu = buildTree(menuData);
console.log("tree :", treeMenu);  // ✅ 트리 구조 출력


const LeftMenu = () => {  // ✅ props로 onMenuClick 받음
    const navigate = useNavigate();
    const location = useLocation();

    const onMenuClick = (menuItem) => {
        navigate(menuItem.path);
    };

    return (

<>
        <Sidebar    rootStyles={{
            backgroundColor: "#2c3e50",
            color: "white",
            width: "250px",
            height: "80vh",
            borderRight: "2px solid #34495e",
            paddingTop: "90px"
        }}>
            <Menu>
                {treeMenu.map((menu) =>
                    menu.children.length > 0 ? (
                        <SubMenu key={menu.id} label={menu.name}>
                            {menu.children.map((child) =>
                                child.children.length > 0 ? (
                                    <SubMenu key={child.id} label={child.name}>
                                            {child.children.map((subChild) => (
                                                    <MenuItem key={subChild.id} onClick={() => { onMenuClick(subChild); navigate(subChild.path);}}>
                                                        {subChild.name}
                                                    </MenuItem>
                                            ))}
                                    </SubMenu>
                                ) : (
                                    <MenuItem key={child.id} onClick={() => { onMenuClick(child); navigate(child.path);}}>
                                        {child.name}
                                    </MenuItem>
                                )
                            )}
                        </SubMenu>
                    ) : (
                        <MenuItem key={menu.id}  onClick={() => { onMenuClick(menu);navigate(menu.path); }} >
                            {menu.name}
                        </MenuItem>
                    )
                )}
            </Menu>
        </Sidebar>
</>


    );
};

export default LeftMenu;
