'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
    { imgSrc: '/assets/images/hero-1.svg', alt: "macbook" },
    { imgSrc: '/assets/images/hero-2.svg', alt: "chair" },
    { imgSrc: '/assets/images/hero-3.svg', alt: "chair" },
    { imgSrc: '/assets/images/hero-4.svg', alt: "chair" },
    { imgSrc: '/assets/images/hero-5.svg', alt: "chair" },
]

export const HeroCarousel = () => {
    return (
        <div className="relative hidden md:flex sm:px-10 py-5 sm:pt-8 pb-5 md:max-w-[400px] md:max-h-[450px] mx:max-w-[400px] mx:max-h-[580px] w-full bg-[#F2F4F7] rounded-[30px] sm:mx-auto">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                showArrows={false}
                showStatus={false}
                stopOnHover
                emulateTouch>
                {heroImages.map(image => {
                    return <Image className="object-contain max-w-[350px]" key={image.alt} src={image.imgSrc} alt={image.alt} width={480} height={480} />
                })}
            </Carousel>
        </div>
    );
};

export default HeroCarousel