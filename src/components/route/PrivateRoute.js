import {Navigate, Outlet} from "react-router";

export const PrivateRoute = (props) => {

    if(!props.isLogin) {
        return(<Navigate to={"/"} replace />);
    }

    return <Outlet />;
}