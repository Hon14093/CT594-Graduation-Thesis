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
import { cable } from '@/test/cable-data';
import { adapter } from '@/test/adapter-data';
import { getProductsByCategoryId } from '@/hooks/product-api';
import { getRAMs, getMonitors, getDocks } from '@/hooks/variation-api';

const categories = [
    {"category_id": 1, "category_name": "Laptop"},
    {"category_id": 2, "category_name": "RAM"},
    {"category_id": 3, "category_name": "Màn hình"},
    {"category_id": 4, "category_name": "Bộ chuyển đổi"},
    {"category_id": 5, "category_name": "Dây cáp"},
    {"category_id": 6, "category_name": "USB dock"},
    {"category_id": 7, "category_name": "Ổ cứng"},
]

export default function SelectProduct({ onSelectItem, category }) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const category_id = categories.find((cat) => 
            cat.category_name.toLowerCase() === category.toLowerCase()
        )?.category_id || 1
        getProductsByCategoryId(setItems, category_id)
    }, [])
    
    const handleSelect = (selectedItem) => {
        onSelectItem(category, selectedItem);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    className="border p-1 rounded ml-auto mr-7"
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
                                <img src={item.image_url[0]} alt="" className='size-32 object-contain' />
                            
                                <div className='text-left py-2 text-lg my-auto'>
                                    {item.product_name}
                                </div>
                                
                            </div>
                        </button>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
