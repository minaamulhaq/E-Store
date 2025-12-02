"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import DatatableWraper from '@/components/Application/Admin/DatatableWraper'
import DeleteAction from '@/components/Application/Admin/DeleteAction'
import EditActions from '@/components/Application/Admin/EditActions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DT_CATEGORY_COLS, DT_COUPAN_COLS, DT_CUSTOMER_COLS, DT_PRODUCT_COLS, DT_PRODUCT_VARIANT_COLS, DT_REVIEW_COLS } from '@/lib/column'
import { coloumnConfig } from '@/lib/helper'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'


const TRASH_CONFIG = {
    category: {
        title: "Category Trash",
        columns: DT_CATEGORY_COLS,
        fetchUrl: "/api/category",
        deleteEndpoint: "/api/category/delete",
        exportEndpoint: "/api/category/export",
    },

    product: {
        title: "Product Trash",
        columns: DT_PRODUCT_COLS,
        fetchUrl: "/api/product",
        deleteEndpoint: "/api/product/delete",
        exportEndpoint: "/api/product/export",
    },
    productvariant: {
        title: "Product Variant Trash",
        columns: DT_PRODUCT_VARIANT_COLS,
        fetchUrl: "/api/product-variant",
        deleteEndpoint: "/api/product-variant/delete",
        exportEndpoint: "/api/product-variant/export",
    },
    coupan: {
        title: "Coupan  Trash",
        columns: DT_COUPAN_COLS,
        fetchUrl: "/api/coupan",
        deleteEndpoint: "/api/coupan/delete",
        exportEndpoint: "/api/coupan/export",
    },
    customers: {
        title: "customers  Trash",
        columns: DT_CUSTOMER_COLS,
        fetchUrl: "/api/customers",
        deleteEndpoint: "/api/customers/delete",
        exportEndpoint: "/api/customers/export",
    },
    reviews: {
        title: "reviews  Trash",
        columns: DT_REVIEW_COLS,
        fetchUrl: "/api/reviews",
        deleteEndpoint: "/api/reviews/delete",
        exportEndpoint: "/api/reviews/export",
    },

};
const Trash = () => {
    const searchParams = useSearchParams();
    const trashof = searchParams.get('trashof');
    const coloumnConfigData = TRASH_CONFIG[trashof];

    const actions = useCallback((row, deleteType, handleDelete) => {
        let actionMenu = []

        actionMenu.push(<DeleteAction key={`delete${row.original._id}`} handleDelete={handleDelete} row={row} deleteType={deleteType} />)
        return actionMenu
    }, [])
    const colums = useMemo(() => {
        return coloumnConfig(coloumnConfigData.columns, false, false, true);
    }, [])
    const breadCrumData = [
        { href: "/dashboard", label: "Home" },
        { href: "/admin/category", label: `${coloumnConfigData.title}` },


    ]

    return (
        <div>
            <BreadCrumb breadCrumData={breadCrumData} />
            <Card className={`py-0 gap-0 rounded shadow-md`} >
                <CardHeader className={`pt-3 px-3 border-b [.border-b]:pb-2`}>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl font-semibold'>{coloumnConfigData.title}</h3>

                    </div>
                </CardHeader>
                <CardContent className={`px-0 py-0`}>
                    <DatatableWraper
                        queryKey={`${trashof}-trash-list`}
                        fetchurl={coloumnConfigData.fetchUrl}
                        initialPageSize={10}
                        columsConfig={colums}
                        exportEndpoint={coloumnConfigData.exportEndpoint}
                        deleteEndpoint={coloumnConfigData.deleteEndpoint}
                        deleteType="PD"
                        // trashView={`/admin/trash?trashof=${trashof}`}
                        createAction={actions}
                    />

                </CardContent>
            </Card>
        </div >
    )
}

export default Trash
