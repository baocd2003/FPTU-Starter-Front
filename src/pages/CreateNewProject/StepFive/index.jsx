import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { setStepFive } from "../../../redux/projectStepSlice";
import { Backdrop, Box, Button, Card, CircularProgress, tableCellClasses, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import Cookies from 'js-cookie';
import { Add, Delete, Height } from "@mui/icons-material";
import projectApiInstance from "../../../utils/apiInstance/projectApiInstance";
import { useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import userManagementApiInstance from "../../../utils/apiInstance/userManagementApiInstance";


const StepFive = () => {
  const allStepData = useSelector((state) => state.projectForm.projectForm)
  const { thumbnailFile, liveDemoFile, images } = useOutletContext()


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  let thumbnailData, liveDemoData, imageUrls, userEmail;


  const [packages, setPackages] = useState([])
  const [newPackage, setNewPackage] = useState({
    packageName: '',
    requiredAmount: '',
    limitQuantity: '',
    packageDescription: '',
    packageType: 'Package',
    rewardItems: []
  })
  const [addPerk, setAddPerk] = useState(false)
  const [packagePerk, setPackagePerk] = useState(
    {
      name: '',
      description: '',
      quantity: 0,
      ImageUrl: 'string'
    }
  )

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setStepFive())
  }, [])

  const handleNewPackageInput = (field) => (event) => {
    setNewPackage((prevNewPackage) => ({
      ...prevNewPackage,
      [field]: event.target.value
    }))
  }

  const handlePerkInput = (field) => (event) => {
    setPackagePerk((prevPerk) => ({
      ...prevPerk,
      [field]: event.target.value
    }));
  }

  const handleAddPerk = () => {
    setNewPackage((prevPackage) => ({
      ...prevPackage,
      rewardItems: [...prevPackage.rewardItems, packagePerk]
    }));
    setPackagePerk({ name: '', description: '', quantity: 0, ImageUrl: 'string' });
    setAddPerk(false);
  }

  const handleAddPackage = () => {
    setPackages([...packages, newPackage]);
    setNewPackage({
      packageName: '',
      requiredAmount: '',
      limitQuantity: '',
      packageDescription: '',
      packageType: 'Package',
      rewardItems: []
    });
  };

  const handleRemovePackage = (index) => {
    setPackages((prevPackages) => prevPackages.filter((pkg, i) => i !== index));
  };

  // get data from previous steps

  // upload medial function
  const uploadMedias = async () => {
    const thumbnailFormData = new FormData()
    const liveDemoFormData = new FormData()
    const imagesFormData = new FormData()
    thumbnailFormData.set("thumbnailFile", thumbnailFile[0].file);
    liveDemoFormData.set("liveDemoFile", liveDemoFile[0].file);

    // get thumbnail url
    const api_url = import.meta.env.VITE_REACT_APP_API_URL
    const thumbnailUrl = await fetch(
      `${api_url}/api/projects/add-thumbnail`,
      {
        method: "POST",
        body: thumbnailFormData,
      }
    );
    thumbnailData = await thumbnailUrl.json();
    console.log('thumbnailData', thumbnailData)


    // get livedemo url
    const liveDemoUrl = await fetch(
      `${api_url}/api/projects/add-live-demo`,
      {
        method: "POST",
        body: liveDemoFormData,
      }
    );
    liveDemoData = await liveDemoUrl.json();
    console.log('liveDemoData', liveDemoData)

    // get story images url
    images.map((img, index) => {
      imagesFormData.append('storyFiles', img.file)
    })
    const pData = await projectApiInstance.post("/add-story", imagesFormData)
    imageUrls = pData.data;
    console.log('imgUrls', imageUrls)
  }

  const getUserProfile = async () => {
    const token = Cookies.get("_auth");
    const userprofile = await userManagementApiInstance.get("/user-profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    userEmail = (userprofile.data._data.userEmail)
  }
  console.log(allStepData)

  const handleCreateProject = async () => {
    try {
      setIsLoading(true)
      await uploadMedias()
      await getUserProfile()


      const CreateProjectData = {
        projectName: allStepData.stepOneData.ProjectName,
        projectDescription: allStepData.stepOneData.ProjectDescription,
        startDate: allStepData.stepOneData.startDate,
        endDate: allStepData.stepOneData.endDate,
        projectTarget: allStepData.stepOneData.ProjectTarget,
        projectBalance: 0,
        projectStatus: 1,
        projectThumbnail: thumbnailData,
        projectLiveDemo: liveDemoData,
        ProjectOwnerEmail: userEmail,
        bankAccount: allStepData.stepFourData,
        aboutUs: {
          Content: allStepData.stepTwoData
        },
        subCategories: allStepData.stepOneData.SubCategory.map(categoryId => ({
          id: categoryId
        })),
        packages: packages,
        images: imageUrls.map(url => ({
          url: url
        }))
      }
      console.log('done')
      console.log(CreateProjectData)

      projectApiInstance.post('/', CreateProjectData, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        // console.log(res)
        navigate('projects')
      })

    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box
        component={Paper}
        elevation={5}
        sx={{
          width: '100%',
          overflow: 'hidden',
          minHeight: '80vh',
          pb: 3
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={style}>
            <Typography textAlign={'center'} sx={{ fontSize: '1.8rem', fontWeight: 'bold', mb: 2 }}>Tạo mới gói</Typography>
            <Divider textAlign="left" sx={{ my: '.5rem', color: 'rgba(0, 0, 0, 0.8)' }}>Thông tin gói</Divider>
            <Grid container columnSpacing={2} rowSpacing={0}
              sx={{
                '& .MuiGrid-item': {
                  my: '.5rem !important'
                }
              }}
            >
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  label='Tên gói'
                  value={newPackage.packageName}
                  onChange={handleNewPackageInput('packageName')}
                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  fullWidth
                  type='number'
                  size="small"
                  label='Giá tiền'
                  value={newPackage.requiredAmount}
                  onChange={handleNewPackageInput('requiredAmount')} />

              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type='number'
                  size="small"
                  label='Số lượng gói'
                  value={newPackage.limitQuantity}
                  onChange={handleNewPackageInput('limitQuantity')} />
              </Grid>

              <Grid item xs={12} >
                <TextField
                  fullWidth
                  size="small"
                  label='Mô tả gói'
                  value={newPackage.packageDescription}
                  onChange={handleNewPackageInput('packageDescription')} />
              </Grid>
            </Grid>
            <Divider textAlign="left" sx={{ my: '.5rem', color: 'rgba(0, 0, 0, 0.8)' }}>Thông tin các quyền lợi</Divider>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Tên</StyledTableCell>
                    <StyledTableCell align="center">Mô tả</StyledTableCell>
                    <StyledTableCell align="center">Số lượng</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newPackage.rewardItems.map((value, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {value.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{value.description}</StyledTableCell>
                      <StyledTableCell align="center">{value.quantity}</StyledTableCell>
                      <StyledTableCell align="center"><Delete sx={{ color: '#800000' }} /></StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {addPerk ? (
                    <TableRow>
                      <StyledTableCell>
                        <TextField
                          placeholder='Tên quyền lợi'
                          size="small"
                          value={packagePerk.name}
                          onChange={handlePerkInput('name')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          placeholder='Mô tả'
                          size="small"
                          value={packagePerk.description}
                          onChange={handlePerkInput('description')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          placeholder='Số lượng'
                          size="small"
                          type="number"
                          value={packagePerk.quantity}
                          onChange={handlePerkInput('quantity')}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="contained"
                          onClick={() => handleAddPerk()}
                          sx={{ width: '1rem', py: 0, fontSize: '.8rem', mb: .2 }}>Thêm</Button>
                        <Button variant="contained"
                          onClick={() => setAddPerk(false)}
                          sx={{ width: '1rem', background: '#800000', py: 0, fontSize: '.8rem', '&:hover': { background: '#800000', fontSize: '.8rem' } }}>Hủy</Button>
                      </StyledTableCell>
                    </TableRow>
                  ) :
                    (
                      <TableRow>
                        <TableCell onClick={() => setAddPerk(true)} align="center" colSpan={4} sx={{ py: .5, cursor: 'pointer' }}>
                          <Add /> Thêm
                        </TableCell>
                      </TableRow>
                    )
                  }

                </TableBody>
              </Table>
            </TableContainer>
            <Button variant='contained'
              disableElevation
              onClick={() => handleAddPackage()}
              sx={{
                display: 'flex',
                margin: '0 auto',
                background: '#FBB03B', fontWeight: 'bold',
                '&:hover': {
                  background: '#CC9847'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Tạo gói</Button>

          </Box>
        </Modal >
        <Typography sx={{
          fontSize: '2rem', fontWeight: 'bold', py: 2, px: 6, mb: 5, color: 'white',
          background: '#FBB03B',
          textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)'
        }}
        >Tạo gói ủng hộ</Typography>
        <Box
          sx={{
            // minHeight: '100vh',
            px: 6,
            pr: 10,
          }}
        >
          <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)', mb: 1 }}>Tạo các gói ủng hộ</Divider>
          <Typography sx={{ fontSize: '.8rem', mb: 3 }}>Thiết lập các gói ủng hộ cùng những vật phẩm, đặc quyền đi kèm (khuyến khích)</Typography>

          {
            packages.length == 0
              /**Empty package list */
              ? (
                <Box sx={{
                  background: 'rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', alignItems: 'center', borderRadius: '.5rem', py: 3
                }}>
                  <img className="w-[10rem]" src='https://i.ibb.co/gP8Wr7G/empty-1-1.png' />
                  <Typography sx={{ fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.4)', fontWeight: 'bold' }}>Chưa có gì ở đây cả!</Typography>
                  <Button variant='contained' onClick={() => setOpen(true)}
                    disableElevation
                    sx={{ background: '#FBB03B', mt: 2, '&:hover': { background: '#FBB03B' }, '&:focus': { outline: 'none' } }}>
                    Tạo gói ngay</Button>
                </Box>
              )
              :
              /** List */
              (
                <>
                  <Box className='w-full flex justify-between item-center mb-3'>
                    <Typography sx={{ fontSize: '.88rem' }}>Đã tạo ({packages.length}) gói</Typography>
                    <Button
                      variant='contained' disableElevation
                      onClick={() => setOpen(true)}
                      sx={{ background: 'gray', py: .2, fontSize: '.8rem' }}
                    >
                      <Add sx={{ color: 'white', fontSize: '1rem' }} /> Thêm gói</Button>
                  </Box>


                  <TableContainer sx={{ borderBottom: 'none' }}>
                    <Table>
                      <TableHead sx={{ background: '#FBB03B', overflow: 'hidden' }}>
                        <TableRow sx={{ borderRadius: '.5rem', borderBottom: 'none' }}>
                          <TableCell sx={{ py: '.5rem', borderStartStartRadius: '.5rem', borderEndStartRadius: '.5rem', borderBottom: 'none', color: 'white' }}>Hình ảnh</TableCell>
                          <TableCell sx={{ py: '.5rem', color: 'white', borderBottom: 'none' }}>Tên gói</TableCell>
                          <TableCell sx={{ py: '.5rem', color: 'white', borderBottom: 'none' }}>Mô tả</TableCell>
                          <TableCell sx={{ py: '.5rem', color: 'white', borderBottom: 'none' }}>Số lượng</TableCell>
                          <TableCell sx={{ py: '.5rem', color: 'white', borderBottom: 'none' }}>Giá tiền</TableCell>
                          <TableCell sx={{ py: '.5rem', borderStartEndRadius: '.5rem', borderEndEndRadius: '.5rem', borderBottom: 'none', color: 'white' }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ minHeight: '20rem' }}>
                        {
                          packages.map((item, index) => (
                            <TableRow key={index} sx={{ minHeight: '10rem' }}>
                              <TableCell component='th' scope='row' >
                                <Box sx={{ position: 'relative', width: '6.5rem' }}>
                                  <img className="w-[6rem] rounded-sm" src='https://t4.ftcdn.net/jpg/03/03/46/39/360_F_303463981_i1CiZU5VYclryudt7VI7YSEDw9mgkSqJ.jpg' />
                                  <Typography
                                    sx={{ position: 'absolute', top: '50%', left: '50%', color: 'white', fontSize: '1rem', translate: '-50% -50%' }}
                                  >{item.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</Typography>
                                </Box>

                              </TableCell>
                              <TableCell>{item.packageName}</TableCell>
                              <TableCell>{item.packageDescription}</TableCell>
                              <TableCell>{item.limitQuantity}</TableCell>
                              <TableCell>{item.requiredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</TableCell>
                              <TableCell><Delete onClick={() => handleRemovePackage(index)} sx={{ cursor: 'pointer' }} /></TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )
          }


        </Box>


        <Box sx={{ mt: 2, gap: 5, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => navigate('/init-project/step-four')} variant='outlined'
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
          <Button variant='contained'
            disableElevation
            onClick={() => handleCreateProject()}
            sx={{
              background: '#FBB03B', fontWeight: 'bold',
              '&:hover': {
                background: '#CC9847'
              },
              '&:focus': {
                outline: 'none'
              }
            }}>Tạo dự án</Button>
        </Box>
      </Box >
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  height: '85vh',
  overflowY: 'scroll',
  px: 4,
  py: 2
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.root}`]: {
    padding: '.5rem 1rem !important'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default StepFive;