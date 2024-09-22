// src/react-qr-scanner.d.ts
declare module 'react-qr-scanner' {
    import * as React from 'react';

    interface QrScannerProps {
        onScan: (data: string | null) => void;
        onError: (error: Error) => void;
        facingMode?: 'user' | 'environment' | { exact: 'user' | 'environment' };
        style?: React.CSSProperties;
        className?: string;
    }

    export default class QrScanner extends React.Component<QrScannerProps> {}
}
