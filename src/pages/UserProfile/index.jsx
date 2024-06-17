import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';

function UserProfile() {
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [accountName, setAccountName] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthDate, setUserBirthDate] = useState(null);
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const token = Cookies.get("_auth");

    // Gender options
    const gender = ['Nam', 'Nữ', 'Khác'];
    const genderMapping = {
        0: 'Nam',
        1: 'Nữ',
        2: 'Khác'
    };

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = () => {
        userManagementApiInstance.get("/user-profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                const userData = response.data._data;
                setUser(userData);
                setUserEmail(userData.userEmail || '');
                setAccountName(userData.accountName || '');
                setUserName(userData.userName || '');
                setUserBirthDate(userData.userBirthDate ? dayjs(userData.userBirthDate) : null);
                setUserPhone(userData.userPhone || '');
                setUserAddress(userData.userAddress || '');
                setSelectedGender(userData.userGender == null ? '' : genderMapping[userData.userGender]);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleEditProfile = () => {
        setIsEditProfile(!isEditProfile);
        if (isEditProfile == true) {
            if (token) {
                fetchUserData();
            }
        }
    }

    const handleUpdateProfile = () => {
        setIsLoading(true);
        const userUpdateRequest = {
            accountName: accountName,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userBirthDate: `${userBirthDate.get('year')} - ${userBirthDate.get('month') + 1 < 10 ? `0${userBirthDate.get('month') + 1}` : userBirthDate.get('month') + 1} - ${userBirthDate.get('date')}`,
            userAddress: userAddress,
            userGender: selectedGender,
            userAvt: user.userAvatarUrl,
            userBackground: user.userBgAvatarUrl,
        }
        console.log(userUpdateRequest);
        userManagementApiInstance.put("/user-profile", userUpdateRequest, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    title: "Thành công",
                    text: "Cập nhật thành công",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setTimeout(() => {
                        if (Cookies.get("_auth") !== undefined) {
                            navigate("/profile");
                        }
                    }, 0);
                });
            }
        })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className='mt-[64px] w-[100%] flex justify-center items-center'>
            {isLoading || !user ? (
                <CircularProgress sx={{ color: '#FBB03B' }} />
            ) : (
                <div className="userContent">
                    <h1 className='text-[#44494D] text-2xl font-bold'>Thông tin cá nhân</h1>
                    <h2 className='text-[#44494D] font-medium mt-4 subtitle'>Những thông tin dưới đây sẽ được hiển thị trên trang cá nhân của bạn</h2>
                    <div className='mt-[48px]'>
                        <Grid container spacing={'64px'} rowSpacing={{ lg: '16px', xs: '4px' }}>
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
                                            fontSize: '14px',
                                        },
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& input': {
                                            height: '16px',
                                        },
                                        fontSize: '10px'
                                    }}
                                    value={userEmail || ''}
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
                                            fontSize: '14px',
                                        },
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& input': {
                                            height: '16px',
                                        },
                                        fontSize: '10px'
                                    }}
                                    value={accountName || ''}
                                    onChange={(e) => setAccountName(e.target.value)}
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
                                            fontSize: '14px',
                                        },
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& input': {
                                            height: '16px',
                                        },
                                        fontSize: '10px'
                                    }}
                                    value={userName || ''}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Grid>
                            <Grid container item xs={12} lg={6} spacing={'32px'} rowSpacing={{ lg: '0px', xs: '4px' }}>
                                <Grid container item xs={12} lg={6} direction={'row'}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker label="Ngày sinh"
                                            closeOnSelect
                                            disabled={!isEditProfile}
                                            value={userBirthDate}
                                            onChange={(date) => setUserBirthDate(date)}
                                            slotProps={{
                                                field: { clearable: true },
                                            }}
                                            sx={{
                                                width: '100%',
                                                marginTop: '16px',
                                                marginBottom: '8px',
                                                height: '49px',
                                                '.MuiInputBase-root': {
                                                    height: '49px'
                                                },
                                                '& button': {
                                                    outline: 'none'
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid container item xs={12} lg={6}>
                                    <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '8px' }}>
                                        <InputLabel disabled={!isEditProfile}>
                                            Giới tính
                                        </InputLabel>
                                        <Select
                                            disabled={!isEditProfile}
                                            value={selectedGender || ''}
                                            onChange={handleGenderChange}
                                            input={<OutlinedInput label="Giới tính" />}
                                            sx={{
                                                textAlign: 'left',
                                                height: '49px'
                                            }}
                                        >
                                            {gender.map((gender) => (
                                                <MenuItem
                                                    key={gender}
                                                    value={gender}
                                                >
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
                                            fontSize: '14px',
                                        },
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& input': {
                                            height: '16px',
                                        },
                                        fontSize: '10px'
                                    }}
                                    value={userPhone || ''}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Địa chỉ"
                                    required
                                    disabled={!isEditProfile}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '14px',
                                        },
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& input': {
                                            height: '16px',
                                        },
                                        fontSize: '10px'
                                    }}
                                    value={userAddress || ''}
                                    onChange={(e) => setUserAddress(e.target.value)}
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
                                    backgroundColor: 'white',
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#DD5746',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                    fontWeight: 'bold',
                                    width: '160px'
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
                                    backgroundColor: 'white',
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                    '.MuiButton-startIcon': {
                                        marginRight: '12px',
                                    },
                                    fontWeight: 'bold',
                                    width: '160px'
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
                                    backgroundColor: 'white',
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#E2E2E2',
                                        color: '#44494D',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                    '.MuiButton-startIcon': {
                                        marginRight: '12px',
                                    },
                                    fontWeight: 'bold',
                                    width: '160px'
                                }}
                            >
                                Bỏ qua
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={handleUpdateProfile}
                                sx={{
                                    color: "#44494D",
                                    backgroundColor: 'white',
                                    textTransform: 'none !important',
                                    '&:hover': {
                                        backgroundColor: '#FBB03B',
                                        color: 'white',
                                    },
                                    '&:active': {
                                        outline: 'none !important'
                                    },
                                    '&:focus': {
                                        outline: 'none !important'
                                    },
                                    fontWeight: 'bold',
                                    width: '160px'
                                }}
                            >
                                Lưu chỉnh sửa
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserProfile;
