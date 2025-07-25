import React, { useState, useMemo } from 'react'
import { Button } from '../ui/button'
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

export default function ProductsDisplay({ data, slug }) {
    const [sortType, setSortType] = useState("a-z"); // Default: A - Z

    // Sort products based on selected sort type
    const sortedData = useMemo(() => {
        if (!data) return [];

        const normalizedData = data.map(item => {
            const nameKey = Object.keys(item).find(key => key.endsWith('_name'));
            const name = nameKey ? item[nameKey] : item.name || "Unknown";
            return {
                ...item,
                name,
            };
        });

        const sorted = [...normalizedData]; // Avoid mutating original data

        switch (sortType) {
            case "a-z":
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case "low-price":
                return sorted.sort((a, b) => a.price - b.price);
            case "high-price":
                return sorted.sort((a, b) => b.price - a.price);
            default:
                return sorted;
        }
    }, [data, sortType]);


    return (
        <section className='max-w-[1280px] mx-auto py-4 lg:pt-2 lg:px-2 sm:px-4 min-h-[60vh] gap-2 flex flex-col'>
            <h1 className='font-semibold text-left uppercase text-3xl text-techBlue'>Sắp xếp theo</h1>
            
            <article className='text-techBlue'>
                <ToggleGroup
                    type="single"
                    value={sortType}
                    onValueChange={(value) => {
                        if (value) setSortType(value);
                    }}
                    className='gap-3'
                >
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
                </ToggleGroup>
            </article>

            <article className='pt-2'>
                {!sortedData || sortedData.length === 0 ? (
                    <div>Đang xử lý...</div>
                ) : (
                    <div className='grid grid-cols-4 gap-4'>
                        {sortedData.map((item, index) => (
                            <ProductCard product={item} key={index} />
                        ))}
                    </div>
                )}
            </article>
        </section>
    )
}
