"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    useSidebar,
} from "@/components/ui/sidebar"
import { IoMdClose } from 'react-icons/io'
import { LuChevronRight } from 'react-icons/lu'
import logoblack from '@/public/assets/images/logo-black.png'
import logoWhite from '@/public/assets/images/logo-white.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { adminSlidebarManu } from '@/lib/adminSlidebarManu'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import Link from 'next/link'

const AppSidebar = () => {
    const { toggleSidebar } = useSidebar();
    return (

        <Sidebar className={`z-50`}>
            <SidebarHeader className={`border-b h-14 p-0`} >
                <div className='flex justify-between items-center px-4'>

                    <Image src={logoblack} alt="Logo" height={50} width={logoblack.width}
                        className='block dark:hidden h-[50px] w-auto'
                    />
                    <Image src={logoWhite} alt="Logo" height={50} width={logoWhite.width}
                        className='hidden dark:block h-[50px] w-auto'
                    />
                    <Button onClick={toggleSidebar} size="icon" className='ml-auto md:hidden'>
                        <IoMdClose />
                        {/* <LuChevronRight /> */}
                    </Button>

                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {adminSlidebarManu.map((menu, i) => (
                        <div key={i}>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild className={`font-semibold px-2 py-5`} >
                                            <Link href={menu.url} >
                                                <menu.icon />
                                                {menu.title}
                                                {menu.submenu && <LuChevronRight className="ml-auto transition-transform
                                                duration-200 group-data-[state=open]:rotate-90" />}
                                            </Link>
                                        </SidebarMenuButton>

                                    </CollapsibleTrigger>
                                    {menu.submenu && menu.submenu.length > 0 && (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {menu.submenu.map((subMenu, i) => (
                                                    <SidebarMenuItem key={i}>
                                                        <SidebarMenuButton asChild className={`px-2 py-5`}>
                                                            <Link href={subMenu.url}>
                                                                {subMenu.title}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    )}
                                </SidebarMenuItem>
                            </Collapsible>
                        </div>
                    ))}
                </SidebarMenu>


                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar
