"use client"
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum'
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import { coupanValidation, orderSchema } from '@/lib/zodSchema';
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
import { FaShippingFast } from "react-icons/fa";
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const page = () => {
    const breadcrumdata = {
        title: "Checkout",
        links: [
            { name: "checkout", href: "/checkout" },
        ]
    }
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
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

    const orderFormSchema = orderSchema.pick({
        name: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        city: true,
        zip: true,
        landmark: true,
        ordernote: true,
        userId: true,

    })
    const coupanFormSchema = coupanValidation.pick({ code: true, minShoppingAmount: true });
    // console.log("Auth User:", auth.auth._id);
    const orderForm = useForm({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            zip: "",
            landmark: "",
            ordernote: "",
            userId: auth?.auth?._id || "",
        },

    })
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
    const OrderSubmit = async (data) => {
        // console.log("Order Data:", data);
        let orderData = {
            ...data,
            products: cart.products,
            coupan: coupanCode,
        }
        // console.log("Final Order Data:", orderData);
        // Submit orderData to backend API
        try {
            const { data: response } = await axios.post("/api/payment/save-order", orderData);
            if (response && response.success) {
                showToast("success", response.message || "Order placed successfully");
                dispatch(clearCart());
                // Redirect to order success page or order details page
                // router.push(`/order-details/${response.data.orderId}`);

            } else {
                showToast("error", response.message || "Failed to place order");
            }
            console.log("Order Response:", response);
        } catch (error) {
            showToast("error", error.message || "Failed to place order");
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

                        {/* Checkout form and details go here */}

                        <div className='flex font-semibold gap-2 items-center mb-3'>
                            <FaShippingFast size={30} /> Shipping Address
                        </div>


                        <Form {...orderForm}>
                            <form onSubmit={orderForm.handleSubmit(OrderSubmit)} className='grid grid-cols-2 gap-5 '>

                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Enter your name" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Email*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Phone*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Country*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="State*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="City*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="zip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Zip*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={orderForm.control}
                                        name="landmark"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Landmark*" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3 col-span-2'>
                                    <FormField
                                        control={orderForm.control}
                                        name="ordernote"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Order Note" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <ButtonLoading type="submit" className='rounded-full cursor-pointer' loading={false} text={"Place Order"} />
                                </div>

                            </form>

                        </Form>

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
