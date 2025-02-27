import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducer";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);

root.render(
    /*<React.StrictMode>*/
    <Provider store={ store }>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </Provider>
    /*</React.StrictMode>*/
);
