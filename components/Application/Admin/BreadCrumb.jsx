import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from 'react'

const BreadCrumb = ({ breadCrumData }) => {
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                {breadCrumData.map((item, index) => {
                    return (
                        index !== breadCrumData.length - 1 ?
                            <div key={index} className="flex items-center">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </div>
                            :
                            <BreadcrumbItem key={index} className={`flex items-center`}>
                                <BreadcrumbPage className={`font-semibold cursor-pointer`}>{item.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                    )
                })}

            </BreadcrumbList>
        </Breadcrumb>

    )
}

export default BreadCrumb
