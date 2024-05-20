import Cookies from 'js-cookie';
import React from 'react';
import FSUAppBar from "../../components/AppBar";
import './index.css';

function UserProfileLayout() {
    return (
        <div>
            <FSUAppBar isLogined={Cookies.get("_auth") != undefined ? true : false} />
            <div className='userProfile'>
                <div className='text-left mt-10'>
                    <a className='text-[#44494D] font-bold hover:text-[#FBB03B] hover:underline cursor-pointer transition-all duration-300'>Tài khoản</a>
                </div>
                <div className='mt-12'>

                </div>
            </div>
        </div>
    )
}

export default UserProfileLayout