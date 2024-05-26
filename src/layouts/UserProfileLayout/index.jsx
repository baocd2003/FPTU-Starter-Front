import BallotIcon from '@mui/icons-material/Ballot';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import FSUAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';

function UserProfileLayout() {
    const navigate = useNavigate();
    const [isBgImage, setIsBgImage] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [user, setUser] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const inputBgRef = useRef(null);
    const inputAvtRef = useRef(null);
    const token = Cookies.get("_auth");

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            userManagementApiInstance.get("/user-profile",
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(response => {
                    if (response.data != null) {
                        setUser(response.data._data);
                        setIsBgImage(response.data._data.userBgAvatarUrl != null);
                        setIsImage(response.data._data.userAvatarUrl != null);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching sample API:', error);
                    setIsLoading(false);
                });
        }
    }, [token]);

    const HandleBgClick = () => {
        inputBgRef.current.click();
    }
    const HandleAvtClick = () => {
        inputAvtRef.current.click();
    }

    // Tabs
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // UserProfile
    const navigateUserProfile = () => {
        navigate("/profile");
    }

    // UserBookmarkProject
    const navigateUserBookmarkProject = () => {
        navigate("/bookmarkProject");
    }

    if (isLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <>
            <FSUAppBar isLogined={!!token} />
            <div className='userProfile'>
                <div className='text-left mt-10'>
                    <a className='text-[#44494D] font-bold hover:text-[#FBB03B] hover:underline cursor-pointer transition-all duration-300'>Tài khoản</a>
                </div>
                <div className='mt-12' style={{ width: '100%', height: 'auto' }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '320px',
                        backgroundColor: isBgImage ? 'transparent' : '#E2E2E2',
                        borderRadius: '16px',
                    }}
                        className='backgroundImg'
                    >
                        {isBgImage && (
                            <img
                                src={user.userBgAvatarUrl}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                    overflow: 'hidden !important'
                                }}
                                alt="Image"
                            />
                        )}
                        <div className='bgImgButton rounded-[10px]'
                            style={{
                                position: isImage ? 'absolute' : 'relative',
                                zIndex: 10
                            }}>
                            <Button
                                onClick={HandleBgClick}
                                variant="contained"
                                startIcon={<CameraAltIcon />}
                                sx={{
                                    color: "#44494D",
                                    backgroundColor: 'white',
                                    mb: { xs: '40px', lg: '32px' },
                                    mr: { xs: '0px', lg: '32px' },
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                }}
                            >
                                {isBgImage ? 'Đổi ảnh nền' : 'Thêm ảnh nền'}
                            </Button>
                            <input type="file" ref={inputBgRef} style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>
                <div className='avatarProfile mt-[-88px] flex'>
                    <div className='bg-[white] w-[280px] h-[280px] rounded-full flex justify-center items-center relative'>
                        {isImage ? (
                            <Avatar
                                alt="User"
                                src={user.userAvatarUrl || ''}
                                sx={{ width: 240, height: 240, marginLeft: '20px', marginRight: '20px' }}
                            />
                        ) : (
                            <Avatar
                                alt="User"
                                src={''}
                                sx={{ width: 240, height: 240, marginLeft: '20px', marginRight: '20px' }}
                            />
                        )}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 24,
                                right: 32
                            }}
                        >
                            <Avatar
                                onClick={HandleAvtClick}
                                sx={{
                                    cursor: 'pointer', backgroundColor: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                                    color: '#44494D',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                        transition: 'all 0.3s',
                                    }
                                }}>
                                <CameraAltIcon />
                            </Avatar>
                            <input type="file" ref={inputAvtRef} style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className='briefInfo flex w-full'>
                        {user ? (
                            <div className='flex flex-col'>
                                <h1 className='text-4xl font-semibold'>{user.accountName}</h1>
                                <h2 className='font-medium text-xl pt-2'>{user.userName}</h2>
                                <h2 className='font-medium text-xl pt-2'>Số dư ví:<span className='text-[#FBB03B] ml-3'>0 VND</span></h2>
                            </div>
                        ) : (
                            <div>Tải thông tin người dùng...</div>
                        )}
                        <div className='flex flex-row justify-center items-center gap-4'>
                            <Button
                                variant="contained"
                                startIcon={<BallotIcon />}
                                sx={{
                                    color: "#44494D",
                                    backgroundColor: 'white',
                                    mb: { xs: '40px', lg: '32px' },
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                    fontWeight: 'bold'
                                }}
                            >
                                Dự án của tôi
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<PostAddIcon />}
                                onClick={() => navigate("/choose-cate")}
                                sx={{
                                    color: "#44494D",
                                    backgroundColor: 'white',
                                    mb: { xs: '40px', lg: '32px' },
                                    mr: { xs: '0px', lg: '32px' },
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                    fontWeight: 'bold'
                                }}
                            >
                                Bắt đầu dự án
                            </Button>
                        </div>
                    </div>
                </div>
                <Box sx={{ width: '100%', marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                            },
                            [`& .MuiTabs-indicator`]: {
                                backgroundColor: '#FBB03B',
                            },
                            width: { lg: '80%', xs: '100%' },
                            '&.MuiTabs-scrollButtonsDesktop': {
                                display: 'flex',
                            },
                        }}
                    >
                        <Tab label="Thông tin cá nhân" onClick={navigateUserProfile} className='userProfleTab' sx={{ fontWeight: 'bold', fontSize: '16px', width: { lg: '25%', xs: '100%' } }} />
                        <Tab label="Dự án lưu trữ" onClick={navigateUserBookmarkProject} className='userProfleTab' sx={{ fontWeight: 'bold', width: { lg: '25%', xs: '100%' }, fontSize: '16px' }} />
                        <Tab label="Dự án yêu thích" disabled className='userProfleTab' sx={{ fontWeight: 'bold', fontSize: '16px', width: { lg: '25%', xs: '100%' } }} />
                        <Tab label="Ví điện tử" disabled className='userProfleTab' sx={{ fontWeight: 'bold', fontSize: '16px', width: { lg: '25%', xs: '100%' } }} />
                    </Tabs>
                </Box>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default UserProfileLayout;
