import Cookies from "js-cookie";
import FSUAppBar from "../../components/AppBar";
import { Grid, Box, Container, Typography, LinearProgress, styled, linearProgressClasses, Button, Stack, Tabs, Tab, Divider, Backdrop, CircularProgress, Chip } from "@mui/material";
import { tabsClasses } from '@mui/material/Tabs';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import ProjectImages from "../../components/ProjectImages";
import ProjectDetailStat from "../../components/ProjectDetailStat";
import { useParams } from "react-router-dom";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";

function POProjectDetail() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [remainingDays, setRemainingDays] = useState(0);
  const [images, setImages] = useState([]);
  const mockImages = [
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1018/1000/600/",
  ];

  const handleChange = (e, v) => {
    setTabValue(v);
  }

  useEffect(() => {
    projectApiInstance.get(`${projectId}`)
      .then((res) => {
        if (res.data._statusCode === 200) {
          setProject(res.data._data);
          setIsLoading(false);
          const today = new Date();
          const start = new Date(res.data._data.startDate);
          const end = new Date(res.data._data.endDate);
          const daysDiff = Math.floor((end - today) / (1000 * 60 * 60 * 24));
          setRemainingDays(daysDiff);
          const imgUrls = res.data._data.images.map((v, i) => v.url)
          setImages(imgUrls)
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }, [projectId])

  // console.log(project);

  return (
    <>
      <FSUAppBar isLogined={Cookies.get('_auth') !== undefined} />
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 100,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mt-[150px]"></div>
      {project && (
        <Container className="flex flex-row justify-center items-center"
          sx={{
            maxWidth: { lg: "lg", xl: "xl", xs: "xs" },
          }}
        >
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
            <Grid item xs={8} >
              <ProjectImages thumbNail={project.projectThumbnail} images={images} />
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
            <Grid item xs={4} paddingLeft={5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                {project.categories.map((cate, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={cate.name}
                    sx={{
                      color: "white",
                      background: "#FCAE3D",
                      px: 2,
                      mr: 1
                    }}
                  />
                ))}
                {project.subCategories.map((sub, index) => (
                  <Chip
                    key={index}
                    label={sub.name}
                    size="small"
                    sx={{
                      color: "white",
                      background: "rgba(0, 0, 0, 0.25)",
                      px: 2,
                      mr: 1
                    }}
                  />
                ))}
              </Box>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  py: 2
                }}>
                {project && project.projectName}
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: 18
                }}>
                {project && project.projectDescription}
              </Typography>
              <BorderLinearProgress variant="determinate" value={Math.round((project.projectBalance / project.projectTarget) * 100)} />
              <ProjectDetailStat numb={`${project.projectBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} stat={`đã được kêu gọi trên mục tiêu ${project.projectTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
              <ProjectDetailStat numb={"299"} stat={"người đầu tư"} />
              <ProjectDetailStat numb={remainingDays} stat={"ngày còn lại"} />
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
      )
      }




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