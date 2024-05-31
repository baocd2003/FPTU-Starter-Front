import Cookies from "js-cookie";
import FSUAppBar from "../../components/AppBar";
import { Grid, Box, Container, Typography, LinearProgress, styled, linearProgressClasses, Button, Stack, Tabs, Tab, Divider } from "@mui/material";
import { tabsClasses } from '@mui/material/Tabs';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import ProjectImages from "../../components/ProjectImages";
import ProjectDetailStat from "../../components/ProjectDetailStat";
import { useParams } from "react-router-dom";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";


function POProjectDetail() {
  const [project, setProject] = useState();
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const mockImages = [
    "https://picsum.photos/id/15/1200/900",
    "https://picsum.photos/id/15/1200/900",
    "https://picsum.photos/id/15/1200/900",
    "https://picsum.photos/id/15/1200/900",
    "https://picsum.photos/id/15/1200/900",
    "https://picsum.photos/id/15/1200/900",
    "https://picsum.photos/id/15/1200/900"
  ]

  const handleChange = (e, v) => {
    setTabValue(v);
  }

  useEffect(() => {
    // userApiInstace
  }, [projectId])

  return (
    <>
      <FSUAppBar isLogined={Cookies.get('_auth') !== undefined} />
      <div className="mt-[150px]"></div>
      <Container maxWidth="xl" className="flex flex-row justify-center items-center">
        <Typography
          variant="h5"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            py: 4
          }}>
          Tổng quan
        </Typography>
        <Grid container>
          <Grid item xs={7} >
            <ProjectImages images={mockImages} />
            <Box sx={{ width: '100%', typography: 'body1', mt: 5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  py: 5
                }}>
                Thông tin dự án
              </Typography>
              <TabContext value={tabValue}>
                <TabList
                  onChange={handleChange}
                  // centered
                  variant="fullWidth"
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      '&.Mui-disabled': { opacity: 0.3 },
                    },
                    [`& .MuiTabs-indicator`]: {
                      backgroundColor: '#FBB03B',
                    }
                  }}>
                  <Tab label="Về chúng mình" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="1" />
                  <Tab label="Cập nhật" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="2" />
                  <Tab label="Danh sách người ủng hộ" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="3" />
                  <Tab label="Đánh giá" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="4" />

                </TabList>
                <Divider />
                <TabPanel value="1">Về chúng mình</TabPanel>
                <TabPanel value="2">Cập nhật</TabPanel>
                <TabPanel value="3">Danh sách người ủng hộ</TabPanel>
                <TabPanel value="4">Đánh giá</TabPanel>

              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={5} paddingLeft={5}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "left",
                fontStyle: "italic",
                color: "#FCAE3D"
              }}>
              Trò chơi
            </Typography>
            <Typography
              variant="h2"
              sx={{
                textAlign: "left",
                fontWeight: "bold",
              }}>
              DIVINE GUARDIAN
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: 18
              }}>
              Thần thoại Việt lấy cảm hứng từ metrodvania
            </Typography>
            <BorderLinearProgress variant="determinate" value={50} />

            <ProjectDetailStat numb={"40.000.000 VND"} stat={"đã được kêu gọi trên mục tiêu 200.000.000 VND"} />
            <ProjectDetailStat numb={"299"} stat={"người đầu tư"} />
            <ProjectDetailStat numb={"7"} stat={"ngày còn lại"} />

            <Stack spacing={1} direction="row">
              <Button variant="contained" sx={{
                width: "33%", whiteSpace: "nowrap", background: "#FCAE3D", fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#CF8F32",
                },
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                }
              }}>
                Chỉnh sửa
              </Button>
              <Button variant="contained" sx={{
                width: "33%", whiteSpace: "nowrap", background: "#FCAE3D", fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#CF8F32",
                },
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                }
              }}>
                Danh sách Backer
              </Button>
              <Button variant="contained" disabled sx={{ width: "33%", whiteSpace: "nowrap", background: "#FCAE3D", fontWeight: "bold" }}>Rút tiền</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container >



    </>
  )
}

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 15,
  borderRadius: 40,
  marginTop: 20,
  marginBottom: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#D8D8D8",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 40,
    backgroundColor: "#FCAE3D",
  },
}));

export default POProjectDetail;