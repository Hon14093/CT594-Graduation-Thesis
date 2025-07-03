import React from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DetailsModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin sản phẩm</DialogTitle>
                </DialogHeader>
                
                <ScrollArea>
                    <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start'>
                        <article className='grid gap-2'>
                            <div className='flex'>
                                <h3 className='font-semibold pr-2'>ID sản phẩm: </h3>
                                <p>{product.product_id}</p>
                            </div>

                            <div className='flex'>
                                <h3 className='font-semibold pr-2'>Tên sản phẩm: </h3>
                                <p>{product.product_name}</p>
                            </div>

                            <div className='grid grid-cols-3 sm:grid-cols-2 gap-5'>
                                <div>
                                    <h3 className='font-semibold pr-2'>Thương hiệu: </h3>
                                    <p>{product.brand.brand_name}</p>
                                </div>

                                <div>
                                    <h3 className='font-semibold pr-2'>Danh mục: </h3>
                                    <p>{product.category.category_name}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className='font-semibold pr-2'>Mô tả: </h3>
                                <p>{product.description}</p>
                            </div>

                        </article>

                        <article>
                            <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                            {/* <div className='flex justify-center'>
                                <img 
                                    src={product.image_url[0]} 
                                    alt="Product Preview" 
                                    className="w-72 h-72 object-cover rounded-md border"
                                />
                            </div> */}

                            <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                                <CarouselContent>
                                    {product.image_url.map((image, index) => (
                                        <CarouselItem key={index} className="flex justify-center">
                                            <img
                                                src={image}
                                                alt={image.alt}
                                                className="object-cover w-80 h-80 rounded-lg "
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4" />
                                <CarouselNext className="right-4" />
                            </Carousel>

                        </article>
                    </section>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
