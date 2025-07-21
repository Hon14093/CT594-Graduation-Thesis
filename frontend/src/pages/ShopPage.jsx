import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Bread_Crumb from '@/components/layout/Bread_Crumb';
import ProductsDisplay from '@/components/ShopPage/ProductsDisplay';
import { 
    getLaptops, getRAMs,
    getCables,getDocks,
    getAdapters, getStorages,
    getMonitors
} from '@/hooks/variation-api'

export default function ShopPage() {
    const { slug } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        getItemsBySlug(slug);
    }, [slug]);

    const getItemsBySlug = async (slug) => {
        switch (slug) {
            case 'laptop':
                await getLaptops(setData);
                break;
            case 'ram':
                await getRAMs(setData);
                break;
            case 'man-hinh':
                await getMonitors(setData);
                break;
            case 'bo-chuyen-doi':
                await getAdapters(setData);
                break;
            case 'day-cap':
                await getCables(setData);
                break;
            case 'usb-dock':
                await getDocks(setData);
                break;
            case 'o-cung':
                await getStorages(setData);
                break;
        }
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
