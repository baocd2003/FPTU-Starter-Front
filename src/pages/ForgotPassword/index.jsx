import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { setIsLoading } = useOutletContext();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const emailResponse = await userApiInstace.get('check-user-exist', {
            params: { email: email },
        })
        if (emailResponse.data == false) {
            setError("Người dùng chưa tồn tại, vui lòng đăng ký tài khoản");
            setIsLoading(false);
            return;
        } else {
            console.log(email);
            const sendResponse = await userApiInstace.get('send-reset-password-link', {
                params: { userEmail: email },
            })
            if (sendResponse.data._isSuccess === true) {
                Swal.fire({
                    title: "Thành công",
                    text: "Email đã được gửi thành công",
                    icon: "success",
                    showConfirmButton: false,
                });
                setIsLoading(false);
            }
        }
    }
    const handleLogin = () => {
        navigate('/login');
    };
    return (
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
                                    Quên mật khẩu
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
                                    Nhập lại địa chỉ email để đặt lại mật khẩu
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
                                Quên mật khẩu
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
                                Nhập lại địa chỉ email để đặt lại mật khẩu
                            </Typography>
                        </div>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                            marginTop: '8px',
                            marginLeft: 4,
                            marginRight: 4,
                            width: '100%'
                        }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Địa chỉ Email"
                                name="email"
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error && <p className="text-red-400 text-[14px] text-left font-semibold">{error}</p>}
                            <div className='flex mt-[16px] flex-row justify-between mb-[40px] verifyLg'>
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
    )
}


export default ForgotPassword