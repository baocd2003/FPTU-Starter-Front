import { Box, Button, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApiInstance from "../../../utils/apiInstance/categoryApiInstance";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpIcon from '@mui/icons-material/Help';
import "./index.css"
import { useNavigate } from "react-router-dom";

const StepOne = () => {
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCates = async () => {
      await categoryApiInstance.get("").then(res => {
        console.log(res.data.result);
        if (res.data.result._isSuccess) {
          setCategories(res.data.result._data)
        }
      })
    }
    fetchCates();
  }, []);

  const styleLeftGridForm = () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    pr: 3

  })

  const onSubmit = (data) => {
    console.log(data)
    navigate("/init-project/step-two")
  }

  return (
    <>
      <Box
        component={Paper}
        elevation={5}
        sx={{
          width: "100%",
          overflow: "hidden"
        }}
      >
        <Typography sx={{
          fontSize: "2rem", fontWeight: "bold", py: 2, px: 6, mb: 5, color: "white",
          background: "#FBB03B",
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(255, 255, 255, 0.1))',
          textShadow: ".12rem .12rem .3rem rgba(0, 0, 0, 0.5)"
        }}
        >Thiết lập các thông tin cơ bản</Typography>

        <Box
          sx={{

            minHeight: "100vh",
            px: 6,
            pr: 10,
          }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ m: "0 !important" }}><Divider sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)", }}>Thiết lập danh mục</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign="left"
                sx={{
                  fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)",
                  fontSize: ".85rem"
                }}
              >Danh mục dự án *</Typography>
              <Typography
                textAlign="left"
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: ".7rem",
                  mt: .2
                }}
              >Phân loại danh mục giúp những người ủng hộ dễ dàng tìm thấy và kết nối đến dự án của bạn.</Typography>
            </Grid>
            <Grid item xs={9} sx={{ display: "flex", gap: 3 }}>
              <FormControl sx={{ width: "35%" }}>
                <InputLabel id="cate-label">Danh mục chính</InputLabel>
                <Select
                  labelId="cate-label"
                  label="Danh mục chính"
                  fullWidth
                  defaultValue={""} {...register("Category")}
                >
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "65%" }}>
                <InputLabel id="sub-cate-label">Danh mục phụ</InputLabel>
                <Select
                  labelId="sub-cate-label"
                  label="Danh mục phụ"
                  fullWidth
                  defaultValue={""} {...register("SubCategory")}
                >

                </Select>
              </FormControl>
              {/* <Box sx={{ width: "35%" }}>
                <Typography
                  sx={{
                    fontWeight: "bold", fontSize: ".8rem", textAlign: "left",
                    py: .5, color: "rgba(0, 0, 0, 0.6)"
                  }}>
                  Chọn danh mục chính
                </Typography>
                <Select
                  fullWidth
                  defaultValue={""} {...register("Category")}>
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </Box> */}
              {/* <Box sx={{ width: "65%" }}>
                <Typography
                  sx={{
                    fontWeight: "bold", fontSize: ".8rem", textAlign: "left",
                    py: .5, color: "rgba(0, 0, 0, 0.6)",
                  }}>
                  Chọn danh mục phụ
                </Typography>
                <Select
                  fullWidth
                  defaultValue={""} {...register("SubCategory")}>
                </Select>
              </Box> */}


            </Grid>

            {/******************/}
            {/** Project Dtail */}
            {/******************/}
            <Grid item xs={12} sx={{ m: "0 !important" }}><Divider sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)" }}>Chi tiết dự án</Divider></Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign="left"
                sx={{
                  fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)",
                  fontSize: ".85rem"
                }}
              >Tiêu đề dự án *</Typography>
              <Typography
                textAlign="left"
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: ".7rem",
                  mt: .2
                }}
              >Hãy chọn một tiêu đề ngắn gọn và thu hút</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField {...register("ProjectName")}
                placeholder="Tiêu đề.."
                fullWidth />
            </Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign="left"
                sx={{
                  fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)",
                  fontSize: ".85rem"
                }}
              >Mô tả dự án *</Typography>
              <Typography
                textAlign="left"
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: ".7rem",
                  mt: .2
                }}
              >Hãy viết đoạn mô tả nhỏ để truyền tải sơ lược dự án của bạn</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField {...register("ProjectDescription")}
                type="text"
                fullWidth
                placeholder="Mô tả dự án.."
              // multiline rows={2}
              />
            </Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign="left"
                sx={{
                  fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)",
                  fontSize: ".85rem"
                }}
              >Mục tiêu dự án *</Typography>
              <Typography
                textAlign="left"
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: ".7rem",
                  mt: .2
                }}
              >Hãy viết đoạn mô tả nhỏ để truyền tải sơ lược dự án của bạn</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: "left" }}>
              <TextField {...register("ProjectTarget")}
                type="number"
                placeholder="Nhập số tiền"
                sx={{ width: "48%" }}
                InputProps={{
                  endAdornment: <InputAdornment>VND</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={3} sx={styleLeftGridForm}>
              <Typography
                textAlign="left"
                sx={{
                  fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)",
                  fontSize: ".85rem"
                }}
              >Thời gian diễn ra</Typography>
              <Typography
                textAlign="left"
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: ".7rem",
                  mt: .2
                }}
              >Chọn khoảng thời gian mà bạn sẽ kêu gọi sự ủng hộ</Typography>
            </Grid>
            <Grid item xs={9} sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField {...register("startDate")}
                type="date"
                sx={{ width: "48%" }}
              />
              <TextField {...register("endDate")}
                type="date"
                sx={{ width: "48%" }}
              />
            </Grid>
          </Grid>


          <Button onClick={handleSubmit(onSubmit)} variant="contained">Submit</Button>


        </Box >
      </Box >


    </>
  )
}

export default StepOne;