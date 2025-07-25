import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductsDisplay from '@/components/ShopPage/ProductsDisplay';
import axios from 'axios';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
                axios.get(`http://localhost:5000/manage/product/search`, {
                params: { q: query }
            })
            .then(res => {
                console.log(res.data);
                setResults(res.data);
            })
            .catch(err => {
                console.error('Search error:', err);
            });
        }
    }, [query]);

    return (
        <div>
            <Header darkBG={false} />
            <div className="px-6 py-10">
                <h1 className="text-2xl font-semibold mb-6">Kết quả tìm kiếm cho “{query}”</h1>
                <ProductsDisplay data={results} slug="search" />
            </div>
            <Footer />
        </div>
    );
}
