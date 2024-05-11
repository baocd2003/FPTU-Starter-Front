import "@fontsource/archivo";
import { ThemeProvider, createTheme } from '@mui/material';
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from './pages/HomePage';
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
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
