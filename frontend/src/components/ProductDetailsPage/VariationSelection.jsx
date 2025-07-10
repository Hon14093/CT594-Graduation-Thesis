import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from '../ui/input';
import { ShoppingCart } from 'lucide-react';
import { getLaptopVariations } from '@/hooks/variation-api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export default function VariationSelection({ product }) {
    const { addItem } = useCart();
    const [variations, setVariations] = useState(null);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        getLaptopVariations(product.product_id, setVariations);
    }, []);

    const handleQtyChange = (e) => {
        let value = parseInt(e.target.value, 10);

        if (isNaN(value)) {
            value = 1;
        }
        if (value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        setQty(value);
    }

    const handleAddItem = () => {
        const itemRefId = Object.keys(product).find(
            key => key.endsWith('_id') && key !== 'product_id'
        );
        const itemRefName = Object.keys(product).find(
            key => key.endsWith('_name')
        );
        const itemRefModel = Object.keys(product).find(
            key => key.endsWith('_model')
        );

        addItem({
            product_id: product.product_id,
            item_ref_id: product[itemRefId],
            item_type: itemRefModel.replace("_model", ""),
            item_name: product[itemRefName],
            item_model: product[itemRefModel],
            price: product.price,
            quantity: qty,
            image_url: product.product.image_url[0]
        })
    }

    return (
        <section className='mt-4 grid grid-cols-2 max-w-[1280px] mx-auto gap-5 pb-4'>
            <Card>
                <CardContent>
                    <Carousel className="w-full rounded-xl" opts={{ loop: true, align: "center" }}>
                        <CarouselContent>
                            {product.product.image_url.map((image, index) => (
                                <CarouselItem key={index} className="flex justify-center">
                                    <img
                                        src={image}
                                        alt={image.alt}
                                        className="object-contain w-96 rounded-lg "
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </CardContent>
            </Card>

            <Card>
                <CardContent className='text-left'>
                    <div className='text-2xl font-semibold'>
                        {product.laptop_name}
                    </div>

                    <div className='text-2xl text-red-600 font-semibold py-2 flex'>
                        {product.price.toLocaleString()} vnđ

                        <div className='ml-auto text-black font-normal text-lg'>
                            Trong kho: {product.qty_in_stock}
                        </div>
                    </div>

                    <div className='flex gap-4 py-2 flex-wrap justify-center'>
                        {variations ? (
                            <>
                            {variations.map((variation) => (
                                variation.laptop_id === product.laptop_id ? (
                                    <button 
                                        key={variation.laptop_id} 
                                        className='bg-techBlue border-2 text-white rounded-lg p-2 w-40 h-32'
                                    >
                                        <div>{variation.cpu}</div>
                                        <div>{variation.gpu}</div>
                                    </button>
                                ) : (
                                    <button 
                                        key={variation.laptop_id} 
                                        onClick={() => {
                                            navigate(`/product/laptop/${variation.laptop_id}`, { state: { variation } })
                                        }}
                                        className='border-2 border-techBlue rounded-lg p-2 w-40 h-32'
                                    >
                                        <div>{variation.cpu}</div>
                                        <div>{variation.gpu}</div>
                                    </button>
                                )
                            ))}
                            </>
                        ) : (
                            <div>loading...</div>
                        )}
                    </div>

                    <div className="flex mt-4 gap-5 items-center">
                        <h2 className="text-lg font-semibold">Số lượng:</h2>
                        <Input 
                            type="number" 
                            className="max-w-20 border border-darkOlive" 
                            value={qty}
                            onChange={handleQtyChange}
                            min="1" max="10"
                        />
                    </div>

                    <div className='mt-4'>
                        {product.qty_in_stock > 0 ? (
                            <button 
                                type='button'
                                className='big-action-button !py-1 flex items-center'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddItem();
                                }}
                            >
                                <ShoppingCart className='mr-3' size={20} />
                                Thêm vào giỏ hàng
                            </button>
                        ) : (
                            <button className='cursor-not-allowed big-action-button !py-1 flex items-center'>
                                Hết hàng
                            </button>
                        )}
                    </div>

                </CardContent>
            </Card>
        </section>
    )
}
