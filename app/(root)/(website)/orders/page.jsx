"use client"
import UserPanalLayout from '@/components/Application/Website/UserPanalLayout'
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum';
import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
const breadcrumdata = {
    title: "Order",
    links: [
        { name: "Orders" }

    ]
};
const MyAccount = () => {
    const { data: OrdersData, loading } = useFetch('/api/user-order');
    console.log("User Dashboard Data:", OrdersData);

    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            <UserPanalLayout>
                <div className='shadow rounded'>

                    <div className='p-3 text-xl font-semibold border'>
                        Orders
                    </div>
                    <div className='p-5'>


                        {loading ? (
                            <div className='flex justify-center items-center py-32'>
                                <h2>Loading...</h2>
                            </div>
                        ) : (
                            <table className='w-full'>
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Sr. No</th>
                                        <th className='text-center p-2 text-sm border-b text-nowrap text-gray-500'>Order ID</th>
                                        <th className='text-center p-2 text-sm border-b text-nowrap text-gray-500'>Total Items</th>
                                        <th className='text-center p-2 text-sm border-b text-nowrap text-gray-500'>Amounnt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OrdersData && OrdersData.data.length > 0 ? OrdersData.data.map((order, index) => (
                                        <tr key={order._id} className="border-b">
                                            <td className='p-2 text-sm text-gray-700'>{index + 1}</td>
                                            <td className='p-2 text-sm text-gray-700 text-center'>
                                                <Link href={`/order-details/${order._id}`} className='text-blue-500 underline'>
                                                    {order._id}
                                                </Link>
                                            </td>
                                            <td className='p-2 text-sm text-gray-700 text-center'>{order.products.length}</td>
                                            <td className='p-2 text-sm text-gray-700 text-center'>${order.totalAmount.toFixed(2)}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-2 text-sm text-gray-700 text-center">No recent orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </UserPanalLayout>
        </div>
    )
}

export default MyAccount
