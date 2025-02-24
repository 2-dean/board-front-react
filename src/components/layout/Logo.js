import {useNavigate} from "react-router-dom";

const Logo = ()=> {
    const navigate = useNavigate();
    return(
    <div className="sidebar-header" onClick={() => {navigate("/");}/* setCollapsed(!collapsed)*/}>
        <img src={""} alt="Logo" className="sidebar-logo"/>
    </div>
    );
};

export default Logo