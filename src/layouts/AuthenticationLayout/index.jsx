import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FSUAppBar from "../../components/AppBar";
import './index.css';

function AuthenticationLayout() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <FSUAppBar isLogined={Cookies.get("_auth") !== undefined ? true : false} />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="authenBackground"></div>
            <div className="contentContainer">
                <Outlet context={{ setIsLoading }} />
            </div>
        </div>
    )
}

export default AuthenticationLayout;
