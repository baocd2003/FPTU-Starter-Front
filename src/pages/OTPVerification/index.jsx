import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';

function OTPVerification() {
    const [otp, setOTP] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const userName = location.state?.userName;

    const signIn = useSignIn();
    const navigate = useNavigate();
    const notify = (mess) => {
        toast.warn(mess, {
            position: "bottom-left"
        });
    }
    const handleLogin = () => {
        navigate('/login');
    };
    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
            code: data.get('otp'),
            userName: userName,
        }
        console.log({
            code: data.get('otp'),
            userName: userName,
        });
        //Save token to cookie
        userApiInstace.post(`/login-2FA?code=${data.get('otp')}&userName=${userName}`).then(res => {
            console.log(res.data);
            if (res.data._data == null) {
                notify(`${res.data._message[0]}`);
            } else {
                signIn({
                    auth: {
                        token: res.data._data.token,
                        type: 'Bearer'
                    },
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { email: jsonData.email }
                })
                Swal.fire({
                    title: "Thành công",
                    text: "Xác thực thành công",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setTimeout(() => {
                        if (Cookies.get("_auth") !== undefined) {
                            navigate("/");
                        }
                    }, 0);
                });
                console.log(Cookies.get("_auth"));
                setIsLoading(false);
            }
        })
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='flex justify-center items-center md:h-screen h-fit md:min-h-[800px] xl:min-h-0 pt-[100px]'>
                <div className='xl:w-screen/4*3 max-w-fit'>
                    <ToastContainer />
                    <Container
                        component="main"
                        maxWidth="xl"
                        sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1), -1px -1px 1px rgba(0, 0, 0, 0.1)',
                            height: 'fit-content',
                            width: { md: '100%', xs: '90%' },
                        }}
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                mt: '40px',
                                mb: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginLeft: 4,
                                marginRight: 4
                            }}
                        >
                            <div className='mt-[32px] w-full h-full lg:flex lg:items-center lg:flex-row lg:justify-between hidden'>
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#000000',
                                            fontWeight: 600,
                                            clear: 'both',
                                            fontSize: '24px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Xác thực tài khoản
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#000000',
                                            fontSize: '16px',
                                            display: 'block',
                                            fontWeight: 'normal',
                                            clear: 'both',
                                            marginTop: '4px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Nhập mã OTP đã được gửi đến email để xác thực
                                    </Typography>
                                </div>
                                <img
                                    className="w-24 h-24 hidden lg:inline-block"
                                    src={logo}
                                    alt="Logo"
                                />
                            </div>
                            <div className='mt-[16px] w-full h-full flex items-center lg:hidden flex-col justify-center'>
                                <img
                                    className="w-32 h-32"
                                    src={logo}
                                    alt="Logo"
                                />
                                <Typography
                                    sx={{
                                        color: '#000000',
                                        fontWeight: 600,
                                        clear: 'both',
                                        fontSize: '24px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Xác thực tài khoản
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#000000',
                                        fontSize: '16px',
                                        display: 'block',
                                        fontWeight: 'normal',
                                        clear: 'both',
                                        marginTop: '4px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Nhập mã OTP đã được gửi đến email để xác thực
                                </Typography>
                            </div>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                                marginTop: '16px',
                                marginLeft: 4,
                                marginRight: 4,
                                width: '100%'
                            }}>
                                <div>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="otp"
                                        label="Mã OTP"
                                        name="otp"
                                        autoFocus
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
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value)}
                                    />
                                </div>
                                <div className='flex mt-4 lg:flex-row lg:justify-center flex-col justify-center'>
                                    <div className='lg:w-1/2 lg:mt-0 w-full mt-8'>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                width: { lg: '75%', xs: '100%' },
                                                backgroundColor: '#D9D9D9',
                                                color: '#44494D',
                                                fontWeight: 700,
                                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                                            }}
                                            className='login-btn'
                                        >
                                            Xác thực
                                        </Button>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center mb-[40px] mt-8 gap-1 text-sm'>
                                    <h2>Đã có tài khoản?</h2>
                                    <a onClick={handleLogin} className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B] hover:cursor-pointer'>Đăng nhập</a>
                                </div>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </div >
        </>
    )
}

export default OTPVerification