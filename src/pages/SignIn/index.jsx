import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import logo from "../../assets/logo.png";
import './index.css';
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from 'axios';
import Cookies from 'js-cookie';
// import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();
    const notify = (mess) => {
        toast.warn(mess, {
            position: "bottom-left"
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        //Save token to cookie
        const response = userApiInstace.post("/login", jsonData).then(res => {
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
                console.log(Cookies.get("_auth"));
                if (Cookies.get("_auth") != undefined) {
                    navigate("/");
                }
            }


        })

        //Add authorization
        const testResponse = axios.get("https://localhost:7235/api/Demo", {
            headers: {
                Authorization: `Bearer ${Cookies.get("_auth")}`
            }
        }).then(res => {
            console.log(res);
        })

    };

    return (
        <div className='flex justify-center items-center md:h-screen h-fit lg:min-h-[800px] xl:min-h-0 pt-[100px]'>
            <div className='xl:w-screen/4*3 max-w-fit'>
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
                                    Đăng nhập
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#000000',
                                        fontSize: '16px',
                                        display: 'block',
                                        fontWeight: 'normal',
                                        clear: 'both',
                                        marginTop: '4px'
                                    }}
                                >
                                    Vui lòng nhập thông tin tài khoản
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
                                Đăng nhập
                            </Typography>
                            <ToastContainer />
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
                                Vui lòng nhập thông tin tài khoản
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
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex mt-4 lg:flex-row lg:justify-between flex-col justify-start'>
                                <a href="#" className='lg:w-1/2 underline text-[rgb(68,73,77)] transition-colors duration-300 hover:text-[#FBB03B] text-sm text-left'>
                                    Quên mật khẩu?
                                </a>
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
                                        Đăng nhập
                                    </Button>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <div className="w-full py-2 flex items-center justify-center relative">
                                    <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
                                    <p className="absolute p-2 bg-[#FFFFFF] text-[#44494D]/60 text-[12px]">hoặc</p>
                                </div>
                                <div className="w-full flex items-center justify-center my-4 googlebutton">
                                    <GoogleButton
                                        type="light"
                                        style={{
                                            width: "100%",
                                            border: "1px solid #D9D9D9",
                                            borderRadius: '5px',
                                            fontSize: "14px",
                                        }}
                                        className="my-2"
                                        onClick={() => alert("Google button clicked")}
                                        label="Tiếp tục với Google"
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center items-center mb-[40px] mt-8 gap-1 text-sm'>
                                <h2>Chưa có tài khoản?</h2>
                                <a href='/register' className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B]'>Đăng ký ngay</a>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div >
    )
}

export default SignIn