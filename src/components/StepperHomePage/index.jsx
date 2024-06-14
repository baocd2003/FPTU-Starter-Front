import React, { useEffect, useRef } from 'react';
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Kurumi from '../../assets/samplePrj.png';
import SingleCard from '../ProjectCard/singleCard';

import './index.css';

function StepperHomePage({ setSwiperRef, type }) {
    const swiperRef = useRef(null);
    const step = 3;
    const [sortType, setSortType] = React.useState("popular");

    useEffect(() => {
        if (setSwiperRef) {
            setSwiperRef(swiperRef);
        }
        if (type) {
            setSortType(type);
        }
    }, [setSwiperRef]);

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
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                slidesPerGroup={3}
                modules={[Navigation, Pagination, A11y, EffectFade]}
                className='pt-10 pb-5 px-1'
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                speed={1000}
                loop={true}
            >
                <SwiperSlide>
                    <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"Anonymous"} category="Anime" title="Hollow Knight: Silk Song 1" description="Kurumi1" daysLeft={12} />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"Anonymous"} category="Anime" title="Hollow Knight: Silk Song 2" description="Kurumi1" daysLeft={12} />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"Anonymous"} category="Anime" title="Hollow Knight: Silk Song 3" description="Kurumi1" daysLeft={12} />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"Anonymous"} category="Anime" title="Hollow Knight: Silk Song 4" description="Kurumi1" daysLeft={12} />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"Anonymous"} category="Anime" title="Hollow Knight: Silk Song 5" description="Kurumi1" daysLeft={12} />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleCard imageLink={Kurumi} progress={50} amount={8000000} po={"Anonymous"} category="Anime" title="Hollow Knight: Silk Song 6" description="Kurumi1" daysLeft={12} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default StepperHomePage;
