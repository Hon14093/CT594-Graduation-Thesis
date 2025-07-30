import React, { useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import SpecsTable from '../specs-table'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ProductInfo({ product }) {
    
    useEffect(() => console.log(product), [])

    return (
        <section className='max-w-[1280px] mx-auto gap-5 mb-4 grid grid-cols-2'>
            <Card className='col-span-1'>
                <CardContent>
                    <span className='text-xl font-bold'>Thông số kỹ thuật</span>

                    <SpecsTable data={product} />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <span className='text-xl font-bold'>Mô tả sản phẩm</span>

                    <ScrollArea className='text-lg text-justify h-[55vh]'>
                        {product?.product?.description}
                    </ScrollArea>
                    
                </CardContent>
            </Card>
        </section>
    )
}
