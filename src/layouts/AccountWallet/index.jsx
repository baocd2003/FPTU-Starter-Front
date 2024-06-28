import { Backdrop, BottomNavigation, BottomNavigationAction, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, InputAdornment, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, colors } from "@mui/material";
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
import "./index.css"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';


function AccountWallet() {
  const [isLoading, setIsLoading] = useState(true);
  const [userWallet, setUserWallet] = useState(null);
  const [open, setOpen] = useState(false);
  const [openWithdrawForm, setOpenWithdrawForm] = useState(false)
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [priceInput, setPriceInput] = useState(2000);
  const [withdrawAmount, setWithdrawAmount] = useState(5000);
  const priceRef = useRef(2000);

  const token = Cookies.get("_auth");

  const fetchUserWallet = () => {
    walletApiInstance.get("/user-wallet", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUserWallet(res.data._data);
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
  }, [token]);
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
              text: "Bạn đã nạp tiền vào ví thành công!",
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
      if(userWallet.bankAccount == null || userWallet.bankAccount == undefined){
        setOpenWithdrawForm(false);
        Swal.fire({
          title: "Vui lòng liên kết ví của bạn với tài khoản ngân hàng ",
          icon: "warning"
        });
        return;
      }
      if(withdrawAmount < 5000){
        setOpenWithdrawForm(false)
        Swal.fire({
          title: "Số tiền rút phải trên 5000 đồng",
          icon: "warning"
        });
      }else{
        const withdrawResponse = await withdrawApiInstance.post('/withdraw-wallet-request', {
          amount : withdrawAmount,
          bankAccountRequest:{
            ownerName : userWallet.bankAccount.ownerName,
            bankAccountNumber : userWallet.bankAccount.bankAccountNumber,
            bankAccountName : userWallet.bankAccount.bankAccountName
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
              {/* <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#FBB03B",
                  fontSize: ".8rem"
                }}>
                Ví tiền của {userWallet.backerId}
              </Typography> */}
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
              <BottomNavigationAction className="wallet_option" disabled label="Liên kết" icon={<AccountBalanceOutlinedIcon />} />
              <BottomNavigationAction className="wallet_option" disabled label="Phương thức" icon={<CreditCardOutlinedIcon />} />

            </BottomNavigation>
          </Box>


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