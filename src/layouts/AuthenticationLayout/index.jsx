import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';

function AuthenticationLayout() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
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
