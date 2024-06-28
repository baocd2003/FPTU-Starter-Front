import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import OTPVerificationModal from "../OTPVerificationModal";

function SignUpModal() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [accountName, setAccountName] = useState("");
    const [accountNameError, setAccountNameError] = useState('');
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState('');

    const [registerError, setRegisterError] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    const [inputOTP, isInputOTP] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
        return passwordRegex.test(password);
    };

    const handleAccountNameChange = (event) => {
        setRegisterError('');
        setAccountName(event.target.value);
        if (!event.target.value) {
            setAccountNameError('Vui lòng nhập tên tài khoản');
        } else {
            setAccountNameError('');
        }
        return;
    };

    const handleUserNameChange = (event) => {
        setRegisterError('');
        setUserName(event.target.value);
        if (!event.target.value) {
            setUserNameError('Vui lòng nhập họ và tên');
        } else {
            setUserNameError('');
        }
        return;
    };

    const handleEmailChange = (event) => {
        setRegisterError('');
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
        setRegisterError('');
        setPassword(event.target.value);
        if (!event.target.value) {
            setPasswordError('Vui lòng nhập mật khẩu');
        } else if (!validatePassword(event.target.value)) {
            setPasswordError('Mật khẩu phải có ít nhất 7 chữ, tối thiểu 1 in hoa, 1 kí tự đặc biệt và 1 số');
        } else {
            setPasswordError('');
        }
        return;
    };

    const handleConfirmPasswordChange = (event) => {
        setRegisterError('');
        setConfirmPassword(event.target.value);
        if (!event.target.value) {
            setConfirmPasswordError('Vui lòng xác nhận mật khẩu');
        } else if (event.target.value != password) {
            setConfirmPasswordError('Mật khẩu xác nhận phải giống mật khẩu đã đặt');
        } else {
            setConfirmPasswordError('');
        }
        return;
    };

    const validateForm = () => {
        let emailValidation = true;
        let passwordValidation = true;
        let accountNameValidation = true;
        let userNameValidation = true;
        let confirmPasswordValidation = true;

        if (!accountName) {
            setAccountNameError('Vui lòng nhập tên tài khoản');
            accountNameValidation = false;
        } else {
            setAccountNameError('');
        }

        if (!userName) {
            setUserNameError('Vui lòng nhập họ và tên');
            userNameValidation = false;
        } else {
            setUserNameError('');
        }

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
        } else if (!validatePassword(password)) {
            setPasswordError('Mật khẩu phải có ít nhất 7 chữ, tối thiểu 1 in hoa, 1 kí tự đặc biệt và 1 số');
            passwordValidation = false;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Vui lòng xác nhận mật khẩu');
            confirmPasswordValidation = false;
        } else if (confirmPassword != password) {
            setConfirmPasswordError('Mật khẩu xác nhận phải giống mật khẩu đã đặt');
            confirmPasswordValidation = false;
        } else {
            setConfirmPasswordError('');
        }

        return emailValidation && passwordValidation && accountNameValidation && userNameValidation && confirmPasswordValidation;
    };

    const handleSubmit = (event) => {
        setButtonDisable(true);
        setButtonLoading(true);

        event.preventDefault();
        if (validateForm()) {
            const data = new FormData(event.currentTarget);
            const jsonData = {
                accountName: userName,
                name: accountName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            try {
                userApiInstace.post("/Register-Backer", jsonData).then(res => {
                    if (res.data._data == null) {
                        setRegisterError(`${res.data._message[0]}`);
                    } else {
                        isInputOTP(true);
                        setButtonDisable(false);
                        setButtonLoading(false);
                    }
                })
            } catch (error) {
                setRegisterError("Lỗi xảy ra, vui lòng thử lại sau.");
            }
        }
        setButtonDisable(false);
        setButtonLoading(false);
    }

    const handleOpenOTPVerification = () => {
        isInputOTP(true);
    };

    const handleCloseOTPVerification = () => {
        isInputOTP(false);
    };

    return (
        <div className="flex flex-row items-center h-full">
            <div className='flex flex-col justify-center items-center !h-full login-section w-full px-[3.2rem]'>
                {inputOTP ? <OTPVerificationModal onClose={handleCloseOTPVerification} userName={accountName} email={email} /> :
                    <>
                        <div className='text-[#44494D] text-[2rem] font-bold mb-[0.4rem] text-center !w-full'>Tạo tài khoản</div>
                        <p className="text-[#44494D]/70 text-center !w-full">
                            Vui lòng nhập thông tin cần thiết dưới đây để đăng ký.
                        </p>
                        <Box component="form" onSubmit={handleSubmit} sx={{
                            marginTop: '2.4rem',
                            width: '100%'
                        }}>
                            <div>
                                <div className='flex flex-row justify-between mb-[1rem]'>
                                    <TextField
                                        id="accountName"
                                        label="Tên tài khoản"
                                        name="accountName"
                                        error={!!accountNameError}
                                        helperText={accountNameError}
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
                                            fontSize: '1rem',
                                            '@media (min-width: 1200px)': {
                                                '& div': {
                                                    width: '95%',
                                                },
                                            },
                                            '& .Mui-error': {
                                                color: '#ed1c24',
                                                borderColor: '#ed1c24',
                                            },
                                            '& .MuiFormHelperText-root.Mui-error': {
                                                color: '#ed1c24',
                                                marginLeft: '0'
                                            }
                                        }}
                                        value={accountName}
                                        onChange={handleAccountNameChange}
                                    />
                                    <TextField
                                        id="userName"
                                        label="Họ và tên"
                                        name="userName"
                                        error={!!userNameError}
                                        helperText={userNameError}
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
                                            fontSize: '1rem',
                                            '@media (min-width: 1200px)': {
                                                '& div': {
                                                    width: '95%',
                                                    marginRight: '0',
                                                    marginLeft: 'auto',
                                                },
                                                '& label': {
                                                    marginLeft: '6%',
                                                },
                                            },
                                            '& .Mui-error': {
                                                color: '#ed1c24',
                                                borderColor: '#ed1c24',
                                            },
                                            '& .MuiFormHelperText-root.Mui-error': {
                                                color: '#ed1c24',
                                                marginLeft: '6%'
                                            }
                                        }}
                                        value={userName}
                                        onChange={handleUserNameChange}
                                    />
                                </div>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ Email"
                                    name="email"
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
                                        },
                                        mb: '1rem'
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    name="confirmPassword"
                                    label="Xác nhận lại mật khẩu"
                                    type="password"
                                    id="confirmPassword"
                                    error={!!confirmPasswordError}
                                    helperText={confirmPasswordError}
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
                                        fontSize: '10px',
                                        '& .Mui-error': {
                                            color: '#ed1c24',
                                            borderColor: '#ed1c24',
                                        },
                                        '& .MuiFormHelperText-root.Mui-error': {
                                            color: '#ed1c24',
                                            marginLeft: '0'
                                        },
                                    }}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <div className='flex mt-[0.4rem] justify-between items-center'>
                                {registerError && <span className='text-[#ED1C24] font-medium text-sm'>{registerError}</span>}
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
                                        Đăng ký
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
                    </>
                }
            </div>
        </div>
    )
}

export default SignUpModal