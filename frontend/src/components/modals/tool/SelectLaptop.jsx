import React, { useState, useEffect } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLaptops } from '@/hooks/variation-api';

export default function SelectLaptop({ onSelectingLaptop }) {
    const [open, setOpen] = useState(false);
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        getLaptops(setLaptops);
    }, [])

    const handleLaptopSelect = (laptop) => {
        onSelectingLaptop(laptop);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Card className='h-[55vh]'>
                    <CardContent className='h-full'>
                        <Button variant='outline' 
                            onClick={() => setOpen(true)}
                            className='size-full bg-gray-100 flex flex-col hover:bg-gray-200'
                        >
                            <Plus className='size-16'/>
                            Chọn laptop
                        </Button>
                    </CardContent>
                </Card>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-1/2 md:w-3/4 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Chọn laptop của bạn</DialogTitle>
                </DialogHeader>

                <input type="text" className='border-2 py-1 px-3' placeholder='Tìm kiếm...' />

                <ScrollArea className="flex-1 overflow-y-auto pr-2">
                    {laptops.map((item, index) => (
                        <button 
                            key={index} 
                            className='hover:cursor-pointer hover:bg-gray-200 grid px-2 rounded-lg w-full' 
                            onClick={() => handleLaptopSelect(item)}
                        >
                            <div className='flex gap-10'>
                                <img src={item.product.image_url[0]} alt="" className='size-32 object-contain' />
                                <div className='text-left'>
                                    {item.laptop_name} <br />
                                    <b>Model:</b> {item.laptop_model} <br />
                                    <b>CPU:</b> {item.cpu} <br />
                                    <b>GPU:</b> {item.gpu}
                                </div>
                            </div>
                        </button>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}