import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useRef, useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Countdown from 'react-countdown';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import userApiInstace from '../../utils/apiInstance/userApiInstace';
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

function OTPVerificationModal({ userName, email }) {
    const [otp, setOTP] = useState("");
    const [buttonDisable, setButtonDisable] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const signIn = useSignIn();
    const navigate = useNavigate();

    // Define targetTime using useRef to ensure it stays constant
    const targetTime = useRef(Date.now() + 6 * 60 * 1000);

    const handleChange = (newValue) => {
        setOTP(newValue);
    };

    const renderer = ({ minutes, seconds }) => {
        return <span className='text-[#FBB03B] font-bold'>{minutes} phút {seconds} giây</span>;
    };

    const handleSubmit = (event) => {
        setButtonDisable(true);
        setButtonLoading(true);
        event.preventDefault();
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
        setButtonDisable(false);
        setButtonLoading(false);
    };

    return (
        <div className='w-full'>
            <div className='text-[#44494D] text-[2rem] font-bold mb-[0.4rem] text-center !w-full'>Xác thực Email</div>
            <p className="text-[#44494D]/70 mb-2 text-center !w-full">
                Nhập mã OTP đã được gửi đến email để xác thực tài khoản
            </p>
            <Box noValidate sx={{ marginTop: '2.4rem', width: '100%' }}>
                <div className='my-4'>
                    <MuiOtpInput
                        length={6}
                        name="otp"
                        value={otp}
                        onChange={handleChange}
                        className='otpBox'
                        validateChar={(val) => !isNaN(val)}
                    />
                </div>
            </Box>
            <div className='flex my-6 gap-1 text-[1rem] otpTimer'>
                <h2>Mã OTP của bạn còn hiệu lực trong</h2>
                <Countdown date={targetTime.current} renderer={renderer} />
            </div>
            <Box component="form" noValidate sx={{ width: '100%' }}>
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
                            onClick={handleSubmit}
                        >
                            Xác thực
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
            </Box>
        </div>
    )
}

export default OTPVerificationModal;