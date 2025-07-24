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
import { ScrollArea } from '@/components/ui/scroll-area';

export function DetailsModal({ discount, open, onClose }) {
    if (!discount) return null;
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='!max-w-none w-[600px]'>
                <DialogHeader>
                    <DialogTitle>Thông tin khuyến mãi</DialogTitle>
                </DialogHeader>
                
                <section className='grid gap-5 text-lg'>
                    <ScrollArea className=' gap-2 '>
                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>ID khuyến mãi: </h3>
                            <p className='ml-auto'>{discount.discount_id}</p>
                        </div>

                        <div className="flex">
                            <h3 className="font-semibold pr-2">Mã khuyến mãi:</h3>
                            <p className="ml-auto">{discount.discount_code}</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Giá trị khuyến mãi (vnđ) </h3>
                            <p className='ml-auto'>{discount.discount_value.toLocaleString()} vnđ</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Đơn hàng tối thiểu (vnđ): </h3>
                            <p className='ml-auto'>{discount.min_order_total.toLocaleString()} vnđ</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Ngày tạo: </h3>
                            <p className='ml-auto'>{discount.date_created}</p>
                        </div>

                    </ScrollArea>
                </section>
            </DialogContent>
        </Dialog>
    )
}