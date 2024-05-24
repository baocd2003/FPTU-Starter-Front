import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TransactionIcon from "@mui/icons-material/AttachMoney";
import ProjectIcon from "@mui/icons-material/Folder";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import { Container, Grid } from "@mui/material";
import * as React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./index.css";

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
    <Container className="adminLayoutContainer">
      <Grid container sx={{ height: "100%" }}>
        <Grid xs={3} item>
          <Sidebar className="admin-menu">
            <Menu className="admin-menu">
              <div className="w-full flex justify-center mb-[48px]">
                <img src={logo} className="w-[160px] h-[160px]" />
              </div>
              {["Tổng quan", "Tài khoản", "Dự án", "Giao dịch", "Cấu hình"].map(
                (text, index) => (
                  <MenuItem
                    key={text}
                    onClick={onClickMapping[index]}
                    className="menu-item"
                  >
                    {text}
                  </MenuItem>
                )
              )}
            </Menu>
          </Sidebar>
        </Grid>
        <Grid xs={9} item>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminLayout;
