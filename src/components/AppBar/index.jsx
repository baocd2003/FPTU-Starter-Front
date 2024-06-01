import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import * as React from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import "./index.css";

const pages = ['Trang chủ', 'Toàn bộ dự án', 'Về chúng tôi', 'Hỗ trợ'];
const profileMenu = [
  { label: 'Tài khoản', route: '/profile', icon: <AccountCircleIcon /> },
  { label: 'Dự án của tôi', route: '/projects', icon: <BallotIcon /> },
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


  React.useEffect(() => {
    if (refetchData) {
      fetchUserProfile();
    }
  }, [refetchData]);

  const fetchUserProfile = async () => {
    try {
      const token = Cookies.get("_auth");
      setIsLoading(true);
      const response = await userManagementApiInstance.get("/user-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data != null) {
        console.log(response.data._data);
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

  //Left menu responsive
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //Profile menu
  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  }
  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  //SignOut
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar position="fixed" sx={{
        background: '#FFFFFF',
        height: '100px',
        justifyContent: 'center !important',
        display: 'flex',
      }}>
        <Container maxWidth={false} sx={{ padding: '0px !important' }}>
          <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between', mx: { lg: '80px' } }}>
            <div className='flex flex-row'>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/home"
                sx={{
                  mr: 4,
                  display: { xs: 'none', lg: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <img src={logo} style={{ width: '100px' }} />
              </Typography>

              <Box sx={{ ml: '16px', flexGrow: 1, display: { xs: 'flex', lg: 'none' }, justifyContent: 'space-between' }}>
                <IconButton
                  title="Phụ lục"
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  sx={{
                    outline: 'none !important'
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ mr: 8 }}
                    >
                      <ListItemText>{page}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      disableRipple={true}
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 4, color: '#000000', display: 'block', fontWeight: 'bold', mr: 4, fontSize: '14px' }}
                      className='focusedMenuItem'
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              </Box>
            </div>
            {isLogined && user ? <Box sx={{ maxWidth: '100%', mr: { xs: '16px', display: 'flex', alignItems: 'center' } }}>
              {/* <div className='mr-[32px] !flex flex-row justify-end items-center'>
                <WalletIcon fontSize='medium'
                  sx={{
                    color: '#44494D',
                    mr: '16px',
                    display: { xs: 'none', lg: 'block' }
                  }}
                />
                <h2 className='text-[#44494D] username'>0 VND</h2>
              </div> */}
              <Badge badgeContent={0} max={99} showZero sx={{
                marginRight: '32px',
                "& .MuiBadge-badge": {
                  backgroundColor: '#FBB03B !important'
                }
              }}>
                <NotificationsIcon fontSize='large'
                  sx={{
                    color: '#44494D',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#FBB03B',
                    },
                  }}
                />
              </Badge>
              <Tooltip title="Tài khoản">
                <IconButton
                  sx={{ p: 0, mr: '16px' }}
                  onClick={handleOpenProfileMenu}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  className='focusedMenuItem'
                >
                  <Avatar alt="User" src={user.userAvatarUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElProfile}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElProfile)}
                onClose={handleCloseProfileMenu}
                sx={{
                  display: 'block',
                  '& .MuiPaper-root': {
                    borderRadius: '10px',
                    marginTop: '8px',
                  },
                }}
              >
                <MenuItem
                  sx={{ width: '30vh', height: '54px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', pointerEvents: 'none', }}
                >
                  <h1 className='text-[1rem] font-bold mb-1.5 text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{user.accountName}</h1>
                  <h2 className='text-[0.8rem] text-[#44494D]-600/25 text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{user.userEmail}</h2>
                </MenuItem>
                <Divider />
                {profileMenu.map((menuItem, index) => (
                  <MenuItem
                    key={menuItem.label}
                    onClick={() => handleProfileMenuClick(menuItem.route)}
                    sx={{ width: '100%', height: '54px' }}
                  >
                    <ListItemIcon sx={{ marginRight: '0.5rem', color: '#44494D' }}>
                      {menuItem.icon}
                    </ListItemIcon>
                    <ListItemText sx={{ width: '15vh', color: '#44494D' }}>{menuItem.label}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
              {/* <a onClick={() => navigate("/profile")} className='username cursor-pointer text-[#44494D] hover:text-[#FBB03B] hover:underline transition-all duration-300'>{user.accountName}</a> */}
            </Box>
              :
              <Button onClick={handleClick} variant="outlined" className='login-button' sx={{ mr: '16px' }}>Đăng nhập</Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default FSUAppBar