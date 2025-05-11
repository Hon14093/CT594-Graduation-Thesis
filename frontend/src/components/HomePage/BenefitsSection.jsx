import React from 'react'
import { Truck } from 'lucide-react'
import { Shield } from 'lucide-react'
import { Headphones } from 'lucide-react'

export default function BenefitsSection() {
    return (
        <section className="py-12 bg-mistGray">
            <div className="container px-4 md:px-6 max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="p-3 rounded-full bg-[#1E56A0]/10">
                            <Truck className="h-6 w-6 text-techBlue" />
                        </div>
                        <h3 className="font-semibold">Free Shipping</h3>
                        <p className="text-gray-600 text-sm">On all orders over $99</p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="p-3 rounded-full bg-[#1E56A0]/10">
                            <Shield className="h-6 w-6 text-techBlue" />
                        </div>
                        <h3 className="font-semibold">2-Year Warranty</h3>
                        <p className="text-gray-600 text-sm">On all laptops and desktops</p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="p-3 rounded-full bg-[#1E56A0]/10">
                            <Headphones className="h-6 w-6 text-techBlue" />
                        </div>
                        <h3 className="font-semibold">24/7 Support</h3>
                        <p className="text-gray-600 text-sm">Expert assistance when you need it</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
