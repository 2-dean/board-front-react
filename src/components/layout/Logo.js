import logo from "../../assets/logo.png";


const Logo = ({ onClick }) => {  // ✅ 부모에서 전달한 onClick을 받음
    return (
        <div className="sidebar-header" onClick={onClick}>
            <img src={logo} alt="Logo" className="sidebar-logo"/>
        </div>
    );
};

export default Logo;
