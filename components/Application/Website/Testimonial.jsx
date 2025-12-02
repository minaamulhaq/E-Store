"use client";
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { FaStar } from "react-icons/fa";
import { BsChatQuote } from "react-icons/bs";

const testimonials = [
    {
        name: "Ayesha Khan",
        review:
            "I was honestly surprised by the quality of service I received. The team was quick to respond and guided me through every step. Highly recommended for anyone looking for reliable support.",
        rating: 5
    },
    {
        name: "Hamza Ali",
        review:
            "Their product exceeded my expectations in every possible way. The interface is clean, fast, and extremely easy to use. I will definitely be coming back for more purchases.",
        rating: 5
    },
    {
        name: "Sana Tariq",
        review:
            "I had a few doubts before ordering, but everything went smoothly. The delivery was on time and the packaging was professional. Great experience overall, totally worth the money.",
        rating: 4
    },
    {
        name: "Bilal Ahmad",
        review:
            "Customer support was very patient and understanding. They fixed my issue within minutes without any hassle. I appreciate the dedication and professionalism.",
        rating: 4
    },
    {
        name: "Marium Sheikh",
        review:
            "I’ve tried similar services before but this one stands out. The attention to detail and quality is remarkable. I’ll definitely recommend it to my friends and colleagues.",
        rating: 5
    },
    {
        name: "Usman Farooq",
        review:
            "The product is solid and works exactly as advertised. Performance is smooth and I faced zero problems using it. A great overall experience that made me a loyal customer.",
        rating: 4
    },
    {
        name: "Nimra Hassan",
        review:
            "I love how user-friendly everything is from start to finish. Their team really knows how to create a good customer journey. I’m extremely satisfied with the results I received.",
        rating: 5
    },
    {
        name: "Zain Malik",
        review:
            "At first I thought it would be complex to set up, but it wasn’t. Everything was explained clearly with step-by-step guidance. Really amazing service, very impressed with the simplicity.",
        rating: 4
    },
    {
        name: "Hira Saeed",
        review:
            "The quality is top-notch and absolutely worth the price. I appreciate how quickly they respond to queries. Would definitely order again without hesitation.",
        rating: 5
    },
    {
        name: "Shahzad Raza",
        review:
            "I had a wonderful experience using their service. The process was smooth and the results were exceptional. I’m happy to say they’ve earned a long-term customer.",
        rating: 5
    }
];


const Testimonial = () => {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        dotsClass: "slick-dots !bottom-2",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    infinite: true,
                    arrows: false,
                    autoplay: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    arrows: false,
                    autoplay: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    return (
        <div className='lg:px-32 px-4 sm:pt-10 pt-5 pb-10'>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Product Reviews</h2>
            <Slider {...setting} className='max-w-full overflow-hidden'>
                {testimonials.map((testimonial, index) => {
                    return (
                        <div key={index} className='px-2'>

                            <div className='p-6 border mx-3 rounded-lg flex flex-col justify-between'>
                                <BsChatQuote className='text-4xl mb-4' />
                                <div>
                                    <p className='text-gray-700 mb-4'> {testimonial.review} </p>
                                    <h3 className='font-semibold '>{testimonial.name}</h3>
                                </div>
                                <div className='flex mt-1'>
                                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                                        <FaStar key={starIndex} className='text-yellow-400' />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}


            </Slider>
        </div>
    )
}

export default Testimonial
