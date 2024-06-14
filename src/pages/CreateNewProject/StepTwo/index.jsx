import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setStepTwo } from "../../../redux/projectStepSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextEditor from "../../../components/CKEditor/TextEditor"
import { setFormData } from "../../../redux/projectFormSlice";


const StepTwo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [aboutUsData, setAboutUsDate] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setStepTwo())
  }, [])


  const onSubmit = () => {
    console.log(aboutUsData)
    dispatch(setFormData({ step: 'stepTwoData', data: aboutUsData }))
    navigate('/init-project/step-three')
  }


  return (
    <>
      <Box
        component={Paper}
        elevation={5}
        sx={{
          width: "100%",
          pb: 3
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

        <Box
          sx={{
            // minHeight: '100vh',
            px: 6,
            pr: 10,
          }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ m: '0 !important' }}>
              <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)', mb: 3 }}>
                Chia sẻ cho mọi người về cậu chuyện của bạn</Divider>
            </Grid>

            <Grid item xs={12} sx={{ m: '0 !important' }}>
              <TextEditor setAboutUsDate={setAboutUsDate} />
            </Grid>

          </Grid>

          <Box sx={{ mt: 2, gap: 5, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={() => navigate('/init-project/step-one')} variant='outlined'
              disableElevation
              sx={{
                fontWeight: 'bold',
                borderColor: '#FBB03B',
                color: '#FBB03B',
                '&:hover': {
                  borderColor: '#FBB03B'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Quay lại</Button>
            <Button onClick={onSubmit} variant='contained'
              disableElevation
              sx={{
                background: '#FBB03B', fontWeight: 'bold',
                textShadow: '.1rem .1rem .5rem rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  background: '#CC9847'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Tiếp theo</Button>
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default StepTwo;