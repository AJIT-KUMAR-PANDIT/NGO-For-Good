import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IonImg } from '@ionic/react';

interface DonationFormProps {
    onSuccess?: () => void;
}

// Define validation schema with Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    amount: Yup.number().positive('Amount must be greater than zero').required('Donation amount is required'),
});

const DonationForm: React.FC<DonationFormProps> = ({ onSuccess }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number>(3);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const razorpayScriptLoaded = useRef<boolean>(false);

    // Load Razorpay script
    useEffect(() => {
        if (razorpayScriptLoaded.current) return; // Skip if already loaded

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            razorpayScriptLoaded.current = true;
        };
        script.onerror = () => {
            setError('Failed to load Razorpay script.');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Countdown logic
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (loading && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            clearInterval(intervalId!);
            setCountdown(3);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [loading, countdown]);

    const handlePayment = async (values: { name: string; email: string; phone: string; amount: number }) => {
        const { name, email, phone, amount } = values;
        const donationAmount = amount * 100; // Amount in paise

        setLoading(true);

        // Simulate a delay before the Razorpay script loads
        setTimeout(async () => {
            if (!razorpayScriptLoaded.current) {
                setError('Razorpay script not loaded.');
                setLoading(false);
                return;
            }

            const options: any = {
                key: import.meta.env.VITE_RAZORPAY_KEY, // Use environment variable
                amount: donationAmount.toString(),
                currency: 'INR',
                name: 'NGO For Good',
                description: 'Thank you for your support!',
                handler: async (response: any) => {
                    try {
                        // Send payment success details to the backend
                        await axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { // Use environment variable
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            name,
                            email,
                            amount,
                        });
                        setDonationSuccess(true);
                        setShowModal(true); // Show the success modal
                        setLoading(false);
                        if (onSuccess) {
                            onSuccess();
                        }
                    } catch (error) {
                        setError('Failed to send donation certificate. Please contact support.');
                        setLoading(false);
                    }
                },
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        }, 1000); // Simulated delay
    };

    return (
        <div className="relative">
            <div className="donation-form max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
                <Formik
                    initialValues={{ name: '', email: '', phone: '', amount: 0 }}
                    validationSchema={validationSchema}
                    onSubmit={handlePayment}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="space-y-4">
                            {/* Form Fields */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <Field
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Donation Amount</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('amount', 100);
                                            setSelectedAmount(100);
                                        }}
                                        className={`py-1 px-4 border border-gray-300 rounded-md ${selectedAmount === 100 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-indigo-700 hover:text-black`}
                                    >
                                        ₹100
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('amount', 500);
                                            setSelectedAmount(500);
                                        }}
                                        className={`py-1 px-4 border border-gray-300 rounded-md ${selectedAmount === 500 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-indigo-700 hover:text-black`}
                                    >
                                        ₹500
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('amount', 2000);
                                            setSelectedAmount(2000);
                                        }}
                                        className={`py-1 px-4 border border-gray-300 rounded-md ${selectedAmount === 2000 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-indigo-700 hover:text-black`}
                                    >
                                        ₹2000
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedAmount(null); // Reset the amount selection
                                        }}
                                        className={`py-1 px-4 border border-gray-300 rounded-md ${selectedAmount === null ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-indigo-700 hover:text-black`}
                                    >
                                        Custom Amount
                                    </button>
                                </div>
                                <Field
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    placeholder="Enter custom amount"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? `Processing in ${countdown}s...` : 'Donate'}
                            </button>
                            <IonImg src='./assets/powered-by-razorpay.png' />
                        </Form>
                    )}
                </Formik>
                {donationSuccess && !showModal && <p>Thank you for your donation! A receipt has been sent to your email.</p>}
                {error && <p className="error text-red-500">{error}</p>}
            </div>

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="relative p-8 bg-white rounded-lg shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
                        </div>
                        <p className="text-center text-lg font-semibold">Processing... Please wait</p>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="relative p-8 bg-white rounded-lg shadow-lg">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={() => setShowModal(false)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <p className="text-center text-lg font-semibold">Thank you for your donation! A receipt has been sent to your email.</p>
                        <button
                            type="button"
                            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationForm;
