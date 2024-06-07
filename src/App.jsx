import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import "@fontsource/archivo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";
import AdminProjects from "./pages/AdminProjects";
import CreateProject from "./pages/CreateProject";
import ChooseCategories from "./pages/CreateProject/ChooseCategories";
import ChooseSubCates from "./pages/CreateProject/ChooseSubCates";
import InitStep from "./pages/CreateProject/InitStep";
import SecondStep from "./pages/CreateProject/SecondStep";
import ThirdStep from "./pages/CreateProject/ThirdStep";
import HomePage from "./pages/HomePage";
import OTPVerification from "./pages/OTPVerification";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserBookmarkProject from "./pages/UserBookmarkProject";
import UserProfile from "./pages/UserProfile";
import POProjectDetail from "./pages/POProjectDetail";
import UserProjects from "./pages/UserProjects";
import AdminOverview from "./pages/AdminOverview";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      allVariants: {
        fontFamily: "Inter, sans-serif !important",
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
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/dashboard" element={<AdminOverview />} />
        </Route>
        <Route element={<CreateProject />} >
          <Route path="/create-project" element={<InitStep />} />
          <Route path="/create-project/second" element={<SecondStep />} />
          <Route path="/create-project/third" element={<ThirdStep />} />
        </Route>
        <Route path="/choose-cate" element={<ChooseCategories />} />
        <Route path="/choose-subCates" element={<ChooseSubCates />} />
        <Route path="/project-detail/:projectId" element={<POProjectDetail />} />
        <Route path="/projects" element={<UserProjects />} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
