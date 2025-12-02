"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import DatatableWraper from '@/components/Application/Admin/DatatableWraper'
import { DT_CATEGORY_COLS } from '@/lib/column'
import { coloumnConfig } from '@/lib/helper'
import EditActions from '@/components/Application/Admin/EditActions'
import DeleteAction from '@/components/Application/Admin/DeleteAction'


const ShowCategory = () => {
    const breadCrumData = [
        { href: "/dashboard", label: "Home" },
        { href: "/admin/category", label: "Category" },

    ]

    const colums = useMemo(() => {
        return coloumnConfig(DT_CATEGORY_COLS);
    }, [])
    const actions = useCallback((row, deleteType, handleDelete) => {
        let actionMenu = []
        actionMenu.push(
            <EditActions key={`edit${row._id}`} href={`/admin/category/edit/${row.original._id}`} />
        )
        actionMenu.push(<DeleteAction key={`delete${row._id}`} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
        return actionMenu
    }, [])

    return (
        <div>
            <BreadCrumb breadCrumData={breadCrumData} />
            <Card className={`py-0 gap-0 rounded shadow-md`} >
                <CardHeader className={`pt-3 px-3 border-b [.border-b]:pb-2`}>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl font-semibold'>All Categories</h3>
                        <Button >
                            <FiPlus />
                            <Link href="/admin/category/add">
                                Add New Category</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className={`px-0 py-0`}>
                    <DatatableWraper
                        queryKey="category-list"
                        fetchurl="/api/category"
                        initialPageSize={10}
                        columsConfig={colums}
                        exportEndpoint="/api/category/export"
                        deleteEndpoint="/api/category/delete"
                        deleteType="SD"
                        trashView={"/admin/trash?trashof=category"}
                        createAction={actions}
                    />

                </CardContent>
            </Card>
        </div>
    )
}

export default ShowCategory
