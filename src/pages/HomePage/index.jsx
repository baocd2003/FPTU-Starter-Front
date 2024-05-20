import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Aos from "aos";
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';
import React, { useEffect } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RiPieChart2Fill } from "react-icons/ri";
import FSUAppBar from "../../components/AppBar";
import BannerCarousel from "../../components/BannerCarousel";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import './index.css';
function HomePage() {
	useEffect(() => {
		Aos.init({ duration: 2000 })
	}, []);
	console.log(Cookies.get("_auth"))
	return (
		<div className="home">
			<FSUAppBar isLogined={Cookies.get("_auth") != undefined ? true : false} />
			<BannerCarousel />
			<div className="mt-[100px]" >
				<div data-aos="fade-up" className="bg-[#F0F0F0] p-3">
					<Typography className="">
						<Typography sx={{ fontSize: '36px', color: '#FCAE3D' }}>Các dự án nổi bật</Typography>
						<Typography sx={{ fontSize: '22px' }}>Những dự án nổi bật tại FPTUStarter</Typography>
					</Typography>
					<ProjectCard />
				</div>

				<div data-aos="fade-up" className="p-3">
					<Typography className="">
						<Typography sx={{ fontSize: '36px', color: '#FCAE3D' }}>Các dự án mới nhất</Typography>
						<Typography sx={{ fontSize: '22px' }}>Các dự án tiêu biểu đang trong quá trình crowfunding trên FPT Starter</Typography>
					</Typography>
					<ProjectCard />
				</div>
			</div>
			<div data-aos="fade-up" className="bg-[#F0F0F0] p-3 max-h-fit">
				<Box sx={{ flexGrow: 1, margin: '60px' }}>
					<Grid container spacing={2} sx={{ alignItems: 'center' }}>
						<Grid item lg={6} xs={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', pl: '0 !important' }}>
							<Box
								height={{ md: '300px', xs: 'fit-content' }}
								width={{ md: '450px', xs: 'fit-content' }}
								gap={4}
								sx={{ background: '#FFFFFF', padding: '3rem' }}
							>
								<Typography sx={{ fontSize: '30px', color: '#FCAE3D', textAlign: 'left' }}>
									Làm sao để có được dự án crowdfunding thành công?
								</Typography>
								<Typography sx={{ fontSize: '18px', textAlign: 'left' }}>
									Một vài bí kíp nho nhỏ đến từ kinh nghiệm quản lý dự án crowdfunding của chúng tôi để tạo ra được một dự án kêu gọi thành công.
								</Typography>
							</Box>
						</Grid>
						<Grid item lg={6} xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={6}>
									<Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
										<FaHandsHelping style={{ color: '#FCAE3D', fontSize: '50px' }} />
										<Typography sx={{ fontSize: '16px', my: 1 }}>Chi tiết về chi tiêu</Typography>
										<Typography sx={{ fontSize: '12px' }}>Thông tin cu thể về cách sử dụng nguồn vốn</Typography>
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
										<RiPieChart2Fill style={{ color: '#FCAE3D', fontSize: '50px' }} />
										<Typography sx={{ fontSize: '16px', my: 1 }}>Hơp tác và Hỗ trợ</Typography>
										<Typography sx={{ fontSize: '12px' }}>Hãy xem những người ủng hộ như những đối tác tiềm năng của bạn</Typography>
									</Typography>

								</Grid>
								<Grid item xs={6}>
									<Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
										<IoIosSettings style={{ color: '#FCAE3D', fontSize: '50px' }} />
										<Typography sx={{ fontSize: '16px', my: 1 }}>Tập trung sản xuất</Typography>
										<Typography sx={{ fontSize: '12px' }}>Dành hết thời gian cho đứa con tinh thần của mình</Typography>
									</Typography>

								</Grid>
								<Grid item xs={6}>
									<Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
										<FaHandsHelping style={{ color: '#FCAE3D', fontSize: '50px' }} />
										<Typography sx={{ fontSize: '16px', my: 1 }}>Bàn giao đúng hạn</Typography>
										<Typography sx={{ fontSize: '12px' }}>Đúng hạn giúp bạn tăng uy tín và nhận được sự tin tưởng</Typography>
									</Typography>

								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</div>
			{/* 					
				</div> */}
			<Footer />
		</div>
	)
}

export default HomePage;