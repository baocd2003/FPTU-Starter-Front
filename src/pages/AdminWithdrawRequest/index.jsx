import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { CircularProgress, Grid, Modal, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import withdrawApiInstance from '../../utils/apiInstance/withdrawApiInstance';
import './index.css';

const status = ['Đang chờ', 'Đã tiếp nhận', 'Từ chối', 'Thành công'];
const requestType = ['Ủng hộ miễn phí', 'Ủng hộ qua gói', 'Thêm tiền', 'Rút từ ví', 'Rút từ dự án', 'Hoàn trả', 'Hoa hồng'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    minWidth: '40%',
    bgcolor: 'background.paper',
    boxShadow: '0.4rem',
    px: '4rem',
    py: '2.4rem',
    outline: 'none'
};

function AdminWithdrawRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [withdrawRequest, setWithdrawRequest] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const token = Cookies.get("_auth");

    useEffect(() => {
        fetchWithdrawRequestData();
    }, [token]);

    const fetchWithdrawRequestData = async () => {
        setIsLoading(true);
        if (token) {
            try {
                const response = await withdrawApiInstance.get("", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (Array.isArray(response.data._data)) {
                    setWithdrawRequest(response.data._data);
                } else {
                    setWithdrawRequest([]);
                }
            } catch (error) {
                console.error("Error fetching withdraw request list:", error);
                setWithdrawRequest([]);
            }
        }
        setIsLoading(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
    };

    const isWithinTwoDays = (dateString) => {
        const date = new Date(dateString);
        const currentDate = new Date();
        const diffTime = Math.abs(date - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 2;
    };

    const getStatusStyle = (statusText) => {
        let backgroundColor = '';
        let border = '';
        let color = '';
        switch (statusText) {
            case 0:
                backgroundColor = '#EEEEEE';
                border = '1px solid #A7A7A7';
                color = '#A7A7A7'
                break;
            case 1:
                backgroundColor = '#FFEDD8';
                border = '1px solid #FBB03B';
                color = '#FBB03B'
                break;
            case 2:
                backgroundColor = '#FFE5E1';
                border = '1px solid #ed1c24';
                color = '#ed1c24'
                break;
            case 3:
                backgroundColor = '#CCFFBD';
                border = '1px solid #4CAF50';
                color = '#4CAF50'
                break;
            default:
                backgroundColor = '#9E9E9E';
                border = '1px solid #44494D';
                color = '#44494D'
                break;
        }
        return {
            backgroundColor,
            border,
            color,
            padding: '4px 8px',
            borderRadius: '0.4rem',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '8rem'
        };
    };

    const getRequestTypeStyle = (typeText) => {
        let backgroundColor = '';
        let border = '';
        let color = '';
        switch (typeText) {
            case 3:
                backgroundColor = '#EEEEEE';
                border = '1px solid #44494D';
                color = '#44494D'
                break;
            case 4:
                backgroundColor = '#FFEDD8';
                border = '1px solid #FBB03B';
                color = '#FBB03B'
                break;
            default:
                backgroundColor = '#F5F7F8';
                border = '1px solid #A7A7A7';
                color = '#A7A7A7'
                break;
        }
        return {
            backgroundColor,
            border,
            color,
            padding: '4px 8px',
            borderRadius: '0.4rem',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '8rem'
        };
    };

    const handleOpenModal = (rowData) => {
        setSelectedRow(rowData);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
        setModalOpen(false);
    };

    const handleProcessingRequest = async (selectedRequest) => {
        const formData = new FormData();
        formData.append("requestId", selectedRequest.withdrawRequest.id);
        try {
            switch (selectedRequest.withdrawRequest.requestType) {
                case 3:
                    await withdrawApiInstance.post(`admin-processing-withdraw-wallet`, formData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchWithdrawRequestData();
                    break;
                case 4:
                    await withdrawApiInstance.post(`admin-processing-project-request`, selectedRequest.withdrawRequest.id, {
                        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                    });
                    fetchWithdrawRequestData();
                    break;
                default:
                    console.error("Unknown request type");
            }
        } catch (error) {
            console.error("Error fetching withdraw request list:", error);
        }
        setModalOpen(false);
    }

    const handleApproveRequest = async (selectedRequest) => {
        const formData = new FormData();
        formData.append("requestId", selectedRequest.withdrawRequest.id);
        try {
            switch (selectedRequest.withdrawRequest.requestType) {
                case 3:
                    await withdrawApiInstance.post(`admin-approved-withdraw-wallet-request`, formData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchWithdrawRequestData();
                    break;
                case 4:
                    await withdrawApiInstance.post(`admin-approved-project-request`, selectedRequest.withdrawRequest.id, {
                        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                    });
                    fetchWithdrawRequestData();
                    break;
                default:
                    console.error("Unknown request type");
            }
        } catch (error) {
            console.error("Error fetching withdraw request list:", error);
        }
        setModalOpen(false);
    }

    const handleRejectRequest = async (selectedRequest) => {
        const formData = new FormData();
        formData.append("requestId", selectedRequest.withdrawRequest.id);
        try {
            switch (selectedRequest.withdrawRequest.requestType) {
                case 3:
                    await withdrawApiInstance.post(`admin-rejected-withdraw-wallet`, formData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchWithdrawRequestData();
                    break;
                case 4:
                    await withdrawApiInstance.post(`admin-rejected-withdraw-project`, formData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchWithdrawRequestData();
                    break;
                default:
                    console.error("Unknown request type");
            }
        } catch (error) {
            console.error("Error fetching withdraw request list:", error);
        }
        setModalOpen(false);
    }

    return (
        <div className='mx-[3.2rem] my-[1.2rem]'>
            <h1 className='text-[1.6rem] font-bold mb-[4rem]'>Yêu cầu rút tiền</h1>
            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className='table-header'>Email người rút</TableCell>
                            <TableCell align="left" className='table-header'>Số tiền rút</TableCell>
                            <TableCell align="left" className='table-header'>Ngày hết hạn</TableCell>
                            <TableCell align="left" className='table-header'>Trạng thái</TableCell>
                            <TableCell align="left" className='table-header'>Loại giao dịch</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <CircularProgress color="inherit" sx={{ color: '#44494D' }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {(rowsPerPage > 0
                                ? withdrawRequest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : withdrawRequest
                            ).map((withdrawRequestItem) => (
                                <TableRow
                                    key={withdrawRequestItem.withdrawRequest.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        {withdrawRequestItem.withdrawRequest.wallet.backer.email}
                                    </TableCell>
                                    <TableCell align="left" className='table-row'>{formatAmount(withdrawRequestItem.withdrawRequest.amount)} vnd</TableCell>
                                    <TableCell align="left" className='table-row' style={{
                                        fontWeight: 'bold',
                                        color: isWithinTwoDays(withdrawRequestItem.withdrawRequest.expiredDate) && (withdrawRequestItem.withdrawRequest.status != 3) ? 'red' : 'green',
                                    }}>
                                        {formatDate(withdrawRequestItem.withdrawRequest.expiredDate)}
                                    </TableCell>
                                    <TableCell align="left" className='table-row'>
                                        <div style={getStatusStyle(withdrawRequestItem.withdrawRequest.status)}>{status[withdrawRequestItem.withdrawRequest.status]}</div>
                                    </TableCell>
                                    <TableCell align="left" className='table-row'>
                                        <div style={getRequestTypeStyle(withdrawRequestItem.withdrawRequest.requestType)}>{requestType[withdrawRequestItem.withdrawRequest.requestType]}</div>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: '4rem', padding: '8px' }}>
                                        <ModeEditOutlineIcon
                                            onClick={() => handleOpenModal(withdrawRequestItem)}
                                            fontSize='small'
                                            sx={{ fontSize: '1.2rem', color: '#44494D', cursor: 'pointer' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
                <TablePagination
                    labelRowsPerPage="Số hàng mỗi trang:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={withdrawRequest.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                style={{ zIndex: '100000' }}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Paper sx={style}>
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
                            width: 40,
                            height: 40,
                            paddingTop: 0,
                            borderRadius: '50%',
                            display: { lg: 'block', xs: 'none' },
                            color: (theme) => theme.palette.grey[500],
                            '&:focus': {
                                outline: 'none !important',
                            },
                            '&:hover': {
                                color: '#44494D',
                            },
                            zIndex: 2
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className='flex flex-col h-fit mx-auto'>
                        <h2 className='text-[1.6rem] font-bold text-[#44494D] text-center'>Chi tiết yêu cầu</h2>
                        {selectedRow && (
                            <div>
                                <Grid container columnSpacing={2}>
                                    {selectedRow.withdrawRequest.status === 1 && (
                                        <Grid item xs={6} lg={6} sx={{ display: 'flex', my: 'auto' }}>
                                            <img src={`https://img.vietqr.io/image/vcb-${selectedRow.bankAccount.bankAccountNumber}-compact2.jpg?amount=${selectedRow.withdrawRequest.amount}&addInfo=${"Rút tiền dự án"}`} style={{ width: '24rem', height: '20rem' }} />
                                        </Grid>
                                    )}
                                    <Grid item xs={12} lg={selectedRow.withdrawRequest.status === 1 ? 6 : 12} sx={{ display: 'flex', my: 'auto', flexDirection: 'column' }}>
                                        <div className='flex items-center h-full'>
                                            <Grid container rowSpacing={0} columnSpacing={2}>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Tên ngân hàng:</strong><br />
                                                        {selectedRow.bankAccount.bankAccountName}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Số tài khoản:</strong><br />
                                                        {selectedRow.bankAccount.bankAccountNumber}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Số tiền rút:</strong><br />
                                                        {formatAmount(selectedRow.withdrawRequest.amount)} vnd
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Ngày hết hạn:</strong><br />
                                                        <span style={{ color: isWithinTwoDays(selectedRow.withdrawRequest.expiredDate) ? 'red' : 'green', fontWeight: 'bold' }}>
                                                            {formatDate(selectedRow.withdrawRequest.expiredDate)}
                                                        </span>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Trạng thái:</strong><br />
                                                        {status[selectedRow.withdrawRequest.status]}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Loại giao dịch:</strong><br />
                                                        {requestType[selectedRow.withdrawRequest.requestType]}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Người nhận tiền:</strong><br />
                                                        {selectedRow.backerName}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sx={{ my: '0.8rem !important' }}>
                                                    <div className='text-[1rem] text-[#44494D]'>
                                                        <strong>Email:</strong><br />
                                                        {selectedRow.withdrawRequest.wallet.backer.email}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                                {selectedRow.withdrawRequest.status === 0 ? (
                                    <div className='flex justify-center flex-row mt-[1.2rem]'>
                                        <Button onClick={() => handleProcessingRequest(selectedRow)} variant="contained" sx={{ mr: '2rem', backgroundColor: '#4CAF50', textTransform: 'none', fontWeight: 'bold' }}>
                                            Đồng ý
                                        </Button>
                                        <Button onClick={() => handleRejectRequest(selectedRow)} variant="contained" sx={{ backgroundColor: '#ed1c24', textTransform: 'none', fontWeight: 'bold' }}>
                                            Từ chối
                                        </Button>
                                    </div>
                                ) : selectedRow.withdrawRequest.status == 1 ? (
                                    <div className='flex justify-center flex-row mt-[1.2rem]'>
                                        <Button onClick={() => handleApproveRequest(selectedRow)} variant="contained" sx={{ mr: '2rem', backgroundColor: '#4CAF50', textTransform: 'none', fontWeight: 'bold' }}>
                                            Xác nhận
                                        </Button>
                                        <Button onClick={() => handleRejectRequest(selectedRow)} variant="contained" sx={{ backgroundColor: '#ed1c24', textTransform: 'none', fontWeight: 'bold' }}>
                                            Hủy bỏ
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                </Paper>
            </Modal>
        </div >
    );
}

export default AdminWithdrawRequest;