import React, { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import StatusChart from './StatusChart'

export default function Popular({ products, discount}) {
    return (
        <section className='grid grid-cols-2 gap-4'>
            <Card>
                <CardContent className=' grid gap-4'>
                    <h1 className='font-semibold text-lg'>Các sản phẩm bán chạy</h1>
                    <ScrollArea className={`h-96`}>
                        <div className='grid gap-4'>
                            {products?.map((item, index) => (
                                <article
                                    key={`${index}`}
                                    className="flex gap-4 items-center shadow-md"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="size-24 object-contain rounded"
                                    />

                                    <div className='text-left'>
                                        <p className="font-semibold font-mono">{item.name}</p>
                                        <p className="font-medium">Đã bán: {item.count}</p>
                                        <p className="font-medium">Số lượng trong kho: {item.qty_in_stock}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <StatusChart />
        </section>
    )
}