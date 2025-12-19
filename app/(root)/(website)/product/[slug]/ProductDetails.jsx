"use client"
import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from 'next/image'
import { IoStar } from 'react-icons/io5'
import { decode } from 'entities'
import Link from 'next/link'
import { PRODUCT_DETAILS } from '@/lib/utils'
import { HiMinus, HiPlus } from "react-icons/hi";
import { ButtonLoading } from '@/components/Application/ButtonLoading'
import { useDispatch, useSelector } from 'react-redux'
import { addInToCart } from '@/store/reducer/cartReducer'
import { showToast } from '@/lib/showToast'
import { Button } from '@/components/ui/button'
import ProductReviews from '@/components/Application/Website/ProductReviews'

export const ProductDetails = ({ product, variant, color, size, reviewsCount }) => {

    const [ActiveThumb, setActiveThumb] = useState("");
    const [count, setcount] = useState(1);
    const [IsAddedToCart, setIsAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const cartStore = useSelector((state) => state.cart);
    useEffect(() => {
        const isInCart = cartStore.products.findIndex(item => item.productId === product._id && item.variantId === variant._id);
        if (isInCart >= 0) {

            setIsAddedToCart(isInCart);
        } else {
            setIsAddedToCart(false);
        }
    }, [variant]);



    useEffect(() => {
        if (product?.media?.length > 0) {
            setActiveThumb(product.media[0].secure_url);
        }
    }, [product])

    const HandelQuantity = (type) => {
        if (type === "INC") {
            setcount(count + 1);
        }
        else {
            if (count > 1) {
                setcount(count - 1);
            }
        }
    }
    const HandleAddToCart = () => {
        const cartItem = {
            productId: product._id,
            variantId: variant._id,
            name: product.name,
            url: product.slug,
            color: variant.color,
            size: variant.size,
            sellingPrice: variant.sellingPrice,
            mrp: variant.mrp,
            quantity: count,
            media: product.media[0].secure_url,
        }
        dispatch(addInToCart(cartItem));
        setIsAddedToCart(true);
        showToast('success', 'Product added to cart successfully');

    }

    return (
        <div className="lg:px-32 px-4">
            <div className='my-10'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/shop">Product</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="md:flex justify-between  gap-5 mb-20">
                <div className='md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:stickey md:top-0'>
                    <div className='xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]'>
                        <Image src={ActiveThumb || "/default-image.jpg"} alt={product.name} width={600} height={600} className='border rounded h-[500px] object-cover max-w-full' />
                    </div>
                    <div className='flex xl:flex-col xl:items-center xl:gap-5 gap-3 xl:w-35 overflow-auto xl:pb-0 pb-2 max-h-[500px]'>
                        {product.media.map((mediaItem, index) => (
                            <div
                                key={index}>
                                <Image
                                    src={mediaItem.secure_url}
                                    alt={`${product.name} - ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className={`border rounded cursor-pointer ${ActiveThumb === mediaItem.secure_url ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={() => setActiveThumb(mediaItem.secure_url)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='md:w-1/2 mt-5 md:mt-0'>
                    <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
                    <div className='flex items-center gap-1 mb-5'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <IoStar key={index} />
                        ))}
                        <span className='ps-2 text-sm text-gray-500'>({reviewsCount} Reviews)</span>
                    </div>



                    <div className='flex items-center gap-3 mb-3'>
                        <span className='text-xl font-semibold'>${variant.sellingPrice}</span>
                        <span className='text-xl line-through text-gray-500'>${variant.mrp}</span>
                        <span className='px-3 py-1 bg-red-500 text-white rounded-2xl text-xs ms-5'>-{variant.discountPercentage}%</span>
                    </div>
                    <div className='line-clamp-3' dangerouslySetInnerHTML={{ __html: decode(product.description) }}></div>
                    <div className='mt-5'>
                        <p className='mb-2'>
                            <span className='font-semibold me-2'>Color: {variant.color}</span>
                        </p>
                        <div className='flex gap-5'>
                            {color.map((col, index) => (
                                <Link href={`${PRODUCT_DETAILS(product.slug)}?color=${col}&&size=${variant.size}`} key={index} className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${col === variant.color ? "bg-primary text-white" : ""} `}>
                                    {col}
                                </Link>
                            ))}
                        </div>



                    </div>

                    <div className='mt-5'>
                        <p className='mb-2'>
                            <span className='font-semibold me-2'>Size: {variant.size}</span>
                        </p>
                        <div className='flex gap-5'>
                            {size.map((s, index) => (
                                <Link href={`${PRODUCT_DETAILS(product.slug)}?color=${variant.color}&&size=${s}`} key={index} className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${s === variant.size ? "bg-primary text-white" : ""} `}>
                                    {s}
                                </Link>
                            ))}
                        </div>

                        <div className='mt-5'>
                            <p className="font-bold mb-2">Quantity</p>
                            <div className='flex items-center h-10 border w-fit rounded-full'>
                                <button className='px-4 cursor-pointer rounded-l-full' onClick={() => HandelQuantity("DEC")}>
                                    <HiMinus />
                                </button>
                                <input type="number"
                                    className='w-8 text-center border-none outline-none offset-0'
                                    readOnly
                                    value={count} />
                                <button className='px-4 cursor-pointer rounded-r-full' onClick={() => HandelQuantity("INC")}>
                                    <HiPlus />
                                </button>
                            </div>

                        </div>

                        <div>

                        </div>
                    </div>
                    <div className='mt-5'>
                        {!IsAddedToCart ? <ButtonLoading type="button"
                            className="rounded-full cursor-pointer w-full px-8 py-3"
                            onClick={HandleAddToCart}
                            text="Add to Cart" /> :
                            <Button type="button" className="rounded-full cursor-pointer w-full px-8 py-3 bg-primary" asChild >
                                <Link href="/cart" >
                                    Go to Cart
                                </Link>
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <div className='mb-10'>
                <div className='shadow border rounded'>
                    <div className='p-3 bg-gray-50 border-b'>
                        <h2 className="font-semibold text-2xl">Product Details</h2>
                    </div>
                    <div className='p-3'>
                        <div className='' dangerouslySetInnerHTML={{ __html: decode(product.description) }}></div>
                    </div>
                </div>
            </div>
            <ProductReviews product={product._id} />
        </div >

    )
}

