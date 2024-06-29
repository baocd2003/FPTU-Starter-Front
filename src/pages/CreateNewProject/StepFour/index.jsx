import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "../../../redux/projectStepSlice";
import { Box, Button, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountBalance } from "@mui/icons-material";
import axios from "axios";
import { setFormData } from "../../../redux/projectFormSlice";
import { ToastContainer, toast } from "react-toastify";


const StepFour = () => {
  const bankState = useSelector((state) => state.projectForm.projectForm.stepFourData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isValidBank, setIsValidBank] = useState(false)
  const [selectedBank, setSelectedBank] = useState();
  const [banks, setBanks] = useState([]);
  const [bankOwner, setBankOwner] = useState()
  const [accountNumber, setAccountNumber] = useState()
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
    const banksResult = axios.get("https://api.vietqr.io/v2/banks").then(res => {
      setBanks(res.data.data);
    })
  }, [])

  const onSubmit = () => {
    const bankName = (banks.find((bank) => bank.bin == selectedBank)).name
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


  console.log(banks)
  const confirmBank = async () => {
    const data = {
      bin: selectedBank,
      accountNumber: accountNumber
    }
    setLoading(true);
    await axios.post('https://api.vietqr.io/v2/lookup', data, {
      headers: {
        'x-client-id': '4a055d72-d6ea-4e6d-af6a-6ef1695500dc',
        'x-api-key': '3917cb1f-95f3-44a9-95f2-3ef17bc054af',
      }
    }).then(res => {
      setLoading(false);
      console.log(res.data.code)
      if (res.data.code.toString() == '00') {
        setBankOwner(res.data.data.accountName);

      } else {
        notify(res.data.desc)
      }
    })
  }

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
                  <InputLabel>Chọn ngân hàng</InputLabel>
                  <Select
                    value={bankState ? bankState.BankAccountName : selectedBank}
                    label="Chọn ngân hàng"
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    {banks.map((bank, index) => (
                      <MenuItem key={index} value={bank.bin}>{bank.name}</MenuItem>
                    ))}
                  </Select>
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