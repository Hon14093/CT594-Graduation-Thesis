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
import SpecsTable from '@/components/specs-table';

export function DetailsModal({ cable, open, onClose }) {
    if (!cable) return null;


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1200px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin dây cáp</DialogTitle>
                </DialogHeader>
                
                <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start text-lg'>
                    <ScrollArea className='grid gap-2 h-[25rem] overflow-hidden'>
                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>ID dây cáp: </h3>
                            <p>{cable.cable_id}</p>
                        </div>

                        <div className="flex">
                            <h3 className="font-semibold pr-2 shrink-0">Tên dây cáp:</h3>
                            <p className="whitespace-normal break-words">{cable.cable_name}</p>
                        </div>

                        <div className='flex'>
                            <h3 className='font-semibold pr-2'>Thương hiệu: </h3>
                            <p>{cable.brand}</p>
                        </div>

                        <div className='flex pb-2'>
                            <h3 className='font-semibold pr-2'>Giá bán: </h3>
                            <p>{cable.price.toLocaleString()} vnđ</p>
                        </div>

                        {/* {renderSpecsTable()} */}

                        <SpecsTable data={cable} />

                    </ScrollArea>

                    <article>
                        <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                        <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                            <CarouselContent>
                                {cable.image_url.map((image, index) => (
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