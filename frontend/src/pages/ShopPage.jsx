import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Bread_Crumb from '@/components/layout/Bread_Crumb';
import ProductsDisplay from '@/components/ShopPage/ProductsDisplay';
import { getLaptops } from '@/hooks/variation-api'

export default function ShopPage() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    let translatedSlug = '';

    useEffect(() => {
        translateSlug(slug);
    }, [slug]);

    const translateSlug = async (slug) => {
        switch (slug) {
            case 'laptop':
                await getLaptops(setData);
                console.log('Fetching laptop...');
                break;
            case 'ram':
                console.log('Fetching ram...');
                break;
        }
        return translatedSlug;
    }

    const bread = [
        { link: '/', label: 'Trang chủ'},
        { link: `/shop/${slug}`, label: `${slug}`}
    ]

    return (
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <ProductsDisplay data={data} slug={slug} />

            <Footer />
        </div>
    )
}
