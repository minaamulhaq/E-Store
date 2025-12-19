"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import React, { useState } from 'react'
import { IoStar } from 'react-icons/io5'
import { ButtonLoading } from '../ButtonLoading'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '@/lib/zodSchema'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Rating } from '@mui/material'
import { Textarea } from '@/components/ui/textarea'
const ProductReviews = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);

    const formSchema = reviewSchema.pick({
        productId: true,
        userId: true,
        rating: true,
        title: true,
        review: true,
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: product,
            userId: auth.auth ? auth.auth._id : "",
            rating: 0,
            title: "",
            review: ""
        },
    });

    const HandleSubmitReview = (value) => {
        console.log(value);
        setLoading(true);
    }
    return (
        <div className='shadow border rounded mb-20'>
            <div className='p-3 bg-gray-50 border-b'>
                <h2 className="font-semibold text-2xl">Rating & Reviews</h2>
            </div>
            <div className='p-3 flex justify-between flex-wrap items-center'>
                <div className='md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5'>
                    <div className='md:w-[180px] w-full md:mb-0 mb-5'>
                        <h4 className='text-8xl text-center font-bold'>0.0</h4>
                        <div className='flex justify-center gap-2'>
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStar />
                        </div>
                        <p className='text-center mt-3'>
                            (0 Ratings & Reviews)
                        </p>
                    </div>
                    <div className='md:w-[calc(100%-180px)] mt-3 flex  items-center'>
                        <div className='w-full'>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className='flex items-center gap-3 mb-2 w-full'>
                                    {/* Label part (fixed width) */}
                                    <div className='flex items-center gap-1 min-w-[30px]'>
                                        <p className='text-sm'>{rating}</p>
                                        <IoStar />
                                    </div>


                                    <Progress value={20} className="w-full" />

                                    {/* Count part (fixed width) */}
                                    <span className='min-w-[20px] text-sm text-right'>20</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
                <div className='md:w-1/2 w-full md:text-end text-center'>
                    <Button variant={"outline"} className='md:w-fit px-8 py-3 cursor-pointer'>Write a Review</Button>
                </div>
            </div>
            <div className='p-3'>

                <h4 className='text-xl font-semibold'>Write a Review</h4>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(HandleSubmitReview)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating:</FormLabel>
                                    <FormControl>
                                        <Rating
                                            value={field?.value}
                                            size='large'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Review Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="review"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review:</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your review here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <ButtonLoading
                            type="submit"
                            text="Write a Review"
                            className=" cursor-pointer"
                            loading={loading}
                        />
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default ProductReviews
