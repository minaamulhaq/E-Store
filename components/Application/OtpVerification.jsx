import { authSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ButtonLoading } from './ButtonLoading';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import axios from 'axios';
import { showToast } from '@/lib/showToast';

const OtpVerification = ({ email, onSubmit, loading }) => {
    
    const [isResend, setisResend] = useState(false);
    const formSchema = authSchema.pick({ email: true, otp: true });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
            otp: "",
        },
    });
    
    const HandleSubmit = (value) => {
        // Create a clean object with only simple data
        const cleanData = {
            email: value.email,
            otp: value.otp
        };
        onSubmit(cleanData);
    }
    
    const handleResendOtp = async () => {
        console.log("Resend Payload:", email);
        setisResend(true);
        try {
            // Create clean data for resend
            const cleanData = { email: email };
            const { data: register } = await axios.post('/api/auth/resend-otp', cleanData)
            if (!register?.success) {
                throw new Error(register?.message || 'Something went wrong')
            }
            showToast('success', register?.message)
        } catch (error) {
            console.log("Resend Error:", error);
            showToast('error', error.response?.data?.message || error.message)
        } finally {
            setisResend(false);
        }
    }
    
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(HandleSubmit)} className="space-y-4">
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold'>Please Complete Verification</h1>
                        <p>We have sent a One-Time Verification (OTP) to your registered email address. The OTP is valid for 10 minutes.</p>
                    </div>
                    
                    <div className='mb-4 flex justify-center'>
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">One-Time Password (OTP)</FormLabel>
                                    <FormControl>
                                        {/* FIX: Only pass value and onChange, not the entire field object */}
                                        <InputOTP 
                                            maxLength={6} 
                                            value={field.value} 
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot className={'text-xl size-10'} index={0} />
                                                <InputOTPSlot className={'text-xl size-10'} index={1} />
                                                <InputOTPSlot className={'text-xl size-10'} index={2} />
                                                <InputOTPSlot className={'text-xl size-10'} index={3} />
                                                <InputOTPSlot className={'text-xl size-10'} index={4} />
                                                <InputOTPSlot className={'text-xl size-10'} index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <ButtonLoading
                        type="submit"
                        text="Verify OTP"
                        className="w-full cursor-pointer"
                        loading={loading}
                    />
                    
                    <div className='mt-1'>
                        {!isResend ? (
                            <p className='text-sm text-center'>
                                Didn't receive the OTP?
                                <span 
                                    className='text-blue-500 cursor-pointer hover:underline ml-1' 
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </span>
                            </p>
                        ) : (
                            <p className='text-sm text-center'>Resending .....</p>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default OtpVerification