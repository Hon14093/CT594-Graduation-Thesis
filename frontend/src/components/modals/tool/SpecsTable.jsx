import React, { useState, useEffect } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SpecsTable({ product }) {
    const [open, setOpen] = useState(false);

    // remove field
    const { 
        product: _, 
        name, 
        model, 
        product_id, 
        qty_in_stock, 
        price, 
        ...specs 
    } = product;

    // English to Vietnamese translation mapping
    const translations = {
        // RAM fields
        ram_model: "Model RAM",
        ram_type: "Loại RAM",
        capacity_gb: "Dung lượng (GB)",
        frequency_mhz: "Tần số (MHz)",
        voltage: "Điện áp (V)",
        latency: "Độ trễ",
        
        // Monitor fields
        monitor_name: "Tên màn hình",
        monitor_model: "Model màn hình",
        panel: "Loại panel",
        brightness_nits: "Độ sáng (nits)",
        response_time_ms: "Thời gian phản hồi (ms)",
        bit_depth: "Độ sâu màu",
        color_range: "Dải màu",
        resolution: "Độ phân giải",
        screen_size_inches: "Kích thước màn hình (inch)",
        refresh_rate_hz: "Tần số quét (Hz)",
        ports: "Cổng kết nối",
        vesa_mount: "Chuẩn treo VESA",
        monitor_tech: "Công nghệ màn hình",
        in_box_component: "Thành phần trong hộp",
        weight_kg: "Trọng lượng (kg)",
        
        // Common fields
        voltage: "Điện áp",
        quantity: "Số lượng trong kho"
    };

    const formatValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value, null, 2).replace(/[{}"[\]]/g, '');
        }
        return value;
    };

    const formatValue1 = (value) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <div className="text-center">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey}>
                            <span className="font-medium">{subKey}:</span> {JSON.stringify(subValue)}
                        </div>
                    ))}
                </div>
            );
        }
        return value;
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="text-blue-500 hover:text-blue-800 font-bold"
                    onClick={() => setOpen(true)}
                >
                    <Eye className='mt-2'/>
                </button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-1/2 md:w-3/4 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thông số kỹ thuật của thiết bị</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2">
                    <Table className="border">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Thông số</TableHead>
                                <TableHead>Giá trị</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(specs).map(([key, value]) => {
                                if (value === null || value === undefined || value === '') return null;
                                if (key.endsWith('_id')) return null;
                                if (key.endsWith('_name')) return null;
                                
                                return (
                                    <TableRow key={key}>
                                        <TableCell className="font-medium text-center">
                                            {translations[key] || key}
                                        </TableCell>
                                        <TableCell className='text-center'>{formatValue1(value)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ScrollArea>

            </DialogContent>
        </Dialog>
    )
}