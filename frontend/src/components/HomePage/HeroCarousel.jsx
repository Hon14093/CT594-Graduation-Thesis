import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useCallback } from 'react'

const images = [
    "https://thumbs.dreamstime.com/b/man-analysis-business-accounting-laptop-45719380.jpg",
    "https://cdn.create.vista.com/api/media/medium/250531884/stock-photo-laptop-blank-screen-stationery-levitating-air-workplace-isolated-beige?token=",
    "https://images.pexels.com/photos/593324/pexels-photo-593324.jpeg",
    "https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg",
    
]

export default function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    // Auto play
    const autoplay = useCallback(() => {
        if (!emblaApi) return

        const timer = setInterval(() => {
            emblaApi.scrollNext()
        }, 3000)
        return () => clearInterval(timer)
    }, [emblaApi])

    useEffect(() => {
        const clear = autoplay()
        return clear
    }, [autoplay])

    return (
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex w-full h-full">
                {images.map((src, index) => (
                    <div className="min-w-full h-full" key={index}>
                        <img 
                            src={src} alt={`Slide ${index}`} 
                            className=' inset-0 w-full h-full object-cover'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
