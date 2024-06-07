import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StepperHomePage from '../StepperHomePage';
function ProjectCard() {
  return (
    <>
      <Container className="my-10" maxWidth="false">
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap'
          , justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center'
        }}>
          <StepperHomePage />
        </Box>
      </Container>
    </>

  );
}

export default ProjectCard