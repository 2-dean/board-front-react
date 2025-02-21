
const Logo = ()=> {
    return(
    <div className="sidebar-header" onClick={() => {alert("대시보드로이동");}/* setCollapsed(!collapsed)*/}>
        <img src={""} alt="Logo" className="sidebar-logo"/>
    </div>
    );
};

export default Logo