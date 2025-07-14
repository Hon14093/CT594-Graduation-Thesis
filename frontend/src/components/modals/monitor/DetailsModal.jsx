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

export function DetailsModal({ monitor, open, onClose }) {
    if (!monitor) return null;

    const VIETNAMESE_MONITOR_SPECS = {
        monitor_name: "Tên màn hình",
        monitor_model: "Model màn hình",
        panel: "Tấm nền",
        brightness_nits: "Độ sáng (nits)",
        response_time_ms: "Thời gian phản hồi (ms)",
        bit_depth: "Độ sâu màu",
        color_range: "Dải màu",
        resolution: "Độ phân giải",
        screen_size_inches: "Kích thước màn hình (inch)",
        refresh_rate_hz: "Tần số quét (Hz)",
        ports: "Cổng kết nối",
        hdmi: "Cổng HDMI",
        display_port: "Cổng DisplayPort",
        audio_jack: "Cổng âm thanh",
        vesa_mount: "Chuẩn gắn VESA",
        monitor_tech: "Công nghệ màn hình",
        in_box_component: "Phụ kiện đi kèm",
        voltage: "Điện áp",
        weight_kg: "Trọng lượng (kg)",
        price: "Giá bán",
        qty_in_stock: "Số lượng tồn kho",
    };

    const PORT_TRANSLATIONS = {
        hdmi: "Cổng HDMI",
        display_port: "Cổng DisplayPort",
        audio_jack: "Cổng âm thanh",
        usb_a: "Cổng USB-A",
        usb_c: "Cổng USB-C",
        ethernet: "Cổng Ethernet",
        dp: "DisplayPort",
        pd: "Sạc (Power Delivery)",
    };


    const formatMonitorValue = (key, value) => {
        if (key === "brightness_nits") return `${value} nits`;
        if (key === "response_time_ms") return `${value} ms`;
        if (key === "screen_size_inches") return `${value} inch`;
        if (key === "refresh_rate_hz") return `${value} Hz`;
        if (key === "weight_kg") return `${value} kg`;
        return value;
    };

    const renderSpecsTable = () => {
        if (!monitor) return null;

        const excludedKeys = [
            "monitor_id", "product_id", "product", "image_url", "name", "model", "brand"
        ];

        return (
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <tbody>
                        {Object.entries(monitor).map(([key, value]) => {
                            if (excludedKeys.includes(key)) return null;

                            // Handle nested 'ports'
                            if (key === "ports" && typeof value === "object") {
                                return (
                                    <tr key={key} className="border-b border-gray-200">
                                        <td className="py-3 px-4 font-medium w-1/3">
                                            {VIETNAMESE_MONITOR_SPECS[key] || "Cổng kết nối"}
                                        </td>
                                        <td className="py-2 px-4 space-y-1">
                                            {Object.entries(value).map(([portKey, portVal]) => {
                                                const translatedLabel = PORT_TRANSLATIONS[portKey] || portKey;

                                                if (Array.isArray(portVal)) {
                                                    return portVal.map((item, i) => (
                                                    <div key={`${portKey}-${i}`}>
                                                        <strong>{translatedLabel}:</strong> {item.version}; Số lượng {item.quantity}
                                                    </div>
                                                    ));
                                                }

                                                if (typeof portVal === "object") {
                                                    return (
                                                    <div key={portKey}>
                                                        <strong>{translatedLabel}:</strong> {portVal.type}; Số lượng {portVal.quantity}
                                                    </div>
                                                    );
                                                }

                                                return null;
                                            })}
                                        </td>
                                    </tr>
                                );
                            }


                            return (
                                <tr key={key} className="border-b border-gray-200">
                                    <td className="py-3 px-4 font-medium w-1/3">
                                        {VIETNAMESE_MONITOR_SPECS[key] || key.replace(/_/g, " ")}
                                    </td>
                                    <td className="py-2 px-4">
                                        {typeof value === "object" && !Array.isArray(value)
                                            ? JSON.stringify(value)
                                            : formatMonitorValue(key, value)}
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
                    <DialogTitle>Thông tin màn hình</DialogTitle>
                </DialogHeader>
                
                <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start text-lg'>
                    <ScrollArea className='grid gap-2 h-[25rem] overflow-hidden'>
                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>ID màn hình: </h3>
                            <p>{monitor.monitor_id}</p>
                        </div>

                        <div className="flex">
                            <h3 className="font-semibold pr-2 shrink-0">Tên màn hình:</h3>
                            <p className="whitespace-normal break-words">{monitor.monitor_name}</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Thương hiệu: </h3>
                            <p>{monitor.brand}</p>
                        </div>

                        <div className='flex pb-2'>
                            <h3 className='font-semibold pr-2'>Giá bán: </h3>
                            <p>{monitor.price.toLocaleString()} vnđ</p>
                        </div>

                        {renderSpecsTable()}

                    </ScrollArea>

                    <article>
                        <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                        <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                            <CarouselContent>
                                {monitor.image_url.map((image, index) => (
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