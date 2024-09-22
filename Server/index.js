require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const qr = require('qr-image');
const { Buffer } = require('buffer');
const path = require('path');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not provided

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Add this line to load the custom font
const headerFontPath = path.join(__dirname, 'assets', 'times-new-roman-bold.ttf'); // Ensure this path points to your .ttf file

// Endpoint to handle successful payments and generate the certificate
app.post('/payment-success', async (req, res) => {
    const { paymentId, name, email, amount } = req.body;

    if (!paymentId || !name || !email || !amount) {
        return res.status(400).send('Missing required fields');
    }

    try {
        // Generate QR code
        const qrCodeURL = `${paymentId}`;
        const qrImage = qr.imageSync(qrCodeURL, { type: 'png' });

        // Create PDF in landscape mode
        const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(buffers);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Donation Certificate',
                text: `Dear ${name},\n\nThank you for your generous donation of ${amount} INR. Please find your donation certificate attached.`,
                attachments: [
                    {
                        filename: 'certificate.pdf',
                        content: pdfData,
                        encoding: 'base64',
                    },
                ],
            };

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).send('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email: ' + error.toString());
            }
        });

        // Add background image to PDF
        const backgroundPath = path.join(__dirname, 'assets', 'certificate-background.png');
        doc.image(backgroundPath, 0, 0, { width: doc.page.width, height: doc.page.height });

        // Add NGO logo to PDF
        doc.moveDown();
        doc.moveDown();
        const logoPath = path.join(__dirname, 'assets', 'logo.png');
        doc.image(logoPath, { fit: [100, 100], align: 'center' });

        // Use the custom font for the certificate header
        doc.font(headerFontPath).fontSize(30).fillColor('#000').text('Donation Certificate', { align: 'center' });

        doc.moveDown();
        doc.font('Helvetica').fontSize(24).text(`This certificate is proudly presented to`, { align: 'center' });
        doc.moveDown();

        // Name in italic, uppercase, and color #ff7831
        doc.font('Helvetica-Oblique') // Set font to italic
            .fontSize(20)
            .fillColor('#ff7831')
            .text(name.toUpperCase(), { align: 'center' });

        doc.moveDown();
        doc.fillColor('#000').text(`In recognition of your generous donation of ${amount} INR.`, { align: 'center' });
        doc.moveDown();
        doc.text('Thank you for your support!', { align: 'center' });

        // Add QR code to PDF
        const qrX = (doc.page.width - 100) / 2;  // Calculate center position for the QR code
        doc.image(qrImage, qrX, doc.y, { fit: [100, 100] });

        // Add founder's signature to PDF
        const signaturePath = path.join(__dirname, 'assets', 'founder-signature.png');
        doc.image(signaturePath, doc.page.width - 221, doc.page.height - 120, { width: 150 });

        // Add the certificate generation date on the left side of the signature
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/ /g, ' '); // Format: 24 Aug 2024

        doc.fontSize(21).text(formattedDate, 74, doc.page.height - 100); // Position near the signature with additional space from the left

        // Finalize PDF
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF: ' + JSON.stringify(error));
    }
});

// Endpoint to handle payment verification
app.post('/verify-payment', async (req, res) => {
    const { paymentId } = req.body;

    if (!paymentId) {
        return res.status(400).json({ status: 'failure', message: 'Payment ID is required' });
    }

    try {
        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(paymentId);

        // Check if the payment is captured
        if (payment && payment.status === 'authorized') {
            res.status(200).json({ status: 'success', message: 'Certificate is Valid' });
        } else {
            res.status(400).json({ status: 'failure', message: 'Payment is not captured or invalid' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ status: 'failure', message: 'Error verifying payment' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
