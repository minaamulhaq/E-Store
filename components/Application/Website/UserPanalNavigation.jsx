"use client"
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';
import { logout } from '@/store/reducer/authReducer';
import axios from 'axios';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

import React from 'react'
import { useDispatch } from 'react-redux';

const UserPanalNavigation = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const HandelLogout = async () => {
        try {
            const { data: logoutData } = await axios.post('/api/auth/logout');
            if (!logoutData?.success) {
                throw new Error(logoutData?.message)
            }
            dispatch(logout())
            showToast("success", logoutData?.message)
            router.push('/auth/login')

        } catch (error) {
            showToast("error", error?.message)
        }
    }
    return (
        <div className='border rounded shadow p-4'>
            <ul>
                <li className='mb-2'>
                    <Link href="/my-account" className={`block p-3 text-sm rounded hover:bg-primary hover:text-white ${pathname.startsWith("/my-account") ? "bg-primary text-white" : ""}`}>Dashbord</Link>
                </li>
                <li className='mb-2'>
                    <Link href="/profile" className={`block p-3 text-sm rounded hover:bg-primary hover:text-white
                         ${pathname.startsWith("/profile") ? "bg-primary text-white" : ""}`}>Profile</Link>
                </li>
                <li className='mb-2'>
                    <Link href="/orders" className={`block p-3 text-sm rounded hover:bg-primary hover:text-white ${pathname.startsWith("/orders") ? "bg-primary text-white" : ""}`}>Orders</Link>
                </li>
                <li className='mb-2'>
                    <Button onClick={HandelLogout} className={`cursor-pointer w-full`} variant={"destructive"}>Logout</Button>
                </li>
            </ul>
        </div>
    )
}

export default UserPanalNavigation
