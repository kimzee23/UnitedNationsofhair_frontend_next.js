"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const HeroSlider = () => {
    const slides = [
        { id: 1, src: "/images/slider1.jpg", caption: "Luxury Hair Extensions" },
        { id: 2, src: "/images/slider2.jpg", caption: "Beauty Redefined" },
        { id: 3, src: "/images/slider3.jpg", caption: "Shop the Latest Styles" },
    ];

    return (
        <div className="w-full h-[90vh] relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <Image
                                src={slide.src}
                                alt={slide.caption}
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <h1 className="text-white text-4xl md:text-6xl font-bold">
                                    {slide.caption}
                                </h1>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
