import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import GoogleButton from 'react-google-button';
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import userApiInstace from '../../utils/apiInstance/userApiInstace';
import './index.css';

function setCookie(name, value, expiresIn) {
  var now = new Date();
  var time = now.getTime() + (7 * 60 * 60 * 1000);
  var expireTime = time + 1000 * expiresIn;
  now.setTime(expireTime);
  const cookieString = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useOutletContext();

  if (location.hash) {
    setIsLoading(true);
    checkIfRedirectedFromOAuth();
  }
  else {
    // console.log("No");
  }

  const signIn = useSignIn();
  const navigate = useNavigate();
  //error message
  const notify = (mess) => {
    toast.warn(mess, {
      position: "bottom-left"
    });
  }
  const handleRegister = () => {
    navigate('/register');
  };

  var now = new Date();
  var time = now.getTime();
  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    userApiInstace.post("login", jsonData).then(res => {
      if (res.data._data == null) {
        notify(`${res.data._message[0]}`);
      } else {
        const decodedToken = jwtDecode(res.data._data.token);
        const userRole = decodedToken.role;
        signIn({
          auth: {
            token: res.data._data.token,
            type: 'Bearer'
          },
          expiresIn: 3600,
          tokenType: "Bearer",
          userState: { email: jsonData.email, role: userRole }
        })

        Swal.fire({
          title: "Thành công",
          text: "Đăng nhập thành công",
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
        setCookie("_auth", Cookies.get("_auth"), 3600);
      }
      setIsLoading(false);
    })
  };

  return (
    <>
      <div className='flex justify-center items-center md:h-screen h-fit md:min-h-[800px] xl:min-h-0'>
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
                  <a onClick={() => navigate('/forgot-password')} className='lg:w-1/2 underline text-[rgb(68,73,77)] transition-colors duration-300 hover:text-[#FBB03B] text-sm text-left cursor-pointer'>
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
    </>
  )
}

const handleGoogleLogin = () => {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const CLIENT_ID =
    "252559592629-ccrsf6knt2jcvo4b706geb6ubrcn4ojk.apps.googleusercontent.com";
  const REDIRECTED_URL = import.meta.env.VITE_APP_URL.toString() + 'login';
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

const checkIfRedirectedFromOAuth = () => {
  var fragmentString = location.hash.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0 && params["state"]) {
    // const { setIsLoading } = useOutletContext();
    // setIsLoading(true);
    if (params["state"] == "d8b5390695d765a6f2f7bf59b4134d751e21588b464153b44d68eda52c4dc1b2%7C838e080b0a4f8816524cb68c72ab63c193cc01e9624614080acc13833ebe1d13") {
      localStorage.setItem("oauth2-test-params", JSON.stringify(params));

      GetGoogleUser();
      // setIsLoading(false)
    } else {
      console.log("State mismatch. Possible CSRF attack");
    }
  }
}

const GetGoogleUser = async () => {
  const { setIsLoading } = useOutletContext();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const params = JSON.parse(localStorage.getItem("oauth2-test-params"));
  const notify = (mess) => {
    toast.warn(mess, {
      position: "bottom-left"
    });
  }
  if (params && params["access_token"]) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        params: {
          access_token: params["access_token"],
        },
      })
      .then((response) => {
        userApiInstace.post("/google-login", {
          email: response.data.email,
          name: response.data.name,
          avatarUrl: response.data.picture
        }).then((res) => {
          if (res.data._isSuccess) {
            signIn({
              auth: {
                token: res.data._data.token,
                type: "Bearer"
              },
              expiresIn: 3600 * 24 * 5,
              tokenType: "Bearer",
              authState: { email: response.data.email }
            });
            navigate("/home");
          } else {
            notify(res.data._message);
          }
        }).catch((error) => {
          if (error.response && error.response.data) {
            notify(error.response.data[0]);
          } else {
            console.error("Error during Google login:", error);
            notify("An error occurred during Google login. Please try again.");
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
      })
    setIsLoading(false)

  } else {
    handleGoogleLogin();
    // setIsLoading(false);
  }
}

export default SignIn