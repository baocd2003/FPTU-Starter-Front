import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo-footer.png";
import "./index.css";

function Footer() {
  return (
    <footer className="bg-[#000000] w-full bottom-0 left-0 right-0 h-[350px] mt-32 flex flex-col items-center justify-center">
      <Container
        className="flex flex-col content-center h-full"
        sx={{
          "@media (max-width: 600px)": {
            paddingLeft: "0.5rem !important",
            paddingRight: "1rem !important",
          },
        }}
      >
        <Grid spacing={2} container className="!mt-0 !ms-0 ">
          <Grid item xs={3} className="text-neutral-100 text-left !pl-0 !p-1">
            <img
              src={Logo}
              alt="logo"
              style={{ width: "90px", height: "70px" }}
            />
            <Typography variant="body2">
              Công ty Cổ phần FPTU Starter
            </Typography>
            <Typography variant="body2" className="text-wrap break-all">
              fptustarter2024@gmail.com
            </Typography>
            <Typography variant="body2">0333 666 999</Typography>
          </Grid>
          <Grid item xs={3} className="text-neutral-100 text-left !pl-0 !p-1">
            <Typography
              gutterBottom
              component="div"
              variant="body1"
              sx={{ textAlign: "left" }}
              className="!font-bold"
            >
              Giới thiệu
            </Typography>
            <Typography variant="body2">Về chúng tôi</Typography>
            <Typography variant="body2">Điều khoản sử dụng</Typography>
            <Typography variant="body2">Bảo vệ khách hàng</Typography>
            <Typography variant="body2">
              Phí nền tảng và các loại phí khác
            </Typography>
          </Grid>
          <Grid item xs={3} className="text-neutral-100 text-left !pl-0 !p-1">
            <Typography
              gutterBottom
              component="div"
              variant="body1"
              sx={{ textAlign: "left" }}
              className="!font-bold"
            >
              Trợ giúp
            </Typography>
            <Typography variant="body2">Trung tâm trợ giúp</Typography>
            <Typography variant="body2">Tài nguyên dành cho dự án</Typography>
            <Typography variant="body2">Tài sản thương hiệu</Typography>
          </Grid>
          <Grid item xs={3} className="text-neutral-100 text-left !pl-0 !p-1">
            <Typography
              gutterBottom
              component="div"
              variant="body1"
              sx={{ textAlign: "left" }}
              className="!font-bold"
            >
              Thông tin thêm
            </Typography>
            <Typography variant="body2">Báo chí nói về Crowdfunding</Typography>
            <Typography variant="body2">Các vấn đề pháp lý</Typography>
            <Typography variant="body2">Điều khoản sử dụng</Typography>
          </Grid>
        </Grid>
      </Container>
      <Box className="w-full mt-auto text-neutral-100">
        <hr />
        <Typography
          variant="body2"
          className="!my-4 "
        >{`@${new Date().getFullYear()} FPTU Starter. All rights reserved.`}</Typography>
      </Box>
    </footer>
  );
}
export default Footer;
