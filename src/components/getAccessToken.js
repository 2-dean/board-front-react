import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name: String) => {
    if(cookies.get("accessToken") !== undefined){
        return cookies.get("accessToken");
    } else {
        return null;
    }
}

