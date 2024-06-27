import { Circle, Close } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Container, Divider, Drawer, Grid, InputAdornment, LinearProgress, Stack, Tab, TextField, Typography, linearProgressClasses, styled } from "@mui/material";
import { tabsClasses } from '@mui/material/Tabs';
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaInstagram, FaRegHeart } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FSUAppBar from "../../components/AppBar";
import BackerList from "../../components/BackerList/index.jsx";
import CommentSection from "../../components/CommentSection.jsx";
import ProjectDetailStat from "../../components/ProjectDetailStat";
import ProjectImages from "../../components/ProjectImages";
import interactionApiInstance from "../../utils/apiInstance/interactionApiInstance";
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import userManagementApiInstance from "../../utils/apiInstance/userManagementApiInstance";
import './index.css';
import walletApiInstance from "../../utils/apiInstance/walletApiInstance.jsx";
import withdrawApiInstance from "../../utils/apiInstance/withdrawApiInstance.jsx";
function POProjectDetail() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [remainingDays, setRemainingDays] = useState(0);
  const [images, setImages] = useState([]);
  const [projectUser, setProjectUser] = useState(null);
  const [checkOwner, setCheckOwner] = useState(false);
  const [checkLike, setCheckLike] = useState([]);
  const [userWallet, setUserWallet] = useState();
  const navigate = useNavigate();
  const [backerList, setBackerList] = useState([]);
  const containerRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScroll = () => {
    if (containerRef.current) {
      setTabValue("1");
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log(userWallet)

  const checkEnoughWallet = (amount) => {
    if(userWallet.balance < amount){
      Swal.fire({
        title: "Số dư trong ví của bạn không đủ!",
        html: '<span id="my-wallet-link" style="color: #FCAE3D; cursor: pointer;">Ví của bạn</span>',
        icon: "warning",
        didOpen: () => {
          document.getElementById('my-wallet-link').addEventListener('click', () => {
            navigate('/my-wallet');
            Swal.close();
          });
        }
      });
      return false;
    }else{
      return true;
    }
  }
  const fetchUserWallet = (token) => {
    walletApiInstance.get("/user-wallet", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUserWallet(res.data._data);
      })
      .catch(error => {
        console.error('Error fetching user wallet:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [freeDonateAmount, setFreeDonateAmount] = useState(5000);


  //change tab
  const handleChange = (e, v) => {
    setTabValue(v);
  }

  //like
  const handleLike = async () => {
    const token = Cookies.get("_auth");
    if (token == undefined || token == null) {
      checkAuth();
    } else {
      await interactionApiInstance.post("/like-project", {
        "projectId": projectId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        // console.log(res.data);
        checkUserLike();
      })
    }
  }

  //donate
  const handleFreeDonate = () => {
    try {
      if(checkEnoughWallet(freeDonateAmount)){
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
            getProjectDetail()
            Swal.fire({
              title: "Bạn đã giao dịch thành công!",
              text: `Bạn đã ủng hộ nhanh cho của dự án ${project.projectName}`,
              icon: "success"
            });
            // navigate('/my-wallet')
          });
      }
      
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  const confirmDonatePackage = () => {
    try {
      if(checkEnoughWallet(selectedPackage.requiredAmount)){
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
            getProjectDetail()
            Swal.fire({
              title: "Bạn đã giao dịch thành công!",
              text: `Bạn đã ủng hộ gói ${selectedPackage.packageName} của dự án ${project.projectName}`,
              icon: "success"
            });
            // navigate('/my-wallet')
          });
      }
      
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
  }

  //check login
  const checkAuth = () => {
    const token = Cookies.get("_auth");
    if (token == undefined) {
      Swal.fire({
        title: "Cần đăng nhập",
        text: "Bạn cần có tài khoản để tương tác với dự án",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Về trang đăng nhập",
        cancelButtonText: "Ở lại trang"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      })
    }
  }

  // check user like
  const checkUserLike = () => {
    const token = Cookies.get("_auth");
    interactionApiInstance.get(`/check-user-like/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      // console.log(res.data);
      setCheckLike(res.data.result);
    })
  }
  //get backers 
  const getBackers = () => {
    projectApiInstance.get(`/get-project-backer?projectId=${projectId}`).then(res => {
      // console.log(res.data);
      if (res.data) {
        setBackerList(res.data.result._data);
      }
    })
  }

  const getProjectDetail = () => {
    projectApiInstance.get(`${projectId}`)
      .then((res) => {
        if (res.data._statusCode === 200) {
          setProject(res.data._data);
          setIsLoading(false);
          const today = new Date();
          const start = new Date(res.data._data.startDate);
          const end = new Date(res.data._data.endDate);
          const daysDiff = Math.floor((end - today) / (1000 * 60 * 60 * 24));
          setRemainingDays(daysDiff > 0 ? daysDiff : 0);
          const imgUrls = res.data._data.images.map((v, i) => v.url)
          setImages(imgUrls)
          userManagementApiInstance.get(`/user-profile/${res.data._data.ownerId}`).then((userRes) => {
            setProjectUser(userRes.data._data);
          })
          if(res.data._data.projectStatus == 3){
            setIsSuccess(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  // console.log('project', project)

  useEffect(() => {
    //check project owner
    const token = Cookies.get("_auth");

    if (token == undefined) {
      setCheckOwner(false);
    } else {
      fetchUserWallet(token)
      projectApiInstance.get(`/check-owner?projectId=${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setCheckOwner(res.data.result._data);
        // console.log(res.data);
      })
      checkUserLike();
    }
    //get project detail
    getProjectDetail();
    getBackers();
  }, [projectId])
  // console.log(images);
  // console.log(project)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;

  };

  //handel cash out
  const handleCashOut = async () =>{
    const token = Cookies.get("_auth");
    await withdrawApiInstance.post('/create-project-request',{
      projectId : project.id
    },{
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      console.log(res);
      Swal.fire({
        title: "Bạn đã tạo yêu cầu rút thành công!",
        text: `Vui lòng chờ admin xử lí yêu cầu của bạn, có thể mất từ 1-3 ngày!!`,
        icon: "success"
      });
    })
  }

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
                  <Box sx={{ position: 'relative' }}>
                    <img src='https://t4.ftcdn.net/jpg/03/03/46/39/360_F_303463981_i1CiZU5VYclryudt7VI7YSEDw9mgkSqJ.jpg' className="h-[8rem] rounded-sm" />
                    <Typography sx={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap' }}>{selectedPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</Typography>
                  </Box>
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
                <Box
                  sx={{
                    width: '100%', background: 'rgba(0, 0, 0, 0.2)', p: 1, my: 3, borderRadius: '.3rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ height: '.7rem', background: 'rgba(0, 0, 0, 0.8)', width: '.7rem', borderRadius: '50%', outline: '2px solid rgba(255, 255, 255, .9)' }}></Box>
                    Sử dụng số dư ví
                  </Box>
                  <Typography sx={{ fontWeight: 'bold' }}>{userWallet.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</Typography>
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
      {project && projectUser && (
        <Box>
          {/* upper project info */}
          <Box
            sx={{
              background: "#F0F0F0",
              pt: "5rem",
              // pb: "3rem"
            }}
          >
            <Container className="flex flex-row justify-center items-center"
              sx={{
                maxWidth: { lg: "lg", xl: "xl", xs: "xs" },
              }}
            >
              <Box item xs={7.5} sx={{ mt: '3rem !important', mb: '1rem !important' }}>
                <Typography
                  textAlign={'left'}
                  sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >Tổng quan dự án</Typography>
              </Box>
              <Grid container>
                <Grid item xs={7.5} sx={{ mt: '0 !important' }}>
                  <ProjectImages thumbNail={project.projectThumbnail} images={images} liveDemo={project.projectLiveDemo} />
                </Grid>
                <Grid item xs={4.5} sx={{ mt: '0 !important' }} paddingLeft={5}>
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
                    value={project.projectBalance > project.projectTarget ? 100 : Math.round((project.projectBalance / project.projectTarget) * 100)} />

                  <ProjectDetailStat numb={`${project.projectBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} stat={`đã được kêu gọi trên mục tiêu ${project.projectTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
                  <ProjectDetailStat numb={backerList.length} stat={"người ủng hộ"} />
                  <ProjectDetailStat numb={remainingDays} stat={"ngày còn lại"} />
                  <Stack spacing={1} direction="column" sx={{ my: 4 }}>
                    {checkOwner ?
                      <Button onClick={handleCashOut} variant="contained" disabled={!isSuccess} sx={{ width: "100%", whiteSpace: "nowrap", background: "#FCAE3D", fontWeight: "bold", py: 1 }}>Rút tiền</Button>
                      : <>
                        <Button variant="contained"
                          sx={{
                            width: "100%", whiteSpace: "nowrap"
                            , background: "#FCAE3D", fontWeight: "bold", py: 1
                          }}
                          className="like-btn"
                          onClick={handleScroll}>
                          Ủng hộ dự án
                        </Button>
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                          <Grid item xs={6} sx={{ paddingLeft: '0px !important', my: '0 !important' }}>
                            <Button variant="contained"
                              sx={{
                                width: "100%", whiteSpace: "nowrap"
                                , background: checkLike.length !== 0 ? "#FCAE3D" : "#FFF", fontWeight: "bold", py: 1,
                                color: checkLike.length == 0 ? "#FCAE3D" : "#FFF"
                              }}
                              className="like-btn"
                              onClick={handleLike}
                              startIcon={<FaRegHeart className="" />}>
                              {checkLike.length !== 0 ? 'Đã thích' : 'Thích'}
                            </Button>
                          </Grid>
                          <Grid item xs={6} sx={{ my: '0 !important' }}>
                            <Box className='flex'>
                              <FaFacebook className="social-link" />
                              <FaInstagram className="social-link" />
                              <FaTiktok className="social-link" />
                              <IoIosMail className="social-link" />
                            </Box>
                          </Grid>
                        </Grid>
                      </>
                    }


                  </Stack>
                </Grid>
              </Grid>
            </Container >
          </Box>

          {/* below project info */}
          <TabContext value={tabValue} >
            <Box
              sx={{
                position: "sticky", top: 0, zIndex: 2,
              }}>
              <Container sx={{ maxWidth: { lg: "lg", xl: "xl", xs: "xs" } }}>
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
                  <Tab label="Bình luận"
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "bold", px: 4, py: 3, whiteSpace: "nowrap",
                      textTransform: "none", color: "rgba(0, 0, 0, 0.6) !important",
                      '&:active': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                      '&:focus': { outline: 'none !important', color: "rgba(0, 0, 0, 0.6) !important", background: "transparent !important" },
                    }}
                    value="5" />

                </TabList>
              </Container>

              <Divider />
            </Box>

            <Container className="flex flex-row justify-center items-center"
              sx={{
                maxWidth: { lg: "lg", xl: "xl", xs: "xs" },
                // height: "200vh"
              }}
              ref={containerRef}
            >
              <Grid container >
                {tabValue == '1'
                  ? (
                    <>
                      <Grid item xs={12} sx={{ mt: '0 !important' }}>
                        <TabPanel value="1" sx={{ minHeight: "" }}>
                          <Grid container rowSpacing={0} columnSpacing={5} key={project.id}>
                            <Box sx={{ width: "100%", mb: 3 }}>
                              <Typography
                                sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.7)" }}
                              >Danh sách các gói ủng hộ</Typography>
                              <Typography
                                sx={{ fontSize: ".85rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
                              >Chọn các gói ủng hộ có sẵn với các phần quà hấp dẫn</Typography>
                            </Box>
                            {project && project.packageViewResponses.filter(projectPackage => projectPackage.packageType !== 'Free').map((projectPackage, index) => (
                              <Grid item xs={4} sx={{ my: ".5rem !important" }}>
                                <Card key={index} sx={{ position: 'relative' }}>
                                  <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    image="https://t4.ftcdn.net/jpg/03/03/46/39/360_F_303463981_i1CiZU5VYclryudt7VI7YSEDw9mgkSqJ.jpg"
                                    sx={{ height: "12rem" }}
                                  />
                                  <Box sx={{ position: 'absolute', top: '4.5rem', left: '5rem' }}>
                                    <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                                      {projectPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
                                    </Typography>

                                  </Box>
                                  <CardContent sx={{ height: '15rem' }}>
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
                                    <Box sx={{ px: 3 }}>
                                      <Typography textAlign={'left'} sx={{ my: .5 }}>Thông tin đặc quyền</Typography>
                                      <ul>
                                        {projectPackage.rewardItems.map((item, index) =>
                                          <li style={{ listStyleType: 'initial', textAlign: 'left', fontSize: '.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name} - {item.description}</li>
                                        )}
                                      </ul>
                                    </Box>
                                  </CardContent>
                                  <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {!checkOwner
                                      ? (
                                        <Button onClick={() => handleDonatePackage(projectPackage)} variant="contained">
                                          Chọn
                                        </Button>
                                      )
                                      : (
                                        <Button variant="contained" disabled>Chỉnh sửa</Button>
                                      )
                                    }
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
                              value={freeDonateAmount}
                              onChange={(e) => setFreeDonateAmount(e.target.value)}
                              sx={{ width: "50%", my: 2 }}
                              InputProps={{
                                endAdornment: <InputAdornment>VND</InputAdornment>,
                              }}
                            /> <br />
                            <Button onClick={() => handleFreeDonate()} variant="contained" sx={{ background: "#FCAE3D" }}>Ủng hộ</Button>
                          </Box>
                        </TabPanel>
                      </Grid>
                    </>
                  )
                  : (
                    <>
                      <Grid item xs={9} sx={{ mt: '0 !important', pr: 5 }}>
                        <TabPanel value="2">
                          <div dangerouslySetInnerHTML={{ __html: project.aboutUs?.content }} />
                        </TabPanel>
                        <TabPanel value="3">Theo dõi cập nhật tiến độ dự án tại đây</TabPanel>
                        <TabPanel value="4">
                          <BackerList data={backerList} />
                        </TabPanel>
                        <TabPanel value="5">
                          <CommentSection projectId={projectId} token={Cookies.get('_auth')} />
                        </TabPanel>
                      </Grid>
                      <Grid item xs={3} sx={{ height: '200vh' }}>
                        <Typography textAlign={"left"} sx={{
                          fontWeight: "bold", fontSize: "1.5rem",
                          color: "rgba(0, 0, 0, 0.8)", px: 1, position: "sticky", top: "4.5rem"
                        }}>Ủng hộ ngay</Typography>
                        <Box sx={{ height: "80vh", overflowY: "scroll", position: "sticky", top: "6rem !important" }}>
                          {project && project.packageViewResponses.filter(projectPackage => projectPackage.packageType !== 'Free').map((projectPackage, index) => (
                            <Card key={index} sx={{ borderRadius: 0, border: ".1rem solid rgba(0, 0, 0, 0.12)", mt: 3, mx: 1, position: 'relative' }}>
                              <CardMedia
                                component="img"
                                alt="green iguana"
                                image="https://t4.ftcdn.net/jpg/03/03/46/39/360_F_303463981_i1CiZU5VYclryudt7VI7YSEDw9mgkSqJ.jpg"
                                sx={{ height: "9rem" }}
                              />
                              <Typography
                                sx={{
                                  fontWeight: 'bold', fontSize: '1.5rem',
                                  color: 'white', position: 'absolute',
                                  top: '3.5rem', left: '4.5rem'
                                }}
                              >
                                {projectPackage.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
                              </Typography>
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
                                <Divider />

                              </CardContent>
                              <CardActions>
                                {!checkOwner
                                  ? (
                                    <Button onClick={() => handleDonatePackage(projectPackage)} variant="contained">
                                      Chọn
                                    </Button>
                                  )
                                  : (
                                    <Button variant="contained" disabled>Chỉnh sửa</Button>
                                  )
                                }
                              </CardActions>
                            </Card>
                          ))}
                        </Box>
                      </Grid>
                    </>
                  )
                }
              </Grid>
            </Container>

          </TabContext>

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