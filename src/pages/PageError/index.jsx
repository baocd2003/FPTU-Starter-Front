import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Error from '../../assets/Error404.png';
import "./index.css";

function PageError() {
    const navigate = useNavigate();
    return (
        <div className='error-background'>
            <img src={Error} className='w-[12rem] h-[12rem] mb-[0.8rem]' />
            <h1 className='error-title'>Không Tìm Thấy Trang</h1>
            <h5 className='error-text'>Không thể tìm thấy trang được yêu cầu.<br />Đây có thể là lỗi chính tả trong URL, trang đã bị xóa hoặc bạn không có thẩm quyền.</h5>
            <Button onClick={() => navigate('/')} sx={{ px: '2.4rem !important', color: '#FFFFFF', display: 'block', height: '3.2rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'none', mt: '2.4rem' }} className="error-button">
                Quay về trang chủ
            </Button>
        </div>
    )
}

export default PageError