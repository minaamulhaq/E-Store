"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useCallback, useMemo } from 'react'
import DatatableWraper from '@/components/Application/Admin/DatatableWraper'
import { DT_REVIEW_COLS } from '@/lib/column'
import { coloumnConfig } from '@/lib/helper'
import DeleteAction from '@/components/Application/Admin/DeleteAction'


const ShowReviews = () => {
    const breadCrumData = [
        { href: "/dashboard", label: "Home" },
        { href: "/admin/reviews", label: "Reviews" },

    ]

    const colums = useMemo(() => {
        return coloumnConfig(DT_REVIEW_COLS);
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
                        <h3 className='text-xl font-semibold'> Reviews </h3>

                    </div>
                </CardHeader>
                <CardContent className={`px-0 py-0`}>
                    <DatatableWraper
                        queryKey="reviews-list"
                        fetchurl="/api/reviews"
                        initialPageSize={10}
                        columsConfig={colums}
                        exportEndpoint="/api/reviews/export"
                        deleteEndpoint="/api/reviews/delete"
                        deleteType="SD"
                        trashView={"/admin/trash?trashof=reviews"}
                        createAction={actions}
                    />

                </CardContent>
            </Card>
        </div>
    )
}


export default ShowReviews