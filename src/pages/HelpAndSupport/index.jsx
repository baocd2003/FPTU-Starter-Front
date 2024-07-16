import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FSUAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import './index.css';

const tabValues = [
    { label: 'Thông tin chúng tôi thu thập', value: '0' },
    { label: 'Bảo vệ khách hàng', value: '1' },
    { label: 'Phí nền tảng và các loại phí khác', value: '2' },
    { label: 'Tài nguyên dành cho dự án', value: '3' },
    { label: 'Tài sản thương hiệu', value: '4' },
    { label: 'Điều khoản sử dụng', value: '5' },
    { label: 'Thông tin liên hệ', value: '6' }
];

function HelpAndSupport() {
    const [checkIsLogin, setCheckIsLogin] = useState(false);
    const [value, setValue] = useState(0);
    const tab0Ref = useRef(null);
    const tab1Ref = useRef(null);
    const tab2Ref = useRef(null);
    const tab3Ref = useRef(null);
    const tab4Ref = useRef(null);
    const tab5Ref = useRef(null);
    const tab6Ref = useRef(null);
    const location = useLocation();

    useEffect(() => {
        Aos.init({ duration: 2000 });
        const isLogined = Cookies.get('_auth') !== undefined;
        setCheckIsLogin(isLogined);

        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab !== null) {
            handleChange(null, parseInt(tab, 10));
        }
    }, [location.search]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                if (tab0Ref.current) {
                    tab0Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 1:
                if (tab1Ref.current) {
                    tab1Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 2:
                if (tab2Ref.current) {
                    tab2Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 3:
                if (tab3Ref.current) {
                    tab3Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 4:
                if (tab4Ref.current) {
                    tab4Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 5:
                if (tab5Ref.current) {
                    tab5Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 6:
                if (tab6Ref.current) {
                    tab6Ref.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className='mt-[5.2rem]'>
            <FSUAppBar isLogined={checkIsLogin} />
            <div data-aos="fade-up" className='help-and-support-banner h-[40vh] select-none flex flex-col relative items-center justify-center'>
                <div className='h-full flex flex-col items-center justify-center'>
                    <Typography variant="h1" sx={{ fontSize: { lg: '2.4rem', xs: '1.6rem' }, textAlign: 'center', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)', mx: '5rem' }}>
                        Hỗ trợ và trợ giúp
                    </Typography>
                    <Typography variant="h1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, color: '#A7A7A7', fontWeight: 600, textAlign: 'center', textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.1)', mt: '1.6rem', mx: '5rem' }}>
                        Lần cập nhật gần nhất: Ngày 7 Tháng 3 Năm 2024
                    </Typography>
                </div>
            </div>
            <div className='mt-[2.4rem] mx-[6rem]' data-aos="fade-up">
                <Grid container columnSpacing={10} style={{ minHeight: "100vh" }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ width: '100%', bgcolor: '#FFFFFF', position: 'sticky', top: '2.4rem' }}>
                            <Tabs value={value} onChange={handleChange} orientation="vertical" sx={{
                                alignItems: 'flex-start',
                                '.MuiTabs-indicator': {
                                    backgroundColor: '#FBB03B',
                                    width: '4px',
                                },
                                '.MuiTab-root.Mui-selected': {
                                    color: '#FBB03B !important'
                                },
                                pt: '2.4rem'
                            }}>
                                {tabValues.map((tab, index) => (
                                    <Tab key={index} label={tab.label} className='help-and-support-tab' />
                                ))}
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ minHeight: '100vh' }}>
                            <div className='pt-[2.4rem]' ref={tab0Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Thông tin chúng tôi thu thập
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Chúng tôi tự hào là nền tảng huy động vốn cộng đồng lớn nhất và được biết đến nhiều nhất trong cộng đồng Việt Nam. Với cam kết cung cấp cơ hội tài trợ cho những dự án đầy sáng tạo, chúng tôi mong muốn kết nối cộng đồng một cách chặt chẽ hơn thông qua sự hợp tác và hỗ trợ lẫn nhau. Chúng tôi thu thập thông tin về các dự án, nhu cầu của cộng đồng, và sự phản hồi từ các nhà đầu tư để liên tục cải thiện và mở rộng phạm vi hoạt động của mình.
                                </Typography>
                            </div>
                            <div className='pt-[2.4rem]' ref={tab1Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Bảo vệ khách hàng
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Bảo vệ khách hàng luôn là ưu tiên hàng đầu của chúng tôi. Chúng tôi cam kết đảm bảo an toàn và tin cậy cho mọi thành viên trong cộng đồng, từ việc quản lý thông tin đến bảo vệ quyền lợi. Chúng tôi áp dụng các tiêu chuẩn nghiêm ngặt để đảm bảo tính bảo mật của dữ liệu và thông tin cá nhân của khách hàng, và luôn sẵn sàng hỗ trợ trong mọi tình huống để tạo ra môi trường an toàn và minh bạch nhất cho tất cả mọi người.
                                </Typography>
                            </div>
                            <div className='pt-[2.4rem]' ref={tab2Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Phí nền tảng và các loại phí khác
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Chúng tôi cung cấp thông tin rõ ràng về các phí nền tảng và các khoản phí khác để mọi người có thể tham gia vào các dự án một cách dễ dàng và minh
                                    bạch. Chúng tôi tin rằng việc cung cấp thông tin chi tiết về các chi phí liên quan sẽ giúp các nhà đầu tư và các chủ dự án có được quyết định hợp lý nhất, từ đó tạo điều kiện thuận lợi cho sự phát triển và thành công của các dự án.
                                </Typography>
                            </div>
                            <div className='pt-[2.4rem]' ref={tab3Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Tài nguyên dành cho dự án
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Tài nguyên dành cho dự án bao gồm mọi yếu tố cần thiết để đảm bảo sự thành công của dự án, từ nguồn vốn đến các tài nguyên hỗ trợ. Chúng tôi cam kết cung cấp mọi điều kiện thuận lợi nhất cho các chủ dự án, từ việc kết nối với cộng đồng đến việc tìm kiếm nguồn vốn và các tài nguyên cần thiết. Chúng tôi luôn sẵn sàng hỗ trợ các chủ dự án trong mọi giai đoạn của quá trình triển khai và phát triển dự án.
                                </Typography>
                            </div>
                            <div className='pt-[2.4rem]' ref={tab4Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Tài sản thương hiệu
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Tài sản thương hiệu là một phần quan trọng của mọi dự án. Chúng tôi cung cấp các công cụ và tài nguyên để các chủ dự án có thể xây dựng và phát triển thương hiệu của mình một cách hiệu quả. Từ việc thiết kế logo đến xây dựng chiến lược thương hiệu, chúng tôi luôn sẵn sàng hỗ trợ các chủ dự án trong việc tạo dựng một thương hiệu mạnh mẽ và bền vững.
                                </Typography>
                            </div>
                            <div className='pt-[2.4rem]' ref={tab5Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Điều khoản sử dụng
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Điều khoản sử dụng của chúng tôi được thiết kế để đảm bảo quyền lợi và trách nhiệm của tất cả mọi người tham gia vào nền tảng. Chúng tôi cung cấp thông tin chi tiết và rõ ràng về các điều khoản này để mọi người có thể hiểu rõ và tuân thủ. Chúng tôi cam kết đảm bảo sự công bằng và minh bạch trong mọi hoạt động của nền tảng, từ việc quản lý thông tin đến xử lý các tranh chấp.
                                </Typography>
                            </div>
                            <div className='pt-[2.4rem]' ref={tab6Ref}>
                                <Typography variant="body1" sx={{ fontSize: { lg: '1.6rem', xs: '1.2rem' }, textAlign: 'left', color: '#44494D', fontWeight: 600, textShadow: '.12rem .12rem .3rem rgba(0, 0, 0, 0.2)' }}>
                                    Thông tin liên hệ
                                </Typography>
                                <Typography variant="h1" sx={{ fontSize: { lg: '1rem', xs: '0.8rem' }, color: '#44494D', fontWeight: 500, textAlign: 'justify', mt: '2.4rem', lineHeight: '1.625' }}>
                                    Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Nếu bạn có bất kỳ câu hỏi hoặc cần sự trợ giúp, hãy liên hệ với chúng tôi qua các kênh thông tin sau: Email, số điện thoại, hoặc thông qua trang web chính thức của chúng tôi. Chúng tôi cam kết phản hồi nhanh chóng và hỗ trợ bạn một cách tốt nhất.
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    );
}

export default HelpAndSupport;