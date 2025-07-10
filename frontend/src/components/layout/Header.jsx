import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, CircleUserRound } from 'lucide-react'
import logoWhite from '../../assets/Logo_white.png'
import logoBlue from '../../assets/Logo.png'
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { getCategories, getBrands } from '@/hooks/product-api'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

function Header({ darkBG=true }) {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isTop, setIsTop] = useState(true);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const { isLoggedIn } = useAuth();
    const { getTotalQuantity } = useCart();
    const itemCounts = getTotalQuantity();

    useEffect(() => {
        getCategories(setCategories);
        getBrands(setBrands);
    }, [])
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
            if (scrollTop > lastScrollTop) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            if (window.scrollY === 0) {
                setIsTop(true);
            } else {
                setIsTop(false);
            }
    
            setLastScrollTop(scrollTop);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [lastScrollTop]);

    return (
        <header className={`
            ${scrollDirection === 'down' ? 'hiddenTrans' : 'visibleTrans'} 
            ${darkBG ? (isTop ? 'clearBG' : 'coloredBG') : 'coloredBG'}
            client-header 
            `
        }>
            <div className='flex gap-5 items-center p-4 font-bold max-w-[1280px] mx-auto'>
                {/* logo section */}
                <section>
                    <Link to="/">
                        <img src={logoWhite} className='w-36' />
                    </Link>
                </section> 

                <section >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="px-4 py-2 rounded hover:bg-white hover:text-techBlue">Danh mục</button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="z-[100]">
                            {categories.map((category) => (
                                <DropdownMenuItem key={category.slug}>
                                    <Link to={`/shop/${category.slug}`}>{category.category_name}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>

                <section >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="px-4 py-2 rounded hover:bg-white hover:text-techBlue">Thương hiệu</button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="z-[100]">
                            {brands.map((brand) => (
                                <DropdownMenuItem key={brand.slug}>
                                    <Link to={`/shop/${brand.slug}`}>{brand.brand_name}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>

                <section>
                    <Link to='/tool'>
                        <button className="px-4 py-2 rounded hover:bg-white hover:text-techBlue">Công cụ</button>
                    </Link>
                </section>
                
                {/* account and cart section */}
                <section className='flex items-center gap-4 ml-auto'>
                    <article className='flex items-center ml-auto'>
                        <button className='py-1  bg-white pl-3 rounded-l-3xl hover:cursor-pointer'>
                            <Search className="text-techBlue" size={24} />
                        </button>
                        <input 
                            type="text" 
                            className='bg-white text-techBlue pl-4 py-1 rounded-r-3xl w-64 focus:outline-none' 
                            placeholder='Tìm kiếm sản phẩm...'
                        />
                    </article>

                    {isLoggedIn ? (
                        <button className='hover:underline'>
                            <Link to='/personal'>
                                <CircleUserRound size={30} />
                            </Link>
                        </button>
                    ) : (
                        <button className='hover:underline'>
                            <Link to='/login'>
                                Đăng nhập
                            </Link>
                        </button>
                    )}
                    
                    <Button 
                        // onClick={toggleCart}
                        className='group top-right-button p-2 bg-white rounded-full text-techBlue hover:bg-white/90'
                    >
                        <Link to='/shopping-cart' className='flex gap-1 items-center'>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            <p className=" border-[1.5px] rounded-full size-6 border-darkOlive group-hover:border-ivory" id='cart-button'>
                                {itemCounts}
                            </p>
                        </Link>
                    </Button>
                </section>   
            </div>
        </header>
            
        
    )
}

export default Header