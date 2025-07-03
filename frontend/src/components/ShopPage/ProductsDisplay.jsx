import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

export default function ProductsDisplay({ data, slug }) {
    return (
        <section className='max-w-[1280px] mx-auto pt-4 lg:pt-2 lg:px-2 sm:px-4 min-h-[60vh] gap-2 flex flex-col'>
            <h1 className='font-semibold text-left uppercase text-3xl text-techBlue'>Sắp xếp theo</h1>
            
            <article className='text-techBlue'>
                <ToggleGroup type="single" className='gap-3'>
                    <ToggleGroupItem 
                        value="a-z" 
                        className="px-5 border border-techBlue rounded-lg data-[state=on]:bg-techBlue data-[state=on]:text-white hover:bg-techBlue/70 hover:text-white"
                    >
                        A - Z
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                        value="low-price" 
                        className="px-5 border border-techBlue rounded-lg data-[state=on]:bg-techBlue data-[state=on]:text-white hover:bg-techBlue/70 hover:text-white"
                    >
                        Giá thấp - cao
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                        value="high-price" 
                        className="px-5 border border-techBlue rounded-lg data-[state=on]:bg-techBlue data-[state=on]:text-white hover:bg-techBlue/70 hover:text-white"
                    >
                        Giá cao - thấp
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="best-selling"
                        className="px-5 border border-techBlue rounded-lg data-[state=on]:bg-techBlue data-[state=on]:text-white hover:bg-techBlue/70 hover:text-white"
                    >
                        Bán chạy
                    </ToggleGroupItem>
                </ToggleGroup>
            </article>

            <article>
                {data.length === 0 || !data ? (
                    <div>Đang xử lý...</div>
                ) : (
                    slug === 'laptop' ? (
                        <div className='grid grid-cols-4 gap-4'>
                            {data.map((item, index) => (
                                <ProductCard product={item} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div>asdasdasd</div>
                    )
                )}
            </article>
        </section>
    )
}
