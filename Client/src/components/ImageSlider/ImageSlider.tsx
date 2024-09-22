import { image } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/assets/slider/slider.jpg',
            title: 'Featured on News',
            description: 'कीनन स्टेडियम में धनबाद व जमशेदपुर के बीच मैच से पूर्व टॉस करती जेपीएस की प्राचार्या नमिता अग्रवाल.',
        },
        {
            image: '/assets/slider/slider1.jpg',
            title: 'Education for All',
            description: 'We provide educational resources to underprivileged children',
        },
        {
            image: '/assets/slider/slider3.jpg',
            title: 'Disaster Relief',
            description: 'We provide aid and support to those affected by natural disasters',
        },
        {
            image: '/assets/slider/slider4.jpg',
            title: 'xyz ',
            description: 'jkdhk kjsdhjk kjhsdkj kjshdkj',
        }
    ];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="h-screen-minus-70 w-full relative md:h-screen">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-4 text-white bg-gray-800 bg-opacity-50">
                        <h2 className="text-3xl font-bold">{slide.title}</h2>
                        <p className="text-lg">{slide.description}</p>
                    </div>
                </div>
            ))}
            <button
                className="absolute top-1/2 left-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                onClick={handlePrevSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                className="absolute top-1/2 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                onClick={handleNextSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ImageSlider;
