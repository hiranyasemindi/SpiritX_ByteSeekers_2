import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselCard from './CarouselCard';
import { db, ref, onValue } from '../services/firebase';

const Carousel = () => {
    const [universities, setUniversities] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const universitiesRef = ref(db, 'universities');
        const playersRef = ref(db, 'players');

        console.log('Fetching universities data...');
        const unsubscribe = onValue(universitiesRef, (uniSnapshot) => {
            if (uniSnapshot.exists()) {
                const uniData = uniSnapshot.val();
                console.log('Universities data fetched:', uniData);

                const uniList = [];

                console.log('Fetching players data...');
                onValue(playersRef, (playersSnapshot) => {
                    if (playersSnapshot.exists()) {
                        const playersData = playersSnapshot.val();
                        console.log('Players data fetched:', playersData);

                        const playerCountMap = {};

                        for (let playerId in playersData) {
                            const player = playersData[playerId];
                            const universityName = player.university;

                            if (universityName) {
                                if (!playerCountMap[universityName]) {
                                    playerCountMap[universityName] = 0;
                                }
                                playerCountMap[universityName]++;
                            }
                        }

                        for (let uniId in uniData) {
                            const uni = uniData[uniId];
                            const playersForUniCount = playerCountMap[uni.name] || 0;

                            uniList.push({
                                id: uniId,
                                name: uni.name,
                                logo: uni.logo,
                                playersCount: playersForUniCount
                            });
                        }

                        console.log('University list with player counts:', uniList);
                        setUniversities(uniList);
                    } else {
                        console.log('No players data available');
                    }
                });
            } else {
                console.log('No universities data available');
            }
        });

        return () => unsubscribe();
    }, []);

    console.log('Universities state:', universities);

    return (
        <section className="h-[500px] md:h-[700px] flex items-center justify-center relative bg-cover bg-center" 
         >
    {/* Dark Overlay */}
    {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

    <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-20 text-black">
            Inter-University Cricket Teams
        </h2>

        {universities.length === 0 ? (
            <div className="text-white">Loading...</div>
        ) : (
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
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {universities.map((uni) => (
                    <SwiperSlide key={uni.id} className="min-h-[300px]">
                        <CarouselCard
                            name={uni.name}
                            description={`${uni.playersCount} Players`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
    </div>
</section>

    );

};

export default Carousel;
