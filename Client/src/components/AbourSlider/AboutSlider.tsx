import { useState, useEffect } from 'react';

interface SliderItem {
    id: number;
    title: string;
    image: string;
}

const AboutSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [sliderItems, setSliderItems] = useState<SliderItem[]>([
        { id: 1, title: 'About Us', image: 'https://scontent.fpat2-5.fna.fbcdn.net/v/t39.30808-6/286737163_554998392840025_1597369119362805777_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=E-bQDfteF3cQ7kNvgHe7uDB&_nc_ht=scontent.fpat2-5.fna&_nc_gid=AyjCSV958Tu__pZeu5bTk0r&oh=00_AYA38C2KXJ3WvPZFoICicX3M_a6VaanaXSoMbu9KNo2OZA&oe=66DE00C4' },
        { id: 2, title: 'About Us', image: 'https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-6/354466730_584282660484921_78697518750411868_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=O8aiiTQrC90Q7kNvgG1tRfZ&_nc_ht=scontent.fpat2-3.fna&oh=00_AYDjUeiAFKvLfoB-36wIhoiDzdGYDK2zfixMu5OwD_cX0w&oe=66DE0F28' },
        { id: 3, title: 'About Us', image: 'https://scontent.fpat2-4.fna.fbcdn.net/v/t39.30808-6/455252246_810319867881198_2282597022489910094_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2kzDvWQjgfYQ7kNvgHUtpbj&_nc_ht=scontent.fpat2-4.fna&oh=00_AYCR3jAVhFMV1GHYOxE36eTXTn4lH06Po2QHBAFYZRuyMQ&oe=66DDF07A' },
    ]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveSlide((prevActiveSlide) => {
                if (prevActiveSlide === sliderItems.length - 1) {
                    return 0;
                }
                return prevActiveSlide + 1;
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [sliderItems.length]);

    return (
        <div className="w-full h-[348px] relative overflow-hidden">
            {sliderItems.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute w-full h-full transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <h2 className="text-4xl text-white font-extrabold">{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutSlider;
