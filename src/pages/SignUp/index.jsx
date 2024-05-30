import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';

function SignUp() {
    const [accountName, setAccountName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const { setIsLoading } = useOutletContext();
    const navigate = useNavigate();
    const notify = (mess) => {
        toast.warn(mess, {
            position: "bottom-left"
        });
    }
    const handleLogin = () => {
        navigate('/login');
    };
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const jsonData = {
            accountName: accountName,
            name: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        if (!emailRegex.test(email)) {
            notify("Invalid email");
            return;
        }
        if (password != confirmPassword) {
            notify("Confirm password is not matching");
            return;
        }
        try {
            userApiInstace.post("/Register-Backer", jsonData).then(res => {
                console.log(res.data);
                if (res.data._data == null) {
                    notify(`${res.data._message[0]}`);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    navigate("/verification", { state: { userName, email } });
                }
            })
        } catch (error) {
            notify("An error occurred. Please try again.");
        }
    };
    return (
        <>
            <div className='flex justify-center items-center md:h-screen h-fit md:min-h-[1000px] xl:min-h-0 pt-[100px]'>
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
                                mt: { lg: '0px', xs: '40px' },
                                mb: { lg: '0px', xs: '40px' },
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
                                        onChange={() => setChecked(!checked)}
                                    />
                                </div>
                                <div className='lg:flex lg:mt-4 lg:flex-row lg:justify-between lg:mb-[40px] hidden'>
                                    <div className='flex justify-center mt-2 gap-1 text-sm'>
                                        <h2>Đã có tài khoản?</h2>
                                        <a onClick={handleLogin} className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B] hover:cursor-pointer'>Đăng nhập</a>
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
                                            disabled={!checked}
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

export default SignUp