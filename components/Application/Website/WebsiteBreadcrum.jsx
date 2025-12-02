import Link from 'next/link'
import React from 'react'

const WebsiteBreadcrum = ({ props }) => {
    return (
        <div className='py-10 items-center justify-center flex  bg-[url("/assets/images/page-title.png")]  bg-cover bg-center'>

            <div>
                <h1 className='text-2xl font-semibold text-center mb-2' >{props.title}</h1>
                <ul className='flex gap-2 justify-center'>
                    <li><Link href="/" className=''>Home </Link></li>

                    {props.links?.map((item, index) => (
                        <li key={index} className=''>
                            <span className='me-1'>/</span>
                            {item.href ? (
                                <Link href={item.href}>{item.name}</Link>
                            ) : (
                                <span>{item.name}</span>
                            )}


                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default WebsiteBreadcrum

