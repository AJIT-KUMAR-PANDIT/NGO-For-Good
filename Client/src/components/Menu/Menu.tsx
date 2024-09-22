import React, { useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import InstagramButton from '../Buttons/InstagramButton/InstagramButton';
import FacebookButton from '../Buttons/FacebookButton/FacebookButton';

interface MenuProps {
    open: boolean;
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
    const menuRef = useRef<HTMLIonMenuElement>(null);
    const menuWrapperRef = useRef<HTMLDivElement>(null); // New ref for the menu wrapper

    useEffect(() => {
        if (menuRef.current) {
            if (open) {
                menuRef.current.open();
            } else {
                menuRef.current.close();
            }
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target as Node)) {
                handleCloseMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCloseMenu = () => {
        if (menuRef.current) {
            menuRef.current.close();
        }
        onClose(); // Notify parent component
    };

    return (
        <IonMenu ref={menuRef} side="start" contentId="main" type="overlay">
            <div ref={menuWrapperRef} className='bg-white w-full h-[100vh]'>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            <div className='flex justify-evenly font-extrabold' style={{ height: 'calc(100% - 58px)' }}>
                                <div className='text-[1rem]'>Mission Awareness NGO</div>
                                <div onClick={handleCloseMenu}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className='menu-border-radius bg-[cornsilk] h-[100%] w-full flex flex-col text-gray-800 items-center'>
                        <br />
                        <div className='menu-button-container'>
                            <a href='/home' className='menu-button'>Home</a>
                            <a href='/about' className='menu-button'>About</a>
                            <a href='/contact' className='menu-button'>Contact</a>
                            <a href='/donate' className='menu-button'>Donate</a>
                            <a href='/gallery' className='menu-button'>Gallery</a>
                            <a href='/verify' className='menu-button'>Verify Certificate</a>
                        </div>
                        <br />
                        <FacebookButton />
                        <InstagramButton />
                    </div>
                </IonContent>
            </div>
        </IonMenu>
    );
};

export default Menu;
