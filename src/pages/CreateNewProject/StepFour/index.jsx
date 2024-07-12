import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "../../../redux/projectStepSlice";
import { Box, Button, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountBalance } from "@mui/icons-material";
import axios from "axios";
import { setFormData } from "../../../redux/projectFormSlice";
import { ToastContainer, toast } from "react-toastify";
import Autocomplete from '@mui/material/Autocomplete';

const StepFour = () => {
  const bankState = useSelector((state) => state.projectForm.projectForm.stepFourData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isValidBank, setIsValidBank] = useState(false)
  const [selectedBank, setSelectedBank] = useState();
  const [banks, setBanks] = useState([]);
  const [bankOwner, setBankOwner] = useState()
  const [accountNumber, setAccountNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const notify = (mess) => {
    toast.warn(mess, {
      position: "bottom-left"
    });
  }
  //test

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setStepFour())
    const banksResult = axios.get("https://api.httzip.com/api/bank/list").then(res => {
      setBanks(res.data.data);
    })
  }, [])

  console.log(banks);
  const onSubmit = () => {
    const bankName = (banks.find((bank) => bank.code == selectedBank)).name
    const data = {
      ownerName: bankOwner,
      bankAccountNumber: accountNumber,
      bankAccountName: bankName
    }
    // const data = {
    //   ownerName: 'CAO KHA SUONG',
    //   bankAccountNumber: 24489267,
    //   bankAccountName: 'Ngân hàng TMCP Á Châu'
    // }
    dispatch(setFormData({ step: 'stepFourData', data }))
    navigate('/init-project/step-five')
  }

  const confirmBank = async () => {
    const data = {
      bank: selectedBank,
      account: accountNumber
    }
    console.log(data);
    setLoading(true);
    await axios.post('https://api.httzip.com/api/bank/id-lookup-prod', data, {
      headers: {
        'x-api-key': `11f028b5-b964-4efa-ab9c-db4e199dccb4key`,
        'x-api-secret': `691b9c60-353e-4e68-946f-ce68292884d0secret`,
      }
    }).then(res => {
      setLoading(false);
      console.log(res.data.code)
      if (res.data.code == 200) {
        setBankOwner(res.data.data.ownerName);

      } else {
        notify(res.data.msg)
      }
    })
  }
  const handleBankChange = (event, newValue) => {
    setSelectedBank(newValue);
  };
  return (
    <>
      <ToastContainer />
      <Box component={Paper} elevation={5} sx={{ width: "100%", overflow: 'hidden' }}>
        <Typography
          sx={{
            fontSize: "2rem", fontWeight: "bold", py: 2, px: 6, color: "white",
            background: "#FBB03B",
            textShadow: ".12rem .12rem .3rem rgba(0, 0, 0, 0.5)"
          }}
        >Xác thực tài khoản ngân hàng</Typography>

        <Box sx={{ px: 6, pt: 3, pb: 2 }}>
          <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)', mb: 1 }}>Xác thực ngân hàng</Divider>
          <Typography sx={{ fontSize: '.8rem' }}>Bạn hãy vui lòng chọn và xác thực tài khoản ngân hàng của mình</Typography>
          <Typography sx={{ fontSize: '.8rem' }}>Thông tin ngân hàng trên sẽ là kênh nhận tiền của bạn khi dự án gọi vốn thành công</Typography>


          {/** Confirmation Box */}

          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Box
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: '.2rem', width: '55%',
                overflow: 'hidden',
              }}
            >
              <Box sx={{
                backgroundImage: 'linear-gradient(to bottom right, #036704,  #3e9c35)', height: '3.5rem', display: 'flex',
                justifyContent: 'center', alignItems: 'center', gap: 2, color: 'white',
              }}>
                <AccountBalance />
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Tài khoản ngân hàng</Typography>
              </Box>

              <Box sx={{ px: 3, py: 2 }}>
                <FormControl className="w-full" sx={{ marginBottom: '2rem !important' }} >
                  {/* <InputLabel>Chọn ngân hàng</InputLabel> */}
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    value={bankState ? bankState.BankAccountName : selectedBank}
                    options={banks}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => handleBankChange(event, newValue.code)}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Avatar alt={option.name} src={option.logo_url}
                          sx={{
                            marginRight: 2, objectFit: 'fill', width: 60,
                            height: 24
                          }} variant="rounded" />
                        <Typography variant="body1">{option.name}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn ngân hàng"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                  {/* <Select
                    value={bankState ? bankState.BankAccountName : selectedBank}
                    label="Chọn ngân hàng"
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    {banks.map((bank, index) => (
                      <MenuItem key={index} value={bank.code}>{bank.name}</MenuItem>
                    ))}
                  </Select> */}
                </FormControl>
                <FormControl className="w-full" sx={{ marginBottom: '2rem !important' }} >
                  <TextField
                    value={bankState ? bankState.BankAccountNumber : accountNumber}
                    type='number'
                    label="Nhập số tài khoản"
                    onChange={(e) => setAccountNumber(e.target.value)}
                  >
                  </TextField>
                </FormControl>
                <FormControl className="w-full" sx={{ marginBottom: '2rem !important' }} >
                  <TextField
                    disabled
                    label='Tên người thụ hưởng'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={bankState != undefined ? bankState.ownerName : bankOwner}
                    sx={{ background: "rgba(0, 0, 0, 0.05)" }}
                  >
                  </TextField>
                </FormControl>

                <Box sx={{ position: 'relative' }}>
                  <Button variant='contained'
                    disableElevation
                    disabled={(selectedBank && accountNumber) ? false : true}
                    onClick={() => confirmBank()}
                    sx={{
                      background: loading ? '#F0F0F0' : '#FBB03B',
                      fontWeight: 'bold',
                      '&:hover': {
                        background: '#CC9847'
                      },
                      '&:focus': {
                        outline: 'none'
                      }
                    }}>Xác nhận</Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: '#4CAF50',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>
              </Box>

            </Box>
          </Box>


          {/**Navigate btns */}
          <Box sx={{ mt: 2, gap: 5, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={() => navigate('/init-project/step-three')} variant='outlined'
              disableElevation
              sx={{
                fontWeight: 'bold',
                borderColor: '#FBB03B',
                color: '#FBB03B',
                '&:hover': {
                  borderColor: '#FBB03B'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Quay lại</Button>
            <Button onClick={onSubmit} variant='contained'
              disableElevation
              disabled={!bankOwner && !bankState}
              sx={{
                background: '#FBB03B', fontWeight: 'bold',
                '&:hover': {
                  background: '#CC9847'
                },
                '&:focus': {
                  outline: 'none'
                }
              }}>Tiếp theo</Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default StepFour;