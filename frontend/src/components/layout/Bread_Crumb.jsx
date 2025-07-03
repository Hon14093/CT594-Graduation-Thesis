import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from 'react-router-dom'

const tempData = [
    { link: '/', label: 'Trang chủ'},
    { link: '/cart', label: 'Giỏ hàng'}
]

export default function Bread_Crumb({ data }) {
    return (
        <div>
            <Breadcrumb className='pt-12 pb-1 md:pt-16 lg:pt-20 bg-mistGray max-w-[1280px] mx-auto'>
                <BreadcrumbList>
                    {data.map((item, index) => {
                        const isLast = index === data.length - 1
                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem className={index !== 0 ? "hidden md:block" : ""}>
                                    {isLast ? (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link to={item.link}>{item.label}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator className={index !== 0 ? "hidden md:block" : ""} />}
                            </React.Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
