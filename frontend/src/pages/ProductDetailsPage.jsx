import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Bread_Crumb from '@/components/layout/Bread_Crumb';
import VariationSelection from '@/components/ProductDetailsPage/VariationSelection';
import ReviewSection from '@/components/ProductDetailsPage/ReviewSection';
import ProductInfo from '@/components/ProductDetailsPage/ProductInfo';

export default function ProductDetailsPage() {
    const location = useLocation();
    const product = location.state?.product || location.state?.variation;
    // const [product, setProduct] = useState(location.state?.product || null);
    const { slug } = useParams();

    const name = Object.keys(product).find(
        key => key.endsWith('_name')
    ) || null;

    const bread = [
        { link: '/', label: 'Trang chủ'},
        { link: `/shop/${slug}`, label: `${slug}`},
        { link: '#', label: `${product[name]}`},
    ]

    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found {slug}</p>;
    }

    return (
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <VariationSelection product={product} />

            <ProductInfo product={product} />

            <ReviewSection productId={product.product_id} />

            <Footer />
        </div>
    )
}
