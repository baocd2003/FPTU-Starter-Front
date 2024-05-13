import React from 'react';
import { Outlet } from 'react-router-dom';
import FSUAppBar from "../../components/AppBar";
import './index.css';

function AuthenticationLayout() {
    return (
        <div>
            <FSUAppBar isLogined={true} />
            <div className="authenBackground"></div>
            <div className="contentContainer">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthenticationLayout