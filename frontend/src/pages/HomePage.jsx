import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/HomePage/HeroSection'
import FeaturedProducts from '@/components/HomePage/FeaturedProducts'
import BenefitsSection from '@/components/HomePage/BenefitsSection'

export default function HomePage() {
    return (
        <div className='w-full'>
            <Header />

            <HeroSection />

            <FeaturedProducts />

            <BenefitsSection />

            <Footer />
        </div>

    )
}
