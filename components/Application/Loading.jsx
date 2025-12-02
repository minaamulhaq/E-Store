import React from 'react'
import loading from '@/public/assets/images/loading.svg'
import Image from 'next/image'
const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-start mt-12'>
            <Image src={loading} alt='logo' height={80} width={80} />
        </div>
    )
}

export default Loading
