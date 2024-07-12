import "@fontsource/archivo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MobileWarning from './components/MobileWarning';
import ProtectedRoute from './components/ProtectedRoute';
import AccountWallet from "./layouts/AccountWallet";
import AdminLayout from "./layouts/AdminLayout";
import CreateProjectLayout from "./layouts/CreateProjectLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";
import AboutUs from "./pages/AboutUs";
import AdminCategories from "./pages/AdminCategories";
import AdminOverview from "./pages/AdminOverview";
import AdminProjects from "./pages/AdminProjects";
import AdminUsers from "./pages/AdminUsers";
import AdminWithdrawRequest from "./pages/AdminWithdrawRequest";
import AllProjects from "./pages/AllProjects";
import StepFive from "./pages/CreateNewProject/StepFive";
import StepFour from "./pages/CreateNewProject/StepFour";
import StepOne from "./pages/CreateNewProject/StepOne";
import StepThree from "./pages/CreateNewProject/StepThree";
import StepTwo from "./pages/CreateNewProject/StepTwo";
import HelpAndSupport from "./pages/HelpAndSupport";
import HomePage from "./pages/HomePage";
import POProjectDetail from "./pages/POProjectDetail";
import PageError from "./pages/PageError";
import UserBookmarkProject from "./pages/UserBookmarkProject";
import UserProfile from "./pages/UserProfile";
import UserProjects from "./pages/UserProjects";
import SecondStep from "./pages/CreateProject/SecondStep";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      allVariants: {
        fontFamily: "Inter, sans-serif",
      },
    },
  });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isPcScreen = window.matchMedia('(max-width: 1200px)').matches;
      setShowWarning(isPcScreen);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {showWarning && <MobileWarning />}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/all-projects" element={<AllProjects />} />
            <Route path="/help-and-support" element={<HelpAndSupport />} />
          </Route>
          <Route path="/create-project/second" element={<SecondStep />} />

          {/* <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route> */}

          {/* <Route element={<ProtectedRoute allowedRoles={['Backer']} />}>
          <Route element={<CreateProject />}>
            <Route path="/create-project" element={<InitStep />} />
            <Route path="/create-project/second" element={<SecondStep />} />
            <Route path="/create-project/third" element={<ThirdStep />} />
          </Route>
          <Route path="/choose-cate" element={<ChooseCategories />} />
          <Route path="/choose-subCates" element={<ChooseSubCates />} />
        </Route> */}

          <Route element={<ProtectedRoute allowedRoles={['Backer']} />}>
            <Route element={<UserProfileLayout />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/bookmarkProject" element={<UserBookmarkProject />} />
              <Route path="/project-detail/:projectId" element={<POProjectDetail />} />
              <Route path="/profile/projects" element={<UserProjects />} />
              <Route path="/my-wallet" element={<AccountWallet />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Backer']} />}>
            <Route element={<CreateProjectLayout />}>
              <Route path="init-project/step-one" element={<StepOne />} />
              <Route path="init-project/step-two" element={<StepTwo />} />
              <Route path="init-project/step-three" element={<StepThree />} />
              <Route path="init-project/step-four" element={<StepFour />} />
              <Route path="init-project/step-five" element={<StepFive />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Administrator']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/dashboard" element={<AdminOverview />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/withdraw-request" element={<AdminWithdrawRequest />} />
            </Route>
          </Route>

          <Route path="/error" element={<PageError />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </ThemeProvider >
    </>
  );
}

export default App;
