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
import InfiniteScroll from "react-infinite-scroller";
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
    const [searchValue, setSearchValue] = useState("");
    const [projects, setProjects] = useState(null);
    const [numProject, setNumProject] = useState(0);
    const [totalProjectMoney, setTotalProjectMoney] = useState(0);
    const [totalPackage, setTotalPackage] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedTarget, setSelectedTarget] = useState("");

    //Loading
    const [isLoading, setIsLoading] = useState(false);
    const [isProjectLoading, setIsProjectLoading] = useState(false);
    const [isNumProjectLoading, setIsNumProjectLoading] = useState(false);
    const [isTotalProjectMoneyLoading, setIsTotalProjectMoneyLoading] = useState(false);
    const [isTotalPackageLoading, setTotalPackageLoading] = useState(false);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

    //Infinite Scrolling
    const itemsPerPage = 9;
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [records, setRecords] = useState(itemsPerPage);

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        Aos.init({ duration: 2000 });
        const isLogined = Cookies.get('_auth') !== undefined;
        setCheckIsLogin(isLogined);
        getNumProjects();
        getTotalProjectMoney();
        getTotalPackage();
        getProjects(searchValue, selectedStatus, selectedTarget, selectedCategories);
        getCategories();
    }, []);

    const getProjects = async (value, status, target, category) => {
        setIsProjectLoading(true);
        try {
            projectApiInstance.get(`all-projects?searchName=${value}&projectStatus=${status}&moneyTarget=${target}&categoryName=${category}`).then((res) => {
                if (res.data._statusCode === 200) {
                    setProjects(res.data._data);
                    setRecords(itemsPerPage);
                    setHasMoreItems(true);
                    if (itemsPerPage > res.data._data.length) {
                        setRecords(res.data._data.length);
                        setHasMoreItems(false);
                    }
                    setIsProjectLoading(false);
                }
            })
        } catch (error) {
            console.error("Error fetching project list:", error);
        }
    }

    const getNumProjects = () => {
        setIsNumProjectLoading(true);
        try {
            projectApiInstance.get(`/admin-count-projects`).then((res) => {
                if (res.data._statusCode === 200) {
                    const formattedAmount = new Intl.NumberFormat('vi-VN').format(res.data._data);
                    setNumProject(res.data._data);
                    setIsNumProjectLoading(false);
                }
            })
        } catch (error) {
            console.error("Error fetching project number:", error);
        }
    }

    const getTotalProjectMoney = () => {
        setIsTotalProjectMoneyLoading(true);
        try {
            projectApiInstance.get(`/admin-count-money-project`).then((res) => {
                if (res.data._statusCode === 200) {
                    const formattedAmount = new Intl.NumberFormat('vi-VN').format(res.data._data);
                    setTotalProjectMoney(formattedAmount);
                    setIsTotalProjectMoneyLoading(false);
                }
            })
        } catch (error) {
            console.error("Error fetching money number:", error);
        }
    }

    const getTotalPackage = () => {
        setTotalPackageLoading(true);
        try {
            projectApiInstance.get(`/admin-count-package`).then((res) => {
                if (res.data._statusCode === 200) {
                    setTotalPackage(res.data._data);
                    setTotalPackageLoading(false);
                }
            })
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    }

    const getCategories = () => {
        try {
            categoryApiInstance.get(``).then((res) => {
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
        getProjects("", selectedStatus, selectedTarget, selectedCategories);
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13 || (e.code === "Enter")) {
            handleSearchChange(e);
        } else if (e.keyCode === 27 || e.code === "Escape") {
            handleCancel();
        }
    };

    //Capitalize letter
    const autoCapitalize = (name) => {
        if (typeof name !== 'string' || name.length === 0) {
            return name;
        }
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    //Search Project
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        getProjects(e.target.value, selectedStatus, selectedTarget, selectedCategories);
    };

    //Choose Category
    const handleCategoryClick = (categoryName) => {
        setSelectedCategories(categoryName);
        getProjects(searchValue, selectedStatus, selectedTarget, categoryName);
    };

    //Choose Project Status
    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        getProjects(searchValue, value, selectedTarget, selectedCategories);
    }

    //Choose Target
    const handleTargetChange = (value) => {
        setSelectedTarget(value);
        getProjects(searchValue, selectedStatus, value, selectedCategories);
    }

    //Infinite Scroll
    const showProjects = (projects) => {
        var items = [];
        for (var i = 0; i < records; i++) {
            items.push(
                <Grid item xs={6} lg={4} key={projects[i].id}>
                    <div className='flex justify-center'>
                        <SingleCard
                            id={projects[i].id}
                            imageLink={projects[i].projectThumbnail}
                            progress={completePercent(projects[i])}
                            amount={projects[i].projectBalance}
                            po={projects[i].projectOwnerName}
                            category={projects[i].categories[0].name}
                            title={projects[i].projectName}
                            daysLeft={calculateDaysRemaining(projects[i])}
                            goal={projects[i].projectTarget}
                            likes={projects[i].likes}
                            backers={projects[i].backers} />
                    </div>
                </Grid>
            );
        }
        return items;
    };

    const loadMore = () => {
        if (records === projects.length) {
            setHasMoreItems(false);
        } else {
            setTimeout(() => {
                console.log(records)
                if (projects.length < (records + itemsPerPage)) {
                    setRecords(projects.length);
                } else {
                    setRecords(records + itemsPerPage);
                }
            }, 2000);
        }
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
            <div className='hp-question h-[40vh] flex my-auto relative select-none'>
                <div className='ml-[6rem] mt-[5rem]'>
                    <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: 'white', fontWeight: 600, textAlign: 'left', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)', ml: '20px' }}>
                        Toàn bộ dự án
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', mt: '0.8rem', textAlign: 'left', color: 'white', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)', ml: '20px' }}>
                        Toàn bộ dự án đang và đã được quyên góp trên FPTU Starter
                    </Typography>
                </div>
                <div className='absolute bottom-0 flex flex-row gap-10 justify-center w-full translate-y-20'>
                    <Paper elevation={4} className='project-stats'>
                        {isNumProjectLoading ? <CircularProgress sx={{ color: '#FBB03B', mb: '0.8rem', mx: 'auto' }} /> :
                            <Typography variant="h1" sx={{ fontSize: { lg: '2rem', xs: '1.2rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                                {numProject}
                            </Typography>
                        }
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Dự án thành công
                        </Typography>
                    </Paper>
                    <Paper elevation={4} className='project-stats w-[30%]'>
                        {isTotalProjectMoneyLoading ? <CircularProgress sx={{ color: '#FBB03B', mb: '0.8rem', mx: 'auto' }} /> :
                            <Typography variant="h1" sx={{ fontSize: { lg: '2rem', xs: '1.2rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                                {totalProjectMoney} VND
                            </Typography>
                        }
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Tổng số tiền ủng hộ
                        </Typography>
                    </Paper>
                    <Paper elevation={4} className='project-stats'>
                        {isTotalPackageLoading ? <CircularProgress sx={{ color: '#FBB03B', mb: '0.8rem', mx: 'auto' }} /> :
                            <Typography variant="h1" sx={{ fontSize: { lg: '2rem', xs: '1.2rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '0.8rem' }}>
                                {totalPackage}
                            </Typography>
                        }
                        <Typography variant="h2" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center' }}>
                            Số gói được mua
                        </Typography>
                    </Paper>
                </div>
                <div className="banner-background">
                    <img src="https://i.ibb.co/HXhFsjs/banner-background.png" alt="banner" border="0" style={{ height: '40vh', objectFit: 'cover' }} />
                </div>
            </div>
            <div className='mt-[8rem] mx-[6rem]'>
                <Grid container>
                    <Grid item xs={12} lg={3} sx={{ px: '20px' }}>
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
                                            onClick={(event) => handleCategoryClick(event.currentTarget.dataset.value)}
                                            data-value=""
                                            key={"all"}
                                            className="category-select-button"
                                            sx={{
                                                backgroundColor: selectedCategories === "" ? '#FBB03B' : 'inherit',
                                                mb: '0.8rem',
                                                borderRadius: '0.4rem',
                                            }}
                                        >
                                            <ListItemText primary="Tất cả thể loại" className="category-select-text" primaryTypographyProps={{ lineHeight: '1.75rem', color: selectedCategories === "" ? '#FFFFFF' : '#44494D', fontWeight: selectedCategories === "" ? 600 : 400, }} />
                                        </ListItemButton>
                                        {isCategoriesLoading ? (
                                            <CircularProgress sx={{ color: '#44494D', mb: '0.8rem', mx: 'auto' }} />
                                        ) : (
                                            categories.map((category) => (
                                                <React.Fragment key={category.name}>
                                                    <ListItemButton
                                                        onClick={(event) => handleCategoryClick(event.currentTarget.dataset.value)}
                                                        data-value={category.name}
                                                        className="category-select-button"
                                                        sx={{
                                                            paddingRight: '0 !important',
                                                            backgroundColor: selectedCategories === category.name ? '#FBB03B' : 'inherit',
                                                            borderRadius: '0.4rem',
                                                            mb: '0.8rem',
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={autoCapitalize(category.name)}
                                                            className="category-select-text"
                                                            primaryTypographyProps={{
                                                                lineHeight: '1.75rem',
                                                                color: selectedCategories === category.name ? '#FFFFFF' : '#44494D',
                                                                fontWeight: selectedCategories === category.name ? 600 : 400,
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </React.Fragment>
                                            ))
                                        )}
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
                                <RadioGroup
                                    defaultValue=""
                                    onChange={(event) => handleTargetChange(event.target.value)}
                                >
                                    <FormControlLabel value={""} control={<Radio />} label="Tất cả" className='radio-button' />
                                    <FormControlLabel value={1} control={<Radio />} label="0 - 1 triệu đồng" className='radio-button' />
                                    <FormControlLabel value={2} control={<Radio />} label="1 - 10 triệu đồng" className='radio-button' />
                                    <FormControlLabel value={3} control={<Radio />} label="10 - 100 triệu đồng" className='radio-button' />
                                    <FormControlLabel value={4} control={<Radio />} label="Trên 100 triệu đồng" className='radio-button' />
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
                                <RadioGroup
                                    defaultValue=""
                                    onChange={(event) => handleStatusChange(event.target.value)}
                                >
                                    <FormControlLabel value={""} control={<Radio />} label="Tất cả" className='radio-button' />
                                    <FormControlLabel value={2} control={<Radio />} label="Đang tiến hành" className='radio-button' />
                                    <FormControlLabel value={3} control={<Radio />} label="Hoàn thành" className='radio-button' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={9} sx={{ px: '20px' }}>
                        <div className="ml-[20px]">
                            <Box flex="1" mb={2}>
                                <Search
                                    key={"SearchBarComponent-root"}
                                    style={{
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
                                    {isProjectLoading ? (
                                        <CircularProgress sx={{ color: '#FBB03B', mt: '2.4rem' }} />
                                    ) : projects && projects.length > 0 ? (
                                        <InfiniteScroll
                                            loadMore={loadMore}
                                            hasMore={hasMoreItems}
                                            loader={<CircularProgress sx={{ color: '#FBB03B', mt: '2.4rem', mx: 'auto' }} />}
                                            useWindow={true}
                                            style={{ width: 'full' }}
                                        >
                                            <div className='flex w-full'>
                                                <Grid container columnSpacing={'30px'}>
                                                    {showProjects(projects)}
                                                </Grid>
                                            </div>
                                        </InfiniteScroll>
                                    ) : (
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