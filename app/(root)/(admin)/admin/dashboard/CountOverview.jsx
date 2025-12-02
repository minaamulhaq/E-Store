'use client'
import useFetch from '@/hooks/useFetch'
import Link from 'next/link'
import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { LuUserRound } from 'react-icons/lu'
import { MdOutlineShoppingBag } from 'react-icons/md'

const CountOverview = () => {
    const { data: count } = useFetch('/api/dashboard/admin/count')
    console.log(count);
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 lg:gap-2'>
            <Link href={"/admin/category"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-4 md:md-0
                 border-l-green-400 bg-white dark:bg-card dark:border-l-green-400 dark:border-gray-800">
                    <div>
                        <h4 className="font-medium text-gray-500">Total Categories</h4>
                        <span className="text-xl font-bold">{count?.data?.category || 0}</span>
                    </div>
                    <span className='w-12 h-12 flex border justify-center rounded-full items-center
                    bg-green-400 text-white'>
                        <BiCategory className='text-3xl ' />
                    </span>
                </div>
            </Link>
            <Link href={"/admin/product"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-4 md:md-0
                 border-l-blue-400 bg-white dark:bg-card dark:border-l-blue-400 dark:border-gray-800">
                    <div>
                        <h4 className="font-medium text-gray-500">Total Product</h4>
                        <span className="text-xl font-bold">{count?.data?.product || 0}</span>
                    </div>
                    <span className='w-12 h-12 flex border justify-center rounded-full items-center
                    bg-blue-400 text-white'>
                        <IoShirtOutline className='text-3xl ' />
                    </span>
                </div>
            </Link>
            <Link href={"/admin/customers"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-4 md:md-0
                 border-l-yellow-400 bg-white dark:bg-card dark:border-l-yellow-400 dark:border-gray-800">
                    <div>
                        <h4 className="font-medium text-gray-500">Total Customers</h4>
                        <span className="text-xl font-bold">{count?.data?.customer || 0}</span>
                    </div>
                    <span className='w-12 h-12 flex border justify-center rounded-full items-center
                    bg-yellow-400 text-white'>
                        <LuUserRound className='text-3xl ' />
                    </span>
                </div>
            </Link>
            <Link href={"/admin/orders"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 
                 border-l-cyan-400 bg-white dark:bg-card dark:border-l-cyan-400 dark:border-gray-800">
                    <div>
                        <h4 className="font-medium text-gray-500">Total Orders</h4>
                        <span className="text-xl font-bold">{count?.data?.order || 0}</span>
                    </div>
                    <span className='w-12 h-12 flex border justify-center rounded-full items-center
                    bg-cyan-400 text-white'>
                        <MdOutlineShoppingBag className='text-3xl ' />
                    </span>
                </div>
            </Link>

        </div>
    )
}

export default CountOverview
