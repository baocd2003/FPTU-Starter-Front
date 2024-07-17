import { Edit as EditIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Backdrop, Button, CircularProgress, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FaAddressCard, FaBirthdayCake, FaLock, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { ImBin2 } from "react-icons/im";
import { MdEmail, MdOutlineTransgender, MdSwitchAccount } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from 'sweetalert2';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';

const today = dayjs();
const minDate = today.subtract(100, 'year');

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& label': {
        fontSize: '0.875rem',
        color: '#6B7280',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '10px',
        },
        '&:hover fieldset': {
            borderColor: '#D1D5DB',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D1D5DB',
        },
    },
    '& .MuiInputBase-input': {
        padding: '14px 16px',
        fontSize: '1rem',
    },
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    width: '100%',
    height: '100%',
    '& button': {
        outline: 'none',
    },
    '& label': {
        fontSize: '0.875rem',
        color: '#6B7280',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '10px',
        },
        '&:hover fieldset': {
            borderColor: '#D1D5DB',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D1D5DB',
        },
    },
    '& .MuiInputBase-input': {
        padding: '14px 16px',
        fontSize: '1rem',
    },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px !important',
        '&:hover fieldset': {
            borderColor: '#D1D5DB',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D1D5DB',
        },
    },
    '& .MuiInputBase-input': {
        padding: '14px 16px',
        fontSize: '1rem',
        borderRadius: '10px !important',
    },
    '& .MuiSelected': {
        fontSize: '1rem !important',
    },
    textAlign: 'left',
    height: '49px',
    borderRadius: '10px !important',
}));

function UserProfile() {
    const { setIsLoading } = useOutletContext();
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [accountName, setAccountName] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthDate, setUserBirthDate] = useState(null);
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = Cookies.get("_auth");

    const [showPassword, isShowPassword] = useState(false);
    const [showChangedPassword, isShowChangedPassword] = useState(false);
    const [showConfirmPassword, isShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => isShowPassword((show) => !show);
    const handleClickShowChangedPassword = () => isShowChangedPassword((show) => !show);
    const handleClickShowConfirmPassword = () => isShowConfirmPassword((show) => !show);

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

    const handleEditPassword = () => {
        setIsEditPassword(!isEditPassword);
        if (isEditPassword == true) {
            if (token) {
                fetchUserData();
            }
        }
    }

    const handleUpdatePassword = () => {

    }

    const handleUpdateProfile = () => {
        console.log(userBirthDate);
        setIsLoading(true);
        const userUpdateRequest = {
            accountName: accountName,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userBirthDate: userBirthDate == null ? null : `${userBirthDate.get('year')} - ${userBirthDate.get('month') + 1 < 10 ? `0${userBirthDate.get('month') + 1}` : userBirthDate.get('month') + 1} - ${userBirthDate.get('date')}`,
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
                setIsEditProfile(false);
                setIsLoading(false);
            });
    }

    return (
        <Paper elevation={3} sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            px: '2rem',
            py: '1.6rem'
        }}>
            {user == null ?
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 100,
                    }}
                    open={!user || isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                : <>
                    <h1 className='text-left w-full text-[1.2rem] font-bold mb-[3.2rem]'>Thông tin tài khoản</h1>
                    <div className='w-full mb-[3.2rem]'>
                        <div className='flex justify-between gap-[1rem] items-center mb-[1.2rem]'>
                            <div className='flex justify-between gap-[1rem] items-center'>
                                <FaAddressCard style={{ color: '#44494D', fontSize: '1.4rem' }} />
                                <h1 className='text-[1rem] text-left font-bold'>Thông tin cá nhân</h1>
                            </div>
                            {!isEditProfile ? (
                                <div className="flex justify-center gap-4 profileButton">
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
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-center gap-4 profileButton">
                                    <Button
                                        variant="contained"
                                        startIcon={<ImBin2 />}
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
                                        }}
                                    >
                                        Lưu chỉnh sửa
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Grid container columnSpacing={4} rowSpacing={0}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Email"
                                    variant="outlined"
                                    value={user?.userEmail || ""}
                                    fullWidth
                                    disabled={!isEditProfile}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <MdEmail style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Tên tài khoản"
                                    variant="outlined"
                                    value={user?.userName || ""}
                                    fullWidth
                                    disabled={!isEditProfile}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <MdSwitchAccount style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Họ và Tên"
                                    variant="outlined"
                                    value={user?.accountName || ""}
                                    fullWidth
                                    disabled={!isEditProfile}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <FaUser style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => setAccountName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <CustomDatePicker
                                        disabled={!isEditProfile}
                                        label="Ngày sinh"
                                        value={userBirthDate}
                                        onChange={(newValue) => setUserBirthDate(newValue)}
                                        minDate={minDate}
                                        maxDate={today}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                            <FaBirthdayCake style={{ color: '#44494D' }} />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        sx={{
                                            fontSize: '0.875rem !important',
                                            color: 'rgba(0, 0, 0, 0.38)',
                                        }}>Giới tính</InputLabel>
                                    <CustomSelect
                                        disabled={!isEditProfile}
                                        labelId="gender-select-label"
                                        id="gender-select"
                                        value={selectedGender}
                                        placeholder={"Giới tính"}
                                        label="Giới tính"
                                        onChange={handleGenderChange}
                                        startAdornment={
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <MdOutlineTransgender style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        }
                                    >
                                        {gender.map((g, index) => (
                                            <MenuItem key={index} value={g}>
                                                {g}
                                            </MenuItem>
                                        ))}
                                    </CustomSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Số điện thoại"
                                    variant="outlined"
                                    value={user?.userPhone || ""}
                                    placeholder='Số điện thoại'
                                    fullWidth
                                    type='number'
                                    disabled={!isEditProfile}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <GoHomeFill style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Địa chỉ"
                                    variant="outlined"
                                    value={user?.userAddress || ""}
                                    placeholder='Địa chỉ'
                                    fullWidth
                                    disabled={!isEditProfile}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <GoHomeFill style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className='w-full'>
                        <div className='flex justify-between gap-[1rem] items-center mb-[1.2rem]'>
                            <div className='flex justify-between gap-[1rem] items-center'>
                                <RiLockPasswordFill style={{ color: '#44494D', fontSize: '1.4rem' }} />
                                <h1 className='text-[1rem] text-left font-bold'>Thông tin bảo mật</h1>
                            </div>
                            {!isEditPassword ? (
                                <div className="flex justify-center gap-4 profileButton">
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={handleEditPassword}
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
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-center gap-4 profileButton">
                                    <Button
                                        variant="contained"
                                        startIcon={<ImBin2 />}
                                        onClick={handleEditPassword}
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
                                        }}
                                    >
                                        Bỏ qua
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={handleUpdatePassword}
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
                                        }}
                                    >
                                        Lưu chỉnh sửa
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Grid container columnSpacing={4} rowSpacing={0}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Mật khẩu hiện tại"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    defaultValue={"defaultpassword"}
                                    disabled={!isEditPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <FaLock style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ mr: '0.4rem' }}>
                                                <IconButton sx={{ outline: 'none !important' }}
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    disabled={!isEditPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Mật khẩu muốn đổi"
                                    variant="outlined"
                                    type={showChangedPassword ? 'text' : 'password'}
                                    fullWidth
                                    defaultValue={"defaultpassword"}
                                    disabled={!isEditPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <FaLock style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ mr: '0.4rem' }}>
                                                <IconButton sx={{ outline: 'none !important' }}
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowChangedPassword}
                                                    edge="end"
                                                    disabled={!isEditPassword}
                                                >
                                                    {showChangedPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Xác nhận mật khẩu"
                                    variant="outlined"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    fullWidth
                                    defaultValue={"defaultpassword"}
                                    disabled={!isEditPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <FaLock style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ mr: '0.4rem' }}>
                                                <IconButton sx={{ outline: 'none !important' }}
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    edge="end"
                                                    disabled={!isEditPassword}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </>
            }
        </Paper>
    );
}

export default UserProfile;