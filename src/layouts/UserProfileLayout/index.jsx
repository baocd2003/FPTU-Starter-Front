import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ProjectIcon from "@mui/icons-material/Folder";
import { Box, CircularProgress, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaUser } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import 'react-image-crop/dist/ReactCrop.css';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import FSUAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import UploadAvatarModel from '../../components/UploadAvatarModel';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';


function UserProfileLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdateImg, setIsLoadingUpdateImg] = useState(false);

    const location = useLocation();

    const titleList = [
        { text: "Tài khoản", path: "/profile" },
        { text: "Dự án", path: "/profile/projects" },
        { text: "Yêu thích", path: "/profile/like-projects" },
        { text: "Ví của tôi", path: "/profile/my-wallet" },
    ];

    const iconMapping = {
        0: <FaUser style={{ fontSize: '1.6rem' }} />,
        1: <ProjectIcon sx={{ fontSize: '1.6rem' }} />,
        2: <FaHeart style={{ fontSize: '1.6rem' }} />,
        3: <IoMdWallet style={{ fontSize: '1.6rem' }} />,
    };

    const onClickMapping = {
        0: () => navigate("/profile"),
        1: () => navigate("/profile/projects"),
        2: () => navigate("/profile/like-projects"),
        3: () => navigate("/profile/my-wallet"),
    };

    //Set AppBar refetchData
    const [refetchData, isRefetchData] = useState(false);

    //open input avatar model
    const [openAvt, setOpenAvt] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const token = Cookies.get("_auth");

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
                    setIsImage(response.data._data.userAvatarUrl != null);
                    setAvatarUrl(response.data._data.userAvatarUrl);
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

    return (
        <div className='mt-[5.2rem]'>
            <FSUAppBar isLogined={!!token} refetchData={refetchData} />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                }}
                open={isLoadingUpdateImg || !user || isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='mx-[8rem] pt-[1.6rem]'>
                <Grid container columnSpacing={8}>
                    <Grid item xs={4}>
                        <Paper elevation={3}
                            sx={{
                                zIndex: 1,
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                alignItems: 'center',
                                position: 'sticky', top: '4.8rem'
                            }}>
                            <div className='flex w-full flex-col justify-center items-center'>
                                <div className='h-[8rem] w-full bg-gradient-to-b from-[#FBB03B] to-[#FFFFFF]'></div>
                                <div className='rounded-full bg-[#FFFFFF] w-[9.6rem] h-[9.6rem] flex justify-center items-center mt-[-4.8rem] relative'>
                                    {isImage ? (
                                        <Avatar
                                            alt="User"
                                            src={user.userAvatarUrl || ''}
                                            sx={{ width: "8rem", height: "8rem" }}
                                        />
                                    ) : (
                                        <Avatar
                                            alt="User"
                                            src={''}
                                            sx={{ width: "8rem", height: "8rem" }}
                                        />
                                    )}

                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 8,
                                            right: 12
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
                            </div>
                            {user ?
                                <div className="flex flex-col justify-center items-center overflow-hidden mx-[2rem]">
                                    <h1 className="text-[1.4rem] text-[#44494D] font-bold leading-relaxed my-[0.4rem]">
                                        {user.userName}
                                    </h1>
                                </div>
                                : null
                            }
                            <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <List sx={{ mx: '2.4rem', flexGrow: 1, mb: '1.2rem', mt: '0.8rem' }}>
                                    {titleList.map((item, index) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <ListItem key={item.text} onClick={onClickMapping[index]} sx={{ p: 0, mb: '0.8rem', borderRadius: '0.4rem' }} className="admin-list">
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: '0.4rem',
                                                        backgroundColor: isActive ? '#FBB03B' : 'transparent',
                                                        color: isActive ? '#FFFFFF' : '#44494D',
                                                    }}
                                                >
                                                    <ListItemIcon sx={{ color: isActive ? '#FFFFFF' : '#44494D' }}>
                                                        {iconMapping[index]}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.text}
                                                        primaryTypographyProps={{ fontSize: '1rem', fontWeight: '700' }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Outlet context={{ setIsLoading }} />
                    </Grid>
                </Grid>
            </div>
            <Footer />
            <UploadAvatarModel open={openAvt} handleCloseAvt={handleCloseAvt} user={user} userAvatarUrl={avatarUrl} updateAvatar={updateAvatar} />
        </div>
    );
}

export default UserProfileLayout;
