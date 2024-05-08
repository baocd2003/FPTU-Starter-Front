import SingleCard from "./singleCard";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
function ProjectCard() {
  return (
    <Container maxWidth="sm" >
        <Box sx={{display : "flex"}}>
          <SingleCard/>
          <SingleCard/>
          <SingleCard/>

        </Box>
      </Container>
  );
}

export default ProjectCard