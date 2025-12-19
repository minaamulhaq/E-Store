"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '@/public/assets/images/logo-black.png'
import { IoIosSearch } from 'react-icons/io'
import Cart from './Cart'
import { useSelector } from 'react-redux'
import { VscAccount } from 'react-icons/vsc'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Search from './Search'
const Header = () => {
    const auth = useSelector((state) => state.auth.auth);
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const [ShowSearch, setShowSearch] = useState(false)
    // console.log("auth from header:", auth);
    return (
        <div className={`bg-white lg:px-32 px-4 border-b`}>
            <div className="flex items-center justify-between lg:py-3 py-3">
                <Link href={"/"} >
                    <Image src={logo.src} alt="Logo" width={383} height={146} className=' w-24 lg:w-32 object-contain' />
                </Link>
                <div className='flex  items-center justify-between gap-20'>

                    <nav className={`md:relative md:flex md:h-auto md:top-0 md:w-auto lg:p-0 bg-white fixed z-50 h-screen w-full top-0 transition-all duration-250 ease-in-out md:left-0 ${isMobileMenu ? 'left-0 ' : '-left-full'} `} >
                        <div className='md:hidden flex items-center justify-between py-3 px-5'>
                            <Link href={"/"} >
                                <Image src={logo.src} alt="Logo" width={383} height={146} className=' w-24 lg:w-32 object-contain' />
                            </Link>

                            <button className="md:hidden">
                                <IoClose
                                    onClick={() => setIsMobileMenu(false)}
                                    className='text-gray-500 hover:text-primary cursor-pointer' size={25} />
                            </button>
                        </div>


                        <ul className='md:flex items-center md:gap-10 font-medium px-3 '>
                            <li
                                className="text-gray-600 
                             hover:text-primary hover:font-semibold"> <Link href={'/'}>Home</Link> </li>
                            <li
                                className="text-gray-600 
                             hover:text-primary hover:font-semibold"> <Link href={'/shop'}>Shop</Link> </li>
                            <li
                                className="text-gray-600 
                             hover:text-primary hover:font-semibold"> <Link href={'/about'}>About</Link> </li>
                            <li
                                className="text-gray-600 
                             hover:text-primary hover:font-semibold"> <Link href={'/about'}>T-Shirt</Link> </li>
                            <li
                                className="text-gray-600 
                             hover:text-primary hover:font-semibold"> <Link href={'/about'}>Hoddies</Link> </li>
                            <li
                                className="text-gray-600 
                             hover:text-primary hover:font-semibold"> <Link href={'/about'}>Oversized</Link> </li>
                        </ul>
                    </nav>
                    <div className='flex justify-between items-center gap-8'>
                        <button type='button'>
                            <IoIosSearch
                                onClick={() => setShowSearch(!ShowSearch)}
                                className='text-gray-500 hover:text-primary cursor-pointer'
                                size={25}
                            />
                        </button>
                        <Cart />
                        <button>
                            {!auth ? <Link href="/auth/login" className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <VscAccount className='text-gray-500 hover:text-primary cursor-pointer'
                                    size={25} />
                            </Link> :
                                <Link href="/my-account" className='text-gray-600 hover:text-primary hover:font-semibold'>

                                    <Avatar >
                                        <AvatarImage src={auth?.avatar?.url || '/assets/images/user.png'} alt="User Avatar" />
                                    </Avatar>
                                </Link>}
                        </button>
                        <button className="lg:hidden">
                            <FaBars
                                onClick={() => setIsMobileMenu(true)}
                                className='text-gray-500 hover:text-primary cursor-pointer' size={25} />
                        </button>
                    </div>
                </div>

            </div>
            <Search isShow={ShowSearch} />
        </div>
    )
}

export default Header