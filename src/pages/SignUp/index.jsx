import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';

function SignUp() {
    const [accountName, setAccountName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const jsonData = {
            name: accountName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        if (password != confirmPassword) {
            notify("Confirm password is not matching");
        } else {
            userApiInstace.post("/Register-Backer", jsonData).then(res => {
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
                    navigate("/login");
                }
            })
        }

    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='xl:w-screen/4*3 max-w-fit'>
                <Container
                    component="main"
                    maxWidth="xl"
                    sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1), -1px -1px 1px rgba(0, 0, 0, 0.1)',
                        height: 'fit-content',
                        mb: { lg: '10px', md: '50px', sm: '50px', xs: '50px' },
                    }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            mt: { lg: '100px', md: '500px', sm: '700px', xs: '950px' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginLeft: 4,
                            marginRight: 4
                        }}
                    >
                        <div className='mt-[32px] w-full h-full xl:flex xl:items-center xl:flex-row xl:justify-between hidden'>
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
                                    Tạo tài khoản
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
                                    Vui lòng điền đầy đủ thông tin dưới đây
                                </Typography>
                            </div>
                            <img
                                className="w-24 h-24 hidden xl:inline-block"
                                src={logo}
                                alt="Logo"
                            />
                        </div>
                        <div className='mt-[16px] w-full h-full flex items-center xl:hidden flex-col justify-center'>
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
                                Tạo tài khoản
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
                                Vui lòng điền đầy đủ thông tin dưới đây
                            </Typography>
                        </div>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                            marginTop: '16px',
                            marginLeft: 4,
                            marginRight: 4,
                            width: '100%'
                        }}>
                            <div>
                                <div className='flex lg:flex-row lg:justify-between flex-col'>
                                    <TextField
                                        margin="normal"
                                        required
                                        id="accountName"
                                        label="Tên tài khoản"
                                        name="accountName"
                                        autoFocus
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '14px',
                                            },
                                        }}
                                        sx={{
                                            width: '100%',
                                            '& div': {
                                                width: '100%',
                                            },
                                            '& input': {
                                                height: '16px',
                                            },
                                            fontSize: '10px',
                                            '@media (min-width: 1024px)': {
                                                '& div': {
                                                    width: '90%',
                                                },
                                            }
                                        }}
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        id="userName"
                                        label="Họ và tên"
                                        name="userName"
                                        autoFocus
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '14px',
                                            },
                                        }}
                                        sx={{
                                            width: '100%',
                                            '& div': {
                                                width: '100%',
                                            },
                                            '& input': {
                                                height: '16px',
                                            },
                                            fontSize: '10px',
                                            '@media (min-width: 1024px)': {
                                                '& div': {
                                                    width: '90%',
                                                    marginRight: '0',
                                                    marginLeft: 'auto',
                                                },
                                                '& label': {
                                                    marginLeft: '11%',
                                                },
                                            }
                                        }}
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
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
                                    required
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
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="confirmPassword"
                                    label="Xác nhận lại mật khẩu"
                                    required
                                    type="password"
                                    id="confirmPassword"
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-start items-center mt-4 gap-2 !text-sm'>
                                <FormControlLabel
                                    control={<Checkbox size="small" color="primary" />}
                                    label={<span sx={{ fontSize: '14px !important' }}>Tôi đồng ý với điều khoản sử dụng dịch vụ</span>}
                                    labelPlacement="end"
                                />
                            </div>
                            <div className='lg:flex lg:mt-4 lg:flex-row lg:justify-between lg:mb-[40px] hidden'>
                                <div className='flex justify-center mt-2 gap-1 text-sm'>
                                    <h2>Đã có tài khoản?</h2>
                                    <a href='/login' className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B]'>Đăng nhập</a>
                                </div>
                                <div className='lg:w-1/2 xl:mt-0 w-full mt-4'>
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
                                        className='register-btn'
                                    >
                                        Đăng ký
                                    </Button>
                                    <ToastContainer />
                                </div>
                            </div>
                            <div className='flex mt-4 lg:hidden flex-col justify-start mb-[40px]'>
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
                                        className='register-btn'
                                    >
                                        Đăng ký
                                    </Button>
                                </div>
                                <div className='flex justify-center mt-2 gap-1 text-sm'>
                                    <h2>Đã có tài khoản?</h2>
                                    <a href='/login' className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B]'>Đăng nhập</a>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div >
    )
}

export default SignUp