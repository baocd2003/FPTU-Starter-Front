import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import "./index.css";

function UserProfile() {
  const [isEditProfile, setIsEditProfile] = useState(false);

  //Gender
  const gender = ["Nam", "Nữ", "Khác"];

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  return (
    <div className="mt-[64px] w-[100%] flex justify-center items-center">
      <div className="userContent">
        <h1 className="text-[#44494D] text-2xl font-bold">Thông tin cá nhân</h1>
        <h2 className="text-[#44494D] font-medium mt-4 subtitle">
          Những thông tin dưới đây sẽ được hiển thị trên trang cá nhân của bạn
        </h2>
        <div className="mt-[48px]">
          <Grid
            container
            spacing={"64px"}
            rowSpacing={{ lg: "16px", xs: "4px" }}
          >
            <Grid item xs={12} lg={6}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Địa chỉ Email"
                name="email"
                disabled
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                  },
                }}
                sx={{
                  width: "100%",
                  "& input": {
                    height: "16px",
                  },
                  fontSize: "10px",
                }}
                defaultValue="suongckse171834@fpt.edu.vn"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Tên tài khoản"
                required
                disabled={!isEditProfile}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                  },
                }}
                sx={{
                  width: "100%",
                  "& input": {
                    height: "16px",
                  },
                  fontSize: "10px",
                }}
                defaultValue="YoungBuffallo"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Họ và tên"
                required
                disabled={!isEditProfile}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                  },
                }}
                sx={{
                  width: "100%",
                  "& input": {
                    height: "16px",
                  },
                  fontSize: "10px",
                }}
                defaultValue="Cao Khả Sương"
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              lg={6}
              spacing={"32px"}
              rowSpacing={{ lg: "0px", xs: "4px" }}
            >
              <Grid container item xs={12} lg={6} direction={"row"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày sinh"
                    closeOnSelect
                    disabled={!isEditProfile}
                    slotProps={{
                      field: { clearable: true },
                    }}
                    sx={{
                      width: "100%",
                      marginTop: "16px",
                      marginBottom: "8px",
                      height: "49px",
                      ".MuiInputBase-root": {
                        height: "49px",
                      },
                      "& button": {
                        outline: "none",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid container item xs={12} lg={6}>
                <FormControl
                  fullWidth
                  sx={{ marginTop: "16px", marginBottom: "8px" }}
                >
                  <InputLabel disabled={!isEditProfile}>Giới tính</InputLabel>
                  <Select
                    disabled={!isEditProfile}
                    input={<OutlinedInput label="Giới tính" />}
                    sx={{
                      textAlign: "left",
                      height: "49px",
                    }}
                  >
                    {gender.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Số điện thoại"
                disabled={!isEditProfile}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                  },
                }}
                sx={{
                  width: "100%",
                  "& input": {
                    height: "16px",
                  },
                  fontSize: "10px",
                }}
                defaultValue="0765586626"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Địa chỉ"
                disabled={!isEditProfile}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                  },
                }}
                sx={{
                  width: "100%",
                  "& input": {
                    height: "16px",
                  },
                  fontSize: "10px",
                }}
                defaultValue="J ko biết"
              />
            </Grid>
          </Grid>
        </div>
        {!isEditProfile ? (
          <div className="mt-[48px] flex justify-center profileButton">
            <Button
              variant="contained"
              startIcon={<LockIcon />}
              disabled
              sx={{
                color: "#44494D",
                backgroundColor: "white",
                textTransform: "none !important",
                "&:hover": {
                  backgroundColor: "#DD5746",
                  color: "white",
                },
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                },
                fontWeight: "bold",
                width: "160px",
              }}
            >
              Đổi mật khẩu
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
              sx={{
                color: "#44494D",
                backgroundColor: "white",
                textTransform: "none !important",
                "&:hover": {
                  backgroundColor: "#FBB03B",
                  color: "white",
                },
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                },
                fontWeight: "bold",
                width: "160px",
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        ) : (
          <div className="mt-[48px] flex justify-center profileButton">
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleEditProfile}
              sx={{
                color: "#44494D",
                backgroundColor: "white",
                textTransform: "none !important",
                "&:hover": {
                  backgroundColor: "#E2E2E2",
                  color: "#44494D",
                },
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                },
                fontWeight: "bold",
                width: "160px",
              }}
            >
              Bỏ qua
            </Button>
            <Button
              variant="contained"
              disabled
              startIcon={<EditIcon />}
              sx={{
                color: "#44494D",
                backgroundColor: "white",
                textTransform: "none !important",
                "&:hover": {
                  backgroundColor: "#FBB03B",
                  color: "white",
                },
                "&:active": {
                  outline: "none !important",
                },
                "&:focus": {
                  outline: "none !important",
                },
                fontWeight: "bold",
                width: "160px",
              }}
            >
              Lưu chỉnh sửa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
