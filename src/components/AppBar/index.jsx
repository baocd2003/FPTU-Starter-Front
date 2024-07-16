import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Backdrop, Badge, Box, Button, CircularProgress, Container, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import HeaderLogo2 from "../../assets/HeaderLogo2.png";
import logo from "../../assets/logo-transparent.png";
import AuthenticationModal from '../../layouts/AuthenticationModal';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import "./index.css";

const pages = [
  { label: 'Trang chủ', route: '/home' },
  { label: 'Toàn bộ dự án', route: '/all-projects' },
  { label: 'Về chúng tôi', route: '/about-us' },
  { label: 'Hỗ trợ', route: '/help-and-support' }
];
const profileMenu = [
  { label: 'Tài khoản', route: '/profile', icon: <AccountCircleIcon /> },
  { label: 'Ví của tôi', route: '/my-wallet', icon: <AccountBalanceWalletIcon /> },
  { label: 'Dự án của tôi', route: '/profile/projects', icon: <BallotIcon /> },
  { label: 'Đăng xuất', route: 'logout', icon: <LogoutIcon /> }
];

function FSUAppBar({ isLogined, refetchData }) {
  FSUAppBar.propTypes = {
    isLogined: PropTypes.bool.isRequired,
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [logoSrc, setLogoSrc] = React.useState(logo);
  const [classHeader, setClassHeader] = React.useState("scrolled");
  const [tabValue, setTabValue] = React.useState(0);

  //Open Authentication Modal
  const [openModal, setOpenModal] = React.useState(false);

  //Login Modal
  const handleOpenLoginModal = () => {
    setTabValue(0);
    setOpenModal(true);
  };

  const handleOpenRegisterModal = () => {
    setTabValue(1);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTabValue(0);
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    if (refetchData) {
      fetchUserProfile();
    }
  }, [refetchData]);

  React.useEffect(() => {
    if (location.pathname === '/home' || location.pathname === "/my-wallet") {
      setLogoSrc(HeaderLogo2);
      setClassHeader("top");
    } else {
      setLogoSrc(logo);
      setClassHeader("scrolled");
    }
  }, [location.pathname, logoSrc, classHeader]);

  const fetchUserProfile = async () => {
    try {
      const token = Cookies.get("_auth");
      setIsLoading(true);
      const response = await userManagementApiInstance.get("/user-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data != null) {
        setUser(response.data._data);
      }
    } catch (error) {
      console.error('Error fetching sample API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isLogined) {
      fetchUserProfile();
    }
  }, [isLogined]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavBarMenuClick = (route) => {
    navigate(route);
    handleCloseNavMenu();
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleClick = () => {
    navigate('/login');
  };

  const signOut = useSignOut();

  const handleProfileMenuClick = (route) => {
    if (route === 'logout') {
      Swal.fire({
        title: "Cảnh báo?",
        text: "Bạn có muốn đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FBB03B",
        cancelButtonColor: "D8D8D8",
        confirmButtonText: "Đăng xuất!",
        cancelButtonText: "Ở lại!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          signOut();
          window.location.href = "/home";
        }
      });
    } else {
      navigate(route);
    }
    handleCloseProfileMenu();
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar position='absolute' className={classHeader} sx={{ background: '#FFFFFF', height: '5.2rem', justifyContent: 'center !important', display: 'flex' }}>
        <Container maxWidth="false">
          <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='flex flex-row w-full h-[5rem]'>
              <Typography variant="h6" noWrap component="a" onClick={() => navigate("/home")} sx={{ mr: 4, display: { xs: 'none', lg: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', alignItems: 'center', cursor: 'pointer', ml: '6rem' }}>
                <img src={logoSrc} style={{ width: '6rem', height: '6rem' }} />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, justifyContent: 'space-between', height: '5rem' }}>
                <IconButton className='notiIcon' title="Phụ lục" size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} sx={{ outline: 'none !important' }}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                  {pages.map((page) => (
                    <MenuItem key={page.label} onClick={() => handleNavBarMenuClick(page.route)} sx={{ mr: 8 }}>
                      <ListItemText>{page.label}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', height: '5rem' }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
                  {pages.map((page) => (
                    <Button disableRipple={true} key={page.label} onClick={() => handleNavBarMenuClick(page.route)} sx={{
                      color: location.pathname === page.route ? '#FBB03B !important' : '#44494D', display: 'block', fontWeight: 600, mr: 4, fontSize: '1rem', textTransform: 'none', height: '5rem'
                    }} className='focusedMenuItem'>
                      {page.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            </div>
            {isLogined && user ?
              <Box sx={{ maxWidth: '100%', mr: { xs: '16px', lg: '6rem' }, display: 'flex', alignItems: 'center' }}>
                <Badge badgeContent={0} max={99} showZero sx={{ marginRight: '32px', "& .MuiBadge-badge": { backgroundColor: '#FBB03B !important' } }}>
                  <NotificationsIcon className='notiIcon' fontSize='large' sx={{ color: '#44494D', cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#FBB03B' } }} />
                </Badge>
                <Tooltip title="Tài khoản">
                  <IconButton sx={{ p: 0, mr: '16px' }} onMouseOver={handleOpenProfileMenu} aria-controls="menu-appbar" aria-haspopup="true" className='focusedMenuItem'>
                    <Avatar alt="User" src={user.userAvatarUrl} />
                  </IconButton>
                </Tooltip>
                <Menu disableScrollLock={true} anchorEl={anchorElProfile} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }} open={Boolean(anchorElProfile)} onClose={handleCloseProfileMenu} sx={{ display: 'block', '& .MuiPaper-root': { borderRadius: '10px', marginTop: '8px' } }} MenuListProps={{ onMouseLeave: handleCloseProfileMenu }}>
                  <MenuItem sx={{ width: '30vh', height: '54px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', pointerEvents: 'none' }}>
                    <h1 className='text-[1rem] font-bold mb-1.5 text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{user.accountName}</h1>
                    <h2 className='text-[0.8rem] text-[#44494D]-600/25 text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{user.userEmail}</h2>
                  </MenuItem>
                  <Divider />
                  {profileMenu.map((menuItem) => (
                    <MenuItem key={menuItem.label} onClick={() => handleProfileMenuClick(menuItem.route)} sx={{ width: '100%', height: '54px' }}>
                      <ListItemIcon sx={{ marginRight: '0.5rem', color: '#44494D' }}>{menuItem.icon}</ListItemIcon>
                      <ListItemText sx={{ width: '15vh', color: '#44494D' }}>{menuItem.label}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              :
              <div className='flex flex-row login-register'>
                <Typography variant="h6" noWrap onClick={handleOpenLoginModal} component="a" sx={{ textDecoration: 'none', fontSize: '1rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }} className='focusedMenuItem'>
                  Đăng nhập
                </Typography>
                <div className='text-[#FFFFFF] font-bold text-[1rem] mx-[0.3rem] slash select-none'>/</div>
                <Typography variant="h6" noWrap onClick={handleOpenRegisterModal} component="a" sx={{ textDecoration: 'none', fontSize: '1rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }} className='focusedMenuItem'>
                  Đăng ký
                </Typography>
              </div>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <AuthenticationModal open={openModal} handleCloseModal={handleCloseModal} tabValue={tabValue} />
    </>
  );
}

export default FSUAppBar;
