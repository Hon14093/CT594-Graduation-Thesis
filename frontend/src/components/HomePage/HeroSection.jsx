import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-mistGray mt-10">
            <div className="container px-4 md:px-6 max-w-[1280px] mx-auto">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center text-left">
                    <div className="space-y-4">
                        <Badge className="bg-techBlue hover:bg-techBlue/80 text-white">Sản phẩm mới</Badge>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                            {/* Thiết bị công nghệ hiện đại Khơi nguồn hiệu xuất vượt trội */}
                            Đồng hành cùng bạn trên mọi hành trình công nghệ
                        </h1>
                        <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Từ laptop đến phụ kiện, chúng tôi mang đến những giải pháp phù hợp nhất với nhu cầu hàng ngày của bạn.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" className="bg-crimson hover:bg-crimson/90 transition-transform hover:scale-105 text-white">
                                <Link to='/shop/laptop' className='flex'>
                                    Xem laptop
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-techBlue text-techBlue hover:bg-techBlue/10 transition-colors"
                            >
                                Kiểm tra tương thích
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="https://thumbs.dreamstime.com/b/man-analysis-business-accounting-laptop-45719380.jpg"
                            alt="Latest laptop models displayed on a modern desk setup"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
