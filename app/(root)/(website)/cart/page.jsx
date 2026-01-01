"use client"
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BsCart2 } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { DecreaseQuantity, IncreaseQuantity, removeFromCart } from '@/store/reducer/cartReducer'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { MRT_TableBody } from 'material-react-table'
const CartPage = () => {
    const dispatch = useDispatch();
    const [totalAmount, settotalAmount] = useState(0);
    const [totalDiscount, settotalDiscount] = useState(0);
    const breadcrumdata = {
        title: "Cart",
        links: [
            { name: "cart", href: "/cart" },
        ]
    }
    const cart = useSelector((state) => state.cart);
    const HandelQuantity = (type, items) => {
        if (type === "INC") {
            dispatch(IncreaseQuantity({ variantId: items.variantId, productId: items.productId }))
        }
        else {
            if (items.quantity > 1) {
                dispatch(DecreaseQuantity({ variantId: items.variantId, productId: items.productId }));
            }
        }
    }
    useEffect(() => {
        let products = cart.products;
        const amount = products.reduce((acc, item) => acc + (item.sellingPrice * item.quantity), 0);
        settotalAmount(amount);
        const discount = products.reduce((acc, item) => acc + ((item.mrp - item.sellingPrice) * item.quantity), 0);
        settotalDiscount(discount);
    }, [cart])
    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            {cart.count === 0 ? (
                <div className='flex flex-col items-center justify-center h-[70vh]'>
                    <BsCart2 size={80} className='text-gray-400' />
                    <p className='text-gray-500 mt-4 text-xl'>Your cart is empty</p>
                    <Button className='mt-4 px-6 py-2 bg-primary cursor-pointer text-white rounded' asChild >
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className='flex lg:flex-nowrap flex-wrap lg:px-32 my-20 gap-10'>
                    <div className='lg:w-[70%] w-full'>
                        <table className='w-full '>
                            <thead className='border-b bg-gray-50 md:table-header-group hidden'>
                                <tr className=''>
                                    <th className='text-start p-3'>Product</th>
                                    <th className='text-center p-3'>Price</th>
                                    <th className='text-center p-3'>Quantity</th>
                                    <th className='text-center p-3'>Total</th>
                                    <th className='text-center p-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.products.map((items, index) => {
                                    return (
                                        <tr key={items.variantId} className="border-b md:table-row block">
                                            <td>
                                                <div className="flex items-center gap-5">
                                                    <Image src={items.media || '/assets/images/img-placeholder.webp'} alt={items.name} width={80} height={80}
                                                        className='h-20 w-20 rounded border' />
                                                    <div>
                                                        <h3 className='text-lg font-medium line-clamp-1 mb-1'>
                                                            <Link href={`/product/${items.url}`} className='text-lg mb-1'>{items.name}</Link>
                                                        </h3>
                                                        <p className='text-sm'>Color:{items.color}</p>
                                                        <p className='text-sm'>Size:{items.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 '>
                                                <span className='md:hidden font-medium'>Price:</span>
                                                <span className='font-medium'>${items.sellingPrice.toFixed()}</span>
                                            </td>
                                            <td className='md:table-cell flex items-center justify-between md:p-3 px-2 pb-2'>
                                                <span className='md:hidden font-medium'>Quantity:</span>
                                                <div className='flex justify-center'>
                                                    <div className=' flex items-center md:h-10  h-7 border w-fit rounded-full '>
                                                        <button className='px-4 cursor-pointer rounded-l-full' onClick={() => HandelQuantity("DEC", items)}>
                                                            <HiMinus />
                                                        </button>
                                                        <input type="number"
                                                            className='md:w-14 w-8  text-center border-none outline-none offset-0'
                                                            readOnly
                                                            value={items.quantity} />
                                                        <button className='px-4 cursor-pointer rounded-r-full' onClick={() => HandelQuantity("INC", items)}>
                                                            <HiPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                                <span className='md:hidden font-medium'>Total:</span>
                                                <span className='font-medium'>${(items.sellingPrice * items.quantity).toFixed()}</span>
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                                <span className='md:hidden font-medium'>Remove:</span>
                                                <button type='button'
                                                    onClick={() => dispatch(removeFromCart({ variantId: items.variantId, productId: items.productId }))}
                                                    className='text-red-500 cursor-pointer text-2xl hover:text-red-700'>
                                                    <IoCloseCircleOutline />
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='lg:w-[30%] w-full'>
                        <div className='rounded bg-gray-50 p-5 sticky top-5'>
                            <h4 className='text-lg font-semibold md-5'>Order Summary</h4>
                            <div>
                                <table className='w-full'>
                                    <tbody>
                                        <tr>
                                            <td className='font-medium py-2'>Subtotal</td>
                                            <td className='text-end py-2'>${(totalAmount + totalDiscount).toFixed()}</td>

                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Discount</td>
                                            <td className='text-end py-2'>- ${totalDiscount.toFixed()}</td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Total</td>
                                            <td className='text-end py-2'>${totalAmount.toFixed()}</td>

                                        </tr>
                                    </tbody>
                                </table>
                                <Button className='w-full mt-5 px-6 mb-3 bg-black cursor-pointer text-white rounded-full' asChild >
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>
                                <p className='text-center hover:underline cursor-pointer'><Link href="/">Continue Shopping</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CartPage
