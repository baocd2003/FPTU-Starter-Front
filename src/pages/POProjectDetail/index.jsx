import Cookies from "js-cookie";
import FSUAppBar from "../../components/AppBar";
import { Grid, Box, Container, Typography, LinearProgress, styled, linearProgressClasses, Button, Stack, Tabs, Tab, Divider, Backdrop, CircularProgress, Chip, Avatar, Card, CardMedia, CardContent, CardActions, Paper, TextField, InputAdornment, Drawer } from "@mui/material";
import { tabsClasses } from '@mui/material/Tabs';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Fragment, useEffect, useState } from "react";
import ProjectImages from "../../components/ProjectImages";
import ProjectDetailStat from "../../components/ProjectDetailStat";
import { useNavigate, useParams } from "react-router-dom";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";
import { Close, SettingsSuggestSharp, ArrowBack } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";


function POProjectDetail() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [remainingDays, setRemainingDays] = useState(0);
  const [images, setImages] = useState([]);
  const [projectUser, setProjectUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();
  const [freeDonateAmount, setFreeDonateAmount] = useState(5000);


  const handleChange = (e, v) => {
    setTabValue(v);
  }

  const handleFreeDonate = () => {
    try {
      const data = {
        projectId: project.id,
        amountDonate: freeDonateAmount
      }
      setIsLoading(true)
      const token = Cookies.get("_auth");
      projectApiInstance.post("/free-backer-donate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          Swal.fire({
            title: "Bạn đã giao dịch thành công!",
            text: `Bạn đã ủng hộ nhanh cho của dự án ${project.projectName}`,
            icon: "success"
          });
          // navigate('/my-wallet')
        });
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  const confirmDonatePackage = () => {
    try {
      const data = {
        packageId: selectedPackage.id,
      }
      setIsLoading(true)
      const token = Cookies.get("_auth");
      projectApiInstance.post("/package-backer-donate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          Swal.fire({
            title: "Bạn đã giao dịch thành công!",
            text: `Bạn đã ủng hộ gói ${selectedPackage.packageName} của dự án ${project.projectName}`,
            icon: "success"
          });
          // navigate('/my-wallet')
        });
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
      setOpenDrawer(false);
    }
  }

  const handleDonatePackage = (projectPackage) => {
    setSelectedPackage(projectPackage)

    setOpenDrawer(true)

    // try {
    //   setIsLoading(true)
    //   const token = Cookies.get("_auth");
    //   projectApiInstance.post("/package-backer-donate", { packageId }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((res) => console.log(res.data));
    // } catch (err) {
    //   console.log(err)
    // } finally {
    //   setIsLoading(false);
    // }
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

  console.log(selectedPackage);

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{ width: '100vw', position: 'relative' }}
        >
          <Close sx={{ cursor: "pointer", position: 'absolute', top: 5, left: 20 }} onClick={() => setOpenDrawer(false)} />
          <Box sx={{ borderBottom: 1, height: '2.2rem', borderColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'center' }}>
            <img src='https://i.ibb.co/WxTYWkk/star-1.png' />
          </Box>
          {selectedPackage && (
            <Grid container>
              <Grid item xs={8}
                sx={{
                  mt: '0 !important',
                  p: '2.5rem 5rem 0 12rem'
                }}
              >
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: '1rem' }}
                >Thông tin gói ủng hộ</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <img src='https://i.ibb.co/K7TGtpK/istockphoto-1409955148-612x612.jpg' className="h-[8rem] rounded-sm" />
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      sx={{ fontSize: '1.2rem', mb: '1rem', }}
                    >{selectedPackage.packageName}</Typography>
                    <Typography
                      sx={{ fontSize: '.88rem', mb: '1rem', textDecoration: 'underline' }}
                    >Chi tiết</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                      <Typography
                        sx={{ fontSize: '1rem' }}
                      >Số lượng: 1</Typography>
                      <Typography
                        sx={{ fontSize: '1rem', mb: '1rem', }}
                      >{selectedPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</Typography>
                    </Box>

                  </Box>

                </Box>
              </Grid>
              <Grid item xs={4} sx={{ background: '#F0F0F0', height: '100vh', mt: '0 !important', p: '2.5rem 3rem' }}>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: '1rem' }}
                >Thông tin thanh toán</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >Tổng</Typography>
                  <Typography
                    sx={{ fontSize: '1.2rem' }}
                  >{selectedPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >Vận chuyển</Typography>
                  <Typography
                    sx={{ fontSize: '1.2rem' }}
                  >0 đ</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >Tổng thanh toán</Typography>
                  <Typography
                    sx={{ fontSize: '1.2rem' }}
                  >{selectedPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</Typography>
                </Box>


                <Button variant='contained'
                  disableElevation
                  onClick={() => confirmDonatePackage()}
                  sx={{
                    background: '#FBB03B', fontWeight: 'bold',
                    textShadow: '.1rem .1rem .5rem rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: '#CC9847'
                    },
                    '&:focus': {
                      outline: 'none'
                    }
                  }}>Xác nhận</Button>

              </Grid>
            </Grid>
          )}

        </Box>
      </Drawer >
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
      {
        project && projectUser && (
          <Box>
            <Box
              sx={{
                background: "#F0F0F0",
                pt: "5rem",
                pb: "3rem"
              }}
            >
              <Container className="flex flex-row justify-center items-center"
                sx={{
                  maxWidth: { lg: "lg", xl: "xl", xs: "xs" },
                }}
              >
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
                    <BorderLinearProgress variant="determinate" sx={{ width: "100%", my: 0, py: 1 }}
                      value={project.projectBalance > project.projectTarget ? 100 : (Math.round((project.projectBalance / project.projectTarget) * 100))} />

                    <ProjectDetailStat numb={`${project.projectBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} stat={`đã được kêu gọi trên mục tiêu ${project.projectTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
                    <ProjectDetailStat numb={"299"} stat={"người đầu tư"} />
                    <ProjectDetailStat numb={remainingDays} stat={"ngày còn lại"} />
                    <Stack spacing={1} direction="row" sx={{ my: 4 }}>
                      <Button variant="contained" disabled sx={{ width: "100%", whiteSpace: "nowrap", background: "#FCAE3D", fontWeight: "bold", py: 1 }}>Rút tiền</Button>
                    </Stack>
                  </Grid>
                </Grid>


              </Container >
            </Box>
            <Container className="flex flex-row justify-center items-center"
              sx={{
                maxWidth: { lg: "lg", xl: "xl", xs: "xs" },
                height: "100vh"
              }}
            >
              <Grid container>
                <Grid item xs={9} sx={{ pr: 10, mt: "0 !important" }}>
                  <TabContext value={tabValue}>
                    <TabList
                      onChange={handleChange}
                      // centered
                      // variant="fullWidth"
                      sx={{
                        background: "white",
                        [`& .${tabsClasses.scrollButtons}`]: {
                          '&.Mui-disabled': { opacity: 0.3 },
                        },
                        [`& .MuiTabs-indicator`]: {
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        },

                      }}>
                      <Tab label="Danh sách gói"
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "bold", px: 4, py: 3, whiteSpace: "nowrap",
                          textTransform: "none", color: "rgba(0, 0, 0, 0.6) !important",
                          '&:active': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                          '&:focus': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                        }}
                        value="1" />
                      <Tab label="Về chúng mình"
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "bold", px: 4, py: 3, whiteSpace: "nowrap",
                          textTransform: "none", color: "rgba(0, 0, 0, 0.6) !important",
                          '&:active': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                          '&:focus': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                        }}
                        value="2" />
                      <Tab label="Cập nhật"
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "bold", px: 4, py: 3, whiteSpace: "nowrap",
                          textTransform: "none", color: "rgba(0, 0, 0, 0.6) !important",
                          '&:active': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                          '&:focus': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                        }}
                        value="3" />
                      <Tab label="Danh sách người ủng hộ"
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "bold", px: 4, py: 3, whiteSpace: "nowrap",
                          textTransform: "none", color: "rgba(0, 0, 0, 0.6) !important",
                          '&:active': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                          '&:focus': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                        }}
                        value="4" />
                      <Tab label="Đánh giá"
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "bold", px: 4, py: 3, whiteSpace: "nowrap",
                          textTransform: "none", color: "rgba(0, 0, 0, 0.6) !important",
                          '&:active': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                          '&:focus': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                        }}
                        value="5" />

                    </TabList>
                    <Divider />
                    <TabPanel value="1" sx={{ minHeight: "200vh" }}>
                      <Grid container rowSpacing={0} columnSpacing={2} sx={{}}>

                        <Box sx={{ width: "100%", mb: 3 }}>
                          <Typography
                            sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.7)" }}
                          >Danh sách các gói ủng hộ</Typography>
                          <Typography
                            sx={{ fontSize: ".85rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
                          >Chọn các gói ủng hộ có sẵn với các phần quà hấp dẫn</Typography>
                        </Box>
                        {project && project.packageViewResponses.map((projectPackage, index) => (
                          <Grid item xs={4} sx={{ my: ".5rem !important" }}>
                            <Card key={index}>
                              <CardMedia
                                component="img"
                                alt="green iguana"
                                image="https://i.ibb.co/K7TGtpK/istockphoto-1409955148-612x612.jpg"
                                sx={{ height: "9rem" }}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  sx={{ textAlign: "left", fontSize: "1rem" }}
                                >
                                  {projectPackage.packageName}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  sx={{ fontWeight: "bold", textAlign: "left", fontSize: "1.2rem" }}
                                >
                                  {projectPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
                                </Typography>
                                <Typography
                                  gutterBottom
                                  sx={{ textAlign: "left", fontSize: ".8rem" }}
                                >
                                  {projectPackage.packageDescription}
                                </Typography>
                                <Divider gutterBottom />
                              </CardContent>
                              <CardActions>
                                <Button onClick={() => handleDonatePackage(projectPackage)} variant="contained">
                                  Chọn
                                </Button>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      <Divider sx={{ width: "100%", fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)", my: 3 }}>OR</Divider>
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.7)" }}
                        >Ủng hộ nhanh</Typography>
                        <Typography
                          sx={{ fontSize: ".85rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
                        >Nhập số tiền bạn muốn ủng hộ trực tiếp cho nhà phát triển dự án</Typography>

                        <TextField
                          type="number"
                          placeholder="Nhập số tiền"
                          sx={{ width: "50%", my: 2 }}
                          value={freeDonateAmount}
                          onChange={(e) => setFreeDonateAmount(e.target.value)}
                          InputProps={{
                            endAdornment: <InputAdornment>VND</InputAdornment>,
                          }}

                        /> <br />
                        {project && (
                          <Button onClick={() => handleFreeDonate()} variant="contained" sx={{ background: "#FCAE3D" }}>Ủng hộ</Button>
                        )}
                      </Box>
                    </TabPanel>
                    <TabPanel value="2" sx={{ minHeight: "200vh" }}>Về chúng mình</TabPanel>
                    <TabPanel value="3" sx={{ minHeight: "200vh" }}>Cập nhật</TabPanel>
                    <TabPanel value="4" sx={{ minHeight: "200vh" }}>Danh sách người ủng hộ</TabPanel>
                    <TabPanel value="5" sx={{ minHeight: "200vh" }}>Đánh giá</TabPanel>
                  </TabContext>
                </Grid>

                {/*******************************
               * Sticky project packages
               */}
                <Grid item xs={3} >
                  <Typography textAlign={"left"} sx={{
                    fontWeight: "bold", fontSize: "1.2rem",
                    color: "rgba(0, 0, 0, 0.8)", py: 2, px: 1, position: "sticky", top: "4.5rem"
                  }}>Ủng hộ ngay</Typography>
                  <Box sx={{ maxHeight: "80vh", overflowY: "scroll", position: "sticky", top: "7.5rem" }}>
                    {project && project.packageViewResponses.map((projectPackage, index) => (

                      <Card key={index} sx={{ borderRadius: 0, border: ".1rem solid rgba(0, 0, 0, 0.12)", mt: 3, mx: 1 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          image="https://i.ibb.co/K7TGtpK/istockphoto-1409955148-612x612.jpg"
                          sx={{ height: "9rem" }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            sx={{ textAlign: "left", fontSize: "1rem" }}
                          >
                            {projectPackage.packageName}
                          </Typography>
                          <Typography
                            gutterBottom
                            sx={{ fontWeight: "bold", textAlign: "left", fontSize: "1.2rem" }}
                          >
                            {projectPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
                          </Typography>
                          <Typography
                            gutterBottom
                            sx={{ textAlign: "left", fontSize: ".8rem" }}
                          >
                            {projectPackage.packageDescription}
                          </Typography>
                          <Divider gutterBottom />
                        </CardContent>
                        <CardActions>
                          <Button variant="contained">Chọn</Button>
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                </Grid>
              </Grid>

            </Container>
          </Box >

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