"use client"
import React from 'react'
import { IoSunny } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
const ThemeSwitch = () => {
    const { setTheme } = useTheme();
   
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className={`cursor-pointer`}>
                    <IoSunny className='dark:hidden' />
                    <IoMdMoon className='hidden dark:block' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className={`cursor-pointer`} onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem className={`cursor-pointer`} onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem className={`cursor-pointer`} onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeSwitch
