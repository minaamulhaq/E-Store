import React from 'react'
import logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import Link from 'next/link'
import { CiLocationOn } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { FiYoutube } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className='border-t bg-gray-50'>
            <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 lg:px-32 pt-10 px-5'>
                <div className='lg:col-span-1 md:col-span-2 col-span-1'>
                    <Image src={logo.src} alt="Logo" width={383} height={146} className='w-36 mb-2' />
                    <p className='text-gray-500 text-sm'>
                        E-Store is your go-to destination for the latest and greatest in fashion. We offer a wide range of trendy clothing and accessories to help you express your unique style.
                    </p>
                </div>
                <div>
                    <h3 className='text-lg font-bold uppercase mt-2 mb-4'>Categories</h3>
                    <ul className='text-gray-500 text-sm'>
                        <li className='mb-2'>
                            <Link href={''}>  T-Shirts</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Hoodies</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Oversized</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Full Sleeves</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Accessories</Link>

                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-bold uppercase mt-2 mb-4'>Useful Links</h3>
                    <ul className='text-gray-500 text-sm'>
                        <li className='mb-2 '>
                            <Link href={'/'}>Home</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Shop</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> About</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Register</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}> Login</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-bold uppercase mt-2 mb-4'>Help Center</h3>
                    <ul className='text-gray-500 text-sm'>
                        <li className='mb-2 '>
                            <Link href={'/'}>Register</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}>Login</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}>MyAccount</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}>Privacy Policy</Link>

                        </li>
                        <li className='mb-2 '>
                            <Link href={''}>Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-bold uppercase mt-2 mb-4'>Contact Us</h3>
                    <ul className='text-gray-500 text-sm'>
                        <li className='mb-2 flex items-center justify-start '>
                            <CiLocationOn size={20} className='mr-2 text-lg mb-1' />
                            <span className='text-sm'>123 Main Street, Anytown, USA</span>
                        </li>
                        <li className=' mb-2 flex items-center justify-start'>
                            <LuPhone size={20} className='mr-2 text-lg mb-1' />
                            <Link href={'tel:+15551234567'} className='text-sm hover:text-primary '>+1 (555) 123-4567</Link>
                        </li>
                        <li className='mb-2 flex items-center justify-start'>
                            <MdOutlineEmail size={20} className='mr-2 text-lg mb-1' />
                            <Link href={'mailto:email@example.com'} className='text-sm hover:text-primary '>email@example.com</Link>
                        </li>
                        <li>
                            <div className='flex items-center justify-start space-x-4 mt-2'>
                                <Link href={''} className='text-primary  '><IoLogoInstagram size={24} /></Link>
                                <Link href={''} className='text-primary  '><FiYoutube size={24} /></Link>
                                <Link href={''} className='text-primary  '><CiTwitter size={24} /></Link>
                                <Link href={''} className='text-primary  '><CiFacebook size={24} /></Link>
                                <Link href={''} className='text-primary  '><FaWhatsapp size={24} /></Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='bg-gray-50 text-center py-4'>
                <p className='text-gray-600 text-sm'>&copy; {new Date().getFullYear()} E-Store. All rights reserved.</p>
            </div>
        </footer>

    )
}

export default Footer
