import { CircularProgress, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import EmptyProject from '../../assets/EmptyProject.png';
import FSUAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import SingleCard from '../../components/ProjectCard/singleCard';
import SearchBarProjects from '../../components/SearchBarProjects';

function AllProjects() {
    const [checkIsLogin, setCheckIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState(null);

    const setProject = (projectList) => {
        setProjects(projectList);
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
        const isLogined = Cookies.get('_auth') !== undefined;
        setCheckIsLogin(isLogined);
    }, []);

    const completePercent = (project) => {
        return project.projectBalance / project.projectTarget * 100;
    }

    const calculateDaysRemaining = (project) => {
        const today = new Date();
        const startDate = new Date(project.startDate);
        const endDate = new Date(project.endDate);
        if (startDate >= today) {
            return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        }

        if (endDate <= today) {
            return 0;
        }

        const diffInMilliseconds = endDate - today;
        const daysRemaining = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        return daysRemaining;
    }


    return (
        <div>
            <FSUAppBar isLogined={checkIsLogin} />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='userProfile'>
                <div className='text-left mt-1 mb-8'>
                    <a className='text-[#44494D] font-bold hover:text-[#FBB03B] hover:underline cursor-pointer transition-all duration-300' onClick={() => navigate("/all-projects")}>Toàn bộ dự án</a>
                </div>
                <Typography component="div">
                    <Typography variant="h1" sx={{ fontSize: '36px', color: '#FCAE3D', fontWeight: 600 }}>
                        Toàn bộ dự án
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '20px', mt: '1rem' }}>
                        Toàn bộ dự án đang và đã được quyên góp trên FPTU Starter
                    </Typography>
                </Typography>
                <div className='mt-10'>
                    <SearchBarProjects setProject={setProject} searchType={"all"} />
                </div>
                <div className='mt-8 w-full'>
                    <div className='mt-8 w-full'>
                        {projects && projects.length > 0 ? (
                            <div className='flex w-full'>
                                <Grid container spacing={'64px'} rowSpacing={{ lg: '16px', xs: '4px' }}>
                                    {projects.map((item, index) => (
                                        <Grid item xs={6} lg={4} key={item.id}>
                                            <div className='flex justify-center'>
                                                <SingleCard imageLink={item.projectThumbnail}
                                                    category={item.categories[0].name}
                                                    title={item.projectName}
                                                    description={item.projectDescription}
                                                    progress={completePercent(item)}
                                                    amount={item.projectBalance}
                                                    po={item.projectOwnerName}
                                                    daysLeft={calculateDaysRemaining(item)}
                                                />
                                            </div>
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
                                    Không có kết quả cho tìm kiếm của bạn
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default AllProjects