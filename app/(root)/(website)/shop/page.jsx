import Filter from '@/components/Application/Website/Filter'
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum'
import React from 'react'

const Shop = () => {
    const breadcrumdata = {
        title: "Shop",
        links: [
            { name: "Shop", href: "/shop" },
        ]
    }
    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            <section className='lg:flex lg:px-32 px-4 my-20'>
                <div className='w-72 me-4'>
                    <div className='sticky top-0 p-4 rounded bg-gray-50'>
                        <Filter />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shop
