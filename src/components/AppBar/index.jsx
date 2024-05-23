import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WalletIcon from '@mui/icons-material/Wallet';
import { ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./index.css";

const pages = ['Trang chủ', 'Toàn bộ dự án', 'Về chúng tôi', 'Hỗ trợ'];
const profileMenu = [
  { label: 'Tài khoản', route: '/profile' },
  { label: 'Dự án của tôi', route: '/' },
  { label: 'Đăng xuất', route: '/' }
];

function FSUAppBar({ isLogined }) {
  FSUAppBar.propTypes = {
    isLogined: PropTypes.bool.isRequired,
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);

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

  const signOut = useSignOut();

  return (
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
          {isLogined ? <Box sx={{ maxWidth: '100%', mr: { xs: '16px', display: 'flex', alignItems: 'center' } }}>
            <div className='mr-[32px] !flex flex-row justify-end items-center'>
              <WalletIcon fontSize='medium'
                sx={{
                  color: '#44494D',
                  mr: '16px',
                  display: { xs: 'none', lg: 'block' }
                }}
              />
              <h2 className='text-[#44494D] username'>39.000 VND</h2>
            </div>
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
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElProfile}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElProfile)}
              onClose={handleCloseProfileMenu}
              sx={{
                display: 'block',
                marginTop: '8px',
              }}
            >
              {profileMenu.map((menuItem) => (
                <MenuItem
                  key={menuItem.label}
                  onClick={() => {
                    if (menuItem.route === '/logout') {
                      signOut(); // Call signOut function if logging out
                    } else {
                      handleCloseProfileMenu();
                      navigate(menuItem.route); // Navigate to the specified route
                    }
                  }}
                  sx={{ marginRight: 2 }}
                >
                  <ListItemText>{menuItem.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
            <a href='/profile' className='username cursor-pointer text-[#44494D] hover:text-[#FBB03B] hover:underline transition-all duration-300'>Khả Sương</a>
          </Box>
            :
            <Button onClick={handleClick} variant="outlined" className='h-[40px] w-[144px] login-button' sx={{ mr: '16px' }}>Đăng nhập</Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default FSUAppBar