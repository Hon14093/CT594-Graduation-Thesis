import React from 'react'
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function SpecsTable({ data }) {

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
        "brand": "Thương hiệu",
        
        // Values translation
        "IPS": "IPS",
        "DDR5": "DDR5",
        "NVMe": "NVMe",
        "SATA": "SATA",
        "Anti-glare": "Chống lóa",
        "Nahimic Audio": "Âm thanh Nahimic",
    };

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

    const translations = {
        // RAM fields
        ram_model: "Model RAM",
        ram_type: "Loại RAM",
        capacity_gb: "Dung lượng (GB)",
        frequency_mhz: "Tần số (MHz)",
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
        if (!data) return null;

        // Exclude these keys from the table
        const excludedKeys = [
            'laptop_id',
            'product_id',
            'product',
            'image_url',
            'price', 'laptop_price', 
            'laptop_name', 'name',
            'qty_in_stock'
        ];

        return (
            <div className="border rounded-lg overflow-auto">
                <table className="">
                    <tbody>
                        {Object.entries(data).map(([key, value]) => {
                            if (excludedKeys.includes(key)) return null;

                            if ((key === "ports") && Array.isArray(value)) {
                                if (value.length === 0) return null;
                                return (
                                    <tr key={key} className="border-b border-gray-200">
                                        <td className="py-3 px-4 font-medium w-1/3">
                                            {VIETNAMESE_SPECS[key]}
                                        </td>
                                        <td className="py-2 px-4 space-y-1">
                                            {value.map((port, i) => (
                                                <div key={`${key}-${i}`}>
                                                    <b>Cổng {port.type}:</b> phiên bản: {port.version}, số lượng: {port.quantity}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                );
                            }
                            
                            return (
                                <tr key={key} className='border-b border-gray-200 font-mono'>
                                    <td className="py-3 px-4 font-medium">
                                        {VIETNAMESE_SPECS[key] || key.replace(/_/g, ' ')}
                                    </td>

                                    <td className='py-2 px-4'>
                                        {formatVietnameseValue(key, value)}
                                    </td>

                                    {/* <td className="py-2 px-4">
                                        {typeof value === 'object' 
                                        ? Object.entries(value).map(([subKey, subVal]) => (
                                            <div key={subKey}>
                                                {VIETNAMESE_SPECS[subKey] || subKey}: {Array.isArray(subVal) ? subVal.join(', ') : subVal}

                                                {subKey}
                                            </div>
                                        ))
                                        : formatVietnameseValue(key, value)}
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const formatValue = (value) => {
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
        <Card className='max-h-[55vh] mt-2'>
            <ScrollArea className='h-[50vh]'>
                <CardContent className='overflow-auto font-mono'>
                    {/* <h2 className="text-2xl font-bold pb-2">{laptop.laptop_name}</h2> */}
                    {data.laptop_id ? (
                        renderSpecsTable()
                    ) : (
                        <Table className="border font-mono w-full table-auto">
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
                                            <TableCell className='text-center'>{formatValue(value)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </ScrollArea>
        </Card> 
    )
}
