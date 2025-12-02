"use client";
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
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
import Link from 'next/link';
import axios from 'axios';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';
const RegisterPage = () => {
    const router = useRouter();
    const [isTypePassword, setIsTypePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const formSchema = authSchema.pick({
        name: true,
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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const handleRegisterSubmit = async (value) => {
        setLoading(true)
        try {
            const { data: register } = await axios.post('/api/auth/register', value)
            if (!register?.success) {
                throw new Error(register?.message || 'Something went wrong')
            }
            form.reset()
            showToast('success', register?.message)
            router.push('/auth/login');
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            <Card className={`w-[400px]`}>
                <CardContent>
                    <div className='flex justify-center'>
                        <Image src={logo.src} alt={''} width={logo.height} height={logo.width}
                            className='min-w-[150px] h-auto' />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Create Account</h1>
                        <p>Create your account by filling out the form below.</p>
                    </div>
                    <div className='mt-5'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-8">
                                <div className='mb-2'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-2'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@example.com" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                    text="Create Account"
                                    className="w-full cursor-pointer"
                                    loading={loading}
                                />
                            </form>
                        </Form>
                    </div>
                    <div className='text-center'>
                        <div>
                            <p className='text-center mt-4'>Already have account? <Link href="/auth/login" className='text-primary underline'>Login</Link></p>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage
