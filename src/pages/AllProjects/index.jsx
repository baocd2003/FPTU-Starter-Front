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
import './index.css';

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
        return (project.projectBalance / project.projectTarget * 100).toFixed(2);
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
        <div className='mt-[5.2rem]'>
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
            <div className='hp-question h-[40vh] flex my-auto relative'>
                <div className='ml-[5rem] mt-[5rem]'>
                    <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: 'white', fontWeight: 600, textAlign: 'left' }}>
                        Toàn bộ dự án
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', mt: '1rem', textAlign: 'left', color: 'white', fontWeight: 600 }}>
                        Toàn bộ dự án đang và đã được quyên góp trên FPTU Starter
                    </Typography>
                </div>
                <div className='absolute bottom-0 flex flex-row gap-10 justify-center w-full translate-y-12'>
                    <div className='project-stats'>
                        <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                            120.000
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Dự án
                        </Typography>
                    </div>
                    <div className='project-stats w-[30%]'>
                        <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                            178.000.000 VND
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Tổng số tiền ủng hộ
                        </Typography>
                    </div>
                    <div className='project-stats'>
                        <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                            320
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Số gói được mua
                        </Typography>
                    </div>
                </div>
            </div>
            <div className='mx-[5rem] mt-[8rem]'>
                <div className='my-10'>
                    <SearchBarProjects setProject={setProject} searchType={"all"} />
                </div>
                <div className='w-full'>
                    <div className='w-full'>
                        {projects && projects.length > 0 ? (
                            <div className='flex w-full'>
                                <Grid container spacing={'30px'} rowSpacing={{ lg: '16px', xs: '4px' }}>
                                    {projects.map((item, index) => (
                                        <Grid item xs={6} lg={4} key={item.id}>
                                            <div className='flex justify-center'>
                                                <SingleCard
                                                    id={item.id}
                                                    imageLink={item.projectThumbnail}
                                                    progress={completePercent(item)}
                                                    amount={item.projectBalance}
                                                    po={item.projectOwnerName}
                                                    category={item.categories[0].name}
                                                    title={item.projectName}
                                                    daysLeft={calculateDaysRemaining(item)}
                                                    goal={item.projectTarget}
                                                    likes={item.likes}
                                                    backers={item.backers} />
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