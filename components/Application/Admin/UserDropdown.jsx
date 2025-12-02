import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Logout from './Logout';
const UserDropdown = () => {
    const user = useSelector((state) => state.auth.auth);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={`cursor-pointer`}>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="" className='cursor-pointer '>
                        <IoShirtOutline />
                        New Product</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="" className='cursor-pointer '>
                        <MdOutlineShoppingBag />
                        Order</Link>
                </DropdownMenuItem>
                <Logout />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown
