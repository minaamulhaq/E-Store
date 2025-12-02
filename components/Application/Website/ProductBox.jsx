// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import ImagePlace from '@/public/assets/images/img-placeholder.webp'
// const ProductBox = ({ product }) => {
//     return (
//         <div className='border rounded-lg hover:shadow-lg transition-shadow'>
//             <Link href={`/product/${product._id}`} className='block'>
//                 <Image
//                     src={product.media[0].secure_url || ImagePlace.src}
//                     alt={product.name}
//                     width={300}
//                     height={300}
//                     title={product.name}
//                     className='w-full lg:h-[300px] h-[150px] object-cover'
//                 />
//                 <h3 className='text-lg font-medium ml-2 truncate'>{product.name}</h3>
//                 <p className='text-md ml-2 mt-1 mb-3'>
//                     <span className='line-through text-gray-500 '>${product.mrp}</span>
//                     {' '}
//                     <span className='text-primary font-semibold'>${product.sellingPrice}</span>
//                 </p>
//             </Link>
//         </div>
//     )
// }

// export default ProductBox


"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Slider from 'react-slick'
import ImagePlace from '@/public/assets/images/img-placeholder.webp'

// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- CUSTOM ARROW COMPONENTS ---

// Right Arrow (Next)
const NextArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
            aria-label="Next image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    );
};

// Left Arrow (Previous)
const PrevArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
            aria-label="Previous image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
    );
};


const ProductBox = ({ product }) => {

    // 1. Prepare images
    const sliderImages = (product.media && product.media.length > 0)
        ? product.media
        : [{ secure_url: ImagePlace.src }];

    // 2. Slider Settings
    const settings = {
        dots: true,
        infinite: sliderImages.length > 1, // Only loop if actually multiple images
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: sliderImages.length > 1, // Only show arrows if > 1 image
        nextArrow: <NextArrow />, // Use custom component
        prevArrow: <PrevArrow />, // Use custom component
    };

    return (
        <div className='border rounded-lg hover:shadow-lg transition-shadow bg-white group overflow-hidden relative'>

            {/* --- SLIDER SECTION --- */}
            <div className='relative w-full lg:h-[275px] h-[150px]'>
                {/* We add a specific class to styling the dots via CSS below */}
                <Slider {...settings} className="product-slider h-full">
                    {sliderImages.map((imageItem, index) => (
                        <div key={index} className='relative w-full lg:h-[275px] h-[150px] outline-none'>
                            <Link href={`/product/${product._id}`} className='block w-full h-full'>
                                <Image
                                    src={imageItem.secure_url}
                                    alt={product.name}
                                    fill
                                    className='object-cover'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index === 0}
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* --- DETAILS SECTION --- */}
            <div className='p-3'>
                <Link href={`/product/${product._id}`} className='block'>
                    <h3 className='text-lg font-medium truncate group-hover:text-blue-600 transition-colors'>
                        {product.name}
                    </h3>
                    <p className='text-md mt-1'>
                        <span className='line-through text-gray-500 mr-2'>${product.mrp}</span>
                        <span className='text-primary font-semibold'>${product.sellingPrice}</span>
                    </p>
                </Link>
            </div>

            {/* --- CUSTOM CSS --- */}
            <style jsx global>{`
                /* Move dots up slightly so they sit on the image */
                .product-slider .slick-dots {
                    bottom: 10px;
                    z-index: 10;
                }
                .product-slider .slick-dots li {
                    margin: 0 2px;
                }
                .product-slider .slick-dots li button:before {
                    font-size: 6px;
                    color: white;
                    opacity: 0.5;
                    text-shadow: 0 0 2px rgba(0,0,0,0.5);
                }
                .product-slider .slick-dots li.slick-active button:before {
                    color: white;
                    opacity: 1;
                }
            `}</style>
        </div>
    )
}

export default ProductBox

