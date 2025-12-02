"use client"
import React, { useState } from 'react'
import DailogModel from './DailogModel'
import { IoSearch } from "react-icons/io5";

const SearchMobile = () => {
    const [Open, setOpen] = useState(false);
    return (
        <div className='md:hidden'>
            <div>
                <button type='button' className='text-gray-400' onClick={() => setOpen(true)}>
                    <IoSearch className='' />
                </button>
            </div>
            <DailogModel open={Open} setOpen={setOpen} />
        </div>
    )
}

export default SearchMobile
