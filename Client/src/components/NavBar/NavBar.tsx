import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonMenu, IonList, IonItem, IonIcon, IonLabel, IonImg } from '@ionic/react';
import { menuOutline, homeOutline, informationCircleOutline, peopleOutline, callOutline } from 'ionicons/icons';

const NavBar: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <div className='bg-[#ff7831]'>
                        <div className='navbar-border-radius w-[100vw] h-[59px] bg-white flex pl-8 justify-evenly items-center text-gray-800 font-extrabold'>
                            <div className='text-[1rem] flex justify-center items-center gap-4'><IonImg src='./logo.png' class='w-[78px] h-[78px]' /> <span className='text-green-800 font-extrabold -left-2'>NGO</span>For Good</div>
                            <div className='hidden md:flex justify-evenly space-x-8'>
                                <a href='/home'>
                                    <div>Home</div>
                                </a>
                                <a href='/about'>
                                    <div>About</div>
                                </a>
                                <a href='/contact'>
                                    <div>Contact</div>
                                </a>
                                <a href='/donate'>
                                    <div>Donate</div>
                                </a>
                                <a href='/gallery'>
                                    <div>Gallery</div>
                                </a>
                                <a href='/verify'>
                                    <div>Verify Certficate</div>
                                </a>
                            </div>
                        </div>
                    </div >
                </IonToolbar >
            </IonHeader >
        </>
    );
};

export default NavBar;
