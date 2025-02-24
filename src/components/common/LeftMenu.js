import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../../store/Atom";

const menuData = [
    { id: 1, name: "기준정보", path: "", menu_level: 1, sort_seq: 1 },
    { id: 3, name: "기사", path: "/bm/drv", menu_level: 2, sort_seq: 1, parent_id: 1 },
    { id: 4, name: "차량", path: "/bm/vhcl", menu_level: 2, sort_seq: 2, parent_id: 1 },
    { id: 2, name: "환경설정", path: "", menu_level: 1, sort_seq: 2 },
    { id: 5, name: "사용자", path: "/em/user", menu_level: 2, sort_seq: 1, parent_id: 2 },
    { id: 6, name: "권한", path: "", menu_level: 2, sort_seq: 2, parent_id: 2 },
    { id: 7, name: "권한그룹", path: "/em/auth-group", menu_level: 3, sort_seq: 1, parent_id: 6 },
    { id: 8, name: "메뉴권한", path: "/em/auth-menu", menu_level: 3, sort_seq: 2, parent_id: 6 },
];

// 트리 구조 생성 함수
const buildTree = (menuList, parentId = undefined) => {
    return menuList
        .filter((item) => item.parent_id === parentId)
        .map((item) => ({
            ...item,
            children: buildTree(menuList, item.id),
        }));
};

const treeMenu = buildTree(menuData);

const LeftMenu = ({ onMenuClick }) => { // ✅ props 구조 분해 할당으로 수정
    const navigate = useNavigate();
    const sidebar = useRecoilValue(sidebarState);

    return (
        <Sidebar collapsed={false}>
            <Menu>
                {treeMenu.map((menu) =>
                    menu.children.length > 0 ? (
                        <SubMenu key={menu.id} label={menu.name}>
                            {menu.children.map((child) =>
                                child.children.length > 0 ? (
                                    <SubMenu key={child.id} label={child.name}>
                                        {child.children.map((subChild) => (
                                            <MenuItem key={subChild.id} onClick={() => {
                                                onMenuClick(subChild); // ✅ 탭 추가
                                                navigate(subChild.path);
                                            }}>
                                                {subChild.name}
                                            </MenuItem>
                                        ))}
                                    </SubMenu>
                                ) : (
                                    <MenuItem key={child.id} onClick={() => {
                                        onMenuClick(child); // ✅ 탭 추가
                                        navigate(child.path);
                                    }}>
                                        {child.name}
                                    </MenuItem>
                                )
                            )}
                        </SubMenu>
                    ) : (
                        <MenuItem key={menu.id} onClick={() => {
                            onMenuClick(menu); // ✅ 탭 추가
                            navigate(menu.path);
                        }}>
                            {menu.name}
                        </MenuItem>
                    )
                )}
            </Menu>
        </Sidebar>
    );
};

export default LeftMenu;
