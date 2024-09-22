import React from 'react';
import Slider from 'react-slick';

const FeaturedNewsCarousel: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    const logos = [
        { id: 1, src: '/assets/prabhat-khabar-logo.jpg', alt: 'Logo 1' },
        { id: 2, src: '/assets/prabhat-khabar-logo.jpg', alt: 'Logo 2' },
        { id: 3, src: '/assets/prabhat-khabar-logo.jpg', alt: 'Logo 3' },
        { id: 4, src: '/assets/prabhat-khabar-logo.jpg', alt: 'Logo 4' },
        { id: 5, src: '/assets/prabhat-khabar-logo.jpg', alt: 'Logo 5' },
        { id: 6, src: '/assets/prabhat-khabar-logo.jpg', alt: 'Logo 6' },
    ];

    return (
        <>
            <div>
                <Slider {...settings}>
                    {logos.map((logo) => (
                        <div key={logo.id}>
                            <img src={logo.src} alt={logo.alt} style={{ width: '100%', padding: '10px' }} />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default FeaturedNewsCarousel;
