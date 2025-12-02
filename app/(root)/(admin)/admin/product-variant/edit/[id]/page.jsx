"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import Editor from '@/components/Application/Admin/Editor'
import MediaModle from '@/components/Application/Admin/MediaModle'

import Select from '@/components/Application/Admin/Select'
import { ButtonLoading } from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { productSize } from '@/lib/utils'
import { productSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'

import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';



const breadCrumData = [
    { href: "/dashboard", label: "Home" },
    { href: "/admin/product-variant", label: "Product Variants" },
    { href: "#", label: "Edit Product Variant" },
]

const EditProductVariant = ({ params }) => {

    const { id } = use(params);
    const { data: getProductVariant, loading: getProductVariantLoading } = useFetch(`/api/product-variant/get/${id}`);

    const [loading, setLoading] = React.useState(false);
    const { data: productData } = useFetch('/api/product?deleteType=SD&&size=1000');

    const [productOptions, setproductOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState([]);


    useEffect(() => {
        if (productData?.success) {
            const options = productData.data.map((product) => ({
                value: product._id,
                label: product.name,
            }));
            setproductOptions(options);
        }
    }, [productData]);

    const formSchema = productSchema.pick({
        _id: true,
        product: true,
        sku: true,
        color: true,
        size: true,
        mrp: true,
        sellingPrice: true,
        discountPercentage: true,

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: id,
            product: "",
            sku: "",
            color: "",
            size: "",
            mrp: 0,
            sellingPrice: 0,
            discountPercentage: 0,

        },
    });



    useEffect(() => {
        const mrp = form.getValues('mrp') || 0;
        const sellingPrice = form.getValues('sellingPrice') || 0;
        if (mrp > 0 && sellingPrice > 0) {
            const discount = ((mrp - sellingPrice) / mrp) * 100;
            form.setValue('discountPercentage', Math.round(discount));
        }
    }, [form.watch('mrp'), form.watch('sellingPrice')]);

    useEffect(() => {
        if (getProductVariant && getProductVariant?.success) {
            const productVariant = getProductVariant.data;
            form.setValue('product', productVariant.product);
            form.setValue('sku', productVariant.sku);
            form.setValue('color', productVariant.color);
            form.setValue('size', productVariant.size);
            form.setValue('mrp', productVariant.mrp);
            form.setValue('sellingPrice', productVariant.sellingPrice);
            const mediaArray = productVariant.media.map((m) => ({ _id: m._id, url: m.secure_url }));
            setSelectedMedia(mediaArray);
        }
    }, [getProductVariant])

    const HandleSubmit = async (value) => {
        console.log('Form Values:', value);
        if (selectedMedia.length === 0) {
            showToast('error', 'Please select at least one media');
            return;
        }
        const mediaIds = selectedMedia.map((media) => media._id);
        console.log({ ...value, media: mediaIds });
        //setLoading(true);
        try {
            const { data: response } = await axios.put('/api/product-variant/update', { ...value, media: mediaIds });
            if (response.success) {
                form.reset();
                setSelectedMedia([]);
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
                    <h3 className='text-xl font-semibold'>Add Product Variant</h3>
                </CardHeader>
                <CardContent className={`pb-5`}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(HandleSubmit)} >


                            <div className="grid md:grid-cols-2 gap-5 mb-3">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="product"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product:<span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select
                                                        options={productOptions}
                                                        selected={field.value}
                                                        setSelected={field.onChange}
                                                        placeholder="Select Category"
                                                        isMulti={false}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="sku"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SKU:<span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Enter SKU" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>



                                <div>
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color:<span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Enter Color" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="size"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Size:<span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select
                                                        options={productSize}
                                                        selected={field.value}
                                                        setSelected={field.onChange}
                                                        placeholder="Select Size"
                                                        isMulti={false}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>

                                    <FormField
                                        control={form.control}
                                        name="mrp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>MRP: <span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter MRP" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>

                                    <FormField
                                        control={form.control}
                                        name="sellingPrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Selling Price: <span className='text-red-500 gap-5 font-bold'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter Selling Price" {...field} />
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
                                                    <Input type="number" readOnly placeholder="Enter Discount Percentage" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                            </div>


                            {!getProductVariantLoading &&
                                <div className='md:col-span-2 border border-dashed p-5 mb-2 text-center'>
                                    <MediaModle open={open} setOpen={setOpen} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} isMultiple={true} />
                                    {selectedMedia.length > 0 && (
                                        <div className='flex items-center justify-center overflow-hidden'>
                                            {selectedMedia.map((media) => (
                                                <div key={media._id} className='h-24 w-24 border border-dotted'>
                                                    <Image
                                                        src={media.url}
                                                        alt={media.alt || "media image"}
                                                        width={100}
                                                        height={100}
                                                        className='object-cover size-full'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div
                                        onClick={() => setOpen(true)}
                                        className='bg-gray-50 dark:bg-card w-[200px] mx-auto p-5 cursor-pointer'>
                                        <span className='font-semibold'>Select Media</span>
                                    </div>

                                </div>

                            }
                            <ButtonLoading
                                type="submit"
                                text="Edit Product Variant"
                                className="cursor-pointer"
                                loading={loading}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div >
    )
}

export default EditProductVariant;
