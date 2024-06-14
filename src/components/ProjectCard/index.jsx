import Container from '@mui/material/Container';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StepperHomePage from '../StepperHomePage';
function ProjectCard({ setSwiperRef, type }) {
  return (
    <>
      <Container maxWidth="false" sx={{ px: '0 !important' }}>
        <StepperHomePage setSwiperRef={setSwiperRef} type={type} />
      </Container>
    </>
  );
}

export default ProjectCard