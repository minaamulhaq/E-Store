"use client"
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum'
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import { coupanValidation } from '@/lib/zodSchema';
import { addInToCart, clearCart } from '@/store/reducer/cartReducer';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

import { BsCart2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { ButtonLoading } from '@/components/Application/ButtonLoading';
import { showToast } from '@/lib/showToast';
const page = () => {
    const breadcrumdata = {
        title: "Checkout",
        links: [
            { name: "checkout", href: "/checkout" },
        ]
    }
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [CartVarified, setCartVarified] = useState([])
    const { data: varifiedCart } = useFetch("/api/cart-varification", "POST", { data: cart.products })
    // console.log(varifiedCart);
    const [isCoupanApplied, setisCoupanApplied] = useState(false)
    const [Subtotal, setSubtotal] = useState(0);
    const [totalDiscount, settotalDiscount] = useState(0);
    const [coupanLoading, setcoupanLoading] = useState(false);
    useEffect(() => {
        if (varifiedCart && varifiedCart.success) {
            setCartVarified(varifiedCart.data);
            dispatch(clearCart());
            varifiedCart.data.forEach((item) => {
                dispatch(addInToCart(item));
            })
        }
    }, [varifiedCart])



    useEffect(() => {
        let products = cart.products;
        const amount = products.reduce((acc, item) => acc + (item.sellingPrice * item.quantity), 0);
        setSubtotal(amount);
        const discount = products.reduce((acc, item) => acc + ((item.mrp - item.sellingPrice) * item.quantity), 0);
        settotalDiscount(discount);
    }, [cart])
    const coupanFormSchema = coupanValidation.pick({ code: true, minShoppingAmount: true });
    const form = useForm({
        resolver: zodResolver(coupanFormSchema),
        defaultValues: {
            code: "",
            minShoppingAmount: Subtotal,
        },

    })
    const applycoupen = async (data) => {
        setcoupanLoading(true);
        try {

        } catch (error) {
            showToast("error", error.message || "Failed to apply coupon");
        } finally {
            setcoupanLoading(false);
        }
    }

    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            {cart.count === 0 ?
                <div className='flex flex-col items-center justify-center h-[70vh]'>
                    <BsCart2 size={80} className='text-gray-400' />
                    <p className='text-gray-500 mt-4 text-xl'>Your cart is empty</p>
                    <Button className='mt-4 px-6 py-2 bg-primary cursor-pointer text-white rounded' asChild >
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </div>
                :
                <div className='flex lg:flex-nowrap flex-wrap lg:px-32 my-20 gap-10'>
                    <div className='lg:w-[60%] w-full'>
                        <h2 className='text-2xl font-semibold mb-6'>Checkout Page</h2>
                        {/* Checkout form and details go here */}
                    </div>
                    <div className='lg:w-[40%] w-full'>
                        <div className='rounded bg-gray-50 p-5 sticky top-5'>
                            <h4 className='text-lg font-semibold md-5'>Order Summary</h4>

                            <div>
                                <table className='w-full border'>
                                    <tbody>
                                        {CartVarified.map((item, index) => (
                                            <tr key={item.variantId} >
                                                <td className='p-2'>
                                                    <div className='flex items-center gap-5'>
                                                        <Image src={item.media} alt={item.name} width={60} height={60} className='rounded object-cover' />
                                                        <div>
                                                            <h4 className='font-medium line-clamp-1'><Link href={`/product/${item.url}`}>{item.name}</Link></h4>
                                                            <p className='text-sm text-gray-600'>Color: {item.color},</p>
                                                            <p className='text-sm text-gray-600'>Size: {item.size}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='p-2'>
                                                    <p className='text-nowrap text-sm'>{item.quantity} x ${item.sellingPrice}</p>
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <table className='w-full'>
                                    <tbody>
                                        <tr>
                                            <td className='font-medium py-2'>Subtotal</td>
                                            <td className='text-end py-2'>${(Subtotal + totalDiscount).toFixed()}</td>

                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Discount</td>
                                            <td className='text-end py-2'>${totalDiscount.toFixed()}</td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Coupan Discount</td>
                                            <td className='text-end py-2'></td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Total:</td>
                                            <td className='text-end py-2'> </td>

                                        </tr>
                                    </tbody>
                                </table>
                                <div className='mt-2 mb-5'>
                                    {!isCoupanApplied ?
                                        <>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(applycoupen)} className='flex justify-between gap-2'>
                                                    <div className='w-[calc(100%-100px)]'>
                                                        <FormField
                                                            control={form.control}
                                                            name="code"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder="Enter Coupon Code" {...field} />
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className='w-[100px]'>
                                                        <ButtonLoading type="submit" className='w-full cursor-pointer' loading={coupanLoading} text={"Apply"} />
                                                    </div>
                                                </form>
                                            </Form>

                                        </>
                                        :
                                        <>

                                        </>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default page
