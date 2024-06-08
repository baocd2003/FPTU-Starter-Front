import Cookies from "js-cookie";
import FSUAppBar from "../../components/AppBar";
import { Grid, Box, Container, Typography, LinearProgress, styled, linearProgressClasses, Button, Stack, Tabs, Tab, Divider, Backdrop, CircularProgress, Chip, Avatar, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { tabsClasses } from '@mui/material/Tabs';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Fragment, useEffect, useState } from "react";
import ProjectImages from "../../components/ProjectImages";
import ProjectDetailStat from "../../components/ProjectDetailStat";
import { useParams } from "react-router-dom";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";
import { SettingsSuggestSharp } from "@mui/icons-material";

function POProjectDetail() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [remainingDays, setRemainingDays] = useState(0);
  const [images, setImages] = useState([]);
  const [projectUser, setProjectUser] = useState(null);

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
          userManagementApiInstance.get(`/user-profile/${res.data._data.ownerId}`).then((userRes) => {
            setProjectUser(userRes.data._data);
          })
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }, [projectId])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;

  };

  console.log(project, projectUser);

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
      <div className="mt-[100px]"></div>
      {project && projectUser && (
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
                      px: 1,
                      mr: 1,
                      fontSize: ".9rem"
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
                      px: 1,
                      mr: 1,
                      fontSize: ".9rem"
                    }}
                  />
                ))}
              </Box>

              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: ".9rem",
                  fontStyle: "italic",
                  color: "rgba(0, 0, 0, 0.3)",
                  gap: .8,
                  fontWeight: "bold",
                  mt: 2
                }}>
                Diễn ra từ {formatDate(project.startDate)} đến {formatDate(project.endDate)}
              </Typography>

              <Box>
                <Typography
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "2rem"
                  }}>
                  {project && project.projectName}
                </Typography>
                <Box
                  sx={{
                    textAlign: "left",
                    fontSize: ".9rem",
                    fontStyle: "italic",
                    color: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: .8
                  }}>
                  bởi <Avatar sx={{ width: "1.2rem", height: "1.2rem" }} alt="user avatar" src={projectUser.userAvatarUrl} /> {projectUser.accountName}
                </Box>
              </Box>

              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "rgba(0, 0, 0, 0.3)",
                  gap: .8,
                  fontWeight: "bold",
                }}>
                {Math.round((project.projectBalance / project.projectTarget) * 100)}%
              </Typography>
              <BorderLinearProgress variant="determinate" sx={{ width: "100%", my: 0, py: 1 }} value={Math.round((project.projectBalance / project.projectTarget) * 100)} />

              <ProjectDetailStat numb={`${project.projectBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} stat={`đã được kêu gọi trên mục tiêu ${project.projectTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
              <ProjectDetailStat numb={"299"} stat={"người đầu tư"} />
              <ProjectDetailStat numb={remainingDays} stat={"ngày còn lại"} />
              <Stack spacing={1} direction="row" sx={{ my: 4 }}>
                <Button variant="contained" disabled sx={{ width: "100%", whiteSpace: "nowrap", background: "#FCAE3D", fontWeight: "bold", py: 1 }}>Rút tiền</Button>
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ typography: 'body1', mt: 5, background: "white", minHeight: "80vh" }}>
            {/* <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                py: 5
              }}>
              Thông tin dự án
            </Typography> */}
            <TabContext value={tabValue}>
              <TabList
                onChange={handleChange}
                // centered
                // variant="fullWidth"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                  [`& .MuiTabs-indicator`]: {
                    backgroundColor: '#FBB03B',
                  }
                }}>
                {/* <Tab label="Về chúng mình" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="1" /> */}
                <Tab label="Danh sách gói" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="1" />
                <Tab label="Cập nhật" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="2" />
                <Tab label="Danh sách người ủng hộ" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="3" />
                <Tab label="Đánh giá" sx={{ '&:active': { outline: 'none !important' }, '&:focus': { outline: 'none !important' }, fontWeight: "bold", px: 5, whiteSpace: "nowrap" }} value="4" />

              </TabList>
              <Divider />
              <TabPanel value="1">
                <Typography
                  sx={{
                    textAlign: "left",
                    fontSize: 18
                  }}>
                  {project && project.packageViewResponses.map((value, index) => (
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="https://i.ibb.co/K7TGtpK/istockphoto-1409955148-612x612.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {value.packageName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.packageDescription}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Chọn</Button>
                      </CardActions>
                    </Card>
                  ))}
                </Typography>
              </TabPanel>
              <TabPanel value="2">Cập nhật</TabPanel>
              <TabPanel value="3">Danh sách người ủng hộ</TabPanel>
              <TabPanel value="4">Đánh giá</TabPanel>
            </TabContext>
          </Box>
        </Container >
      )}
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