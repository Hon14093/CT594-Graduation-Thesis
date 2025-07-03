import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { Star } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'

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
    return (
        <section className="py-12 bg-white">
            <div className="container px-4 md:px-6 max-w-[1280px] mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter text-techBlue">Sản phẩm phổ biến</h2>
                    <p className="text-gray-600 md:text-lg">Các sản phẩm bán chạy trong tháng</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {products.map((product) => (
                        <Card
                            key={product.name}
                            className="overflow-hidden bg-white hover:shadow-xl transition-shadow py-0 duration-300 group"
                        >
                            <div className="relative h-[200px] overflow-hidden">
                                <img
                                    src="https://placehold.co/300x200"
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <CardContent className="p-4 -mt-7">
                                <h3 className="font-semibold group-hover:text-techBlue transition-colors">{product.name}</h3>
                                <div className="flex items-center mt-1">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                            />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-500 line-through mr-2">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                        <span className="font-bold text-techBlue">${product.price}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="rounded-full bg-[#780C17] hover:bg-[#780C17]/90 transition-transform hover:scale-110 text-white"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
