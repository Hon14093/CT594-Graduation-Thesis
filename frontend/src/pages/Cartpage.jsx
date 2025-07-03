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
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Bread_Crumb from '@/components/layout/Bread_Crumb'
import ProductList from '@/components/CartPage/ProductList'

const bread = [
    { link: '/', label: 'Trang chủ'},
    { link: '/cart', label: 'Giỏ hàng'}
]

export default function Cartpage() {
    return (
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread}/>

            <ProductList />

            <Footer />
        </div>
    )
}
