import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { FaHandsHelping } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RiPieChart2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import FSUAppBar from '../../components/AppBar';
import BannerCarousel from '../../components/BannerCarousel';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';
import './index.css';

function HomePage() {
	const [checkIsLogin, setCheckIsLogin] = useState(false);

	const swiperPopularProjectRef = useRef(null);
	const swiperNewProjectRef = useRef(null);


	useEffect(() => {
		Aos.init({ duration: 2000 });
		const isLogined = Cookies.get('_auth') !== undefined;
		setCheckIsLogin(isLogined);

	}, []);
	const navigate = useNavigate();
	console.log(Cookies.get('_auth'));

	return (
		<div className="home">
			<FSUAppBar isLogined={checkIsLogin} />
			<BannerCarousel />
			<div data-aos="fade-up">
				<div className='project-section'>
					<Grid container>
						<Grid item lg={6} xs={12}>
							<Box sx={{ mx: '20px', height: '100%', display: { lg: 'block', xs: 'none' } }}>
								<div className='mr-[2rem] h-[75%] rounded-[0.4rem] relative'>
									<img src={"https://i.ibb.co/8K7BwCX/sinhvien-fpt-khoinghiep.png"} className='object-cover w-[75%] h-[100%] rounded-[0.4rem]'></img>
									<div className='rounded-[0.4rem] flex justify-end absolute left-0 bottom-0'>
										<img
											src={"https://i.ibb.co/8K7BwCX/sinhvien-fpt-khoinghiep.png"}
											className='object-cover w-[75%] h-[50%] rounded-[0.4rem] translate-y-[50%]'
											alt="Teamwork"
										/>
									</div>
								</div>
							</Box>
							<Box sx={{ mx: '20px', height: 'fit-content', display: { lg: 'none', xs: 'block' } }}>
								<div className='h-[75%] w-[100%] rounded-[0.4rem] relative'>
									<img src={"https://i.ibb.co/8K7BwCX/sinhvien-fpt-khoinghiep.png"} className='object-cover w-[100%] h-[75%] rounded-[0.4rem]'></img>
								</div>
							</Box>
						</Grid>
						<Grid item lg={6} xs={12}>
							<Box>
								<Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#44494D', fontWeight: 600, textAlign: 'left', mx: '20px', lineHeight: '4rem', mb: '1.6rem' }}>
									Chúng tôi trợ giúp qua từng bước tiến của dự án bạn
								</Typography>
								<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 400, textAlign: 'justify', mx: '20px', lineHeight: '2.4rem', mb: '3.2rem' }}>
									Đội ngũ chúng tôi <span style={{ color: '#FBB03B', textTransform: 'uppercase', fontWeight: 'bold' }}>cam kết</span> đem đến dịch vụ tận tâm và giải đáp mọi thắc mắc của quý khách hàng trong suốt <span style={{ color: '#FBB03B', textTransform: 'uppercase', fontWeight: 'bold' }}>24/24</span> với thời hạn 1 tiếng. Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc, mọi nơi, để đảm bảo bạn luôn có trải nghiệm tốt nhất khi sử dụng sản phẩm và dịch vụ của chúng tôi.
								</Typography>
								<div>
									<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 400, textAlign: 'justify', mx: '20px', lineHeight: '2.4rem', mb: '0.8rem' }}>
										<StarIcon sx={{ mb: '0.3rem', mr: '0.8rem' }} />Nhiệt huyết, tận tâm
									</Typography>
									<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 400, textAlign: 'justify', mx: '20px', lineHeight: '2.4rem', mb: '0.8rem' }}>
										<StarIcon sx={{ mb: '0.3rem', mr: '0.8rem' }} />Sáng tạo, nỗ lực
									</Typography>
									<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 400, textAlign: 'justify', mx: '20px', lineHeight: '2.4rem', mb: '0.8rem' }}>
										<StarIcon sx={{ mb: '0.3rem', mr: '0.8rem' }} />Trách nhiệm, chuyên nghiệp
									</Typography>
									<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 400, textAlign: 'justify', mx: '20px', lineHeight: '2.4rem', mb: '0.8rem' }}>
										<StarIcon sx={{ mb: '0.3rem', mr: '0.8rem' }} />Sáng suốt, linh hoạt
									</Typography>
								</div>
							</Box>
						</Grid>
					</Grid>
					<Button sx={{ px: '2.4rem !important', color: '#44494D', display: 'block', height: '3.2rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 600, mx: 'auto', letterSpacing: '1px', textTransform: 'none', mr: 0 }} className="all-project-btn">
						Tìm hiểu thêm
					</Button>
				</div>
			</div>
			<div className='relative'>
				<div className="gradient-background"></div>
				<div data-aos="fade-up">
					<div className='project-section'>
						<div className='flex flex-row justify-between'>
							<Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: 'white', fontWeight: 600, textAlign: 'left', marginLeft: '20px', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)' }}>
								Các dự án nổi bật
							</Typography>
							<div className='mr-[20px]'>
								<Button
									sx={{
										backgroundColor: '#FFFFFF',
										boxShadow: '0.4rem',
										py: '0.6rem',
										px: '0',
										color: '#44494D',
										'&:hover': {
											backgroundColor: '#DDDDDD',
										},
										'&:active': {
											outline: 'none',
										},
										'&:focus': {
											outline: 'none',
										},
										border: '2px solid #DDDDDD !important',
										letterSpacing: '0.5px',
										mr: '0.4rem'
									}}
									onClick={() => swiperPopularProjectRef.current?.slidePrev()}
								>
									<ArrowBackIcon sx={{ fontSize: '1.2rem' }} />
								</Button>
								<Button
									sx={{
										backgroundColor: '#FFFFFF',
										boxShadow: '0.4rem',
										py: '0.6rem',
										px: '0',
										color: '#44494D',
										'&:hover': {
											backgroundColor: '#DDDDDD',
										},
										'&:active': {
											outline: 'none'
										},
										'&:focus': {
											outline: 'none'
										},
										border: '2px solid #DDDDDD !important',
										letterSpacing: '0.5px',
									}}
									onClick={() => swiperPopularProjectRef.current?.slideNext()}
								>
									<ArrowForwardIcon sx={{ fontSize: '1.2rem' }} />
								</Button>
							</div>
						</div>
						<ProjectCard setSwiperRef={(ref) => { swiperPopularProjectRef.current = ref.current }} type={"popular"} />
						<Button onClick={() => navigate('/all-projects')} sx={{ px: '2.4rem !important', color: '#44494D', display: 'block', height: '3.2rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 600, mx: 'auto', mt: '1.6rem', letterSpacing: '1px', textTransform: 'none' }} className="all-project-btn">
							Xem toàn bộ dự án
						</Button>
					</div>
				</div>
			</div>
			<div className='relative'>
				<div className="gradient-background"></div>
				<div data-aos="fade-up">
					<div className='project-section'>
						<div className='flex flex-row justify-between'>
							<Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: 'white', fontWeight: 600, textAlign: 'left', marginLeft: '20px', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)' }}>
								Các dự án mới nhất
							</Typography>
							<div className='mr-[20px]'>
								<Button
									sx={{
										backgroundColor: '#FFFFFF',
										boxShadow: '0.4rem',
										py: '0.6rem',
										px: '0',
										color: '#44494D',
										'&:hover': {
											backgroundColor: '#DDDDDD',
										},
										'&:active': {
											outline: 'none',
										},
										'&:focus': {
											outline: 'none',
										},
										border: '2px solid #DDDDDD !important',
										letterSpacing: '0.5px',
										mr: '0.4rem'
									}}
									onClick={() => swiperNewProjectRef.current?.slidePrev()}
								>
									<ArrowBackIcon sx={{ fontSize: '1.2rem' }} />
								</Button>
								<Button
									sx={{
										backgroundColor: '#FFFFFF',
										boxShadow: '0.4rem',
										py: '0.6rem',
										px: '0',
										color: '#44494D',
										'&:hover': {
											backgroundColor: '#DDDDDD',
										},
										'&:active': {
											outline: 'none'
										},
										'&:focus': {
											outline: 'none'
										},
										border: '2px solid #DDDDDD !important',
										letterSpacing: '0.5px',
									}}
									onClick={() => swiperNewProjectRef.current?.slideNext()}
								>
									<ArrowForwardIcon sx={{ fontSize: '1.2rem' }} />
								</Button>
							</div>
						</div>
						<ProjectCard setSwiperRef={(ref) => { swiperNewProjectRef.current = ref.current }} type={"new"} />
						<Button onClick={() => navigate('/all-projects')} sx={{ px: '2.4rem !important', color: '#44494D', display: 'block', height: '3.2rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 600, mx: 'auto', mt: '1.6rem', letterSpacing: '1px', textTransform: 'none' }} className="all-project-btn">
							Xem toàn bộ dự án
						</Button>
					</div>
				</div>
			</div>
			<div className='hp-question'>
				<div data-aos="fade-up">
					<div className='project-section'>
						<Grid container>
							<Grid item lg={6} xs={12}>
								<Box sx={{ mx: '20px' }}>
									<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: 'white', fontWeight: 600, textAlign: 'justify', mr: '40px', lineHeight: '2.4rem', mb: '1.2rem' }}>
										<CircleIcon sx={{ width: '0.8rem !important', mr: '0.5rem' }}></CircleIcon>Chuyên mục thường gặp
									</Typography>
									<Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: 'white', fontWeight: 600, textAlign: 'left', lineHeight: '4rem', mb: '1.6rem', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.5)' }}>
										Làm thế nào chúng tôi có thể giúp bạn?
									</Typography>
									<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: 'white', fontWeight: 600, textAlign: 'justify', mr: '40px', lineHeight: '2.4rem', mb: '2.4rem' }}>
										Chúng tôi rất vui được giải đáp những thắc mắc phổ biến mà bạn có thể gặp phải khi sử dụng dịch vụ của chúng tôi
									</Typography>
								</Box>
								<Button sx={{ px: '2.4rem !important', color: '#44494D', backgroundColor: '#FFFFFF !important', border: '2px solid transparent !important', display: 'block', height: '3.2rem', borderRadius: '0.4rem !important', fontSize: '1rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'none', ml: '20px' }} className="all-project-btn">
									Đi đến Hỗ trợ
								</Button>
							</Grid>
							<Grid item lg={6} xs={12}>
								<Box sx={{ px: '20px' }}>
									<Accordion sx={{ mb: '2.4rem', borderRadius: '0.4rem' }}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1-content"
											id="panel1-header"
											sx={{ textAlign: 'left' }}
										>
											1. Làm thế nào để kêu gọi dự án tại FPTU Starter?
										</AccordionSummary>
										<AccordionDetails sx={{ textAlign: 'left' }} >
											Chỉ cần đăng nhập vào là bắt đầu tạo dự án được rồi bạn nhé, rất đơn giản bạn nhỉ?
										</AccordionDetails>
									</Accordion>
									<Accordion sx={{ mb: '2.4rem', borderRadius: '0.4rem', outline: 'none !important' }}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1-content"
											id="panel1-header"
											sx={{ textAlign: 'left' }}
										>
											2. Tôi có thể đóng góp tiền cho dự án như thế nào?
										</AccordionSummary>
										<AccordionDetails sx={{ textAlign: 'left' }} >
											Bạn có thể đóng góp bằng cách vào trang dự án, chọn mức đóng góp và theo hướng dẫn để hoàn thành thanh toán.
										</AccordionDetails>
									</Accordion>
									<Accordion sx={{ mb: '2.4rem', borderRadius: '0.4rem' }}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1-content"
											id="panel1-header"
											sx={{ textAlign: 'left' }}
										>
											3. Làm thế nào để tôi biết dự án của mình đang tiến triển như thế nào?
										</AccordionSummary>
										<AccordionDetails sx={{ textAlign: 'left' }} >
											Bạn có thể theo dõi tiến độ của dự án qua trang thông tin chi tiết dự án, bao gồm số tiền đã được huy động và tiến độ hoàn thành các mốc quan trọng.
										</AccordionDetails>
									</Accordion>
									<Accordion sx={{ mb: '2.4rem', borderRadius: '0.4rem' }}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1-content"
											id="panel1-header"
											sx={{ textAlign: 'left' }}
										>
											4. Dự án của tôi cần phải đáp ứng điều kiện gì để được chấp nhận?
										</AccordionSummary>
										<AccordionDetails sx={{ textAlign: 'left' }} >
											Dự án của bạn cần phải đáp ứng các tiêu chuẩn của chúng tôi, bao gồm mô tả rõ ràng về dự án và sau đó đợi chúng tôi phê duyệt lại và tiến hành dự án.
										</AccordionDetails>
									</Accordion>
									<Accordion sx={{ borderRadius: '0.4rem' }}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1-content"
											id="panel1-header"
											sx={{ textAlign: 'left' }}
										>
											5. Tôi có thể liên hệ với ai nếu có câu hỏi hoặc vấn đề?
										</AccordionSummary>
										<AccordionDetails sx={{ textAlign: 'left' }} >
											Bạn có thể liên hệ với chúng tôi qua trang Hỗ trợ để được hỗ trợ, hoặc tham gia diễn đàn cộng đồng để nhận giải đáp các câu hỏi từ người dùng khác.
										</AccordionDetails>
									</Accordion>
								</Box>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
			<div data-aos="fade-up" className="p-3 max-h-fit">
				<div className='project-section'>
					<Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FBB03B', fontWeight: 600, textAlign: 'center', mb: '1.6rem' }}>
						Làm sao để có được dự án crowdfunding thành công?
					</Typography>
					<Typography variant="h3" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'center', mb: '5.6rem' }}>
						Một vài bí kíp nho nhỏ để tạo được một dự án kêu gọi thành công
					</Typography>
					<Grid container rowSpacing={4}>
						<Grid item xs={12} lg={6}>
							<Typography component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
								<FaHandsHelping style={{ color: '#FCAE3D', fontSize: '50px' }} />
								<Typography variant="h1" sx={{ fontSize: '1.2rem', my: 2, fontWeight: 'bold', color: '#44494D' }}>Chi tiết về chi tiêu</Typography>
								<Typography variant="body2" sx={{ fontSize: '0.8rem', textAlign: 'center', color: '#44494D' }}>Thông tin cụ thể về cách sử dụng nguồn vốn</Typography>
							</Typography>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Typography component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
								<RiPieChart2Fill style={{ color: '#FCAE3D', fontSize: '50px' }} />
								<Typography component="h1" sx={{ fontSize: '1.2rem', my: 2, fontWeight: 'bold', color: '#44494D' }}>Hợp tác và Hỗ trợ</Typography>
								<Typography component="span" sx={{ fontSize: '0.8rem', textAlign: 'center', color: '#44494D' }}>Hãy xem những người ủng hộ như những đối tác tiềm năng của bạn</Typography>
							</Typography>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Typography component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
								<IoIosSettings style={{ color: '#FCAE3D', fontSize: '50px' }} />
								<Typography component="h1" sx={{ fontSize: '1.2rem', my: 2, fontWeight: 'bold', color: '#44494D' }}>Tập trung sản xuất</Typography>
								<Typography component="span" sx={{ fontSize: '0.8rem', textAlign: 'center', color: '#44494D' }}>Dành hết thời gian cho đứa con tinh thần của mình</Typography>
							</Typography>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Typography component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
								<FaHandsHelping style={{ color: '#FCAE3D', fontSize: '50px' }} />
								<Typography component="h1" sx={{ fontSize: '1.2rem', my: 2, fontWeight: 'bold', color: '#44494D' }}>Bàn giao đúng hạn</Typography>
								<Typography component="span" sx={{ fontSize: '0.8rem', textAlign: 'center', color: '#44494D' }}>Đúng hạn giúp bạn tăng uy tín và nhận được sự tin tưởng</Typography>
							</Typography>
						</Grid>
					</Grid>
				</div>
			</div>
			<Footer />
		</div >
	);
}

export default HomePage;
