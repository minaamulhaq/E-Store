import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum';
import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import placeholderImage from '@/public/assets/images/img-placeholder.webp'
import Link from 'next/link';
const page = async ({ params }) => {
    const { id } = await params;
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/orders/get/${id}`)
    const { data: OrderData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/get/${id}`);
    const order = OrderData.data;

    console.log("Order details:", order);
    const breadcrumdata = {
        title: "Order Details",
        links: [
            { name: "Order Details" }

        ]
    };


    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            <div className='lg:px-32 px-5 my-20'>
                {OrderData && !OrderData.success ?
                    <div className='flex justify-center items-center py-32'>
                        <h2 className='text-red-500'>Order Not Found</h2>
                    </div>
                    :
                    <div>
                        <div className='mb-4'>
                            <p><b>OrderId: </b> {OrderData?.data?._id}</p>
                            <p><b>Status: </b>{OrderData?.data?.orderStatus}</p>
                        </div>
                        <table className='w-full border'>
                            <thead className='md:table-header-group hidden border-b'>
                                <tr className='bg-gray-100'>
                                    <th className='text-start p-3 border'>Product</th>
                                    <th className='text-center p-3 border'>Price</th>
                                    <th className='text-center p-3 border'>Quantity</th>
                                    <th className='text-center p-3 border'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {OrderData?.data?.products?.map((item) => (
                                    <tr key={item.variantId._id} className="md:table-row block border-b">
                                        <td className='p-3'>
                                            <div className='flex items-center gap-5'>
                                                <Image src={item?.variantId?.media[0]?.secure_url || placeholderImage.src} alt="Product" width={60} height={60} className="object-cover rounded" />
                                                <span>{item.variantId.title}</span>
                                                <div>
                                                    <h4 className='text-lg line-clamp-1'>
                                                        <Link href={`/product/${item.productId.slug}`} className='text-blue-500 underline'>
                                                            {item.productId.name}
                                                        </Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                            <span className='md:hidden font-medium'>Price :</span>
                                            <span>${item?.variantId?.sellingPrice}</span>
                                        </td>
                                        <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                            <span className='md:hidden font-medium'>Quantity :</span>
                                            <span>{item.quantity}</span>
                                        </td>
                                        <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                            <span className='md:hidden font-medium'>Total :</span>
                                            <span>${item?.variantId?.sellingPrice * item.quantity}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-10 mt-6 border'>
                            <div className='p-5'>
                                <h3 className='text-xl font-semibold'>Shipping Details</h3>
                                <div>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>
                                                <td className='font-medium py-2'>Name:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.name}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Email:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.email}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Phone:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Country:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.country}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>State:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.state}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>City:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.city}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>landmark:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.landmark}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Ordernote:</td>
                                                <td className='py-2 text-end'>{OrderData?.data?.ordernote || "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='p-5 bg-gray-50'>
                                <h3 className='text-xl font-semibold'>Order Summary</h3>
                                <div>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>
                                                <td className='font-medium py-2'>Subtotal:</td>
                                                <td className='py-2 text-end'>${OrderData?.data?.subTotal?.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Discount:</td>
                                                <td className='py-2 text-end'>-${OrderData?.data?.discount?.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>CoupanDiscount:</td>
                                                <td className='py-2 text-end'>${OrderData?.data?.coupanDiscount?.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Total Amount:</td>
                                                <td className='py-2 text-end'>${OrderData?.data?.totalAmount?.toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>



                    </div>

                }




            </div>

        </div >
    )
}

export default page
