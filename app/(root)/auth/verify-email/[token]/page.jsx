"use client"
import React, { use, useEffect, useState } from 'react'
import verifyEmailImg from '@/public/assets/images/verified.gif';
import verificationFailed from '@/public/assets/images/verification-failed.gif';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';

const VerifyEmailPage = ({ params }) => {
    const { token } = use(params);

    const [isVarified, setisVarified] = useState(false);
    useEffect(() => {
        const verify = async () => {
            try {
                const { data: verifyEmail } = await axios.post('/api/auth/verify-email', { token })
                if (verifyEmail.success) {
                    setisVarified(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        verify();
    }, [token])
    return (
        <Card className={`w-[400px]`}>
            <CardContent>
                {isVarified ?
                    <div>
                        <div className='flex items-center justify-center gap-4'>
                            <Image src={verifyEmailImg.src} height={100} width={100} alt="Email Verified" />
                        </div>
                        <div className='text-center'>
                            <h2 className='text-2xl font-bold text-center my-5 text-green-500'>Email verified successfully</h2>
                            <Button className={'cursor-pointer'}>
                                <Link href={'/'}>Continue Shopping</Link>
                            </Button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='flex items-center justify-center gap-4'>
                            <Image src={verificationFailed.src} height={100} width={100} alt="Verification Failed" />
                        </div>
                        <div className='text-center'>
                            <h2 className='text-2xl font-bold text-center my-5 text-red-500'>Email verification failed</h2>
                            <Button className={'cursor-pointer'}>
                                <Link href={'/'}>Continue Shopping</Link>
                            </Button>
                        </div>
                    </div>}
            </CardContent>
        </Card >
    )
}

export default VerifyEmailPage
