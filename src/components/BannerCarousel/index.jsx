import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner from "../../assets/banner.png";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import './index.css'
function BannerCarousel() {
  const navigate = useNavigate();
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
		<Button onClick={() => navigate("/choose-cate")} sx={{ my: 4, color: '#FFF', display: 'block' }} className="c-btn">Bắt đầu dự án</Button>
	</div>
	</div>
  )
}

export default BannerCarousel