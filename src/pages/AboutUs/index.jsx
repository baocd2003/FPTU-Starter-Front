import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Bao from '../../assets/Bao.png';
import CCO from '../../assets/CCO.png';
import CEO from '../../assets/CEO.png';
import CMO from '../../assets/CMO.png';
import CTO from '../../assets/CTO.png';
import Dang from '../../assets/Dang.png';
import Diem from '../../assets/Diem.png';
import Target from '../../assets/Target.png';
import Telescope from '../../assets/Telescope.png';
import FSUAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import MemberCard from '../../components/MemberCard';
import './index.css';

function AboutUs() {
    const [checkIsLogin, setCheckIsLogin] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000 });
        const isLogined = Cookies.get('_auth') !== undefined;
        setCheckIsLogin(isLogined);
    }, []);

    return (
        <div className='mt-[5.2rem]'>
            <FSUAppBar isLogined={checkIsLogin} />
            <div className='about-us-banner'>
                <div className='h-[40vh] select-none flex flex-col items-center'>
                    <div>
                        <Typography variant="h1" sx={{ fontSize: { lg: '1.2rem', xs: '1.4rem' }, color: '#A7A7A7', fontWeight: 600, textAlign: 'center', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)', mt: '5rem' }}>
                            Về chúng tôi
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { lg: '2.4rem', xs: '1.6rem' }, mt: '1.5rem', textAlign: 'center', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)', mx: '5rem' }}>
                            Chắp Cánh Ước Mơ, Từng Lời Cam Kết
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, color: '#A7A7A7', fontWeight: 600, textAlign: 'center', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)', mt: '1.6rem' }}>
                            Thành viên của FPTU Starter
                        </Typography>
                    </div>
                </div>
                <div className='mx-[6rem] pt-[2rem] py-[4rem]'>
                    <Grid container columnGap={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '4rem' }}>
                        <Grid item xs={12} md={3}>
                            <MemberCard imgUrl={CMO} name={"Phạm Bùi Nhựt Minh"} role={"Giám đốc tiếp thị"} description={"Quản lý chiến lược tiếp thị và xây dựng thương hiệu. Tối ưu hóa chiến dịch quảng cáo để tăng tầm nhìn và thu hút người dùng."} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MemberCard imgUrl={CEO} name={"Phạm Ngọc Minh Hiếu"} role={"Giám đốc điều hành"} description={"Dẫn dắt chiến lược kinh doanh và quản lý tổng thể công ty."} secondDescription={"Đảm bảo phát triển sản phẩm và mở rộng thị trường crowdfunding."} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <MemberCard imgUrl={CCO} name={"Nguyễn Phước Định Kiên"} role={"Giám đốc nội dung"} description={"Đảm bảo nội dung trang web phong phú và hấp dẫn. Quản lý chiến lược nội dung để thu hút và giữ chân người dùng."} />
                        </Grid>
                    </Grid>
                    <Grid container columnGap={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '4rem' }}>
                        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <MemberCard imgUrl={Bao} name={"Cao Duy Bảo"} role={"Lập trình viên"} description={"Phát triển và duy trì mã nguồn nền tảng crowdfunding để đảm bảo ổn định, bảo mật và tiên tiến."} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <MemberCard imgUrl={CTO} name={"Cao Khả Sương"} role={"Giám đốc công nghệ"} description={"Dẫn dắt đội ngũ kỹ thuật, đảm bảo nền tảng crowdfunding luôn ổn định, bảo mật và tiên tiến."} />
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <MemberCard imgUrl={Dang} name={"Lâm Minh Đăng"} role={"Lập trình viên"} description={"Phát triển và duy trì mã nguồn nền tảng crowdfunding để đảm bảo ổn định, bảo mật và tiên tiến."} />
                        </Grid>
                    </Grid>
                    <Grid container columnGap={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} md={3}>
                            <MemberCard name={"Đào Hương Thảo"} role={"Lập trình viên"} description={"Phát triển và duy trì mã nguồn nền tảng crowdfunding để đảm bảo ổn định, bảo mật và tiên tiến."} />
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <MemberCard imgUrl={Diem} name={"Lê Quý Điềm"} role={"Lập trình viên"} description={"Phát triển và duy trì mã nguồn nền tảng crowdfunding để đảm bảo ổn định, bảo mật và tiên tiến."} />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className='hp-question h-[40vh] select-none flex flex-col items-center justify-center'>
                <Typography variant="h1" sx={{ fontSize: { lg: '1.4rem', xs: '1rem' }, color: '#FFFFFF', fontWeight: 600, textAlign: 'center', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)', mb: '1rem' }}>
                    Mục tiêu của FPTU Starter:
                </Typography>
                <Typography variant="h2" sx={{
                    fontSize: { lg: '2.4rem', xs: '1.5rem' }, color: '#FFFFFF', fontWeight: 600, textAlign: 'center', width: '75%', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)', lineHeight: '1.625'
                }}>
                    <TypeAnimation
                        sequence={[
                            'Kết nối cộng đồng, khơi nguồn sáng tạo và hỗ trợ giáo dục tại Việt Nam qua nền tảng huy động vốn cộng đồng.',
                            2000,
                            '',
                            2000
                        ]}
                        speed={60}
                        wrapper="span"
                        repeat={Infinity}
                    />
                </Typography>
            </div>
            <div className='mx-[6rem] mt-[4rem]'>
                <Grid container sx={{ mb: '2.4rem' }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontSize: { lg: '2.4rem', xs: '1.6rem' }, mt: '1.5rem', textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                            Tầm nhìn - Vision
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'justify', mt: '2.4rem' }}>
                            FPTU Starter trở thành nền tảng huy động vốn cộng đồng lớn nhất và được biết đến nhiều nhất trong cộng đồng Việt Nam, không chỉ mang lại cơ hội tài trợ cho những dự án đầy sáng tạo mà còn gắn kết cộng đồng lại gần nhau hơn thông qua sự hợp tác và hỗ trợ lẫn nhau.
                        </Typography>
                    </Grid>
                    <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <img src={Telescope} style={{ marginLeft: '8rem' }} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <img src={Target} style={{ marginRight: '8rem' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontSize: { lg: '2.4rem', xs: '1.6rem' }, mt: '1.5rem', textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                            Sứ mệnh - Mission
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: { lg: '1.2rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 600, textAlign: 'justify', mt: '2.4rem' }}>
                            FPTU Starter trở thành nền tảng huy động vốn cộng đồng lớn nhất và nổi tiếng nhất trong cộng đồng Việt Nam. Không chỉ tạo ra cơ hội tài trợ cho những dự án sáng tạo, FPT Starter còn gắn kết mọi người lại gần nhau hơn thông qua sự hợp tác và hỗ trợ lẫn nhau. Chúng tôi tự hào đóng góp vào sự phát triển của các ý tưởng và giấc mơ, thúc đẩy tinh thần khởi nghiệp và đổi mới sáng tạo trong cộng đồng.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;
