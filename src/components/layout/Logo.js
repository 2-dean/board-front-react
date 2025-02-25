import logo from "../../assets/logo.png"; //
import logoSmall from "../../assets/logo-small.png"; //
import styles from "./Logo.module.css"; // ✅ CSS 파일 추가



const Logo = ({ small, onClick }) => {  // ✅ 부모에서 전달한 onClick을 받음

    return (
        <div className="sidebar-header" onClick={onClick}>
            <img
                src={small ? logoSmall : logo} // ✅ small 여부에 따라 다른 로고 표시
                alt="Logo"
                className={small ? styles["small-logo"] : styles["full-logo"]} // ✅ small일 때 크기 조절
            />
        </div>
    );
};

export default Logo;
