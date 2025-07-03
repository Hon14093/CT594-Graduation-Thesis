import React from 'react'
import { Card, CardContent } from '../ui/card'
import { useNavigate, Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const navigation = () => {
        if (product.laptop_id) {
            navigate(`/laptop/${product.laptop_id}`, { state: { product } })
        } else if (product.ram_id) {
            navigate(`/shop/ram/${product.ram_id}`, { state: { product } })
        } else if (product.cable_id) {
            navigate(`/shop/cable/${product.cable_id}`, { state: { product } })
        } else if (product.monitor_id) {
            navigate(`/shop/monitor/${product.monitor_id}`, { state: { product } })
        } else if (product.dock_id) {
            navigate(`/shop/dock/${product.dock_id}`, { state: { product } })
        } else if (product.adapter_id) {
            navigate(`/shop/adapter/${product.adapter_id}`, { state: { product } })
        }else if (product.storage_id) {
            navigate(`/shop/storage/${product.storage_id}`, { state: { product } })
        } 
    }

    return (
        <Card 
            onClick={() => navigate(`/product/laptop/${product.laptop_id}`, { state: { product } })}
            className='border border-gray-300 p-4 mb-2 rounded-lg hover:cursor-pointer'
        >
            <CardContent>
                <img src={product.product.image_url[0]} alt="" />
                <h2 className='text-xl font-semibold'>
                    {product.laptop_name}
                </h2>
                <p className='text-red-600 font-bold text-left'>{product.price.toLocaleString()}đ</p>
            </CardContent>
        </Card>
    )
}
