import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselCard from './CarouselCard';

const universities = [
    { id: 1, logo: "/images/logo.png", name: "University of Colombo", description: "Home of the Colombo Lions." },
    ...Array(10).fill().map((_, i) => ({
        id: i + 1,
        logo: "/images/logo.png",
        name: `University ${i + 1}`,
        description: "A university with a strong cricket team.",
    })),
];

const Carousel = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="h-screen flex items-center justify-center bg-gray-50">
            <div className="container mx-auto px-6 relative">
                <h2 className="text-3xl font-bold text-center mb-20 text-primary">Inter-University Cricket Teams</h2>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    autoHeight={true} 
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {universities.map((uni) => (
                        <SwiperSlide key={uni.id} className="min-h-[300px]">
                            <CarouselCard logo={uni.logo} name={uni.name} description={uni.description} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                
            </div>
        </section>
    );
};

export default Carousel;