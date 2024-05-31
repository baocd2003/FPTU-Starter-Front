import React,{useState,useEffect} from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner from "../../assets/banner.png";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import './index.css'
function BannerCarousel() {
  const [existedAuth, setExistedAuth] = useState();
  useEffect(() => {
    const token = Cookies.get("_auth");
    if(token !== undefined){
      setExistedAuth(token);
    }
  })
  console.log(existedAuth);
  const navigate = useNavigate();
  const checkAuth = () =>{
    if(existedAuth !== undefined){
      navigate("/choose-cate")
    }else{
      Swal.fire({
        title: "Cần đăng nhập",
        text: "Bạn cần có tài khoản để tạo dự án",
        icon : "warning",
        showCancelButton: true,
        confirmButtonText: "Về trang đăng nhập",
        cancelButtonText : "Ở lại trang"
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/login");
        }
      })
    }
  }
  return (
	<div className="mt-10 relative">
	<Carousel autoPlay transitionTime='3'>
        <div>
            <img src={banner}/>
        </div>
        <div>
            <img src={banner} />
        </div>
        <div>
            <img src={banner} />
        </div>
    </Carousel>
	<div className="absolute top-[70%] left-[45%]">
		<Button onClick={checkAuth} sx={{ my: 4, color: '#FFF', display: 'block' }} className="c-btn">Bắt đầu dự án</Button>
	</div>
	</div>
  )
}

export default BannerCarousel