'use client'
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import useWindowSize from '@/hooks/useWindowSize'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import ProductBox from '@/components/Application/Website/ProductBox'
import { ButtonLoading } from '@/components/Application/ButtonLoading'
const Shop = () => {
    const breadcrumdata = {
        title: "Shop",
        links: [
            { name: "Shop", href: "/shop" },
        ]
    }
    const searchParams = useSearchParams().toString();
    const [limit, setLimit] = useState(6);
    const [sorting, setSorting] = useState("default_sorting");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const size = useWindowSize();
    const fetchProducts = async (pageParam) => {
        const { data: getProducts } = await axios.get(`/api/shop?page=${pageParam}&limit=${limit}&sortBy=${sorting}&${searchParams}`);
        if (!getProducts?.success) {
            return null;
        }
        console.log(getProducts);
        return getProducts.data;
    }
    console.log(sorting)
    const { error, data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
        {
            queryKey: ['products', limit, sorting, searchParams],
            queryFn: async ({ pageParam }) => await fetchProducts(pageParam),
            initialPageParam: 0,
            getNextPageParam: (lastPage) => {
                return lastPage.NextPage;
            }
        }


    )
    console.log(data);

    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            <section className='lg:flex lg:px-32 px-4 my-20'>
                {size.width > 1024 ? (<div className='w-72 me-4'>
                    <div className='sticky top-0 p-4 rounded bg-gray-50'>
                        <Filter />
                    </div>
                </div>) : (
                    <Sheet open={mobileFilterOpen} onOpenChange={() => setMobileFilterOpen(!mobileFilterOpen)}>
                        <SheetContent side="left" className="block">
                            <SheetHeader className={'border-b'} >
                                <SheetTitle>Filter</SheetTitle>

                            </SheetHeader>
                            <div className='p-4 overflow-auto h-[calc(100vh-2rem)]'>
                                <Filter />
                            </div>
                        </SheetContent>
                    </Sheet>
                )}



                <div className='md:w-[calc(100%-18rem)] w-full'>
                    {/* Sorting Component */}
                    <Sorting limit={limit} setlimit={setLimit} sorting={sorting} setSorting={setSorting}
                        mobileFilterOpen={mobileFilterOpen} setMobileFilterOpen={setMobileFilterOpen} />


                    {isFetching && <div className='text-center font-semibold p-3'>Loading...</div>}
                    {error && <div className='text-center font-semibold p-3'>Something went wrong: {error.message}</div>}

                    <div className='grid lg:grid-cols-3 grid-cols-2 p-4 lg:gap-6 gap-5'>
                        {data && data.pages.map((page, pageIndex) => (

                            page.products.map((product) => (
                                <ProductBox key={product._id} product={product} />))

                        ))}
                    </div>

                    <div className='flex justify-center mt-6'>
                        {hasNextPage ? (
                            <ButtonLoading loading={isFetching} text={"Load More"} onClick={() => fetchNextPage()} />
                        ) : (
                            <span className='text-center font-semibold p-3'>No more products to load</span>
                        )}
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Shop
