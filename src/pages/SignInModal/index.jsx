import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import ForgotPasswordModal from "../ForgotPasswordModal";
import './index.css';

function setCookie(name, value, expiresIn) {
    var now = new Date();
    var time = now.getTime() + (7 * 60 * 60 * 1000);
    var expireTime = time + 1000 * expiresIn;
    now.setTime(expireTime);
    console.log(now);
    console.log(now.toUTCString());
    const cookieString = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
    document.cookie = cookieString;
}

function LoginModal() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loginError, setLoginError] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleCloseForgotPassword = () => {
        setShowForgotPassword(false);
    };

    const signIn = useSignIn();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (event) => {
        setLoginError('');
        setEmail(event.target.value);
        if (!event.target.value) {
            setEmailError('Vui lòng nhập địa chỉ email');
        } else if (!validateEmail(event.target.value)) {
            setEmailError('Vui lòng nhập đúng định dạng email');
        } else {
            setEmailError('');
        }
        return;
    };

    const handlePasswordChange = (event) => {
        setLoginError('');
        setPassword(event.target.value);
        if (!event.target.value) {
            setPasswordError('Vui lòng nhập mật khẩu');
        } else {
            setPasswordError('');
        }
        return;
    };

    const handleSubmit = (event) => {
        setButtonDisable(true);
        setButtonLoading(true);

        event.preventDefault();
        let emailValidation = true;
        let passwordValidation = true;

        if (!email) {
            setEmailError('Vui lòng nhập địa chỉ email');
            emailValidation = false;
        } else if (!validateEmail(email)) {
            setEmailError('Vui lòng nhập đúng định dạng email');
            emailValidation = false;
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu');
            passwordValidation = false;
        } else {
            setPasswordError('');
        }
        if (emailValidation && passwordValidation) {
            const data = new FormData(event.currentTarget);
            const jsonData = {
                email: data.get('email'),
                password: data.get('password'),
            }
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
            userApiInstace.post("/login", jsonData).then(res => {
                if (res.data._data == null) {
                    setLoginError(`${res.data._message[0]}`);
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
                        text: "Đăng nhập thành công",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            container: 'my-swal'
                        },
                    }).then(() => {
                        setTimeout(() => {
                            if (Cookies.get("_auth") !== undefined) {
                                navigate("/");
                            }
                        }, 0);
                    });
                    setCookie("_auth", Cookies.get("_auth"), 3600);
                }
            })
        }
        setButtonDisable(false);
        setButtonLoading(false);
    }

    if (location.hash) {
        checkIfRedirectedFromOAuth();
    }

    return (
        <div className="flex flex-row items-center h-full">
            <div className='flex flex-col justify-center items-center !h-full login-section w-full px-[3.2rem]'>
                {showForgotPassword ? (
                    <ForgotPasswordModal onClose={handleCloseForgotPassword} />
                ) : (
                    <>
                        <div className='text-[#44494D] text-[2rem] font-bold mb-[0.4rem] text-center !w-full'>Đăng nhập</div>
                        <p className="text-[#44494D]/70 text-center !w-full">
                            Chào mừng trở lại! Vui lòng nhập thông tin tài khoản.
                        </p>
                        <Box component="form" onSubmit={handleSubmit} sx={{
                            marginTop: '2.4rem',
                            width: '100%'
                        }}>
                            <div>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ Email"
                                    name="email"
                                    autoFocus
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={!!emailError}
                                    helperText={emailError}
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
                                        fontSize: '1rem',
                                        '& .Mui-error': {
                                            color: '#ed1c24',
                                            borderColor: '#ed1c24',
                                        },
                                        '& .MuiFormHelperText-root.Mui-error': {
                                            color: '#ed1c24',
                                            marginLeft: '0'
                                        },
                                        mb: '1rem'
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Mật khẩu"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={!!passwordError}
                                    helperText={passwordError}
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
                                        fontSize: '1rem',
                                        '& .Mui-error': {
                                            color: '#ed1c24',
                                            borderColor: '#ed1c24',
                                        },
                                        '& .MuiFormHelperText-root.Mui-error': {
                                            color: '#ed1c24',
                                            marginLeft: '0'
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex mt-[0.4rem] justify-between items-center'>
                                {loginError && <span className='text-[#ED1C24] font-medium text-sm'>{loginError}</span>}
                                <a onClick={handleForgotPassword} className='ml-auto underline text-[#44494D]/50 transition-colors duration-300 hover:text-[#44494D] text-sm cursor-pointer underline-offset-2'>
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className='w-full mt-[1.4rem]'>
                                <Box sx={{ position: 'relative' }}>
                                    <Button
                                        type="submit"
                                        sx={{
                                            width: '100%',
                                            backgroundColor: '#D9D9D9',
                                            color: '#44494D',
                                            fontWeight: 700,
                                            height: '40px',
                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                                            textTransform: 'none',
                                            fontSize: '1rem'
                                        }}
                                        className='login-btn'
                                        disabled={buttonDisable}
                                    >
                                        Đăng nhập
                                    </Button>
                                    {buttonLoading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: '#44494D',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Box>
                            </div>
                            <div className='mt-[1.4rem]'>
                                <div className="w-full py-2 flex items-center justify-center relative">
                                    <div className="w-full h-[1px] bg-[#44494D]/20"></div>
                                    <p className="absolute p-2 bg-[#FFFFFF] text-[#44494D]/60 text-[1rem] outline-none">hoặc</p>
                                </div>
                                <div className="w-full flex items-center justify-center mt-[1.4rem] googlebutton">
                                    <GoogleButton
                                        type="light"
                                        style={{
                                            width: "100%",
                                            border: "1px solid #D9D9D9",
                                            borderRadius: '5px',
                                            fontSize: "1rem"
                                        }}
                                        onClick={() => handleGoogleLogin()}
                                        className="my-2"
                                        label="Tiếp tục với Google"
                                    />
                                </div>
                            </div>
                        </Box>
                    </>
                )}
            </div>
        </div>
    )
}

const handleGoogleLogin = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const CLIENT_ID =
        "252559592629-ccrsf6knt2jcvo4b706geb6ubrcn4ojk.apps.googleusercontent.com";
    const REDIRECTED_URL = import.meta.env.VITE_APP_URL.toString() + 'home';

    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    var params = {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECTED_URL,
        response_type: "token",
        scope: "openid profile email",
        include_granted_scopes: "true",
        state: "d8b5390695d765a6f2f7bf59b4134d751e21588b464153b44d68eda52c4dc1b2%7C838e080b0a4f8816524cb68c72ab63c193cc01e9624614080acc13833ebe1d13",
        prompt: "consent"
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


export default LoginModal;