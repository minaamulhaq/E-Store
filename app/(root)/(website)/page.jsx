import MainSlider from '@/components/Application/Website/MainSlider'
import React from 'react'
import banner1 from '@/public/assets/images/banner1.png'
import banner2 from '@/public/assets/images/banner2.png'
import advertisment from '@/public/assets/images/advertising-banner.png'
import Image from 'next/image'
import Link from 'next/link'
import FeacherProduct from '@/components/Application/Website/FeacherProduct'
import Testimonial from '@/components/Application/Website/Testimonial'
import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";


const page = () => {
    return (
        <>
            <section className=''>
                <MainSlider />
            </section>
            <section className='lg:px-32 px-4 sm:pt-10 pt-5 pb-10'>
                <div className='grid grid-cols-2 sm:gap-10 gap-2'>
                    <div className='border rounded-lg overflow-hidden'>
                        <Link href={`#`} className='hover:scale-105 transition-all'>
                            <Image src={banner1.src} alt="Banner 1" width={banner1.width} height={banner1.height} />

                        </Link>
                    </div>
                    <div className='border rounded-lg overflow-hidden'>
                        <Link href={`#`} className='hover:scale-105 transition-all'>
                            <Image src={banner2.src} alt="Banner 2" width={banner2.width} height={banner2.height} />
                        </Link>
                    </div>

                </div>

            </section>
            <FeacherProduct />
            <section className='sm:pt-10 pt-5 pb-10'>
                <Image src={advertisment.src} alt="advertizment banner " width={advertisment.width} height={advertisment.height} />
            </section>

            <section>
                <Testimonial />
            </section>
            <section className='bg-gray-50 lg:px-32 px-4 py-10 border-t'>
                {/* Additional sections can be added here */}
                <div className='grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1'>
                    <div className='text-center text-sm'>
                        <p className='flex justify-center items-center mb-3'>
                            <GiReturnArrow size={30} />
                        </p>
                        <h3 className='font-semibold text-xl mb-1'>7 Days Return</h3>
                        <p >Risk free shopping with easy return</p>
                    </div>
                    <div className='text-center text-sm'>
                        <p className='flex justify-center items-center mb-3'>
                            <FaShippingFast size={30} />
                        </p>
                        <h3 className='font-semibold text-xl mb-1'>Fast Shipping</h3>
                        <p >No extra cost for fast delivery</p>
                    </div>
                    <div className='text-center text-sm'>
                        <p className='flex justify-center items-center mb-3'>
                            <BiSupport size={30} />
                        </p>
                        <h3 className='font-semibold text-xl mb-1'>Customer Support</h3>
                        <p >24/7 customer support for all your needs</p>
                    </div>
                    <div className='text-center text-sm'>
                        <p className='flex justify-center items-center mb-3'>
                            <TbRosetteDiscountFilled size={30} />
                        </p>
                        <h3 className='font-semibold text-xl mb-1'>Special Discounts</h3>
                        <p >Exclusive deals and offers for you</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
