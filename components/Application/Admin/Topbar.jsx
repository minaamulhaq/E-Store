"use client"
import React from 'react'
import UserDropdown from './UserDropdown'
import ThemeSwitch from './ThemeSwitch'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from 'react-icons/ri'
import { useSidebar } from '@/components/ui/sidebar'
import AdminSearch from './AdminSearch'
import SearchMobile from './SearchMobile'
import logoblack from '@/public/assets/images/logo-black.png'
import logoWhite from '@/public/assets/images/logo-white.png'
import Image from 'next/image';

const Topbar = () => {
    const { toggleSidebar } = useSidebar();
    return (
        <div className='h-14 fixed top-0 left-0 border w-full md:pl-72 md:pr-8 px-4 flex justify-between
        items-center bg-white dark:bg-card z-30'>

            <div className='hidden md:block'><AdminSearch /></div>
            <div className='md:hidden '>

                <Image src={logoblack} alt="Logo" height={50} width={logoblack.width}
                    className='block dark:hidden h-[50px] w-auto'
                />
                <Image src={logoWhite} alt="Logo" height={50} width={logoWhite.width}
                    className='hidden dark:block h-[50px] w-auto'
                />

            </div>
            <div className='flex items-center justify-between gap-2'>

                <SearchMobile />
                <ThemeSwitch />
                <UserDropdown />
                <Button onClick={toggleSidebar} size="icon" className='ms-2 md:hidden'>
                    <RiMenu4Fill />
                </Button>
            </div>
        </div>
    )
}

export default Topbar
