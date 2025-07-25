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

export function DetailsModal({ dock, open, onClose }) {
    if (!dock) return null;

    const VIETNAMESE_DOCK_SPECS = {
        dock_name: "Tên dock",
        dock_model: "Model dock",
        connection_port: "Cổng kết nối với laptop",
        max_data_rate_gbps: "Tốc độ truyền dữ liệu tối đa (Gbps)",
        max_output_voltage: "Điện áp đầu ra tối đa (V)",
        cable_length_cm: "Chiều dài dây (cm)",
        material: "Chất liệu",
        dimensions_mm: "Kích thước (mm)",
        max_external_monitors: "Số màn hình ngoài tối đa",
        max_resolution: "Độ phân giải tối đa",
        // display_output_ports: "Cổng xuất hình ảnh",
        hdmi: "Cổng HDMI",
        display_port: "Cổng DisplayPort",
        usb_a_ports: "Cổng USB-A",
        usb_c_ports: "Cổng USB-C",
        ethernet_speed_gbps: "Tốc độ cổng Ethernet",
        sd_card_slot: "Khe đọc thẻ SD",
        microsd_card_slot: "Khe đọc thẻ microSD",
        audio_jack_type: "Cổng âm thanh",
        price: "Giá bán",
        qty_in_stock: "Số lượng tồn kho",
    };

    const formatDockValue = (key, value) => {
        if (typeof value === "boolean") return value ? "Có" : "Không";
        if (key === "cable_length_cm") return `${value} cm`;
        if (key === "max_data_rate_gbps") return `${value} Gbps`;
        if (key === "max_output_voltage") return `${value} V`;
        return value || "—";
    };

    const renderSpecsTable = () => {
        if (!dock) return null;

        const excludedKeys = [
            "dock_id", "product_id", "product", "image_url", "name", "model", "brand", "dock_name"
        ];

        return (
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <tbody>
                        {Object.entries(dock).map(([key, value]) => {
                            if (excludedKeys.includes(key)) return null;

                            // Handle grouped port arrays
                            if ((key === "usb_a_ports" || key === "usb_c_ports" || key === "hdmi" || key === "display_port") && Array.isArray(value)) {
                                if (value.length === 0) return null;
                                    return (
                                        <tr key={key} className="border-b border-gray-200">
                                            <td className="py-3 px-4 font-medium w-1/3">
                                                {VIETNAMESE_DOCK_SPECS[key]}
                                            </td>
                                            <td className="py-2 px-4 space-y-1">
                                                {value.map((port, i) => (
                                                    <div key={`${key}-${i}`}>
                                                        Phiên bản {port.version}, số lượng {port.quantity}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    );
                            }

                            return (
                                <tr key={key} className="border-b border-gray-200">
                                    <td className="py-3 px-4 font-medium w-1/3">
                                        {VIETNAMESE_DOCK_SPECS[key] || key.replace(/_/g, " ")}
                                    </td>
                                    <td className="py-2 px-4">
                                        {formatDockValue(key, value)}
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
                    <DialogTitle>Thông tin dock</DialogTitle>
                </DialogHeader>
                
                <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start text-lg'>
                    <ScrollArea className='grid gap-2 h-[25rem] overflow-hidden'>
                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>ID dock: </h3>
                            <p>{dock.dock_id}</p>
                        </div>

                        <div className="flex">
                            <h3 className="font-semibold pr-2 shrink-0">Tên dock:</h3>
                            <p className="whitespace-normal break-words">{dock.dock_name}</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Thương hiệu: </h3>
                            <p>{dock.brand}</p>
                        </div>

                        <div className='flex pb-2'>
                            <h3 className='font-semibold pr-2'>Giá bán: </h3>
                            <p>{dock.price.toLocaleString()} vnđ</p>
                        </div>

                        {renderSpecsTable()}

                    </ScrollArea>

                    <article>
                        <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                        <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                            <CarouselContent>
                                {dock.image_url.map((image, index) => (
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