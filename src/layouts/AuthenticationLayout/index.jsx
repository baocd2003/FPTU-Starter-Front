import Cookies from 'js-cookie';
import React from 'react';
import { Outlet } from 'react-router-dom';
import FSUAppBar from "../../components/AppBar";
import './index.css';
function AuthenticationLayout() {
    return (
        <div>
            <FSUAppBar isLogined={Cookies.get("_auth") != undefined ? true : false} />
            <div className="authenBackground"></div>
            <div className="contentContainer">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthenticationLayout