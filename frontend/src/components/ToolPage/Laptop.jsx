import React, { useEffect, useState } from 'react'
import SelectLaptop from '../modals/tool/SelectLaptop';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { getLaptops } from '@/hooks/variation-api';

export default function Laptop({ onLaptopSelect }) {
    const [laptop, setLaptop] = useState(null);

    const handleSelectLaptop = (selectedLaptop) => {
        setLaptop(selectedLaptop);
        onLaptopSelect(selectedLaptop);
    }
    const VIETNAMESE_SPECS = {
        // Core specs
        "laptop_id": "ID Laptop",
        "product_id": "ID Sản phẩm",
        "laptop_model": "Model Laptop",
        "cpu": "CPU",
        "gpu": "Card đồ họa",
        
        // RAM specs
        "ram_installed": "RAM tích hợp",
        "ram_type": "Loại RAM", 
        "frequency_mhz": "Tần số RAM (MHz)",
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
            'qty_in_stock'
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
        <section className='max-w-[1280px] mx-auto pt-4 lg:pt-2 lg:px-2 sm:px-4 min-h-[60vh]'>
            <div className='grid grid-cols-2 gap-4'>
                <article className='h-[55vh]'>
                    {laptop === null ? <SelectLaptop onSelectingLaptop={handleSelectLaptop} /> :
                        <Card className='h-full'>
                            <CardContent>
                                <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                                    <CarouselContent>
                                        {laptop.product.image_url.map((image, index) => (
                                            <CarouselItem key={index} className="flex justify-center">
                                                <img
                                                    src={image}
                                                    // alt={image.alt}
                                                    className="object-contain size-96 rounded-lg "
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-4" />
                                    <CarouselNext className="right-4" />
                                </Carousel>

                                <button 
                                    className='py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700'
                                    onClick={() => handleSelectLaptop(null)}
                                >
                                    Xóa
                                </button>
                                <p className='pt-2'><i>*Nhấn xóa để chọn laptop khác</i></p>
                            </CardContent>
                        </Card>
                    }
                </article>

                <article className='max-h-[55vh] overflow-hidden'>
                    {laptop ? 
                        <Card className='h-[55vh]'>
                            <ScrollArea className='h-full'>
                                <CardContent className=''>
                                    <h2 className="text-2xl font-bold pb-2">{laptop.laptop_name}</h2>
                                    {renderSpecsTable()}
                                </CardContent>
                            </ScrollArea>
                        </Card> 
                        :
                        <Card className='h-[55vh]'>
                            <CardContent className='flex justify-center items-center h-full'>
                                <p>Hãy chọn laptop để xem thông số.</p>
                            </CardContent>
                        </Card>
                    }
                </article>
            </div>
        </section>
    )
}
