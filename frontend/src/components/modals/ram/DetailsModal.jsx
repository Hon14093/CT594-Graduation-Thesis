import React, { useEffect, useState } from 'react'
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselPrevious, 
    CarouselNext
} from '@/components/ui/carousel';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DetailsModal({ ram, open, onClose }) {
    if (!ram) return null;

    const VIETNAMESE_RAM_SPECS = {
        ram_model: "Model RAM",
        ram_name: "Tên RAM",
        ram_type: "Loại RAM",
        capacity_gb: "Dung lượng (GB)",
        frequency_mhz: "Tốc độ RAM (MHz)",
        voltage: "Điện áp (V)",
        latency: "Độ trễ (CL)",
        price: "Giá bán",
        qty_in_stock: "Số lượng tồn kho"
    };


    const formatRamValue = (key, value) => {
        if (key === "capacity_gb") return `${value} GB`;
        if (key === "frequency_mhz") return `${value} MHz`;
        if (key === "voltage") return `${value} V`;
        return value;
    };


    const renderSpecsTable = () => {
        const excludedKeys = [
            'ram_id', 'product_id', 'product', 'image_url', 'name', 'model', 'brand'
        ];

        return (
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <tbody>
                        {Object.entries(ram).map(([key, value]) => {
                            if (excludedKeys.includes(key)) return null;

                            return (
                                <tr key={key} className="border-b border-gray-200">
                                    <td className="py-3 px-4 font-medium w-1/3">
                                        {VIETNAMESE_RAM_SPECS[key] || key.replace(/_/g, ' ')}
                                    </td>
                                    <td className="py-2 px-4">
                                        {typeof value === 'object' && !Array.isArray(value)
                                            ? JSON.stringify(value)
                                            : formatRamValue(key, value)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin RAM</DialogTitle>
                </DialogHeader>
                
                <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start text-lg'>
                    <ScrollArea className='grid gap-2 h-[25rem] overflow-hidden'>
                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>ID RAM: </h3>
                            <p>{ram.ram_id}</p>
                        </div>

                        <div className="flex">
                            <h3 className="font-semibold pr-2 shrink-0">Tên RAM:</h3>
                            <p className="whitespace-normal break-words">{ram.ram_name}</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Thương hiệu: </h3>
                            <p>{ram.brand}</p>
                        </div>

                        <div className='flex pb-2'>
                            <h3 className='font-semibold pr-2'>Giá bán: </h3>
                            <p>{ram.price.toLocaleString()} vnđ</p>
                        </div>

                        {renderSpecsTable()}

                    </ScrollArea>

                    <article>
                        <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                        <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                            <CarouselContent>
                                {ram.image_url.map((image, index) => (
                                    <CarouselItem key={index} className="flex justify-center">
                                        <img
                                            src={image}
                                            alt={image.alt}
                                            className="object-contain w-80 h-80 rounded-lg"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>
                    </article>
                </section>
            </DialogContent>
        </Dialog>
    )
}