import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from 'react-spring';
import Swal from 'sweetalert2';
import Banner1 from '../../assets/banner-carousel-1.png'
import Banner2 from '../../assets/banner-carousel-2.png'
import './index.css';

function BannerCarousel() {
  const [existedAuth, setExistedAuth] = useState();

  useEffect(() => {
    const token = Cookies.get("_auth");
    if (token !== undefined) {
      setExistedAuth(token);
    }
  });

  const navigate = useNavigate();
  const checkAuth = () => {
    if (existedAuth !== undefined) {
      navigate("/init-project/step-one");
    } else {
      Swal.fire({
        title: "Cần đăng nhập",
        text: "Bạn cần đăng nhập để tạo dự án",
        icon: "warning",
        // showCancelButton: true,
        confirmButtonText: "Đã hiểu",
        // cancelButtonText: "Ở lại trang",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate("/login");

        }
      });
    }
  };

  const ParallaxImage = ({ src, children }) => {
    const [{ offset }, setOffset] = useSpring(() => ({ offset: 0 }));

    useEffect(() => {
      const handleScroll = () => {
        setOffset({ offset: window.scrollY * 0.3 });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [setOffset]);

    return (
      <div className="relative">
        <animated.div style={{ transform: offset.to(o => `translateY(${o}px)`) }}>
          <img src={src} className='bannerImg' alt="Banner" />
        </animated.div>
        <div className='overlay'></div>
        {children}
      </div>
    );
  };

  return (
    <div>
      <style>
        {`
          .bannerImg {
            object-fit: cover !important;
          }
        `}
      </style>
      <Carousel autoPlay={true} showThumbs={false} infiniteLoop showArrows={false} showStatus={false}
        transitionTime={1000}
        animationHandler="slide"
        interval={5000}
      >
        <ParallaxImage src={Banner1}>
          <Typography className="bannerTitle" sx={{
            position: "absolute", top: "40%", left: "10%", color: "white", fontWeight: "bold",
            textAlign: "left", zIndex: 2, textTransform: "uppercase", userSelect: 'none',
            fontSize: "5rem", whiteSpace: "nowrap", letterSpacing: '2px !important',
          }}>
            Nền tảng <span className='text-[#FBB03B]'><br />gây quỹ cộng đồng</span><br /> cho dự án <span className='text-[#FBB03B]'>khởi nghiệp</span> của bạn
          </Typography>
          <div className="absolute top-[70%] left-[10%]" style={{ zIndex: 2 }}>
            <Button onClick={checkAuth} sx={{ my: 4, color: '#FFF', display: 'block', width: '16rem', height: '4rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 900, letterSpacing: '1px !important', }} className="c-btn">Hiện thực hóa ý tưởng</Button>
          </div>
        </ParallaxImage>
        <ParallaxImage src={Banner2}>
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
        </ParallaxImage>
        <ParallaxImage src={"https://i.ibb.co/5WL9LHB/Banner-Carousel3.jpg"}>
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
        </ParallaxImage>
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
