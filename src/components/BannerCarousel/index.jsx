import { Carousel } from 'react-responsive-carousel';
import banner from "../../assets/banner.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@mui/material/Button';
import './index.css'
function BannerCarousel() {
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
	<div className="absolute top-[80%] left-[45%]">
		<Button sx={{ my: 4, color: '#FFF', display: 'block' }} className="c-btn">Bắt đầu dự án</Button>
	</div>
	</div>
  )
}

export default BannerCarousel