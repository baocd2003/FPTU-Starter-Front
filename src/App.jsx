import "@fontsource/archivo";
import { Routes, Route} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

import "./App.css"
import HomePage from './pages/HomePage';
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Archivo',
        'cursive',
      ].join(','),
    },});
  return (
     <ThemeProvider theme={theme}>
      <Routes>
          <Route path="/home" element={<HomePage/>}/>
      </Routes>    
      </ThemeProvider>
  )
}

export default App
