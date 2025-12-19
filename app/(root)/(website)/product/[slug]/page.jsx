import axios from 'axios';
import React from 'react'
import { ProductDetails } from './ProductDetails';


const page = async ({ params, searchParams }) => {
    const { slug } = await params;
    const { color, size } = await searchParams;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/product/details/${slug}`;
    if (color) {
        url += `?color=${color}`;
    }
    if (size) {
        url += color ? `&size=${size}` : `?size=${size}`;
    }
    const { data: productData } = await axios.get(url);
    // console.log(productData);
    if (!productData.success) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <h1 className='text-4xl font-semibold'>{productData?.message || "Product not found"}</h1>
            </div>
        );
    } else {
        return (
            <ProductDetails
                product={productData.data.product}
                variant={productData.data.variants}
                color={productData.data.colors}
                size={productData.data.sizes}
                reviewsCount={productData.data.reviewsCount}
            />
        )
    }
}

export default page
