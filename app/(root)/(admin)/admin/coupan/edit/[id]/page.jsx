"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { ButtonLoading } from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { coupanSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';



const breadCrumData = [
    { href: "/dashboard", label: "Home" },
    { href: "/admin/coupan", label: "Coupons" },
    { href: "#", label: "Edit Coupon" },
]

const EditCoupan = ({ params }) => {

    const { id } = use(params);

    const { data: coupanData } = useFetch(`/api/coupan/get/${id}`);

    const [loading, setLoading] = React.useState(false);
    const formSchema = coupanSchema.pick({
        _id: true,
        code: true,
        discountPercentage: true,
        minShoppingAmount: true,
        validity: true,
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: id,
            code: "",
            discountPercentage: 0,
            minShoppingAmount: 0,
            validity: "",
        },
    });

    useEffect(() => {
        if (coupanData && coupanData.success) {
            form.setValue('code', coupanData.data.code);
            form.setValue('discountPercentage', coupanData.data.discountPercentage);
            form.setValue('minShoppingAmount', coupanData.data.minShoppingAmount);
            form.setValue('validity', coupanData.data.validity.split('T')[0]);
        }
    }, [coupanData])

    const HandleSubmit = async (value) => {


        setLoading(true);
        try {
            const { data: response } = await axios.put(`/api/coupan/update`, value);
            if (response.success) {
                form.reset();

                showToast('success', response.message);
            } else {
                showToast('error', response.message);
            }
        } catch (e) {
            showToast('error', e.message);
        } finally {

            setLoading(false);
        }
    };

    return (
        <div>
            <BreadCrumb breadCrumData={breadCrumData} />
            <Card className={`py-0 rounded shadow-md`}>
                <CardHeader className={`pt-3 px-3 border-b [.border-b]:pb-2`}>
                    <h3 className='text-xl font-semibold'>Edit Coupon</h3>
                </CardHeader>
                <CardContent className={`pb-5`}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(HandleSubmit)} >

                            <div className="grid md:grid-cols-2 gap-5 mb-3">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Code:<span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Enter Code" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>

                                    <FormField
                                        control={form.control}
                                        name="discountPercentage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Discount Percentage: <span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter Discount Percentage" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>

                                    <FormField
                                        control={form.control}
                                        name="minShoppingAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Minimum Shopping Amount: <span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter Minimum Shopping Amount" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="validity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Validity: <span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="date" placeholder="Enter Validity" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <ButtonLoading
                                type="submit"
                                text="Update Coupon"
                                className=" cursor-pointer"
                                loading={loading}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div >
    )
}

export default EditCoupan;
