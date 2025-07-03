import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Bread_Crumb from '@/components/layout/Bread_Crumb'
import Laptop from '@/components/ToolPage/Laptop'
import ComponentTable from '@/components/ToolPage/ComponentTable'

const bread = [
    { link: '/', label: 'Trang chủ'},
    { link: '#', label: 'Kiểm tra tương thích'}
]

export default function CompatibilityToolPage() {
    const [laptop, setLaptop] = useState(null);

    const handleSetLaptop = (laptop) => {
        setLaptop(laptop);
    }
    return (
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <Laptop onLaptopSelect={handleSetLaptop} />

            {/* This component is not done */}
            <ComponentTable laptop={laptop} />

            <Footer />
        </div>
    )
}
