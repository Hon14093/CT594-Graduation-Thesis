import React, { useEffect, useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ram } from '@/test/ram-data';
import { monitor } from '@/test/monitor-data';
import { storage } from '@/test/storage-data';
import { dock } from '@/test/dock-data';
import { cable } from '@/test/cable-data';
import { adapter } from '@/test/adapter-data';
import { getRAMs, getMonitors, getDocks } from '@/hooks/variation-api';

export default function SelectComponent({ onSelectItem, category }) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async (category) => {
            switch (category.toLowerCase()) {
                case ('ram'):
                    await getRAMs(setItems);
                    // setItems(ram);
                    break;
                case ('màn hình'):
                    await getMonitors(setItems);
                    // setItems(monitor)
                    return 'monitor';
                case ('lưu trữ'):
                    // getStorages(setItems);
                    // setItems(storage)
                    return 'storage';
                case ('bộ chuyển đổi'):
                    // getAdapters(setItems);
                    setItems(adapter)
                    return 'adapter';
                case ('dây cáp'):
                    // getCables(setItems);
                    setItems(cable)
                    return 'cable';
                case ('usb dock'):
                    await getDocks(setItems);
                    // setItems(dock)
                    return 'usb_dock';
            }
        }

        getItems(category);
        
    }, [])

    const modifyItem = (selectedItem) => {
        // this returns "dock_name", "monitor_name", etc.
        const name = Object.keys(selectedItem).find(
            key => key.endsWith('_name')
        ) || null;

        return {
            ...selectedItem,
            name: selectedItem[name] // this returns the VALUE of the name field
        }
    }
    
    const handleSelect = (selectedItem) => {
        const newItem = modifyItem(selectedItem);
        onSelectItem(category, newItem);
        setOpen(false);
    }

    const translateCategory = (category) => {
        switch (category.toLowerCase()) {
            case ('ram'):
                return 'ram';
            case ('màn hình'):
                return 'monitor';
            case ('lưu trữ'):
                return 'storage';
            case ('bộ chuyển đổi'):
                return 'adapter';
            case ('dây cáp'):
                return 'cable';
            case ('usb dock'):
                return 'usb_dock';
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    className="border p-1 rounded"
                    onClick={() => setOpen(true)}
                >
                    <Plus size={12} />
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-1/2 md:w-3/4 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Chọn thiết bị</DialogTitle>
                </DialogHeader>

                <input type="text" className='border-2 py-1 px-3' placeholder='Tìm kiếm...' />

                <ScrollArea className="flex-1 overflow-y-auto pr-2">
                    {items.map((item, index) => (
                        <button 
                            key={index} 
                            className='hover:cursor-pointer hover:bg-gray-200 grid px-2 rounded-lg w-full' 
                            onClick={() => handleSelect(item)}
                        >
                            <div className='flex gap-10'>
                                <img src={item.product.image_url[0]} alt="" className='size-32' />
                                <div className='text-left'>
                                    {item.name} <br />
                                    <b>Model:</b> {item.model} <br />
                                    <b>Giá bán:</b> {item.price ? item.price.toLocaleString() : '0đ'}đ <br />
                                    <b>Số lượng trong kho:</b> {item.qty_in_stock} <br />
                                </div>
                            </div>
                        </button>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
