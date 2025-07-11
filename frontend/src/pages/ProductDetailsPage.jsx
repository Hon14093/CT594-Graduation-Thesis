import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Bread_Crumb from '@/components/layout/Bread_Crumb';
import VariationSelection from '@/components/ProductDetailsPage/VariationSelection';

export default function ProductDetailsPage() {
    const location = useLocation();
    const product = location.state?.product || location.state?.variation;
    // const [product, setProduct] = useState(location.state?.product || null);
    const { slug } = useParams();

    const bread = [
        { link: '/', label: 'Trang chủ'},
        { link: `/shop/${slug}`, label: `${slug}`},
        { link: '#', label: `${product.laptop_name}`},
    ]

    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found {slug}</p>;
    }

    return (
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <VariationSelection product={product} />

            <Footer />
        </div>
    )
}
