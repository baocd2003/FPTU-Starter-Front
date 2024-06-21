import Typography from '@mui/material/Typography';
import React, { useEffect, useRef } from 'react';
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import EmptyProject from '../../assets/EmptyProject.png';
import projectApiInstance from "../../utils/apiInstance/projectApiInstance";
import SingleCard from '../ProjectCard/singleCard';

import './index.css';

function StepperHomePage({ setSwiperRef, type }) {
    const swiperRef = useRef(null);
    const step = 3;
    const [sortType, setSortType] = React.useState("popular");
    const [projects, setProjects] = React.useState(null);

    const completePercent = (project) => {
        return (project.projectBalance / project.projectTarget * 100).toFixed(2);
    }

    const calculateDaysRemaining = (project) => {
        const today = new Date();
        const startDate = new Date(project.startDate);
        const endDate = new Date(project.endDate);
        if (startDate >= today) {
            return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        }

        if (endDate <= today) {
            return 0;
        }

        const diffInMilliseconds = endDate - today;
        const daysRemaining = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        return daysRemaining;
    }

    useEffect(() => {
        try {
            if (sortType == 'popular') {
                projectApiInstance.get(`/get-process-project?itemPerPage=8&currentPage=1`).then((res) => {
                    if (res.data._statusCode === 200) {
                        setProjects(res.data._data);
                    }
                })
            } else {
                projectApiInstance.get(`/get-process-project?itemPerPage=8&currentPage=1`).then((res) => {
                    if (res.data._statusCode === 200) {
                        setProjects(res.data._data);
                    }
                })
            }
        } catch (error) {
            console.error("Error fetching project list:", error);
        }
        console.log(projects)
    }, []);

    useEffect(() => {
        if (setSwiperRef) {
            setSwiperRef(swiperRef);
        }
        if (type) {
            setSortType(type);
        }
    }, [setSwiperRef, type]);

    const slidePrev = () => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            swiper.slidePrev(step);
        }
    };

    const slideNext = () => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            swiper.slideNext(step);
        }
    };

    return (
        <div className="swiper-container">
            {projects && projects != undefined && projects.length > 0 ? (
                <Swiper
                    spaceBetween={25}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    modules={[Navigation, Pagination, A11y, EffectFade]}
                    className='pt-10 pb-5 px-1'
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    speed={1000}
                    loop={true}
                >
                    {projects.map((item, index) => (
                        <SwiperSlide key={index}>
                            <SingleCard
                                id={item.id}
                                imageLink={item.projectThumbnail}
                                progress={completePercent(item)}
                                amount={item.projectBalance}
                                po={item.projectOwnerName}
                                category={item.categories[0].name}
                                title={item.projectName}
                                daysLeft={calculateDaysRemaining(item)}
                                goal={item.projectTarget}
                                likes={item.likes}
                                backers={item.backers} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : <div className='w-full bg-transparent rounded-[10px] flex flex-col justify-center items-center mt-10 mb-5'>
                <img src={EmptyProject} alt='Not found' className='emptyProjectImg mt-12' />
                <Typography style={{ marginTop: '2rem', fontWeight: 'bold', fontSize: '1.25rem', lineHeight: '1.75rem', color: "#969696" }}>
                    Không có gì ở đây cả
                </Typography>
                <Typography style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.25rem', lineHeight: '1.75rem', color: "#969696", marginBottom: '3rem' }}>
                    Không có dự án nào cho mục này
                </Typography>
            </div>}

        </div>
    );
}

export default StepperHomePage;
