import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { Star } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { getPopularProducts } from '@/hooks/analytics-api'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

const products = [
    {
        name: "Latop Acer Aspire 7",
        price: 1299,
        originalPrice: 1499,
        discount: 13,
        rating: 5,
        reviews: 128,
    },
    {
        name: "Laptop Lenovo Loq 15",
        price: 1599,
        originalPrice: null,
        discount: null,
        rating: 4,
        reviews: 89,
    },
    {
        name: "Laptop MSI Gaming G63",
        price: 49,
        originalPrice: 69,
        discount: 29,
        rating: 4,
        reviews: 256,
    },
    {
        name: '4K Monitor 27"',
        price: 349,
        originalPrice: 399,
        discount: 12,
        rating: 5,
        reviews: 73,
    },
]

export default function FeaturedProducts() {
    const [popularProducts, setPopularProducts] = useState([]);
    const { addItem } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        getPopularProducts(setPopularProducts);
    }, [])

    const handleAddItem = (product) => {
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
            quantity: 1,
            image_url: product.product.image_url[0]
        })
    }

    const navigation = (product) => {
        // const product = popularProducts;

        console.log(product)

        if (product.laptop_id) {
            navigate(`/product/laptop/${product.laptop_id}`, { state: { product } })
        } else if (product.ram_id) {
            navigate(`/product/ram/${product.ram_id}`, { state: { product } })
        } else if (product.cable_id) {
            navigate(`/product/cable/${product.cable_id}`, { state: { product } })
        } else if (product.monitor_id) {
            navigate(`/product/monitor/${product.monitor_id}`, { state: { product } })
        } else if (product.dock_id) {
            navigate(`/product/dock/${product.dock_id}`, { state: { product } })
        } else if (product.adapter_id) {
            navigate(`/product/adapter/${product.adapter_id}`, { state: { product } })
        }else if (product.storage_id) {
            navigate(`/product/storage/${product.storage_id}`, { state: { product } })
        } 
    }

    return (
        <section className="py-12 bg-white">
            <div className="container px-4 md:px-6 max-w-[1280px] mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter text-techBlue">Sản phẩm phổ biến</h2>
                    <p className="text-gray-600 md:text-lg">Các sản phẩm bán chạy trong tháng</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 font-mono text-lg">
                    {popularProducts.slice(0,4).map((product) => (
                        <Card
                            onClick={() => navigation(product)}
                            key={product.name}
                            className="overflow-hidden bg-white hover:shadow-xl transition-shadow py-0 duration-300 group hover:cursor-pointer"
                        >
                            <div className="relative h-[200px] overflow-hidden">
                                <img
                                    // src="https://placehold.co/300x200"
                                    src={product.product.image_url[0]}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <CardContent className="p-4 -mt-7">
                                <h3 className="font-semibold group-hover:text-techBlue transition-colors">{product.name}</h3>

                                <div className="mt-auto">
                                    <div className="flex items-center mt-1 text-gray-600">
                                        Đã bán: {product.count}
                                    </div>

                                    <div className="flex items-center justify-between mt-1">
                                        <div>
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through mr-2">
                                                    ${product.originalPrice}
                                                </span>
                                            )}
                                            <span className="font-bold text-techBlue">
                                                {product.price.toLocaleString()} vnđ
                                            </span>
                                        </div>

                                        <Button
                                            size="sm"
                                            className="rounded-full bg-[#780C17] hover:bg-[#780C17]/90 transition-transform hover:scale-110 text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddItem(product);
                                            }}
                                        >
                                            <ShoppingCart className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
