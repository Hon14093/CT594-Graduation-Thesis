import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Bread_Crumb from '@/components/layout/Bread_Crumb';

export default function ProductDetailsPage() {
    const location = useLocation();
    const product = location.state?.product;
    // const [product, setProduct] = useState(location.state?.product || null);
    const { slug } = useParams();
    const [qty, setQty] = useState(1);

    const bread = [
        { link: '/', label: 'Trang chủ'},
        { link: `/shop/${slug}`, label: `${slug}`},
        { link: '#', label: `${product.laptop_name}`},
    ]

    useEffect(() => {
        console.log('Hello:',product)
    }, [])

    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found {slug}</p>;
    }

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

    return (
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <section className='min-h-[70vh] mt-5 grid grid-cols-2 max-w-[1280px] mx-auto'>
                <article>
                    <div className='w-full border border-techBlue rounded-xl'>
                        <img src={product.product.image_url[0]} alt="" className='h-[50vh] mx-auto' />
                    </div>
                </article>

                <article>
                    {product.laptop_id} <br />
                    {product.laptop_name}
                </article>
            </section>

            <Footer />
        </div>
    )
}
