import Link from 'next/link'
import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { MdOutlinePermMedia } from 'react-icons/md'
import { RiCoupon2Line } from 'react-icons/ri'

const QuickAdd = () => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 lg:gap-2 mt-8'>
            <Link href={"/admin/category/add"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-2
                  bg-white dark:bg-card bg-gradient-to-tr from-green-400 via-green-500 to-green-600">

                    <h4 className="font-medium text-white dark:text-black">Add Category</h4>
                    <span className='w-12 h-12 border dark:border-green-800 flex justify-center items-center rounded-full text-white'>
                        <BiCategory size={20} />
                    </span>


                </div>
            </Link>
            <Link href={"/admin/product/add"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-2
                  bg-white dark:bg-card bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600">

                    <h4 className="font-medium text-white dark:text-black">Add Product</h4>
                    <span className='w-12 h-12 border dark:border-blue-800 flex justify-center items-center rounded-full text-white'>
                        <IoShirtOutline size={20} />
                    </span>


                </div>
            </Link>
            <Link href={"/admin/coupan/add"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-2
                  bg-white dark:bg-card bg-gradient-to-tr from-yellow-400 via-yellow-500 to-yellow-600">

                    <h4 className="font-medium text-white dark:text-black">Add Coupon</h4>
                    <span className='w-12 h-12 border dark:border-yellow-800 flex justify-center items-center rounded-full text-white'>
                        <RiCoupon2Line size={20} />
                    </span>


                </div>
            </Link>
            <Link href={"/admin/media"} >
                <div className="flex items-center justify-between p-3 rounded-lg shadow-lg border border-l-4 mb-2
                  bg-white dark:bg-card bg-gradient-to-tr from-cyan-400 via-cyan-500 to-cyan-600">

                    <h4 className="font-medium text-white dark:text-black">Upload Media</h4>
                    <span className='w-12 h-12 border dark:border-cyan-800 flex justify-center items-center rounded-full text-white'>
                        <MdOutlinePermMedia size={20} />
                    </span>


                </div>
            </Link>
        </div>
    )
}

export default QuickAdd
