import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Analytics from '@/components/AdminPage/Analytics'
import Brands from '@/components/AdminPage/Brands'
import Categories from '@/components/AdminPage/Categories'
import Discounts from '@/components/AdminPage/Discounts'
import Products from '@/components/AdminPage/Products'
import Laptop from '@/components/AdminPage/product-categories/Laptop'
import Ram from '@/components/AdminPage/product-categories/Ram'
import Monitor from '@/components/AdminPage/product-categories/Monitor'
import Dock from '@/components/AdminPage/product-categories/Dock'
import Cable from '@/components/AdminPage/product-categories/Cable'
import Storage from '@/components/AdminPage/product-categories/Storage'
import Adapter from '@/components/AdminPage/product-categories/Adapter'
import CheckOrders from '@/components/AdminPage/CheckOrders'
import Orders from '@/components/AdminPage/Orders'

export default function AdminPage() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <Routes>
                <Route path="/" element={<Analytics />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/laptops" element={<Laptop />} />
                <Route path="/products/rams" element={<Ram />} />
                <Route path="/products/monitors" element={<Monitor />} />
                <Route path="/products/docks" element={<Dock />} />
                <Route path="/products/cables" element={<Cable />} />
                <Route path="/products/storages" element={<Storage />} />
                <Route path="/products/adapters" element={<Adapter />} />

                <Route path="/orders/check" element={<CheckOrders />} />
                <Route path="/orders/processed" element={<Orders />} />
                
                {/* <Route path="/products/variations" element={<Variations />} /> */}
                {/* <Route path="/orders" element={<Orders />} /> */}
                {/* <Route path="/check-orders" element={<CheckOrders />} /> */}
            </Routes>
        </SidebarProvider>
    )
}
