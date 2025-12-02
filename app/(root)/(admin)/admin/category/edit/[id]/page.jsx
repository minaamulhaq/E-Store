"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'

import { ButtonLoading } from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { authSchema, categorySchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import slugify from 'slugify'


const EditCategory = ({ params }) => {
    const { id } = use(params);
    const { data: categoryData } = useFetch(`/api/category/get/${id}`);
    const [loading, setLoading] = React.useState(false);

    const formSchema = categorySchema.pick({
        name: true,
        slug: true,
        _id: true,
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            _id: id,
        },
    });

    const breadCrumData = [
        { href: "/dashboard", label: "Home" },
        { href: "/admin/category", label: "Category" },
        { href: `/admin/category/edit/${id}`, label: "Edit Category" },
    ]


    useEffect(() => {
        if (categoryData && categoryData.success) {
            form.setValue('name', categoryData.data.name);
            form.setValue('slug', categoryData.data.slug);
        }
        console.log(categoryData);
    }, [categoryData]);

    useEffect(() => {
        const name = form.watch('name');
        if (name) {
            // Do something with the name
            form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [form.watch('name')])
    const HandleSubmit = async (value) => {
        console.log(value);
        setLoading(true);
        try {
            const { data: response } = await axios.put(`/api/category/update`, value);
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
                    <h3 className='text-xl font-semibold'>Eadit Category</h3>
                </CardHeader>
                <CardContent className={`pb-5`}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(HandleSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Slug" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                          
                           
                            <ButtonLoading
                                type="submit"
                                text="Update Category"
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

export default EditCategory
