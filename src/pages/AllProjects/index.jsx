import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, Grid, Paper } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from "@mui/material/InputBase";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { alpha, styled } from "@mui/material/styles";
import Aos from 'aos';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import EmptyProject from '../../assets/EmptyProject.png';
import FSUAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import SingleCard from '../../components/ProjectCard/singleCard';
import categoryApiInstance from "../../utils/apiInstance/categoryApiInstance";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import './index.css';

const Search = styled("div")(() => ({
    borderRadius: "5px",
    backgroundColor: "#F2F2F2",
    position: "relative",
    width: "100%",
    height: "40px",

    "&:hover": {
        backgroundColor: alpha("#F2F2F2", 0.85),
    },
}));

const SearchIconWrapper = styled("div")(() => ({
    height: "100%",
    position: "absolute",
    padding: "0 10px",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const CloseIconWrapper = styled("div")(() => ({
    position: "absolute",
    height: "100%",
    right: 0,
    top: 0,
    padding: "0 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
        cursor: "pointer",
    },
}));

const StyledInputBase = styled(InputBase)(() => ({
    color: "inherit",
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "3px",
    height: "100%",
}));

function AllProjects() {
    const [checkIsLogin, setCheckIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [projects, setProjects] = useState(null);
    const [numProject, setNumProject] = useState(0);
    const [totalProjectMoney, setTotalProjectMoney] = useState(0);
    const [totalPackage, setTotalPackage] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("");

    const [openCategories, setOpenCategories] = useState({});

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const setProject = (projectList) => {
        setProjects(projectList);
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
        const isLogined = Cookies.get('_auth') !== undefined;
        setCheckIsLogin(isLogined);
        getNumProjects();
        getTotalProjectMoney();
        getTotalPackage();
        getCategories();
    }, []);

    const getNumProjects = () => {
        try {
            projectApiInstance.get(`/admin-count-projects`).then((res) => {
                if (res.data._statusCode === 200) {
                    const formattedAmount = new Intl.NumberFormat('vi-VN').format(res.data._data);
                    setNumProject(res.data._data);
                }
            })
        } catch (error) {
            console.error("Error fetching project number:", error);
        }
    }

    const getTotalProjectMoney = () => {
        try {
            projectApiInstance.get(`/admin-count-money-project`).then((res) => {
                if (res.data._statusCode === 200) {
                    const formattedAmount = new Intl.NumberFormat('vi-VN').format(res.data._data);
                    setTotalProjectMoney(formattedAmount);
                }
            })
        } catch (error) {
            console.error("Error fetching project number:", error);
        }
    }

    const getTotalPackage = () => {
        try {
            projectApiInstance.get(`/admin-count-package`).then((res) => {
                if (res.data._statusCode === 200) {
                    setTotalPackage(res.data._data);
                }
            })
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    }

    const getCategories = () => {
        try {
            categoryApiInstance.get(``).then((res) => {
                console.log(res.data);
                if (res.data.result._isSuccess === true) {
                    setCategories(res.data.result._data);
                }
            })
        } catch (error) {
            console.error("Error fetching project category:", error);
        }
    }

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

    const handleCancel = () => {
        setSearchValue("");
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13 || (e.code === "Enter")) {
            handleSearchChange(e);
        } else if (e.keyCode === 27 || e.code === "Escape") {
            handleCancel();
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleOpenCategory = (categoryName) => {
        setOpenCategories((prevState) => ({
            ...prevState,
            [categoryName]: !prevState[categoryName],
        }));
    };

    //Capitalize letter
    const autoCapitalize = (name) => {
        if (typeof name !== 'string' || name.length === 0) {
            return name;
        }
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    //Choose Category
    const handleButtonClick = (categoryName) => {
        setSelectedCategories(categoryName);
        console.log(categoryName)
    };

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
                    <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: 'white', fontWeight: 600, textAlign: 'left', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)' }}>
                        Toàn bộ dự án
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', mt: '0.8rem', textAlign: 'left', color: 'white', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)' }}>
                        Toàn bộ dự án đang và đã được quyên góp trên FPTU Starter
                    </Typography>
                </div>
                <div className='absolute bottom-0 flex flex-row gap-10 justify-center w-full translate-y-20'>
                    <Paper elevation={4} className='project-stats'>
                        <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                            {numProject}
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Dự án
                        </Typography>
                    </Paper>
                    <Paper elevation={4} className='project-stats w-[30%]'>
                        <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                            {totalProjectMoney} VND
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Tổng số tiền ủng hộ
                        </Typography>
                    </Paper>
                    <Paper elevation={4} className='project-stats'>
                        <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                            {totalPackage}
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Số gói được mua
                        </Typography>
                    </Paper>
                </div>
                <div className="banner-background">
                    <img src="https://i.ibb.co/HXhFsjs/banner-background.png" alt="banner" border="0" style={{ height: '40vh', objectFit: 'cover' }} />
                </div>
            </div>
            <div className='mx-[5rem] mt-[8rem]'>
                <Grid container>
                    <Grid item xs={12} lg={3} >
                        <Box sx={{ marginRight: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', lineHeight: '1.75rem', textAlign: 'left', mb: '1.2rem' }}>
                                Lọc kết quả
                            </Typography>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton onClick={handleClick} sx={{ padding: '0 !important', fontSize: '1.2rem', lineHeight: '1.75rem', mb: '1.2rem' }}>
                                    <ListItemText primary="Thể loại" primaryTypographyProps={{
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        lineHeight: '1.75rem',
                                        color: '#44494D',
                                    }} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton
                                            onClick={() => handleButtonClick('all')}
                                            key={"all"}
                                            className="category-select-button"
                                        >
                                            <ListItemText primary="Tất cả thể loại" primaryTypographyProps={{ lineHeight: '1.75rem', color: '#44494D', }} />
                                        </ListItemButton>
                                        {categories.map((category) => (
                                            <React.Fragment key={category.name}>
                                                <ListItemButton onClick={() => handleOpenCategory(category.name)} sx={{
                                                    paddingRight: '0 !important',
                                                }}>
                                                    <ListItemText primary={autoCapitalize(category.name)} primaryTypographyProps={{
                                                        lineHeight: '1.75rem',
                                                        color: '#44494D',
                                                    }} />
                                                    {openCategories[category.name] ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={openCategories[category.name]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {category.subCategories && category.subCategories.length > 0 && (
                                                            category.subCategories.map((subcategory) => (
                                                                <ListItemButton key={subcategory} sx={{
                                                                    pl: 4
                                                                }}
                                                                    className="category-select-button"
                                                                    onClick={() => handleButtonClick(subcategory.name)}>
                                                                    <ListItemText primary={autoCapitalize(subcategory.name)} />
                                                                </ListItemButton>
                                                            ))
                                                        )}
                                                    </List>
                                                </Collapse>
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Collapse>
                            </List>
                            <Divider orientation="horizontal" flexItem sx={{ borderColor: '#44494D', borderWidth: '0.08rem', my: '1rem' }} />
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel sx={{
                                    fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.75rem', textAlign: 'left', mb: '1.2rem', color: '#44494D'
                                    , '&.Mui-focused': {
                                        color: '#44494D',
                                    }
                                }}>Mục tiêu gọi vốn</FormLabel>
                                <RadioGroup defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio />} label="Tất cả" className='radio-button' />
                                    <FormControlLabel value="1" control={<Radio />} label="0 - 1 triệu đồng" className='radio-button' />
                                    <FormControlLabel value="2" control={<Radio />} label="1 - 10 triệu đồng" className='radio-button' />
                                    <FormControlLabel value="3" control={<Radio />} label="10 - 100 triệu đồng" className='radio-button' />
                                    <FormControlLabel value="4" control={<Radio />} label="Trên 100 triệu đồng" className='radio-button' />
                                </RadioGroup>
                            </FormControl>
                            <Divider orientation="horizontal" flexItem sx={{ borderColor: '#44494D', borderWidth: '0.08rem', my: '1rem' }} />
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel sx={{
                                    fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.75rem', textAlign: 'left', mb: '1.2rem', color: '#44494D'
                                    , '&.Mui-focused': {
                                        color: '#44494D',
                                    }
                                }}>Giai đoạn dự án</FormLabel>
                                <RadioGroup defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio />} label="Tất cả" className='radio-button' />
                                    <FormControlLabel value="approved" control={<Radio />} label="Đã duyệt" className='radio-button' />
                                    <FormControlLabel value="processing" control={<Radio />} label="Đang tiến hành" className='radio-button' />
                                    <FormControlLabel value="Completed" control={<Radio />} label="Hoàn thành" className='radio-button' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <div className="ml-[20px]">
                            <Box flex="1" mb={2}>
                                <Search
                                    key={"SearchBarComponent-root"}
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                    }}
                                    className={`SearchBarComponent-root`}
                                >
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        inputProps={{
                                            onChange: handleSearchChange,
                                            value: searchValue,
                                        }}
                                        placeholder={"Bạn đang tìm dự án gì?"}
                                        onKeyUp={handleKeyUp}
                                    />
                                    {searchValue ? (
                                        <CloseIconWrapper onClick={handleCancel}>
                                            <CloseIcon />
                                        </CloseIconWrapper>
                                    ) : null}
                                </Search>
                            </Box>
                            <div className='w-full mt-[1.6rem]'>
                                <div className='w-full'>
                                    {projects && projects.length > 0 ? (
                                        <div className='flex w-full'>
                                            <Grid container columnSpacing={'30px'}>
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
                                        <div className='w-full bg-transparent rounded-[10px] flex flex-col justify-center items-center'>
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
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div >
    )
}

export default AllProjects