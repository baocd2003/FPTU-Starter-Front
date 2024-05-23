import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../assets/logo.png";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProjectIcon from "@mui/icons-material/Folder";
import TransactionIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";

function AdminLayout() {
  const navigate = useNavigate();

  //icon mapping
  const iconMapping = {
    0: <QueryStatsIcon />,
    1: <AccountCircleIcon />,
    2: <ProjectIcon />,
    3: <TransactionIcon />,
    4: <SettingsIcon />,
  };

  //navigate functions
  const navigateDashboard = () => navigate("/admin/dashboard");
  const navigateAccounts = () => navigate("/admin/accounts");
  const navigateProjects = () => navigate("/admin/projects");
  const navigateTransactions = () => navigate("/admin/transactions");
  const navigateConfiguration = () => navigate("/admin/configuration");

  //navigate mapping
  const onClickMapping = {
    0: navigateDashboard,
    1: navigateAccounts,
    2: navigateProjects,
    3: navigateTransactions,
    4: navigateConfiguration,
  };

  return (
    <Container>
      <Grid container sx={{ height: "100%" }}>
        <Grid xs={2} item>
          {/* <Sidebar>
            <Menu>
              {["Tổng quan", "Tài khoản", "Dự án", "Giao dịch", "Cấu hình"].map(
                (text, index) => (
                  <MenuItem
                    key={text}
                    onClick={onClickMapping[index]}
                    className="w-full"
                  >
                    {text}
                  </MenuItem>
                )
              )}
            </Menu>
          </Sidebar> */}
          Helloooooooooooooooooooo
        </Grid>
        <Grid xs={10} item>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminLayout;
