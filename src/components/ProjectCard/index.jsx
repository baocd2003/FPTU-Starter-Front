import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StepperHomePage from '../StepperHomePage';
function ProjectCard() {
  return (
    <>
      <Container maxWidth="lg" className="my-10">
        <Box className="" sx={{
          display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap'
          , justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center'
        }}>
          {/* <SingleCard imageLink={Kurumi} title="Kurumi" description="Kurumi1"/>
        <SingleCard imageLink={Kurumi} title="Kurumi" description="Kurumi2"/>
        <SingleCard imageLink={Kurumi} title="Kurumi" description="Kurumi3"/> */}
          <StepperHomePage />
        </Box>
      </Container>
    </>

  );
}

export default ProjectCard