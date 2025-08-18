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
import SpecsTable from '@/components/specs-table';

export default function SpecsTableModal({ data }) {
    const [open, setOpen] = useState(false);

    // remove field
    const { 
        data: _, 
        name, 
        model, 
        product_id, 
        product,
        image_url,
        qty_in_stock, 
        price, 
        ...specs  
    } = data;

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

        // Adapter fields
        adapter_model: "Model bộ chuyển đổi",
        input_port: "Cổng đầu vào",
        output_port: "Cổng đầu ra",
        ethernet_speed_mbps: "Tốc độ Ethernet (Mbps)",
        max_data_rate_gbps: "Tốc độ dữ liệu tối đa (Gbps)",
        max_output_watt: "Công suất đầu ra tối đa (W)",

        // Cable fields
        cable_model: "Model dây cáp",
        connector_a: "Đầu kết nối A",
        connector_b: "Đầu kết nối B",
        cable_length_cm: "Chiều dài dây (cm)",
        weight_g: "Trọng lượng (g)",
        max_resolution: "Độ phân giải tối đa",

        // Dock fields
        dock_model: "Model dock",
        connection_port: "Cổng kết nối",
        dimensions_mm: "Kích thước (mm)",
        max_external_monitors: "Số màn hình ngoài hỗ trợ",
        hdmi: "Cổng HDMI",
        usb_a_ports: "Các cổng USB-A",
        usb_c_ports: "Các cổng USB-C",
        sd_card_slot: "Khe thẻ SD",
        microsd_card_slot: "Khe thẻ microSD",

        // Storage fields
        storage_model: "Model ổ cứng",
        interface: "Giao diện kết nối",
        form_factor: "Chuẩn kích thước",
        physical_profile: "Kích thước vật lý",
        read_speed_mbps: "Tốc độ đọc (MB/s)",
        write_speed_mbps: "Tốc độ ghi (MB/s)",
        
        // Common fields
        voltage: "Điện áp",
        quantity: "Số lượng trong kho",
        brand: "Thương hiệu",
        material: "Chất liệu"
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

                <SpecsTable data={data} />

                {/* <ScrollArea className="flex-1 overflow-y-auto pr-2">
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
                </ScrollArea> */}

            </DialogContent>
        </Dialog>
    )
}