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
import axios from 'axios';
import { IoCloseCircleSharp, IoCloseSharp } from 'react-icons/io5';
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
    const [CoupanDiscount, setCoupanDiscount] = useState(0);
    const [Total, setTotal] = useState(0);
    const [coupanLoading, setcoupanLoading] = useState(false);
    const [coupanCode, setcoupanCode] = useState("")
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

        const discount = products.reduce((acc, item) => acc + ((item.mrp - item.sellingPrice) * item.quantity), 0);
        setSubtotal(amount);
        setTotal(amount);
        settotalDiscount(discount);
        form.setValue("minShoppingAmount", amount);

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
        console.log("Data", data);
        setcoupanLoading(true);
        try {
            //const { data: response } = useFetch("/api/coupan/apply", "POST", { code: data.code, minShoppingAmount: Subtotal });
            const { data: response } = await axios.post("/api/coupan/apply", { code: data.code, minShoppingAmount: Subtotal });
            if (response && response.success) {
                setCoupanDiscount((Subtotal * response.data.discountPercentage) / 100);
                setTotal(Subtotal - (Subtotal * response.data.discountPercentage) / 100);
                setisCoupanApplied(true);
                showToast("success", response.message || "Coupan applied successfully");
                setcoupanCode(form.getValues("code"));
                form.setValue("code", "");
            } else {
                showToast("error", response.message || "Failed to apply coupon");
            }




        } catch (error) {
            showToast("error", error.message || "Failed to apply coupon");
        } finally {
            setcoupanLoading(false);
        }
    }
    const removeCoupan = () => {
        setisCoupanApplied(false);
        setCoupanDiscount(0);
        setTotal(Subtotal);
        setcoupanCode("");
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
                                            <td className='text-end py-2'>- ${totalDiscount.toFixed()}</td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Coupan Discount</td>
                                            <td className='text-end py-2'>- ${CoupanDiscount.toFixed()}</td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Total:</td>
                                            <td className='text-end py-2'>${Total.toFixed()}</td>
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
                                            <div className='flex justify-between py-1 px-5 rounded-lg bg-gray-200'>
                                                <div className=''>
                                                    <span className='text-xs'>Coupan:</span>
                                                    <p className='font-semibold text-sm'>{coupanCode}</p>

                                                </div>
                                                <button onClick={removeCoupan} type="button" className="text-red-500">
                                                    <IoCloseCircleSharp size={20} className='cursor-pointer ' />
                                                </button>

                                            </div>
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
