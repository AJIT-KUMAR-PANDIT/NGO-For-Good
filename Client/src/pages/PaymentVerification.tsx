import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QrScanner from 'qr-scanner';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonCard, IonCardContent, IonText, IonLabel, IonItem, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import { InputCustomEvent } from '@ionic/core';
import Footer from '../components/Footer/Footer';

// Define the type for the API response
interface VerifyPaymentResponse {
    status: string;
    message: string;
}

const PaymentVerification: React.FC = () => {
    const [paymentId, setPaymentId] = useState<string>(''); // Only use paymentId
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [showQrScanner, setShowQrScanner] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Update the event handler to handle InputCustomEvent
    const handlePaymentIdChange = (event: InputCustomEvent) => {
        setPaymentId(event.detail.value ?? '');
    };

    const handleVerifyPayment = async () => {
        if (!paymentId) {
            setToastMessage('Please enter Payment ID');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post<VerifyPaymentResponse>(`${import.meta.env.VITE_API_URL}/verify-payment`, { paymentId });
            setVerificationResult(response.data.message);
            setToastMessage(response.data.message);
            setShowToast(true);
        } catch (error) {
            console.error('Error Verifying Payment:', error);
            setVerificationResult('Error Verifying Payment');
            setToastMessage('Error Verifying Payment');
            setShowToast(true);
        }
    };

    const handleQrCodeScan = (result: string) => {
        setPaymentId(result);
        handleVerifyPayment();
    };

    const toggleQrScanner = () => {
        setShowQrScanner(!showQrScanner);
    };

    useEffect(() => {
        if (showQrScanner && videoRef.current) {
            const qrScanner = new QrScanner(videoRef.current, handleQrCodeScan);
            qrScanner.start();

            return () => {
                qrScanner.stop();
            };
        }
    }, [showQrScanner, videoRef.current]);

    const getPageStyle = () => {
        if (verificationResult) {
            return verificationResult.toLowerCase().includes('valid')
                ? { backgroundColor: 'green', color: 'white' }
                : { backgroundColor: 'red', color: 'white' };
        }
        return {};
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Payment Verification</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" style={getPageStyle()}>
                <IonGrid>
                    <IonRow className="flex justify-center items-center">
                        <IonCol size-md="8" size-xs="12">
                            <IonItem>
                                <IonLabel position="floating">Payment ID</IonLabel>
                                <IonInput
                                    type="text"
                                    value={paymentId}
                                    onIonInput={handlePaymentIdChange}
                                />
                            </IonItem>
                            <IonButton expand="full" onClick={handleVerifyPayment} className="ion-margin-top">
                                Verify Payment
                            </IonButton>
                            <IonButton expand="full" onClick={toggleQrScanner} className="ion-margin-top">
                                {showQrScanner ? 'Hide QR Scanner' : 'Show QR Scanner'}
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {verificationResult && (
                                <IonCard className="ion-margin-top" style={getPageStyle()}>
                                    <IonCardContent>
                                        <IonText>
                                            <h2>{verificationResult}</h2>
                                        </IonText>
                                    </IonCardContent>
                                </IonCard>
                            )}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {showQrScanner && (
                                <IonCard className="ion-margin-top">
                                    <IonCardContent>
                                        <IonText color="primary">
                                            <h2>Scan QR Code:</h2>
                                        </IonText>
                                        <video ref={videoRef} className="ion-margin-top" style={{ width: '100%', height: '300px', border: '1px solid #ccc' }} />
                                    </IonCardContent>
                                </IonCard>
                            )}
                        </IonCol>
                    </IonRow>
                    <IonToast
                        isOpen={showToast}
                        message={toastMessage}
                        duration={2000}
                        onDidDismiss={() => setShowToast(false)}
                    />
                </IonGrid>
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default PaymentVerification;
