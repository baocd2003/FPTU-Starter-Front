import MenuIcon from '@mui/icons-material/Menu';
import { ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
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
import logo from "../../assets/logo.png";
import "./index.css";
import createRefresh from 'react-auth-kit/createRefresh';
const pages = ['Trang chủ', 'Toàn bộ dự án', 'Về chúng tôi', 'Liên hệ', 'Hỗ trợ'];
function FSUAppBar({ isLogined }) {
  FSUAppBar.propTypes = {
    isLogined: PropTypes.bool.isRequired,
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{
      background: '#FFFFFF',
      height: '100px',
      justifyContent: 'center !important',
      display: 'flex',
    }}>
      <Container maxWidth={false} sx={{ padding: '0px !important' }}>
        <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between', mx: { lg: '120px' } }}>
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
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
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
                    sx={{ my: 4, color: '#000000', display: 'block', fontWeight: 'bold', mr: 4 }}
                    className='focusedMenuItem'
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
          </div>
          {isLogined ? <Box sx={{ flexGrow: 0, maxWidth: '100%', mr: { xs: '16px' } }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
            :
            <Button href='/login' variant="outlined" className='h-[40px] w-[144px] login-button' sx={{ mr: '16px' }}>Đăng nhập</Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default FSUAppBar