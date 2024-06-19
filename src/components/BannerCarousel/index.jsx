import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
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
    <div>
      <Carousel autoPlay={true} showThumbs={false} infiniteLoop showArrows={false} showStatus={false}
        transitionTime={1000}
        animationHandler="slide"
        interval={5000}
      >
        <div className='relative'>
          <div className='overlay'></div>
          <img src={"https://i.ibb.co/8K7BwCX/sinhvien-fpt-khoinghiep.png"} className='bannerImg' />
          <Typography className="bannerTitle" sx={{
            position: "absolute", top: "40%", left: "10%", color: "white", fontWeight: "bold",
            textAlign: "left", zIndex: 2, textTransform: "uppercase", userSelect: 'none',
            fontSize: "5rem", whiteSpace: "nowrap", letterSpacing: '2px !important',
          }}>
            Vươn tới những <span className='text-[#FBB03B]'>vì sao</span><br /> dự án khởi nghiệp của bạn <br /> sẽ <span className='text-[#FBB03B]'>tỏa sáng!</span>
          </Typography>
          <div className="absolute top-[72%] left-[10%]" style={{ zIndex: 2 }}>
            <Button onClick={checkAuth} sx={{ my: 4, color: '#FFF', display: 'block', width: '16rem', height: '4rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 900, letterSpacing: '1px !important', }} className="c-btn">Hiện thực hóa giấc mơ</Button>
          </div>
        </div>
        <div className='relative'>
          <div className='overlay'></div>
          <img src={"https://i.ibb.co/w4DyqHq/banner-Carousel2.jpg"} className='bannerImg' />
          <Typography className="bannerTitle" sx={{
            position: "absolute", top: "40%", right: "10%", color: "white", fontWeight: "bold",
            textAlign: "right", zIndex: 2, textTransform: "uppercase", userSelect: 'none',
            fontSize: "5rem", whiteSpace: "nowrap", letterSpacing: '2px !important',
          }}>
            Hợp tác để <span className='text-[#FBB03B]'>thành công</span><br /> Cùng nhau vượt qua <br /> mọi <span className='text-[#FBB03B]'>thử thách</span>
          </Typography>
          <div className="absolute top-[70%] right-[10%]" style={{ zIndex: 2 }}>
            <Button onClick={checkAuth} sx={{ my: 4, color: '#FFF', display: 'block', width: '12rem', height: '4rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 900, letterSpacing: '1px !important', }} className="c-btn">Bắt đầu dự án</Button>
          </div>
        </div>
        <div className='relative'>
          <div className='overlay'></div>
          <img src={"https://i.ibb.co/5WL9LHB/Banner-Carousel3.jpg"} className='bannerImg' />
          <Typography className="bannerTitle" sx={{
            position: "absolute", top: "40%", left: '10%', color: "white", fontWeight: "bold",
            textAlign: "left", zIndex: 2, textTransform: "uppercase", userSelect: 'none',
            fontSize: "5rem", whiteSpace: "nowrap", letterSpacing: '2px !important',
          }}>
            Kêu gọi <span className='text-[#FBB03B]'>thành công</span><br /> Biến mọi ước mơ <br /> trở thành <span className='text-[#FBB03B]'>Hiện thực!</span>
          </Typography>
          <div className="absolute top-[70%] left-[10%]" style={{ zIndex: 2 }}>
            <Button onClick={checkAuth} sx={{ my: 4, color: '#FFF', display: 'block', width: '12rem', height: '4rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 900, letterSpacing: '1px !important', }} className="c-btn">Bắt đầu dự án</Button>
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default BannerCarousel