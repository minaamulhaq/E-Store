"use client";
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Image from 'next/image';
import slide1 from '@/public/assets/images/slider-1.png'
import slide2 from '@/public/assets/images/slider-2.png'
import slide3 from '@/public/assets/images/slider-3.png'
import slide4 from '@/public/assets/images/slider-4.png'
import slide5 from '@/public/assets/images/slider-5.png'

import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";


const ArrowNext = (props) => {
    const { onClick, style, className } = props;
    return (
        <div
            // we combine 'className' (from library) with your Tailwind classes
            // 'before:hidden' removes the default default slick-theme arrow
            className={`${className} !flex items-center justify-center !bg-white !w-12 !h-12 rounded-full z-10 shadow-md before:hidden hover:scale-105 transition-all`}

            // We force display:flex to center the icon, and set position
            style={{ ...style, display: "flex", right: "10px" }}
            onClick={onClick}
        >
            {/* Putting the Icon back inside */}
            <LuChevronRight size={25} className='text-gray-800' />
        </div>
    );
}
const ArrowPrev = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} !flex items-center justify-center !bg-white !w-12 !h-12 rounded-full z-10 shadow-md before:hidden hover:scale-105 transition-all`}
            style={{ ...style, display: "flex", left: "10px" }}
            onClick={onClick}
        >
            {/* Putting the Icon back inside */}
            <LuChevronLeft size={25} className='text-gray-800' />
        </div>
    );
}
const MainSlider = () => {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <ArrowNext />,
        prevArrow: <ArrowPrev />,
        dotsClass: "slick-dots !bottom-5",
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    nextArrow: null,
                    prevArrow: null,
                    autoplay: true,
                    infinite: true,
                }
            }
        ]
    };
    return (
        <div className='w-full'>
            <Slider {...setting} className='max-w-full overflow-hidden'>
                <div>
                    <Image src={slide1.src} priority={true} alt="Slide 1" width={slide1.width} height={slide1.height} />
                </div>
                <div>
                    <Image src={slide2.src} priority={true} alt="Slide 2" width={slide2.width} height={slide2.height} />
                </div>
                <div>
                    <Image src={slide3.src} priority={true} alt="Slide 3" width={slide3.width} height={slide3.height} />
                </div>
                <div>
                    <Image src={slide4.src} priority={true} alt="Slide 4" width={slide4.width} height={slide4.height} />
                </div>
                <div>
                    <Image src={slide5.src} priority={true} alt="Slide 5" width={slide5.width} height={slide5.height} />
                </div>

            </Slider>
        </div>
    )
}

export default MainSlider
