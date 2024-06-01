import { Typography, Box } from "@mui/material"

function ProjectDetailStat({ numb, stat }) {


  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "#FCAE3D"
        }}>
        {numb}
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
        }}>
        {stat}
      </Typography>
    </Box >

  )
}

export default ProjectDetailStat