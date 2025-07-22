import React, { useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import SpecsTable from '../specs-table'

export default function ProductInfo({ product }) {
    
    useEffect(() => console.log(product), [])

    return (
        <section className='max-w-[1280px] mx-auto gap-5 mb-4 grid grid-cols-3'>
            <Card className='col-span-2'>
                <CardContent>
                    <span className='text-xl font-bold'>Thông số kỹ thuật</span>

                    <SpecsTable data={product} />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <span className='text-xl font-bold'>Mô tả sản phẩm</span>

                    <div className='text-lg text-justify'>
                        {product?.product?.description}
                    </div>
                    
                </CardContent>
            </Card>
        </section>
    )
}
