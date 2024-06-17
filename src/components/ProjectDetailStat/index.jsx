import { Typography, Box } from "@mui/material"

function ProjectDetailStat({ numb, stat }) {


  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Typography
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "#FCAE3D",
          fontSize: "1.6rem"
        }}>
        {numb}
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          fontSize: ".9rem",
          color: "rgba(0, 0, 0, 0.6)",
          fontWeight: "bold"
        }}>
        {stat}
      </Typography>
    </Box >

  )
}

export default ProjectDetailStat