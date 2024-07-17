import {
  Backdrop, BottomNavigation,
  BottomNavigationAction, Box, Button,
  CircularProgress, Container,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Divider,
  InputAdornment, Modal, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField,
  Typography, colors, Fade, FormControl, Autocomplete, Avatar
} from "@mui/material";
import FSUAppBar from "../../components/AppBar";
import Cookies from "js-cookie";
import { useEffect, useState, forwardRef, useRef } from "react";
import walletApiInstance from "../../utils/apiInstance/walletApiInstance";
import withdrawApiInstance from "../../utils/apiInstance/withdrawApiInstance";
import { loadWalletMoney, getPayOSTransaction } from "../../hooks/usePayOs";
import { usePayOS, PayOSConfig } from "payos-checkout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addLoadedMoneyToWallet } from "../../hooks/useWallet";
import "./index.css";
import { AccountBalance } from "@mui/icons-material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import axios from "axios";

function AccountWallet() {
  const [isLoading, setIsLoading] = useState(true);
  const [userWallet, setUserWallet] = useState(null);
  const [open, setOpen] = useState(false);
  const [openWithdrawForm, setOpenWithdrawForm] = useState(false)
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [priceInput, setPriceInput] = useState(2000);
  const [withdrawAmount, setWithdrawAmount] = useState(5000);
  const [openCheckBank, setOpenCheckBank] = useState(false);
  const priceRef = useRef(2000);
  const [selectedBank, setSelectedBank] = useState();
  const [banks, setBanks] = useState([]);
  const [bankOwner, setBankOwner] = useState()
  const [accountNumber, setAccountNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [bankOption, setBankOption] = useState();
  const token = Cookies.get("_auth");

  const fetchUserWallet = () => {
    walletApiInstance.get("/user-wallet", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUserWallet(res.data._data);
        if(res.data._data.bankAccount){
          let bank = res.data._data.bankAccount
          if(bank.bankAccountNumber){
            setAccountNumber(bank.bankAccountNumber);
          }
          if(bank.ownerName){
            setBankOwner(bank.ownerName)
          }
          if(bank.bankAccountName){
            setSelectedBank(bank.bankAccountName)
          }         
        }
      })
      .catch(error => {
        console.error('Error fetching user wallet:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchUserWallet();
    const banksResult = axios.get("https://api.httzip.com/api/bank/list").then(res => {
      setBanks(res.data.data);
     
    })
  }, [token]);

  console.log(bankOption)
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
    if(selectedBank && accountNumber){
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
    }else{
      alert("False");
    }
    
  }
  const handleBankChange = (event, newValue) => {
    console.log(newValue);
    setSelectedBank(newValue);
  };
  console.log(userWallet)

  const handleOpenLoadMoneyForm = () => {
    setOpen(true);
  }

  const handleCreatePayment = async () => {
    try {
      setOpen(false);
      setIsLoading(true);
      const response = await loadWalletMoney(priceInput);
      if (response.data == null) throw new Error("Call Api failed: ");
      openPaymentDialog(response.data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  // Function to format the date and time
function formatDateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return now.toLocaleString('vi-VN', options);
}

  const openPaymentDialog = async (checkOutResponse) => {
    if (checkOutResponse) {
      const url = checkOutResponse.checkoutUrl;
      const returnUrl = import.meta.env.VITE_APP_URL.toString();
      const payOSConfig = {
        RETURN_URL: returnUrl,
        ELEMENT_ID: "config_root",
        CHECKOUT_URL: url,
        onSuccess: async (event) => {
          console.log("onsuccess", event.orderCode);
          setIsLoading(true);
          try {
            const payOsTransaction = await getPayOSTransaction(event.orderCode);
            console.log(payOsTransaction.data.data);
            const transactionData = {
              walletId: userWallet.id,
              amount: payOsTransaction.data.data.amount,
              createdDate: payOsTransaction.data.data.createdAt
            }
            console.log(transactionData);
            const updateWallet = await addLoadedMoneyToWallet(transactionData);
            // console.log("updateWalletResult", updateWallet);
            fetchUserWallet();
            Swal.fire({
              title: "Giao dịch thành công!",
              html: `Bạn đã nạp <b style='color:#FCAE3D'>${payOsTransaction.data.data.amount}</b> vào ví thành công ${formatDateTime()}!`,
              icon: "success"
            });
          } catch (err) {
            Swal.fire({
              title: "Đã có lỗi!",
              text: err.response?.data || "Đx",
              icon: "warning"
            });
          }
          setIsLoading(false);
        },
        onCancel: (event) => {
          // console.log("onCancel", event);
        },
        onExit: (event) => {
          // console.log("onExit", event);
        }
      };
      const { open } = usePayOS(payOSConfig);
      open();
    }
  }

  const handleWithdraw = async () => {
    fetchUserWallet();
    console.log(withdrawAmount)
    if (userWallet.bankAccount == null || userWallet.bankAccount == undefined) {
      setOpenWithdrawForm(false);
      Swal.fire({
        title: "Vui lòng liên kết ví của bạn với tài khoản ngân hàng ",
        icon: "warning"
      });
      return;
    }
    if (withdrawAmount < 5000) {
      setOpenWithdrawForm(false)
      Swal.fire({
        title: "Số tiền rút phải trên 5000 đồng",
        icon: "warning"
      });
    } else {
      const withdrawResponse = await withdrawApiInstance.post('/withdraw-wallet-request', {
        amount: withdrawAmount,
        bankAccountRequest: {
          ownerName: userWallet.bankAccount.ownerName,
          bankAccountNumber: userWallet.bankAccount.bankAccountNumber,
          bankAccountName: userWallet.bankAccount.bankAccountName
        }
      }, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        Swal.fire({
          title: "Tạo yêu cầu rút tiền thành công!",
          text: "Thời gian xử lí diễn ra từ 2-3 ngày!",
          icon: "success"
        });
        fetchUserWallet();
      })
      console.log(withdrawResponse)
      setOpenWithdrawForm(false)
    }

  }

  const handleConnectBank = async () => {
    const bankName = (banks.find((bank) => bank.code == selectedBank)).name
    const data = {
      ownerName: bankOwner,
      bankAccountNumber: accountNumber,
      bankAccountName: selectedBank
    }
    await walletApiInstance.post(`connect-wallet-bank/${userWallet.id}`,data).then(res => {
      console.log(res.data);
      handleCloseCheckBank();
      Swal.fire({
        title: "Liên kết thành công!",
        text: "Bạn đã liên kết tài khoản vào ví thành công!",
        icon: "success"
      });
    })
  }

  const handleOpenCheckBank = () => {
    const selectBankName = banks.filter(b => b.code == selectedBank);
    console.log(selectedBank)
    setBankOption(selectBankName);
    setOpenCheckBank(true);
  }

  const handleCloseCheckBank = () => {
    setOpenCheckBank(false);
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // console.log(userWallet);

  return (
    <>
      <FSUAppBar isLogined={Cookies.get("_auth") !== undefined ? true : false} />
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 100,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>Tạo lệnh nạp tiền</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            label="Nhập số tiền bạn muốn nạp vào ví"
            fullWidth
            variant="outlined"
            defaultValue="2000"
            onChange={(e) => setPriceInput(e.target.value)}
            // inputRef={priceRef}
            value={priceInput}
            InputProps={{
              startAdornment: <InputAdornment position="start">VND</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={handleCreatePayment}>Nạp</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openWithdrawForm}
        keepMounted
        onClose={() => setOpenWithdrawForm(false)}
        fullWidth
      >
        <DialogTitle>Tạo lệnh rút tiền</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            label="Nhập số tiền bạn muốn rút từ ví"
            fullWidth
            variant="outlined"
            defaultValue="5000"
            type="number"
            onChange={(e) => setWithdrawAmount(e.target.value)}
            inputRef={priceRef}
            InputProps={{
              startAdornment: <InputAdornment position="start">VND</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdrawForm(false)}>Hủy</Button>
          <Button onClick={handleWithdraw}>Tiếp tục</Button>
        </DialogActions>
      </Dialog>
      {userWallet && (
        <Box sx={{ background: "#F0F0F0", minHeight: "150vh" }}>
          <Box
            sx={{
              background: "#FBB03B",
              height: "15rem",
              borderBottomRightRadius: "30rem 3rem",
              borderBottomLeftRadius: "30rem 3rem",
              backgroundImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(255, 255, 255, 0.1))',
            }}>
          </Box>
          <Box
            component={Paper}
            elevation={10}
            sx={{
              background: "white",
              height: "15rem",
              px: 3,
              pt: 2,
              width: "40%",
              margin: "auto",
              mt: -15,
              position: "relative"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 1, mb: 2, position: "absolute", top: 20, right: 30 }}>
              <AccountBalanceWalletIcon sx={{ fontSize: "2.5rem", color: "#FBB03B" }} />
            </Box>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "#FBB03B",
                fontSize: ".8rem"
              }}>
              Số dư
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "1.5rem"
              }}>
              {userWallet.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span style={{ fontSize: "1rem" }}>đ</span>
            </Typography>
            <Divider sx={{ my: 3 }} />
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{
                justifyContent: "space-around", gap: {
                  xs: "1rem",
                  lg: "3rem",
                  xl: "4.5rem",
                },
              }}
            >
              <BottomNavigationAction className="wallet_option" onClick={handleOpenLoadMoneyForm} label="Nạp tiền" icon={<AddBoxOutlinedIcon />} />
              <BottomNavigationAction className="wallet_option" onClick={() => setOpenWithdrawForm(true)} label="Rút tiền" icon={<GetAppOutlinedIcon />} />
              <BottomNavigationAction className="wallet_option" onClick={handleOpenCheckBank} label="Liên kết" icon={<AccountBalanceOutlinedIcon />} />
              <BottomNavigationAction className="wallet_option" disabled label="Phương thức" icon={<CreditCardOutlinedIcon />} />

            </BottomNavigation>
          </Box>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openCheckBank}
            onClose={handleCloseCheckBank}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={openCheckBank}>
              <Box sx={style}>
                <Box
                  component={Paper}
                  elevation={3}
                  sx={{
                    borderRadius: '.2rem',
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
                        value={bankOption ? bankOption[0] : null}
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
                            onBlur={() => {
                              if (!selectedBank) {
                                setSelectedBank(undefined);
                              }
                            }}
                          />
                        )}
                      />

                    </FormControl>
                    <FormControl className="w-full" sx={{ marginBottom: '2rem !important' }} >
                      <TextField
                        value={accountNumber}
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
                        value={bankOwner}
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
                <Button onClick={handleConnectBank} variant='contained'
                  disabled={!bankOwner && !accountNumber}
                  sx={{
                    background: '#FBB03B', fontWeight: 'bold', marginTop:'20px',
                    '&:hover': {
                      background: '#CC9847'
                    },
                    '&:focus': {
                      outline: 'none'
                    }
                  }}>Liên kết</Button>
              </Box>
            </Fade>
          </Modal>

          <Container
            sx={{
              maxWidth: { lg: "lg", xl: "xl", xs: "xs" },
            }}
          >
            <Divider sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "rgba(0, 0, 0, 0.6)", my: 3 }}>Hoạt động của ví</Divider>

            <TableContainer component={Paper} elevation={10} >
              <Table>
                <caption style={{ captionSide: "top", fontWeight: "bold", fontSize: "1.1rem" }}>Giao dịch gần đây</caption>
                <TableHead sx={{ background: 'rgba(0, 0, 0, 0.3)', px: 2, }}>
                  <TableRow sx={{ fontWeight: "bold", borderStartStartRadius: "1rem", }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }}>Phương thức</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }} align="right">Mô tả</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }} align="right">Thời gian</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }} align="right">Số tiền</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }} align="right">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ px: 2 }}>
                  {userWallet.transactions.map((trans) => (
                    <TableRow
                      key={trans.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Chuyển khoản
                      </TableCell>
                      <TableCell align="right">{trans.description}</TableCell>
                      <TableCell align="right">{formatDate(trans.createDate)}</TableCell>
                      <TableCell align="right">{trans.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</TableCell>
                      <TableCell align="right">Thành công</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      )
      }
    </>
  )
}

export default AccountWallet;