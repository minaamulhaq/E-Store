"use client"
import { ButtonLoading } from '@/components/Application/ButtonLoading';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast';
import { authSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import placeholderImage from '@/public/assets/images/img-placeholder.webp'
import axios from 'axios';
import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
const breadCrumData = [
    { href: "/dashboard", label: "Home" },
    { href: "/admin/media", label: "Media" },
    { href: "#", label: "Edit" },
]
const MediaEdit = ({ params }) => {
    const param = use(params);
    const { data: mediaData } = useFetch(`/api/media/edit/${param.id}`)
    const [loading, setLoading] = useState(false);
    const formSchema = authSchema.pick({
        _id: true,
        title: true,
        alt: true,
    })
    useEffect(() => {
        if (mediaData?.data && mediaData.success) {
            form.reset({
                _id: mediaData?.data?._id,
                title: mediaData?.data?.title,
                alt: mediaData?.data?.alt,
            })
        }
    }, [mediaData])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: "",
            title: "",
            alt: "",

        },
    });
    const HandleSubmit = async (value) => {

        setLoading(true)
        try {
            const { data: response } = await axios.put('/api/media/update', value)
            if (!response?.success) {
                throw new Error(response?.message || 'Something went wrong')
            }
            form.reset()

            showToast('success', response?.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)

        }
    }
    console.log(mediaData);
    return (
        <div>
            <BreadCrumb breadCrumData={breadCrumData} />
            <Card className={`py-0 rounded shadow-md`}>
                <CardHeader className={`pt-3 px-3 border-b [.border-b]:pb-2`}>
                    <h3 className='text-xl font-semibold'>Edit Media</h3>
                </CardHeader>
                <CardContent className={`pb-5`}>
                    <Form {...form}>
                        <div className='mb-4'>
                            <Image src={mediaData?.data?.secure_url || placeholderImage} alt={mediaData?.data?.alt || "Image"} width={150} height={150} />
                        </div>
                        <form onSubmit={form.handleSubmit(HandleSubmit)} className="space-y-8">
                            <div className='mb-4'>
                                <FormField
                                    control={form.control}
                                    name="alt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alt</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Alt text" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-4'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Title" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <ButtonLoading
                                type="submit"
                                text="Update Media"
                                className=" cursor-pointer"
                                loading={loading}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default MediaEdit
