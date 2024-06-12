import { Box, Grid, Paper, Typography } from "@mui/material";


const StepTwo = () => {


  return (
    <>
      <Box
        component={Paper}
        elevation={5}
        height={"50vh"}
        sx={{
          width: "100%",
        }}
      >
        <Typography sx={{
          fontSize: "2rem", fontWeight: "bold", py: 2, px: 6, mb: 5, color: "white",
          background: "#FBB03B",
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(255, 255, 255, 0.1))',
          textShadow: ".12rem .12rem .3rem rgba(0, 0, 0, 0.5)"
        }}
        >Chia sẻ câu chuyện của bạn</Typography>

        <Grid container>

        </Grid>

      </Box>
    </>
  )
}

export default StepTwo;