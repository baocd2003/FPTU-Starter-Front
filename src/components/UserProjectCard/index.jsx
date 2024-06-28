import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const projectStatuses = [
    "Đã xóa",
    "Chờ duyệt",
    "Đang tiến hành",
    "Thành công",
    "Thất bại",
    "Từ chối",
];

const statusColors = {
    0: "#E2E2E2",
    1: "#74B9FF",
    2: "#FBB03B",
    3: "#368D59",
    4: "#DD5746",
    5: "#FF0000",
};



function UserProjectCard({ project, user }) {
    const completePercent = project.projectBalance / project.projectTarget * 100;

    const navigate = useNavigate();

    const handleClickDetail = (project) => {
        navigate(`/project-detail/${project.id}`);
    }

    //Calculate days remaining
    const calculateRemainingDays = (project) => {
        const today = new Date();
        const startDate = new Date(project.startDate);
        const endDate = new Date(project.endDate);

        if (startDate > today) {
            return 0;
        }

        if (endDate < today) {
            return 100;
        }

        const totalDurationInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        const elapsedDays = (today - startDate) / (1000 * 60 * 60 * 24);

        if (totalDurationInDays === 0) {
            return 0;
        }

        const progress = (elapsedDays / totalDurationInDays) * 100;
        return progress;
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
        <Box
            my={4}
            display="flex"
            sx={{
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', borderRadius: '10px', minHeight: 'fit-content', width: '100%'
            }}
        >
            <Grid container>
                <Grid item lg={4.5} xs={12} sx={{ my: '0 !important' }}>
                    <img src={project.projectThumbnail} alt="Project Thumbnail" style={{ height: '100%', borderTopLeftRadius: '10px', objectFit: 'cover' }} className='projectImage' />
                </Grid>
                <Grid item lg={7.5} xs={12} sx={{ my: '0 !important' }}>
                    <div style={{ margin: '24px', textAlign: 'left' }}>
                        <div className='flex gap-2 flex-row justify-between mb-2'>
                            {project.categories.slice(0, 1).map((cate, index) => (
                                <Typography gutterBottom key={index} color="text.secondary" component="div"
                                    sx={{ textAlign: "left", fontSize: '1rem', color: '#FBB03B', fontWeight: 600 }}>
                                    {cate.name}
                                </Typography>
                            ))}
                            <div style={{
                                backgroundColor: statusColors[project.projectStatus],
                                color: '#fff',
                                borderRadius: '10px',
                                padding: '0.5rem 1rem',
                                fontWeight: 600,
                                width: 'fit-content'
                            }}>
                                {projectStatuses[project.projectStatus]}
                            </div>
                        </div>
                        <Typography gutterBottom color="text.secondary" component="div"
                            sx={{ textAlign: "left", fontSize: '1.25rem', color: '#FBB03B', fontWeight: 600, mt: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
                            onClick={() => handleClickDetail(project)}>
                            {project.projectName}
                        </Typography>
                        <div className='flex flex-row gap-2 items-center'>
                            <h2 className='text-[0.8rem] text-[#44494D] font-normal'>bởi</h2>
                            <Avatar src={user.userAvatarUrl} sx={{ width: '24px', height: '24px' }}>
                            </Avatar>
                            <h2 className='text-[0.8rem] text-[#44494D] font-normal overflow-hidden whitespace-nowrap text-ellipsis'>{project.projectOwnerName}</h2>
                        </div>
                        <div className='my-4'>
                            <div className='flex flex-row justify-between items-center h-full'>
                                <Typography gutterBottom color="text.secondary" component="div"
                                    sx={{ textAlign: "left", fontSize: '0.8rem', color: '#FBB03B', fontWeight: 600 }}>
                                    Đã đầu tư
                                </Typography>
                                <Typography gutterBottom color="text.secondary" component="div"
                                    sx={{ textAlign: "left", fontSize: '0.8rem', color: '#44494D', fontWeight: 600 }}>
                                    Mục tiêu đầu tư
                                </Typography>
                            </div>
                            <LinearProgress className='progressBarUserProject' variant="determinate" value={completePercent} />
                            <div className='flex flex-row justify-between items-center h-full mt-2'>
                                <Typography gutterBottom color="text.secondary" component="div"
                                    sx={{ textAlign: "left", fontSize: '0.8rem', color: '#FBB03B', fontWeight: 600 }}>
                                    {project.projectBalance.toLocaleString('en-US')} VND
                                </Typography>
                                <Typography gutterBottom color="text.secondary" component="div"
                                    sx={{ textAlign: "left", fontSize: '0.8rem', color: '#44494D', fontWeight: 600 }}>
                                    {project.projectTarget.toLocaleString('en-US')} VND
                                </Typography>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-center projectProgress'>
                            <div className='flex flex-col items-center'>
                                <Box sx={{ position: 'relative' }}>
                                    <CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: '#E2E2E2',
                                        }}
                                        size={50}
                                        thickness={4}
                                        value={100}
                                    />
                                    <CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: '#FBB03B',
                                            position: 'absolute',
                                            left: 0,
                                        }}
                                        size={50}
                                        thickness={4}
                                        value={calculateRemainingDays(project)}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="caption" component="div" style={{ color: '#FBB03B', fontWeight: 600, fontSize: '0.8rem' }}>
                                            {calculateDaysRemaining(project)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <h2 className='text-[0.8rem] text-[#FBB03B] font-bold text-center'>Ngày còn lại</h2>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Box sx={{ position: 'relative' }}>
                                    <CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: '#E2E2E2',
                                        }}
                                        size={50}
                                        thickness={4}
                                        value={100}
                                    />
                                    <CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: '#FBB03B',
                                            position: 'absolute',
                                            left: 0,
                                        }}
                                        size={50}
                                        thickness={4}
                                        value={completePercent}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="caption" component="div" style={{ color: '#FBB03B', fontWeight: 600, fontSize: '0.8rem' }}>
                                            {`${Math.round(completePercent)}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <h2 className='text-[0.8rem] text-[#FBB03B] font-bold text-center'>Tiến độ</h2>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Box sx={{ position: 'relative' }}>
                                    <CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: '#E2E2E2',
                                        }}
                                        size={50}
                                        thickness={4}
                                        value={100}
                                    />
                                    <CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: '#FBB03B',
                                            position: 'absolute',
                                            left: 0,
                                        }}
                                        size={50}
                                        thickness={4}
                                        value={100}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="caption" component="div" style={{ color: '#FBB03B', fontWeight: 600, fontSize: '0.8rem' }}>
                                            10
                                        </Typography>
                                    </Box>
                                </Box>
                                <h2 className='text-[0.8rem] text-[#FBB03B] font-bold text-center'>Người ủng hộ</h2>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box >
    );
}

export default UserProjectCard