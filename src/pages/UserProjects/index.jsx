import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button, CircularProgress, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Typography from "@mui/material/Typography";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import EmptyProject from '../../assets/EmptyProject.png';
import FSUAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import SearchBarProjects from '../../components/SearchBarProjects';
import UserProjectCard from '../../components/UserProjectCard';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';

function UserProjects() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const token = Cookies.get("_auth");

    const setProject = (projectList) => {
        setProjects(projectList);
    }
    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = () => {
        userManagementApiInstance.get("/user-profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                const userData = response.data._data;
                console.log(userData);
                setUser(userData);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            {/* <FSUAppBar isLogined={!!token} /> */}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                }}
                open={isLoading || !projects}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='userProfile mt-[2rem]'>
                {isLoading || !user ? (
                    <div className='w-full flex justify-center mt-1 mb-8'>
                        <CircularProgress sx={{ color: '#FBB03B' }} />
                    </div>
                ) : (
                    <div>
                        {/* <div className='text-left mt-1 mb-8'>
                            <a className='text-[#A2A4A6] font-bold hover:text-[#FBB03B] hover:underline cursor-pointer transition-all duration-300' onClick={() => navigate("/profile")}>Tài khoản</a>
                            <a className='text-[#44494D] mx-2'>/</a>
                            <a className='text-[#44494D] font-bold hover:text-[#FBB03B] hover:underline cursor-pointer transition-all duration-300' onClick={() => navigate("/profile/projects")}>Dự án của tôi</a>
                        </div> */}
                        <div style={{ width: '100%', height: 'auto' }}>
                            <div className='w-full flex userProjectPageTile'>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '2.25rem', lineHeight: '2.5rem', textAlign: 'left' }}>
                                    Dự án của <span style={{ color: '#FBB03B' }}>{user.accountName}</span>
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<NoteAddIcon />}
                                    onClick={() => navigate("/choose-cate")}
                                    sx={{
                                        color: "#44494D",
                                        backgroundColor: 'white',
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
                            <div className='mt-10'>
                                <SearchBarProjects setProject={setProject} searchType={"user"} />
                            </div>
                            <div className='mt-8 w-full'>
                                {console.log(projects)}
                                {projects && projects.length > 0 ? (
                                    <div className='flex w-full'>
                                        <Grid container spacing={'64px'} rowSpacing={{ lg: '16px', xs: '4px' }}>
                                            {projects.map((item, index) => (
                                                <Grid item xs={12} lg={6} key={item.id}>
                                                    <UserProjectCard
                                                        project={item}
                                                        key={item.id}
                                                        user={user}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>) : (
                                    <div className='w-full bg-[#E2E2E2] rounded-[10px] flex flex-col justify-center items-center'>
                                        <img src={EmptyProject} alt='Not found' className='emptyProjectImg mt-12' />
                                        <Typography style={{ marginTop: '2rem', fontWeight: 'bold', fontSize: '1.25rem', lineHeight: '1.75rem', color: "#969696" }}>
                                            Không có gì ở đây cả
                                        </Typography>
                                        <Typography style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.25rem', lineHeight: '1.75rem', color: "#969696", marginBottom: '3rem' }}>
                                            Danh sách dự án bạn đang trống
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default UserProjects