
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

import { IoIosArrowRoundForward } from 'react-icons/io'
import ProductBox from './ProductBox';
const FeacherProduct = async () => {
    const { data: productData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/get-feature-product`);

    if (!productData) return <div>Loading...</div>;

    return (
        <section className='lg:px-32 px-4 sm:py-10'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='sm:text-3xl text-2xl font-semibold'>Featured Products</h2>
                <Link href="#" className='flex items-center underline underline-offset-4 hover:text-primary'>
                    View All
                    <IoIosArrowRoundForward className='inline-block ml-1' />
                </Link>

            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-8 gap-4'>
                {productData?.data?.map((product) => (
                    <ProductBox key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default FeacherProduct
