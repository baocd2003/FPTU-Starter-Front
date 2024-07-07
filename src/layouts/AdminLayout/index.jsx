import ProjectIcon from "@mui/icons-material/Folder";
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import Divider from '@mui/material/Divider';
import React, { useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { BiSolidCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { PiHandWithdrawFill } from "react-icons/pi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import './index.css';

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const signOut = useSignOut();

  const isSettingActive = location.pathname === '/admin/setting';
  const [isLogoutActive, setIsLogoutActive] = useState(false);

  const titleList = [
    { text: "Tổng quan", path: "/admin/dashboard" },
    { text: "Tài khoản", path: "/admin/users" },
    { text: "Dự án", path: "/admin/projects" },
    { text: "Danh mục", path: "/admin/categories" },
    { text: "Yêu cầu rút tiền", path: "/admin/withdraw-request" },
  ];

  const iconMapping = {
    0: <MdSpaceDashboard style={{ fontSize: '1.6rem' }} />,
    1: <FaUser style={{ fontSize: '1.6rem' }} />,
    2: <ProjectIcon sx={{ fontSize: '1.6rem' }} />,
    3: <BiSolidCategory style={{ fontSize: '1.6rem' }} />,
    4: <PiHandWithdrawFill style={{ fontSize: '1.6rem' }} />,
  };

  const onClickMapping = {
    0: () => navigate("/admin/dashboard"),
    1: () => navigate("/admin/users"),
    2: () => navigate("/admin/projects"),
    3: () => navigate("/admin/categories"),
    4: () => navigate("/admin/withdraw-request"),
  };

  const handleLogout = () => {
    setIsLogoutActive(true);
    Swal.fire({
      title: "Cảnh báo?",
      text: "Bạn có muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FBB03B",
      cancelButtonColor: "D8D8D8",
      confirmButtonText: "Đăng xuất!",
      cancelButtonText: "Ở lại!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
        window.location.href = "/home";
      } else {
        setIsLogoutActive(false);
      }
    });
  };

  const DrawerList = (
    <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <List sx={{ mx: '2.4rem', flexGrow: 1 }}>
        {titleList.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} onClick={onClickMapping[index]} sx={{ p: 0, mb: '0.8rem', borderRadius: '0.4rem' }} className="admin-list">
              <ListItemButton
                sx={{
                  borderRadius: '0.4rem',
                  backgroundColor: isActive ? '#FBB03B' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#44494D',
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#FFFFFF' : '#44494D' }}>
                  {iconMapping[index]}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: '1rem', fontWeight: '700' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Divider sx={{ borderBottomWidth: '0.1rem', my: '1.2rem' }} />
        <ListItem sx={{ p: 0, borderRadius: '0.4rem' }} className="settings-list">
          <ListItemButton sx={{
            borderRadius: '0.4rem',
            backgroundColor: isSettingActive ? '#FBB03B' : 'transparent',
            color: isSettingActive ? '#FFFFFF' : '#44494D',
          }}>
            <ListItemIcon sx={{ color: isSettingActive ? '#FFFFFF' : '#44494D' }}><IoSettings style={{ fontSize: '1.6rem' }} /></ListItemIcon>
            <ListItemText
              primary={"Cài đặt"}
              primaryTypographyProps={{ fontSize: '1rem', fontWeight: '700' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <List sx={{ mb: '0.8rem', mx: '2.4rem' }}>
        <ListItem sx={{ p: 0, borderRadius: '0.4rem' }} className="logout-list">
          <ListItemButton onClick={handleLogout} sx={{
            borderRadius: '0.4rem',
            backgroundColor: isLogoutActive ? '#FBB03B' : 'transparent',
            color: isLogoutActive ? '#FFFFFF' : '#44494D',
          }}>
            <ListItemIcon sx={{ color: isLogoutActive ? '#FFFFFF' : '#44494D' }}><IoLogOut style={{ fontSize: '1.6rem' }} /></ListItemIcon>
            <ListItemText
              primary={"Đăng xuất"}
              primaryTypographyProps={{ fontSize: '1rem', fontWeight: '700' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid xs={2.5} item sx={{ height: "100vh", my: '0 !important' }}>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            height: "100%",
            backgroundColor: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            alignItems: 'center'
          }}
        >
          <div className="flex flex-col justify-center mt-[0.8rem] mb-[1.6rem] items-center mx-[2.4rem]">
            <img src={logo} alt="logo" className="w-[120px] h-[120px]" />
            <div className="flex flex-col justify-center items-center overflow-hidden mt-[-0.4rem]">
              <h1 className="text-[1.2rem] text-[#44494D] font-bold leading-relaxed" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Administrator
              </h1>
              <h1 className="text-[0.8rem] text-[#A7A7A7] font-medium leading-relaxed" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                fptustarter2024@gmail.com
              </h1>
            </div>
          </div>
          {DrawerList}
        </Paper>
      </Grid>
      <Grid xs={9.5} item sx={{ height: "100vh", overflowY: "auto", my: '0 !important', backgroundColor: '#F0F0F0' }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default AdminLayout;
