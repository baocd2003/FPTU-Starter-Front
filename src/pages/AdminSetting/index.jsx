import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { FaLock, FaMoneyBillWave } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { GiProfit } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import commissionApiInstance from '../../utils/apiInstance/commissionApiInstance';
import userManagementApiInstance from '../../utils/apiInstance/userManagementApiInstance';
import './index.css';

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

function AdminSetting() {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabledPassword, setIsDisabledPassword] = useState(true);
    const [showPassword, isShowPassword] = useState(false);
    const [showChangedPassword, isShowChangedPassword] = useState(false);

    const [disabledCommission, isDisabledCommission] = useState(true);
    const [commissionRate, setCommissionRate] = useState(0);
    const [commissionError, setCommissionError] = useState('');

    const token = Cookies.get("_auth");

    useEffect(() => {
        fetchUserProfile();
        fetchCommissionRate();
    }, []);

    const convertToPercent = (value) => {
        return (value * 100).toFixed(2);
    };

    const fetchUserProfile = async () => {
        try {
            const response = await userManagementApiInstance.get("/user-profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data != null) {
                setUserName(response.data._data.userName);
                setEmail(response.data._data.userEmail);
            }
        } catch (error) {
            console.error('Error fetching user profile API:', error);
        }
    };

    const fetchCommissionRate = async () => {
        try {
            const response = await commissionApiInstance.get("", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data._data != null) {
                setCommissionRate(response.data._data.commissionRate)
            }
        } catch (error) {
            console.error('Error fetching commission API:', error);
        }
    };

    const handleClickShowPassword = () => isShowPassword((show) => !show);
    const handleClickShowChangedPassword = () => isShowChangedPassword((show) => !show);
    const handleClickDisablePassword = () => setIsDisabledPassword((disabled) => !disabled);

    const handleClickDisableCommission = () => {
        isDisabledCommission((disabled) => !disabled)
        fetchCommissionRate();
    };
    const handleCommissionRate = (event) => {
        setCommissionRate(event.target.value);
        if (event.target.value <= 0 || event.target.value > 1) {
            setCommissionError("Giá trị hoa hồng phải nằm trong khoảng 0 - 100%")
        } else {
            setCommissionError('');
        }
    }

    const handleSubmitCommissionRate = async () => {
        try {
            setIsLoading(true);
            const response = await commissionApiInstance.patch(`update-rate?updatedRate=${commissionRate}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data._data != null) {
                Swal.fire({
                    title: "Thành công",
                    text: response.data._message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        container: 'my-swal'
                    },
                })
            }
        } catch (error) {
            console.error('Error fetching commission API:', error);
        } finally {
            setIsLoading(false);
            isDisabledCommission(true);
            fetchCommissionRate();
        }
    }

    return (
        <div className='mx-[3.2rem] my-[2.4rem]'>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* Thông tin tài khoản */}
            <Accordion defaultExpanded={true} className='admin-setting-accordition' sx={{ mb: '2.4rem' }}>
                <AccordionSummary sx={{ padding: 0, mx: '2rem' }}
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem' }} />}
                >
                    <div className='flex justify-start items-center mr-[2rem] gap-[2rem]'>
                        <img src={logo} alt="logo" className="w-[80px] h-[80px] overflow-hidden" />
                        <div className="flex flex-col justify-center items-start overflow-hidden mt-[-0.4rem]">
                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.2rem', fontWeight: '700', color: '#44494D' }}>
                                {userName}
                            </Typography>
                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1rem', fontWeight: '500', color: '#A7A7A7' }}>
                                {email}
                            </Typography>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails sx={{ mx: '2rem', mb: '2rem' }}>
                    <div>
                        <div className='flex justify-start gap-[0.8rem] items-center'>
                            <h1 className='text-[1rem] text-left font-bold'>Email đăng ký</h1>
                        </div>
                        <Grid container columnSpacing={4}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    fullWidth
                                    disabled
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <MdEmail style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Divider sx={{ borderBottomWidth: '0.1rem', mt: '1.6rem', mb: '2.4rem' }} />
                    <div>
                        <div className='flex justify-start gap-[1.2rem] items-center'>
                            <h1 className='text-[1rem] text-left font-bold'>Thay đổi mật khẩu</h1>
                            {isDisabledPassword ? (
                                <Button onClick={handleClickDisablePassword} variant='outline' sx={{ borderColor: '#44494D', minWidth: '0', px: '0.4rem', outline: 'none !important' }}>
                                    <EditIcon sx={{ fontSize: '1.2rem' }} />
                                </Button>
                            ) : (
                                <div>
                                    <Button onClick={handleClickDisablePassword} variant='outline' sx={{ borderColor: '#44494D', minWidth: '0', px: '0.4rem', outline: 'none !important', mr: '0.4rem' }}>
                                        <DoneIcon sx={{ fontSize: '1.2rem', color: '#4CAF50' }} />
                                    </Button>
                                    <Button onClick={handleClickDisablePassword} variant='outline' sx={{ borderColor: '#44494D', minWidth: '0', px: '0.4rem', outline: 'none !important' }}>
                                        <DeleteIcon sx={{ fontSize: '1.2rem', color: '#ED142C' }} />
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Grid container columnSpacing={4}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Mật khẩu hiện tại"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    defaultValue={"123456789abcdef"}
                                    disabled={isDisabledPassword}
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
                                                    disabled={isDisabledPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Mật khẩu muốn đổi"
                                    variant="outlined"
                                    type={showChangedPassword ? 'text' : 'password'}
                                    fullWidth
                                    defaultValue={"123456789abcdef"}
                                    disabled={isDisabledPassword}
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
                                                    disabled={isDisabledPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </AccordionDetails >
            </Accordion >
            {/* Hoa hồng */}
            <Accordion defaultExpanded={true} className='admin-setting-accordition' sx={{ mb: '2.4rem' }}>
                <AccordionSummary sx={{ padding: 0, mx: '2rem' }}
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem' }} />}
                >
                    <div className='flex justify-start items-center mr-[2rem] gap-[2rem]'>
                        <div className="w-[80px] h-[80px] flex justify-center items-center">
                            <FaMoneyBillWave style={{ color: '#44494D', width: '40px', height: '40px' }} />
                        </div>
                        <div className="flex flex-col justify-center items-start overflow-hidden mt-[-0.4rem]">
                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.2rem', fontWeight: '700', color: '#44494D' }}>
                                Hoa hồng
                            </Typography>
                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1rem', fontWeight: '500', color: '#A7A7A7' }}>
                                Tỉ lệ hoa hồng nhận được sau mỗi dự án thành công
                            </Typography>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails sx={{ mx: '2rem', mb: '2rem' }}>
                    <div>
                        <div className='flex justify-start gap-[1.2rem] items-center'>
                            <h1 className='text-[1rem] text-left font-bold'>Thay đổi tỉ lệ hoa hồng</h1>
                            {disabledCommission ? (
                                <Button onClick={handleClickDisableCommission} variant='outline' sx={{ borderColor: '#44494D', minWidth: '0', px: '0.4rem', outline: 'none !important' }}>
                                    <EditIcon sx={{ fontSize: '1.2rem' }} />
                                </Button>
                            ) : (
                                <div>
                                    <Button onClick={handleSubmitCommissionRate} disabled={commissionError != null && commissionError !== ""} variant='outline' sx={{ borderColor: '#44494D', minWidth: '0', px: '0.4rem', outline: 'none !important', mr: '0.4rem' }}>
                                        <DoneIcon sx={{ fontSize: '1.2rem', color: '#4CAF50' }} />
                                    </Button>
                                    <Button onClick={handleClickDisableCommission} variant='outline' sx={{ borderColor: '#44494D', minWidth: '0', px: '0.4rem', outline: 'none !important' }}>
                                        <DeleteIcon sx={{ fontSize: '1.2rem', color: '#ED142C' }} />
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Grid container columnSpacing={4}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label="Tỉ lệ hoa hồng"
                                    variant="outlined"
                                    fullWidth
                                    type='number'
                                    error={!!commissionError}
                                    helperText={commissionError}
                                    value={commissionRate}
                                    onChange={handleCommissionRate}
                                    disabled={disabledCommission}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: '0.4rem' }}>
                                                <GiProfit style={{ color: '#44494D' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ pt: '0.8rem' }}>
                                <h1 className='text-[1rem] font-semibold text-left'>
                                    <ArrowForwardIcon sx={{ mr: '1.2rem' }} /> {convertToPercent(commissionRate)}% hoa hồng cho mỗi dự án thành công
                                </h1>
                            </Grid>
                        </Grid>
                    </div>
                </AccordionDetails>
            </Accordion>
            {/* Số dư ví */}
            <Accordion defaultExpanded={true} className='admin-setting-accordition' sx={{ mb: '2.4rem' }}>
                <AccordionSummary sx={{ padding: 0, mx: '2rem' }}
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem' }} />}
                >
                    <div className='flex justify-start items-center mr-[2rem] gap-[2rem]'>
                        <div className="w-[80px] h-[80px] flex justify-center items-center">
                            <FaWallet style={{ color: '#44494D', width: '40px', height: '40px' }} />
                        </div>
                        <div className="flex flex-col justify-center items-start overflow-hidden mt-[-0.4rem]">
                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.2rem', fontWeight: '700', color: '#44494D' }}>
                                Số dư ví
                            </Typography>
                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1rem', fontWeight: '500', color: '#A7A7A7' }}>
                                Số dư hệ thống: 1.000.000.000 VNĐ
                            </Typography>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails sx={{ mx: '2rem', mb: '2rem' }}>
                    <div>
                        <div className='flex justify-start gap-[1.2rem] items-center'>
                            <h1 className='text-[1rem] text-left font-bold'>Thông tin tài khoản ngân hàng</h1>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default AdminSetting;
