"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { authSchema } from '@/lib/zodSchema'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ButtonLoading } from '@/components/Application/ButtonLoading';
import { z } from 'zod'
import axios from 'axios';
import { showToast } from '@/lib/showToast';
const UpdatePassword = ({ email }) => {
    const [isTypePassword, setIsTypePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const formSchema = authSchema.pick({
        email: true,
        password: true
    }).extend({
        confirmPassword: z.string().min(1, "Password is required"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
            password: "",
            confirmPassword: "",
        },
    });
    const handleUpdatePasswordSubmit = async (value) => {
        setLoading(true)
        try {
            const { data: updatePassword } = await axios.put('/api/auth/reset-password/update-password', value)
            if (!updatePassword?.success) {
                throw new Error(updatePassword?.message || 'Something went wrong')
            }
            form.reset()
            showToast('success', updatePassword?.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>

            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Update Password</h1>
                <p>Create new Password by filling blow form.</p>
            </div>
            <div className='mt-5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdatePasswordSubmit)} className="space-y-8">
                        <div className='mb-2'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />

                                        </FormControl>


                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-2'>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type={isTypePassword ? "password" : "text"} placeholder="••••••••" {...field} />

                                        </FormControl>
                                        <button type="button" className='absolute top-1/2 right-2 cursor-pointer'
                                            onClick={() => setIsTypePassword(!isTypePassword)}>
                                            {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </button>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <ButtonLoading
                            type="submit"
                            text="Update Password"
                            className="w-full cursor-pointer"
                            loading={loading}
                        />
                    </form>
                </Form>
            </div>


        </div>
    )
}

export default UpdatePassword