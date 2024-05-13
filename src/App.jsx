import "@fontsource/archivo";
import { ThemeProvider, createTheme } from '@mui/material';
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticationLayout from './layouts/AuthenticationLayout';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Archivo',
        'cursive',
      ].join(','),
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
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
