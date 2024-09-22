import React from 'react';
import { IonContent, IonPage, IonText, IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';

const Footer: React.FC = () => {
    return (
        <IonGrid className="w-[100vw] mx-auto text-white py-10 bg-gray-900">
            <IonRow className="text-center">
                <IonCol size="12">
                    <h3 className="text-3xl mb-3">Comming Soon NGO For Good App</h3>
                    <IonText>Stay Updated. All day, every day.</IonText>
                </IonCol>
            </IonRow>
            <IonRow className="flex justify-center my-10">
                <IonCol size="auto" className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                    <IonImg src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                    <div className="text-left ml-3">
                        <IonText className="text-xs text-gray-200">Download on</IonText>
                        <IonText className="text-sm md:text-base"> Google Play Store</IonText>
                    </div>
                </IonCol>
                {/* <IonCol size="auto" className="flex items-center border rounded-lg px-4 py-2 w-44 mx-2">
                            <IonImg src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                            <div className="text-left ml-3">
                                <IonText className="text-xs text-gray-200">Download on</IonText>
                                <IonText className="text-sm md:text-base">Apple Store</IonText>
                            </div>
                        </IonCol> */}
            </IonRow>
            <IonRow className="mt-28 w-full flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                <IonCol className="order-2 md:order-1 mt-8 md:mt-0">
                    <IonText>&copy; Beautiful Footer, 2021.</IonText>
                </IonCol>
                <IonCol className="order-1 md:order-2">
                    <IonText className="px-2">About us</IonText>
                    <IonText className="px-2 border-l">Contact us</IonText>
                    <IonText className="px-2 border-l">Privacy Policy</IonText>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Footer;
