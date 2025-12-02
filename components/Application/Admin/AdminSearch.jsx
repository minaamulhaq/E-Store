"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import DailogModel from './DailogModel';

const AdminSearch = () => {
    const [Open, setOpen] = useState(false);

    return (
        <div className='md:w-[350px]'>
            <div className='relative flex items-center justify-center'>
                <Input
                    readOnly
                    placeholder='Search...'
                    className={`rounded-full w-full cursor-pointer`}
                    onClick={() => setOpen(true)}
                />

                <button type='button' className='absolute  right-3 text-xl text-gray-400' >
                    <IoSearch className='' />
                </button>

            </div>
            <DailogModel open={Open} setOpen={setOpen} />
        </div>
    )
}

export default AdminSearch
