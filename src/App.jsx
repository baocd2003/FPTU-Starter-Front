import  FSUAppBar from './components/AppBar'
import ProjectCard from './components/ProjectCard'
import "@fontsource/archivo";
import { createTheme, ThemeProvider } from '@mui/material';
import "./App.css"
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
      <>
        <FSUAppBar isLogined={false}/>
        <ProjectCard/>
      </>
    </ThemeProvider>
    
  )
}

export default App
