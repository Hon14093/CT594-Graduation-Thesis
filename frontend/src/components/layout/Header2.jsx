import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import logo from '../../assets/Logo.png'

export default function Header() {
    return (
        <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-[1280px] mx-auto">
                <Link to='/' className="flex items-center gap-2 font-bold text-xl text-techBlue">
                    <img src={logo} className='h-6' alt="" />
                </Link>

                <nav className="hidden md:flex gap-6">
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-techBlue transition-colors">
                        Laptops
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-techBlue transition-colors">
                        Accessories
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-techBlue transition-colors">
                        Monitors
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-techBlue transition-colors">
                        Components
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-techBlue transition-colors">
                        Deals
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        to='/login'
                        className="text-sm font-medium text-gray-700 hover:text-techBlue transition-colors md:block hidden"
                    >
                        Sign In
                    </Link>
                    
                    <Button size="sm" className="rounded-full text-white bg-techBlue hover:bg-techBlue/90 transition-colors">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Cart (0)
                    </Button>
                </div>
            </div>
        </header>
    )
}
