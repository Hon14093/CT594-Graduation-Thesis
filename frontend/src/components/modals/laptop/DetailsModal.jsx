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

export function DetailsModal({ laptop, open, onClose }) {
    if (!laptop) return null;

    const VIETNAMESE_SPECS = {
        // Core specs
        "laptop_id": "ID Laptop",
        "product_id": "ID Sản phẩm",
        "laptop_model": "Model Laptop",
        "cpu": "CPU",
        "gpu": "Card đồ họa",
        
        // RAM specs
        "ram_installed": "Dung lượng RAM",
        "ram_type": "Loại RAM", 
        "frequency_mhz": "Tốc độ RAM (MHz)",
        "ram_slots": "Khe cắm RAM",
        "max_ram": "RAM tối đa",
        
        // Display specs
        "refresh_rate": "Tần số quét (Hz)",
        "panel": "Loại màn hình",
        "screen_size": "Kích thước màn hình (inch)",
        "resolution": "Độ phân giải",
        "monitor_tech": "Công nghệ màn hình",
        
        // Audio/OS
        "sound_tech": "Công nghệ âm thanh",
        "os": "Hệ điều hành",
        
        // Physical specs
        "battery_wh": "Dung lượng pin (Wh)",
        "weight_kg": "Trọng lượng (kg)",
        
        // Connectivity
        "wifi_version": "Chuẩn Wi-Fi",
        "bluetooth_version": "Phiên bản Bluetooth",
        
        // Ports (special nested translation)
        "ports": "Cổng kết nối",
        "HDMI": "Cổng HDMI",
        "USB-A": "Cổng USB-A",
        "USB-C": "Cổng USB-C", 
        "Ethernet": "Cổng Ethernet",
        "PD": "Sạc (Power Delivery)",
        "DP": "DisplayPort",
        
        // Storage
        "storage_installed_gbs": "Ổ cứng tích hợp (GB)",
        "storage_installed_type": "Loại ổ cứng",
        "storage_slots": "Khe cắm ổ cứng",
        "storage_slots_type": "Loại khe cắm ổ cứng",
        "max_storage": "Dung lượng tối đa",
        
        // Product info
        "price": "Giá bán",
        "qty_in_stock": "Số lượng tồn kho",
        "product_name": "Tên sản phẩm",
        "image_url": "Hình ảnh",
        
        // Values translation
        "IPS": "IPS",
        "DDR5": "DDR5",
        "NVMe": "NVMe",
        "SATA": "SATA",
        "Anti-glare": "Chống lóa",
        "Nahimic Audio": "Âm thanh Nahimic"
    };

    const formatVietnameseValue = (key, value) => {
        if (key === "screen_size") return `${value} inch`;
        if (key === "weight_kg") return `${value} kg`;
        if (key === "frequency_mhz") return `${value} MHz`;
        if (key === "refresh_rate") return `${value} Hz`;
        if (key === "storage_installed_gbs") return `${value} GB`;
        if (key === "battery_wh") return `${value} Wh`;
        return value;
    };

    const renderSpecsTable = () => {
        if (!laptop) return null;

        // Exclude these keys from the table
        const excludedKeys = [
            'laptop_id', 
            'product_id',
            'product',
            'image_url',
            'price',
            'laptop_name',
            'qty_in_stock',
            'brand', 'laptop_price'
        ];

        return (
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <tbody>
                        {Object.entries(laptop).map(([key, value]) => {
                            if (excludedKeys.includes(key)) return null;
                            
                            return (
                                <tr key={key} className='border-b border-gray-200'>
                                    <td className="py-3 px-4 font-medium">
                                        {VIETNAMESE_SPECS[key] || key.replace(/_/g, ' ')}
                                    </td>
                                    <td className="py-2 px-4">
                                        {typeof value === 'object' 
                                        ? Object.entries(value).map(([subKey, subVal]) => (
                                            <div key={subKey}>
                                                {VIETNAMESE_SPECS[subKey] || subKey}: {Array.isArray(subVal) ? subVal.join(', ') : subVal}
                                            </div>
                                            ))
                                        : formatVietnameseValue(key, value)}
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
                    <DialogTitle>Thông tin laptop</DialogTitle>
                </DialogHeader>
                
                <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start text-lg'>
                    <ScrollArea className='grid gap-2 h-[25rem] overflow-hidden'>
                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>ID laptop: </h3>
                            <p>{laptop.laptop_id}</p>
                        </div>

                        <div className="flex">
                            <h3 className="font-semibold pr-2 shrink-0">Tên laptop:</h3>
                            <p className="whitespace-normal break-words">{laptop.laptop_name}</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Thương hiệu: </h3>
                            <p>{laptop.brand}</p>
                        </div>

                        <div className='flex pb-2'>
                            <h3 className='font-semibold pr-2'>Giá bán: </h3>
                            <p>{laptop.price.toLocaleString()} vnđ</p>
                        </div>

                        {renderSpecsTable()}

                    </ScrollArea>

                    <article>
                        <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                        <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                            <CarouselContent>
                                {laptop.image_url.map((image, index) => (
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