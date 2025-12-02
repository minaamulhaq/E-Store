"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import DatatableWraper from '@/components/Application/Admin/DatatableWraper'
import { DT_CUSTOMER_COLS } from '@/lib/column'
import { coloumnConfig } from '@/lib/helper'
import DeleteAction from '@/components/Application/Admin/DeleteAction'
import userIcon from "@/public/assets/images/user.png";
import Image from 'next/image'

const ShowCustomers = () => {
    const breadCrumData = [
        { href: "/dashboard", label: "Home" },
        { href: "/admin/customers", label: "Customers" },

    ]

    const colums = useMemo(() => {
        return coloumnConfig(DT_CUSTOMER_COLS);
    }, [])
    const actions = useCallback((row, deleteType, handleDelete) => {
        let actionMenu = []
        actionMenu.push(<DeleteAction key={`delete${row._id}`} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
        return actionMenu
    }, [])

    return (
        <div>
            <BreadCrumb breadCrumData={breadCrumData} />
            <Card className={`py-0 gap-0 rounded shadow-md`} >
                <CardHeader className={`pt-3 px-3 border-b [.border-b]:pb-2`}>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl font-semibold'> Customers </h3>

                    </div>
                </CardHeader>
                <CardContent className={`px-0 py-0`}>
                    <DatatableWraper
                        queryKey="customers-list"
                        fetchurl="/api/customers"
                        initialPageSize={10}
                        columsConfig={colums}
                        exportEndpoint="/api/customers/export"
                        deleteEndpoint="/api/customers/delete"
                        deleteType="SD"
                        trashView={"/admin/trash?trashof=customers"}
                        createAction={actions}
                    />

                </CardContent>
            </Card>
        </div>
    )
}

export default ShowCustomers