import { useDispatch } from "react-redux";
import { setStepThree } from "../../../redux/projectStepSlice";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { FilePond, registerPlugin } from "react-filepond";
import { setFormData } from "../../../redux/projectFormSlice";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from "react-toastify";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
// Register the plugin
registerPlugin(FilePondPluginFileValidateType);
const StepThree = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { thumbnailFile, setThumbnailFile, liveDemoFile, setLiveDemoFile, images, setImages } = useOutletContext();


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setStepThree())
  }, [])

  const styleLeftGridForm = () => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pr: 3
  })

  const notify = (mess) => {
    toast.warn(mess, {
      position: "bottom-left"
    });
  }

  const onSubmit = () => {
    // dispatch(setFormData({
    //   step: 'StepThreeData', data: {
    //     ProjectThumbnail: thumbnailFile[0].file,
    //     ProjectLiveDemo: liveDemoFile[0].file,
    //     Images: images
    //   }
    // }))
    if (liveDemoFile.length > 0 && thumbnailFile.length > 0 && images.length > 0) {
      navigate('/init-project/step-four')
    }
    else {
      notify("Hãy chọn ảnh nền dự án và video mô tả dự án của bạn");
    }
  }

  return (
    <>
      <Box
        component={Paper}
        elevation={5}
        sx={{
          width: "100%",
          pb: 3,
          overflow: 'hidden'
        }}
      >
        <ToastContainer />
        <Typography sx={{
          fontSize: "2rem", fontWeight: "bold", py: 2, px: 6, mb: 5, color: "white",
          background: "#FBB03B",
          textShadow: ".12rem .12rem .3rem rgba(0, 0, 0, 0.5)"
        }}
        >Hình ảnh, video dự án</Typography>
        <Box
          sx={{
            // minHeight: '100vh',
            px: 6,
            pr: 10,
          }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ m: '0 !important' }}>
              <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Thumbnail dự án</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Thumbnail dự án *</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Hãy chọn một ảnh để làm thumbnail dự án của bạn. Lưu ý nên chọn ảnh rõ nét, kích thước tối thiểu 800x600</Typography>
            </Grid>
            <Grid item xs={9}>
              <FilePond
                files={thumbnailFile}
                onupdatefiles={setThumbnailFile}
                allowMultiple={false}
                maxFiles={1}
                acceptedFileTypes={['image/*']}
                onChange={() => console.log(thumbnailFile)}
                // server="/api"
                name="files"
                labelIdle='Kéo hoặc thả file vào đây hoặc <span class="filepond--label-action">Tải từ máy</span>'
              />
            </Grid>
            <Grid item xs={12} sx={{ m: '0 !important' }}>
              <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Video live demo</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Video về dự án *</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Cung cấp một nội dung video ngắn tầm 30s đến 2 phút để cung cấp mọi người một hình dung sinh động về dự án</Typography>
            </Grid>
            <Grid item xs={9}>
              <FilePond
                files={liveDemoFile}
                onupdatefiles={setLiveDemoFile}
                allowMultiple={false}
                maxFiles={1}
                // server="/api"
                name="files"
                acceptedFileTypes={['video/mp4', 'video/avi', 'video/mov']}
                labelIdle='Kéo hoặc thả file vào đây hoặc <span class="filepond--label-action">Tải từ máy</span>'
              />
              {liveDemoFile.length > 0 && (
                <Box>
                  <ReactPlayer
                    url={URL.createObjectURL(liveDemoFile[0].file)}
                    width="100%"
                    height="100%"
                    controls={true}
                  />
                </Box>

              )}
            </Grid>

            <Grid item xs={12} sx={{ m: '0 !important' }}>
              <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Ảnh bổ sung dự án</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign='left'
                sx={{
                  fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.85rem'
                }}
              >Thumbnail dự án *</Typography>
              <Typography
                textAlign='left'
                sx={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.7rem',
                  mt: .2
                }}
              >Hãy kể câu chuyện của bạn qua các hình ảnh</Typography>
            </Grid>
            <Grid item xs={9}>
              <FilePond
                files={images}
                onupdatefiles={setImages}
                allowMultiple={true}
                maxFiles={4}
                acceptedFileTypes={['image/*']}
                // server="/api"
                // disabled={true}
                name="files"
                labelIdle='Kéo hoặc thả file vào đây hoặc <span class="filepond--label-action">Tải từ máy</span>'
                styleButtonProcessItemPosition="right"
                class="filepond--flex-container"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, gap: 5, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={() => navigate('/init-project/step-two')} variant='outlined'
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
            <Button onClick={() => onSubmit()} variant='contained'
              disableElevation
              disabled={!(liveDemoFile.length > 0 && thumbnailFile.length > 0 && images.length > 0)}
              sx={{
                background: '#FBB03B', fontWeight: 'bold',
                '&:hover': {
                  background: '#CC9847'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Tiếp theo</Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default StepThree;