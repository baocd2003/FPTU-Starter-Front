import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import ProjectIcon from "@mui/icons-material/Folder";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { PiHandWithdrawBold } from "react-icons/pi";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function AdminLayout() {
  const navigate = useNavigate();

  //title list
  const titleList = [
    "Tổng quan",
    "Tài khoản",
    "Dự án",
    "Danh mục",
    "Yêu cầu rút tiền",
  ];

  //icon mapping
  const iconMapping = {
    0: <QueryStatsIcon />,
    1: <AccountCircleIcon />,
    2: <ProjectIcon />,
    3: <CategoryIcon />,
    4: <PiHandWithdrawBold />,
  };

  //navigate functions
  const navigateDashboard = () => {
    navigate("/admin/dashboard");
  };
  const navigateAccounts = () => {
    navigate("/admin/users");
  };
  const navigateProjects = () => {
    navigate("/admin/projects");
  };
  const navigateCategories = () => {
    navigate("/admin/categories");
  };
  const navigateWithdrawRequests = () => {
    navigate("/admin/withdraw-request");
  };

  //navigate mapping
  const onClickMapping = {
    0: navigateDashboard,
    1: navigateAccounts,
    2: navigateProjects,
    3: navigateCategories,
    4: navigateWithdrawRequests,
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
    <Grid container sx={{ height: "100%", overflow: "hidden" }} spacing={4}>
      <Grid xs={2} item sx={{ height: "100%" }}>
        <Drawer
          variant="permanent"
          open={true}
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
      <Grid xs={10} item sx={{ height: "100vh", overflow: "auto" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default AdminLayout;
