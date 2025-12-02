"use client"
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/public/assets/images/logo-black.png'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { authSchema } from '@/lib/zodSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OtpVerification from '@/components/Application/OtpVerification'
import Link from 'next/link'
import { ButtonLoading } from '@/components/Application/ButtonLoading'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/showToast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '@/store/reducer/authReducer'
import UpdatePassword from '@/components/Application/UpdatePassword'

const ForgotPassword = () => {
    const [OtpEmail, setOtpEmail] = useState();
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
    const formSchema = authSchema.pick({ email: true, });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const HandleSubmit = async (value) => {
        setIsEmailLoading(true)
        try {
            const { data: register } = await axios.post('/api/auth/reset-password/send-otp', value)
            if (!register.success) {
                throw new Error(register?.message || 'Something went wrong')
            }
            setOtpEmail(value.email)
            showToast('success', register.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setIsEmailLoading(false)

        }
    }
    const handleotpVarification = async (value) => {
        setOtpVerificationLoading(true);
        try {
            const { data: register } = await axios.post('/api/auth/reset-password/verify-otp', value)
            if (!register?.success) {
                throw new Error(register?.message || 'Something went wrong')
            }
            console.log("OTP Verification Success:", register);
            showToast('success', register.message)
            setIsVerified(true);
        } catch (error) {
            showToast('error', error.message)
        } finally {

            setOtpVerificationLoading(false);
        }
    }
    return (
        <div>
            <Card className={`w-[400px]`}>
                <CardContent>

                    <div className='flex justify-center'>
                        <Image src={logo.src} alt={'Logo'} width={logo.height} height={logo.width}
                            className='min-w-[150px] h-auto' />
                    </div>
                    {!OtpEmail ?
                        <>
                            <div className='text-center'>
                                <h1 className='text-3xl font-bold'>Forget Password</h1>
                                <p>Enter your Email for Password Reset.</p>
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

                                        <ButtonLoading
                                            type="submit"
                                            text="Forget Password"
                                            className="w-full cursor-pointer"
                                            loading={isEmailLoading}
                                        />
                                    </form>
                                </Form>
                            </div>
                            <div className='text-center'>
                                <div>
                                    <p className='text-center mt-4'> <Link href="/auth/login" className='text-primary underline'>Back to Login</Link></p>                                
                                </div>

                            </div>
                        </>
                        :
                        <>
                            {!isVerified ?
                                <OtpVerification email={OtpEmail} onSubmit={handleotpVarification} loading={otpVerificationLoading} />
                                :
                                <UpdatePassword email={OtpEmail} />
                            }
                        </>

                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword
