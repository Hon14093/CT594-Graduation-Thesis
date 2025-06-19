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
import logoWhite from '../../assets/Logo_white.png'
import logoBlue from '../../assets/Logo.png'
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';

function Header({ darkBG=true }) {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isTop, setIsTop] = useState(true);
    const categories = [
        { "cat_name": "Laptop", "slug": "laptop" },
        { "cat_name": "USB dock", "slug": "usb-dock" },
        { "cat_name": "Bộ chuyển đổi", "slug": "bo-chuyen-doi" }
    ];
    
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
                            <button className="px-4 py-2 rounded">Danh mục</button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="z-[100]">
                            {categories.map((category) => (
                                <DropdownMenuItem key={category.slug}>
                                    <Link to={`/shop/${category.slug}`}>{category.cat_name}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>

                {/* navigation section */}
                {/* <section className='absolute left-1/2 transform -translate-x-1/2 font-bold'>
                    <ul className='flex gap-8'>
                        <li className='navList group'>
                            <Link to="/shop">
                                <a className='navAnchor'>Laptop</a>
                            </Link>
                        </li>
                        <li className='navList group'>
                            <Link to="/about">
                                <a className='navAnchor'>RAM</a>
                            </Link>
                        </li>
                        <li className='navList group'>
                            <Link to="/contact">
                            <a className='navAnchor'>Liên Hệ</a>
                            </Link>
                        </li>
                        <li className='navList group'>
                            <a className='navAnchor' onClick={() => console.log(isLoggedIn)}>FAQ</a>
                        </li>
                    </ul>
                </section> */}

                {/* account and cart section */}
                <section className='flex items-center gap-4 ml-auto'>
                    <button className='hover:underline'>
                        <Link to='/login'>
                            Đăng nhập
                        </Link>
                    </button>
                    
                    <Button 
                        // onClick={toggleCart}
                        className='group top-right-button p-2 bg-white rounded-full flex gap-1 items-center text-techBlue hover:bg-white/90'
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <p className=" border-[1.5px] rounded-full size-6 border-darkOlive group-hover:border-ivory" id='cart-button'>
                            0
                        </p>
                    </Button>
                </section>   

            </div>
        </header>
            
        
    )
}

export default Header