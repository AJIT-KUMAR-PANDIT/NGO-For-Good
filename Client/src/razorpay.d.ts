// src/razorpay.d.ts
declare class Razorpay {
    constructor(options: any);
    open(): void;
  }
  
  interface Window {
    Razorpay: typeof Razorpay;
  }
  