import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Bread_Crumb from '@/components/layout/Bread_Crumb'
import Laptop from '@/components/ToolPage/Laptop'
import ComponentTable from '@/components/ToolPage/ComponentTable'
import ResultsBox from '@/components/ToolPage/ResultsBox'

const bread = [
    { link: '/', label: 'Trang chủ'},
    { link: '#', label: 'Kiểm tra tương thích'}
]

export default function CompatibilityToolPage() {
    const [laptop, setLaptop] = useState(null);
    const [results, setResults] = useState([]);

    const handleSetLaptop = (laptop) => {
        setLaptop(laptop);
    }

    return (
        <div className='w-full flex flex-col gap-3'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <Laptop onLaptopSelect={handleSetLaptop} />

            <ComponentTable laptop={laptop} onCheck={setResults} />

            <ResultsBox laptop={laptop} results={results} />

            <Footer />
        </div>
    )
}
