import BallotIcon from '@mui/icons-material/Ballot';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button, CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import FSUAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import UploadAvatarModel from '../../components/UploadAvatarModel';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';


function UserProfileLayout() {
    const navigate = useNavigate();
    const [isBgImage, setIsBgImage] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [user, setUser] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdateImg, setIsLoadingUpdateImg] = useState(false);
    const [isLoadingBgImg, setIsLoadingBgImg] = useState(false);
    const inputBgRef = useRef(null);

    //Set AppBar refetchData
    const [refetchData, isRefetchData] = useState(false);

    //open input avatar model
    const [openAvt, setOpenAvt] = useState(false);
    const [openBg, setOpenBg] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [bgAvatarUrl, setBgAvatarUrl] = useState(null);

    const token = Cookies.get("_auth");

    //Upload Background
    const handleOpenBg = () => {
        inputBgRef.current.click();
    }

    const updateBackground = async (event) => {
        setIsLoadingBgImg(true);
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('imgFile', file);

        try {
            const imgResponse = await userManagementApiInstance.post("/upload-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            if (imgResponse.status === 200) {
                const userUpdateRequest = {
                    accountName: user.accountName,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    userBackground: imgResponse.data,
                    userPhone: user.userPhone,
                    userBirthDate: user.userBirthDate,
                    userAddress: user.userAddress,
                    userGender: user.userGender,
                    userAvt: user.userAvatarUrl
                };
                const response = await userManagementApiInstance.put("/user-profile", userUpdateRequest, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    Swal.fire({
                        title: "Thành công",
                        text: "Cập nhật thành công",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        isRefetchData(true);
                        fetchUserProfile();
                    });
                }
            }
        } catch (error) {
            console.error('Error uploading background image:', error);
        } finally {
            setIsLoadingBgImg(false);
        }
    }

    //Upload avatar
    const handleOpenAvt = () => setOpenAvt(true);
    const handleCloseAvt = () => setOpenAvt(false);

    const updateAvatar = async (imgSrc) => {
        setIsLoadingUpdateImg(true);
        const file = dataURLtoFile(imgSrc, 'avatar.png');

        const formData = new FormData();
        formData.append('imgFile', file);

        try {
            const imgResponse = await userManagementApiInstance.post("/upload-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            if (imgResponse.status === 200) {
                console.log(imgResponse.data);
                const userUpdateRequest = {
                    accountName: user.accountName,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    userAvt: imgResponse.data,
                    userBackground: user.userBgAvatarUrl,
                    userPhone: user.userPhone,
                    userBirthDate: user.userBirthDate,
                    userAddress: user.userAddress,
                    userGender: user.userGender,
                };
                const response = await userManagementApiInstance.put("/user-profile", userUpdateRequest, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    Swal.fire({
                        title: "Thành công",
                        text: "Cập nhật thành công",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        isRefetchData(true);
                        fetchUserProfile();
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching sample API:', error);
        } finally {
            setIsLoadingUpdateImg(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [token]);

    useEffect(() => {
        if (refetchData) {
            isRefetchData(false);
        }
    }, [refetchData]);

    const fetchUserProfile = async () => {
        if (token) {
            setIsLoading(true);
            try {
                const response = await userManagementApiInstance.get("/user-profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data != null) {
                    setUser(response.data._data);
                    setIsBgImage(response.data._data.userBgAvatarUrl != null);
                    setIsImage(response.data._data.userAvatarUrl != null);
                    setAvatarUrl(response.data._data.userAvatarUrl);
                    setBgAvatarUrl(response.data._data.userBgAvatarUrl)
                }
            } catch (error) {
                console.error('Error fetching sample API:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    //Convert dataUrlToFile
    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

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

    return (
        <div>
            <FSUAppBar isLogined={!!token} refetchData={refetchData} />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                }}
                open={isLoadingUpdateImg || isLoadingBgImg}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='userProfile'>
                {isLoading || !user ? (
                    <div className='w-full flex justify-center mt-1 mb-8'>
                        <CircularProgress sx={{ color: '#FBB03B' }} />
                    </div>
                ) : (
                    <div>
                        <div className='text-left mt-1 mb-8'>
                            <a className='text-[#44494D] font-bold hover:text-[#FBB03B] hover:underline cursor-pointer transition-all duration-300' onClick={() => navigate("/profile")}>Tài khoản</a>
                        </div>
                        <div style={{ width: '100%', height: 'auto' }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '240px',
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
                                            overflow: 'hidden !important',
                                            objectFit: 'cover'
                                        }}
                                        alt="Image"
                                    />
                                )}
                                <div className='bgImgButton rounded-[10px]'
                                    style={{
                                        position: isBgImage ? 'absolute' : 'relative',
                                        zIndex: 10
                                    }}>
                                    <Button
                                        onClick={handleOpenBg}
                                        variant="contained"
                                        startIcon={<CameraAltIcon />}
                                        sx={{
                                            color: "#44494D",
                                            backgroundColor: 'white',
                                            mb: { xs: '40px', lg: '32px' },
                                            mr: { xs: '0px', lg: '32px' },
                                            fontWeight: 'bold',
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
                                    <input type='file' ref={inputBgRef} style={{ display: 'none' }} onChange={updateBackground} />
                                </div>
                            </div>
                        </div>
                        <div className='avatarProfile mt-[-48px] flex'>
                            <div className='relative'>
                                {isImage ? (
                                    <Avatar
                                        alt="User"
                                        src={user.userAvatarUrl || ''}
                                        sx={{ width: 180, height: 180, marginLeft: '20px', marginRight: '20px', outline: '12px solid white' }}
                                    />
                                ) : (
                                    <Avatar
                                        alt="User"
                                        src={''}
                                        sx={{ width: 180, height: 180, marginLeft: '20px', marginRight: '20px', outline: '12px solid white' }}
                                    />
                                )}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 24
                                    }}
                                >
                                    <Avatar
                                        onClick={handleOpenAvt}
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
                                </div>
                            </div>
                            <div className='briefInfo flex w-full'>
                                {user ? (
                                    <div className='flex flex-col userBriefInfo'>
                                        <h1 className='text-3xl font-semibold'>{user.accountName}</h1>
                                        <h2 className='font-medium text-xl pt-2'>Số dư ví:<span className='text-[#FBB03B] ml-3'>0 VND</span></h2>
                                    </div>
                                ) : (
                                    <div>Tải thông tin người dùng...</div>
                                )}
                                <div className='flex flex-row justify-center items-center gap-4'>
                                    <Button
                                        variant="contained"
                                        startIcon={<BallotIcon />}
                                        onClick={() => navigate("/projects")}
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
                                        startIcon={<NoteAddIcon />}
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
                    </div>
                )}
                <Outlet />
            </div>
            <Footer />
            <UploadAvatarModel open={openAvt} handleCloseAvt={handleCloseAvt} user={user} userAvatarUrl={avatarUrl} updateAvatar={updateAvatar} />
        </div>
    );
}

export default UserProfileLayout;
