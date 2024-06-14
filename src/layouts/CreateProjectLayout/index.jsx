import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, Container, Grid } from "@mui/material";
import { useState } from "react";
import FSUAppBar from "../../components/AppBar";
import Cookies from 'js-cookie';
import "./index.css"
import { Outlet, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useTransition, animated } from "@react-spring/web";

const steps = [
  {
    label: 'Thông tin cơ bản',
    description: `Cung cấp thông tin cơ bản về dự án và mục tiêu huy động vốn.`,
  },
  {
    label: 'Câu chuyện dự án',
    description:
      'Chia sẻ, gới thiệu câu chuyện về dự án.',
  },
  {
    label: 'Hình ảnh, video dự án',
    description: `Cung cấp hình ảnh và video sinh động cho dự án của bạn.`,
  },
  {
    label: 'Xác thực ngân hàng',
    description: `Xác thực tài khoản ngân hàng của chủ dự án.`,
  },
  {
    label: 'Thông tin gói',
    description: `Thiết lập các gói ủng hộ cố định với các phần thưởng tương ứng.`,
  },
];

const stepStyle = (active, completed) => ({
  backgroundColor: active ? "white" : completed ? "#FCAE3D" : "rgba(0, 0, 0, 0.1)",
  "& .MuiStepLabel-iconContainer svg": { color: active ? "#FCAE3D" : completed ? "white" : "rgba(0, 0, 0, 0.2)" },
  "& .MuiStepLabel-label": { color: active ? "#FCAE3D" : completed ? "white" : "rgba(0, 0, 0, 0.3)" },
  "& .MuiStepContent-root": { color: active ? "rgba(0, 0, 0, 0.5)" : completed ? "white" : "rgba(0, 0, 0, 0.1)" },
});


const CreateProjectLayout = () => {
  const activeStep = useSelector((state) => state.projectStep.activeStep);

  const location = useLocation();

  const transitions = useTransition(location, {
    from: { opacity: 0, },
    enter: { opacity: 1, },
    leave: { opacity: 0, },
  });

  return (
    <>
      <FSUAppBar isLogined={Cookies.get("_auth") !== undefined ? true : false} />
      <Box sx={{ background: "#F0F0F0" }}>
        <Container sx={{ maxWidth: { xs: "xs", lg: "lg", xl: "xl" } }}>
          <Grid container sx={{ minHeight: "100vh", pt: "7rem" }}>
            <Grid item xs={2.5}>
              <Box sx={{ position: "sticky", top: "9rem", }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step component={Paper} elevation={5} key={step.label} sx={stepStyle(index === activeStep, activeStep > index)}>
                      <StepLabel className="step_index">
                        <Typography sx={{ fontWeight: "bold", fontSize: ".9rem" }}>
                          {step.label}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography sx={{ fontSize: ".9rem", textAlign: "left", pb: 2 }}>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>
            <Grid item xs={9.5} sx={{ pl: "2rem" }}>
              <Box sx={{ width: "100%", minHeight: '100vh' }}>
                {/* {transitions((style, item) => (
                  <animated.div style={style}>
                    <Outlet />
                  </animated.div>
                ))} */}
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </Container>

      </Box >
    </>

  )
}

export default CreateProjectLayout;