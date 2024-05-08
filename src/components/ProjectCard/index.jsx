import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SingleCard from "./singleCard";
function ProjectCard() {
  return (
    <Container maxWidth="sm" >
      <h1 className="text-blue-600 font-semibold uppercase">Hihi</h1>
      <Box sx={{ display: "flex" }}>
        <SingleCard />
        <SingleCard />
        <SingleCard />

      </Box>
    </Container>
  );
}

export default ProjectCard