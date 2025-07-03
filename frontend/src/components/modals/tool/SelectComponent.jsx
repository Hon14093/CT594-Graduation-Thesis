import React, { useState } from 'react'
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

export default function SelectComponent({ onSelectItem, category }) {
    const [open, setOpen] = useState(false);
    let chosenCategory = '';

    const items = []
    
    const handleSelect = (selectedItem) => {
        onSelectItem(selectedItem)
        setOpen(false);
    }

    const translateCategory = (category) => {
        switch (category.toLowerCase()) {
            case ('ram'):
                chosenCategory = 'ram';
                break;
            case ('màn hình'):
                chosenCategory = 'monitor';
                break;
            case ('lưu trữ'):
                chosenCategory = 'storage';
                break;
            case ('bộ chuyển đổi'):
                chosenCategory = 'adapter';
                break;
            case ('dây cáp'):
                chosenCategory = 'cable';
                break;
            case ('usb dock'):
                chosenCategory = 'usb_dock';
                break;
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
                <div>{category}</div>

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
                                    {item.laptop_name} <br />
                                    <b>Model:</b> {item.laptop_model} <br />
                                    <b>Giá bán:</b> {item.price.toLocaleString()}đ
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
