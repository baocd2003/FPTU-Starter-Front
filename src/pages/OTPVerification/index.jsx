import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Countdown from 'react-countdown';
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';

function OTPVerification() {
    const [otp, setOTP] = useState("");
    const { setIsLoading } = useOutletContext();
    const location = useLocation();

    const userName = location.state?.userName;
    const email = location.state?.email;

    const handleChange = (newValue) => {
        console.log(newValue);
        setOTP(newValue);
    };

    const signIn = useSignIn();
    const navigate = useNavigate();
    const notify = (mess) => {
        toast.warn(mess, {
            position: "bottom-left"
        });
    }
    //Countdown
    const targetTime = Date.now() + 6 * 60 * 1000;
    const renderer = ({ minutes, seconds }) => {
        return <span className='text-[#FBB03B] font-bold'>{minutes} phút {seconds} giây</span>;
    };

    const handleLogin = () => {
        navigate('/login');
    };
    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userApiInstace.post(`/login-2FA?code=${otp}&userName=${userName}`).then(res => {
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
                    authState: { email: email }
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
            <div className='flex justify-center items-center md:h-screen h-fit md:min-h-[800px] xl:min-h-0'>
                <div className='xl:w-screen/4*3 w-[90%]'>
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
                                <div className='my-4'>
                                    <MuiOtpInput
                                        length={6}
                                        name="otp"
                                        id='otp'
                                        value={otp}
                                        onChange={handleChange}
                                        className='otpBox'
                                        validateChar={(val) => !isNaN(val)}
                                    />
                                </div>
                                <div className='flex my-6 gap-1 text-sm otpTimer'>
                                    <h2>Mã OTP của bạn còn hiệu lực trong</h2>
                                    <Countdown date={targetTime} renderer={renderer} />
                                </div>
                                <div className='flex mt-4 flex-row justify-between mb-[40px] verifyLg'>
                                    <div className='flex justify-center mt-2 gap-1 text-sm'>
                                        <h2>Đã có tài khoản?</h2>
                                        <a onClick={handleLogin} className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B] hover:cursor-pointer'>Đăng nhập</a>
                                    </div>
                                    <div className='lg:w-1/2 lg:mt-0 w-full mt-4'>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mb: 2, float: 'right',
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
                                        <ToastContainer />
                                    </div>
                                </div>
                                <div className='flex mt-4 flex-col justify-center mb-[40px] verifyMd'>
                                    <div className='xl:mt-0 w-full mt-4'>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mb: 2, float: 'right',
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
                                        <ToastContainer />
                                    </div>
                                    <div className='flex justify-center mt-2 gap-1 text-sm'>
                                        <h2>Đã có tài khoản?</h2>
                                        <a onClick={handleLogin} className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B] hover:cursor-pointer'>Đăng nhập</a>
                                    </div>
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