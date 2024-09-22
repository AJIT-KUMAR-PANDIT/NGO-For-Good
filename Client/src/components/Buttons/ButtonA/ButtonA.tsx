import React from 'react';

interface ButtonAProps {
    buttonName: string;
    href: string;
}

const ButtonA: React.FC<ButtonAProps> = ({ buttonName, href }) => {
    return (

        <a
            href={href}
            className="relative inline-block px-8 py-2 text-2xl font-bold text-green-800 transition-all duration-75 ease-out bg-gradient-to-b from-green-300 via-green-400 to-[#7fbb98] border-t border-b border-green-400  shadow-[inset_0_-2px_0_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(0,0,0,0.2)] hover:bg-gradient-to-b hover:from-green-400 hover:via-green-500 hover:to-[#87c1a1] active:text-green-300 active:top-[6px] active:shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(0,0,0,0.2),0_0_4px_white] active:before:top-0 active:before:shadow-[0_3px_3px_rgba(0,0,0,0.7),0_3px_9px_rgba(0,0,0,0.2)]"
        >
            {buttonName}
            <span
                className="absolute inset-x-0 bottom-[6px] h-[65px] bg-gradient-to-t from-[#5b9070] via-[#65897e] to-[#7fbb98]  shadow-[0_1px_0_2px_rgba(0,0,0,0.3),0_5px_2.4px_rgba(0,0,0,0.5),0_10.8px_9px_rgba(0,0,0,0.2)] transition-all duration-[0.078s] ease-out"
            ></span>
        </a>
    );
};

export default ButtonA;
