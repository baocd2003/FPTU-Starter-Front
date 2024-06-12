import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './index.css';
function BannerCarousel() {
  const [existedAuth, setExistedAuth] = useState();
  useEffect(() => {
    const token = Cookies.get("_auth");
    if (token !== undefined) {
      setExistedAuth(token);
    }
  })
  console.log(existedAuth);
  const navigate = useNavigate();
  const checkAuth = () => {
    if (existedAuth !== undefined) {
      navigate("/choose-cate")
    } else {
      Swal.fire({
        title: "Cần đăng nhập",
        text: "Bạn cần có tài khoản để tạo dự án",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Về trang đăng nhập",
        cancelButtonText: "Ở lại trang"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      })
    }
  }
  return (
    <div className="relative">
      {/* <Carousel autoPlay transitionTime='3' >
        <div className='relative'>
          <div className='overlay'></div>
          <img src={"https://i.ibb.co/8K7BwCX/sinhvien-fpt-khoinghiep.png"} className='carouselImg' />
        </div>
        <div className='relative'>
          <div className='overlay'></div>
          <img src={Teamwork} className='carouselImg' />
        </div>
        <div className='relative'>
          <div className='overlay'></div>
          <img src={Teamwork} className='carouselImg' />
        </div>
      </Carousel> */}
      <div className='relative'>
        <div className='overlay'></div>
        <img src={"https://i.ibb.co/8K7BwCX/sinhvien-fpt-khoinghiep.png"} className='bannerImg' />
        <div className='blurPart'></div>
        <Typography className="bannerTitle" sx={{
          position: "absolute", top: "40%", left: "10%", color: "white", fontWeight: "bold",
          textAlign: "left", zIndex: 2, textTransform: "uppercase",
          fontSize: "5rem", whiteSpace: "nowrap", letterSpacing: '2px !important',
        }}>
          Vươn tới những vì sao<br /> dự án khởi nghiệp của bạn <br /> sẽ tỏa sáng!
        </Typography>
      </div>

      <div className="absolute top-[70%] left-[45%]">
        <Button onClick={checkAuth} sx={{ my: 4, color: '#FFF', display: 'block' }} className="c-btn">Bắt đầu dự án</Button>
      </div>
    </div>
  )
}

export default BannerCarousel