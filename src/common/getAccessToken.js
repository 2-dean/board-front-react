import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
    if(cookies.get(name) !== undefined){
        return cookies.get(name);
    } else {
        return null;
    }
}

