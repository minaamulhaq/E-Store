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
import { showToast } from '@/lib/showToast';
import axios from 'axios';
import OtpVerification from '@/components/Application/OtpVerification';
import { useDispatch } from 'react-redux';
import { login } from '@/store/reducer/authReducer';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [otpVerificationLoading, setotpVerificationLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(false);
    const [OtpEmail, setOtpEmail] = useState()
    const formSchema = authSchema.pick({ email: true, }).extend({
        password: z.string().min(1, "Password is required"),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const HandleSubmit = async (value) => {

        setLoading(true)
        try {
            const { data: register } = await axios.post('/api/auth/login', value)
            if (!register?.success) {
                throw new Error(register?.message || 'Something went wrong')
            }
            form.reset()
            setOtpEmail(value.email)
            showToast('success', register?.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)

        }
    }
    const handleotpVarification = async (value) => {
        setotpVerificationLoading(true)

        try {
            const { data: loginData } = await axios.post('/api/auth/verify-otp', value)
            if (!loginData?.success) {
                throw new Error(loginData?.message || 'Something went wrong')
            }
            form.reset()
            setOtpEmail('')
            dispatch(login(loginData?.data))
            showToast('success', loginData?.message)

            console.log(loginData);
            if (searchParams.has('callback')) {
                router.push(searchParams.get('callback'))
            } else {

                loginData?.data?.role === 'admin' ? router.push('/admin/dashboard') : router.push('/my-account')
            }

        } catch (error) {
            showToast('error', error.message)
        } finally {

            setotpVerificationLoading(false)
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
                    {!OtpEmail ? <>
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold'>Login Into Account</h1>
                            <p>Login into your account by filling out the form below.</p>
                        </div>
                        <div className='mt-5'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(HandleSubmit)} className="space-y-8">
                                    <div className='mb-4'>
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
                                    <div className='mb-4'>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormLabel>Password</FormLabel>
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
                                        text="Login"
                                        className="w-full cursor-pointer"
                                        loading={loading}
                                    />
                                </form>
                            </Form>
                        </div>
                        <div className='text-center'>
                            <div>
                                <p className='text-center mt-4'>Don't have an account? <Link href="/auth/register" className='text-primary underline'>Create Account</Link></p>

                            </div>
                            <div className='mt-3'>
                                <Link href="/auth/forgot-password" className='text-primary underline'>Forgot Password?</Link>
                            </div>
                        </div>

                    </> : <OtpVerification email={OtpEmail} onSubmit={handleotpVarification} loading={otpVerificationLoading} />}

                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage
