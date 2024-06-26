import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';

function ForgotPasswordModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [validationError, setValidationError] = useState('');

    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (event) => {
        setValidationError('');
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
    const handleBackLogin = () => {
        onClose();
    }

    const handleSubmit = async (event) => {
        setButtonDisable(true);
        setButtonLoading(true);

        event.preventDefault();
        let emailValidation = true;
        if (!email) {
            setEmailError('Vui lòng nhập địa chỉ email');
            emailValidation = false;
        } else if (!validateEmail(email)) {
            setEmailError('Vui lòng nhập đúng định dạng email');
            emailValidation = false;
        } else {
            setEmailError('');
        }
        if (emailValidation) {
            const data = new FormData(event.currentTarget);
            const emailResponse = await userApiInstace.get('check-user-exist', {
                params: { email: data.get('email') },
            })
            if (emailResponse.data == false) {
                setValidationError("Người dùng không tồn tại, vui lòng đăng ký tài khoản");
                setButtonDisable(false);
                setButtonLoading(false);
                return;
            } else {
                const sendResponse = await userApiInstace.get('send-reset-password-link', {
                    params: { userEmail: data.get('email') },
                })
                if (sendResponse.data._isSuccess === true) {
                    setIsSuccess(true);
                }
            }
        }
        setButtonDisable(false);
        setButtonLoading(false);
    }


    return (
        <>
            {isSuccess ?
                <div className='w-full flex flex-col justify-center items-center'>
                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: '7.2rem', mb: '2rem' }}></CheckCircleIcon>
                    <div className='text-[#44494D] text-[2rem] font-bold mb-[0.4rem] text-center !w-full'>Gửi email thành công</div>
                    <p className="text-[#44494D]/70 mb-2 text-center !w-full">
                        Mật khẩu mới đã được gửi tới email {email} của bạn. Vui lòng đăng nhập lại.
                    </p>
                    <Button onClick={handleBackLogin} variant="outlined" startIcon={<ArrowBackIcon />} className='btnReturn' sx={{ mt: '1.6rem', textTransform: 'none', width: 'full' }}>
                        Quay về Đăng nhập
                    </Button>
                </div>
                :
                <div className='w-full'>
                    <div className='text-[#44494D] text-[2rem] font-bold mb-[0.4rem] text-center !w-full'>Quên mật khẩu</div>
                    <p className="text-[#44494D]/70 mb-2 text-center !w-full">
                        Nhập email đã đăng ký để đặt lại mật khẩu mới
                    </p>
                    <Box component="form" onSubmit={handleSubmit} sx={{
                        marginTop: '2.4rem',
                        width: '100%'
                    }}>
                        <div>
                            <TextField
                                margin="normal"
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
                                        fontSize: '1rem',
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
                        <div className='flex justify-start items-center'>
                            {validationError && <span className='text-[#ED1C24] my-[0.4rem] font-medium text-sm'>{validationError}</span>}
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
                                    Xác nhận
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
                            <Button onClick={handleBackLogin} variant="outlined" startIcon={<ArrowBackIcon />} className='btnReturn' sx={{ mt: '1.6rem', textTransform: 'none', width: '100%' }}>
                                Quay về Đăng nhập
                            </Button>
                        </div>
                    </Box>
                </div>
            }
        </>
    )
}

export default ForgotPasswordModal