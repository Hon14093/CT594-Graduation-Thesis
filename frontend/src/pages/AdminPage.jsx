import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Analytics from '@/components/AdminPage/Analytics'
import Discounts from '@/components/AdminPage/Discounts'
import Products from '@/components/AdminPage/Products'

export default function AdminPage() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <Routes>
                <Route path="/" element={<Analytics />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/products" element={<Products />} />    
                {/* <Route path="/products/variations" element={<Variations />} /> */}
                {/* <Route path="/orders" element={<Orders />} /> */}
                {/* <Route path="/check-orders" element={<CheckOrders />} /> */}
            </Routes>
        </SidebarProvider>
    )
}
