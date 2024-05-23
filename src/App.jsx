import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import "@fontsource/archivo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserBookmarkProject from "./pages/UserBookmarkProject";
import UserProfile from "./pages/UserProfile";
import AdminProjects from "./pages/AdminProjects";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Archivo", "sans-serif"].join(","),
      allVariants: {
        fontFamily: "Archivo, sans-serif !important",
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
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>
        <Route element={<UserProfileLayout />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bookmarkProject" element={<UserBookmarkProject />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
