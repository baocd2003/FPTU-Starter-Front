import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import logo from "../../assets/logo.png";
import FSUAppBar from "../../components/AppBar";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProjectIcon from "@mui/icons-material/Folder";
import TransactionIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";

function AdminLayout() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //title list
  const titleList = [
    "Tổng quan",
    "Tài khoản",
    "Dự án",
    "Giao dịch",
    "Cấu hình",
  ];

  //icon mapping
  const iconMapping = {
    0: <QueryStatsIcon />,
    1: <AccountCircleIcon />,
    2: <ProjectIcon />,
    3: <TransactionIcon />,
    4: <SettingsIcon />,
  };

  //navigate functions
  const navigateDashboard = () => {
    navigate("/admin/dashboard");
  };
  const navigateAccounts = () => {
    navigate("/admin/accounts");
  };
  const navigateProjects = () => {
    navigate("/admin/projects");
  };
  const navigateTransactions = () => {
    navigate("/admin/transactions");
  };
  const navigateConfiguration = () => {
    navigate("/admin/configuration");
  };

  //navigate mapping
  const onClickMapping = {
    0: navigateDashboard,
    1: navigateAccounts,
    2: navigateProjects,
    3: navigateTransactions,
    4: navigateConfiguration,
  };

  const DrawerList = (
    <Box sx={{ width: 250 }}>
      <List>
        {titleList.map((text, index) => (
          <ListItem key={text} onClick={onClickMapping[index]}>
            <ListItemButton>
              <ListItemIcon>{iconMapping[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Grid container sx={{ height: "100%", overflow: "hidden" }}>
      <Hidden smUp>
        <FSUAppBar position="fixed" isLogined={false}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </FSUAppBar>
      </Hidden>
      <Hidden smUp>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              backgroundColor: "white",
            },
          }}
        >
          <div className="w-full flex justify-center">
            <img src={logo} alt="logo" className="w-[160px] h-[160px]" />
          </div>
          {DrawerList}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Grid item xs={2} sx={{ height: "100%" }}>
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                position: "relative",
                width: 250,
                height: "100vh",
                backgroundColor: "white",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              },
            }}
          >
            <div className="w-full flex justify-center">
              <img src={logo} alt="logo" className="w-[160px] h-[160px]" />
            </div>
            {DrawerList}
          </Drawer>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={10} sx={{ height: "100vh", overflow: "auto" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default AdminLayout;
