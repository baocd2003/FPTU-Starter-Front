import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import GoogleButton from 'react-google-button';
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';
// import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (location.hash) {
        console.log("Yes");
        checkIfRedirectedFromOAuth();
    }
    else {
        console.log("No");
    }

    const signIn = useSignIn();
    const navigate = useNavigate();
    const notify = (mess) => {
        toast.warn(mess, {
            position: "bottom-left"
        });
    }
    const handleRegister = () => {
        navigate('/register');
    };
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
        userApiInstace.post("/login", jsonData).then(res => {
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
        // const testResponse = axios.get("https://localhost:7235/api/Demo", {
        //     headers: {
        //         Authorization: `Bearer ${Cookies.get("_auth")}`
        //     }
        // }).then(res => {
        //     console.log(res);
        // })

    };

    return (
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
                                        onClick={() => handleGoogleLogin()}
                                        label="Tiếp tục với Google"
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center items-center mb-[40px] mt-8 gap-1 text-sm'>
                                <h2>Chưa có tài khoản?</h2>
                                <a onClick={handleRegister} className='underline text-[#44494D] transition-colors duration-300 hover:text-[#FBB03B] hover:cursor-pointer'>Đăng ký ngay</a>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div >
    )
}

const handleGoogleLogin = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const CLIENT_ID =
        "252559592629-ccrsf6knt2jcvo4b706geb6ubrcn4ojk.apps.googleusercontent.com";
    const REDIRECTED_URL = "http://localhost:5173/login";

    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    var params = {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECTED_URL,
        response_type: "token",
        scope: "openid profile email",
        include_granted_scopes: "true",
        state: "somerandomstatevalue",
    };

    for (var p in params) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
};

const checkIfRedirectedFromOAuth = () => {
    var fragmentString = location.hash.substring(1);
    var params = {};
    var regex = /([^&=]+)=([^&]*)/g,
        m;
    while ((m = regex.exec(fragmentString))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0 && params["state"]) {
        if (params["state"] == "somerandomstatevalue") {
            localStorage.setItem("oauth2-test-params", JSON.stringify(params));
            GetGoogleUser();
        } else {
            console.log("State mismatch. Possible CSRF attack");
        }
    }
}

const GetGoogleUser = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    if (params && params["access_token"]) {
        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                params: {
                    access_token: params["access_token"],
                },
            })
            .then((response) => {
                console.log("Google data: " + JSON.stringify(response.data, null, 2));

                userApiInstace
                    .get("check-user-exist", {
                        params: { email: response.data.name },
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.data == false) {
                            const jsonData = {
                                accountName: response.data.email.split('@')[0],
                                name: response.data.email.split('@')[0],
                                email: response.data.email,
                                password: response.data.email.toUpperCase() + "a",
                                confirmPassword: response.data.email.toUpperCase() + "a",
                            };
                            const notify = (mess) => {
                                toast.warn(mess, {
                                    position: "bottom-left"
                                });
                            }
                            userApiInstace.post("/register-google", jsonData).then((res) => {
                                console.log(res.data);
                                if (res.data._data == null) {
                                    notify(`${res.data._message[0]}`);
                                } else {
                                    signIn({
                                        auth: {
                                            token: res.data._data.token,
                                            type: "Bearer",
                                        },
                                        expiresIn: 3600 * 24 * 5,
                                        tokenType: "Bearer",
                                        authState: { email: jsonData.email },
                                    });
                                    navigate("/home");
                                }
                            });
                        } else {
                            const jsonData = {
                                email: response.data.email,
                                password: response.data.email.toUpperCase() + "a",
                            };
                            userApiInstace.post("/login", jsonData).then((res) => {
                                console.log(res.data);
                                if (res.data._data == null) {
                                    notify(`${res.data._message[0]}`);
                                } else {
                                    signIn({
                                        auth: {
                                            token: res.data._data.token,
                                            type: "Bearer",
                                        },
                                        expiresIn: 3600,
                                        tokenType: "Bearer",
                                        authState: { email: jsonData.email },
                                    });
                                    console.log(Cookies.get("_auth"));
                                    if (Cookies.get("_auth") != undefined) {
                                        navigate("/");
                                    }
                                }
                            });
                        }
                    });
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // invalid token => prompt for user permission.
                    handleGoogleLogin();
                } else {
                    console.error("Error fetching user data:", error);
                }
            });
    } else {
        handleGoogleLogin();
    }
}

export default SignIn