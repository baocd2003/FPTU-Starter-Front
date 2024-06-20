import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import "@fontsource/archivo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountWallet from "./layouts/AccountWallet";
import AdminLayout from "./layouts/AdminLayout";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import CreateProjectLayout from "./layouts/CreateProjectLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";
import AdminOverview from "./pages/AdminOverview";
import AdminProjects from "./pages/AdminProjects";
import AdminUsers from "./pages/AdminUsers";
import AllProjects from "./pages/AllProjects";
import ChangePassword from "./pages/ChangePassword";
import StepFive from "./pages/CreateNewProject/StepFive";
import StepFour from "./pages/CreateNewProject/StepFour";
import StepOne from "./pages/CreateNewProject/StepOne";
import StepThree from "./pages/CreateNewProject/StepThree";
import StepTwo from "./pages/CreateNewProject/StepTwo";
import CreateProject from "./pages/CreateProject";
import ChooseCategories from "./pages/CreateProject/ChooseCategories";
import ChooseSubCates from "./pages/CreateProject/ChooseSubCates";
import InitStep from "./pages/CreateProject/InitStep";
import SecondStep from "./pages/CreateProject/SecondStep";
import ThirdStep from "./pages/CreateProject/ThirdStep";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import OTPVerification from "./pages/OTPVerification";
import POProjectDetail from "./pages/POProjectDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserBookmarkProject from "./pages/UserBookmarkProject";
import UserProfile from "./pages/UserProfile";
import UserProjects from "./pages/UserProjects";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      allVariants: {
        fontFamily: "Inter, sans-serif",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>
        <Route element={<UserProfileLayout />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bookmarkProject" element={<UserBookmarkProject />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUp />} />
          </Route>
          <Route path="/projects" element={<UserProjects />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/dashboard" element={<AdminOverview />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
        <Route element={<CreateProject />}>
          <Route path="/create-project" element={<InitStep />} />
          <Route path="/create-project/second" element={<SecondStep />} />
          <Route path="/create-project/third" element={<ThirdStep />} />
        </Route>
        <Route path="/choose-cate" element={<ChooseCategories />} />
        <Route path="/choose-subCates" element={<ChooseSubCates />} />
        <Route
          path="/project-detail/:projectId"
          element={<POProjectDetail />}
        />
        <Route path="/profile/projects" element={<UserProjects />} />
        <Route path="/my-wallet" element={<AccountWallet />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route element={<CreateProjectLayout />}>
          <Route path="init-project/step-one" element={<StepOne />} />
          <Route path="init-project/step-two" element={<StepTwo />} />
          <Route path="init-project/step-three" element={<StepThree />} />
          <Route path="init-project/step-four" element={<StepFour />} />
          <Route path="init-project/step-five" element={<StepFive />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
