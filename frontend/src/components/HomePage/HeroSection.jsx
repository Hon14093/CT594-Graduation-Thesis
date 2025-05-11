import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

export default function HeroSection() {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-mistGray">
            <div className="container px-4 md:px-6 max-w-[1280px] mx-auto">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center text-left">
                    <div className="space-y-4">
                        <Badge className="bg-techBlue hover:bg-techBlue/80 text-white">New Arrivals</Badge>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                            Cutting-Edge Technology at Your Fingertips
                        </h1>
                        <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover our premium selection of laptops and tech equipment designed for professionals, gamers, and
                            everyday users.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" className="bg-crimson hover:bg-crimson/90 transition-transform hover:scale-105 text-white">
                                Shop Now
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-techBlue text-techBlue hover:bg-techBlue/10 transition-colors"
                            >
                                View Deals
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="https://placehold.co/800x500"
                            alt="Latest laptop models displayed on a modern desk setup"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
