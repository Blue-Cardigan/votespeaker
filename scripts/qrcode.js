const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Define the output directory and file path
const outputDir = path.join(__dirname, '..', 'public');
const outputFile = path.join(outputDir, 'votespeaker-qr.png');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Enhanced options for QR code generation
const options = {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 1.0,  // Increased quality for sharper edges
    margin: 2,     // Reduced margin for a more modern look
    width: 1000,   // Larger size for better scaling
    color: {
        dark: '#a1252e',    // Brand red
        light: '#e9f2ef'    // Updated to match site's background color
    },
    rendererOpts: {
        quality: 1.0,
        // Create smooth, anti-aliased edges
        deflateLevel: 9,
        deflateStrategy: 3,
        filterType: 4
    }
};

// Function to generate QR code with rounded corners
async function generateStylizedQRCode() {
    try {
        // Generate the base QR code
        await QRCode.toFile(outputFile, 'https://votespeaker.civita.co.uk', options);
        
        console.log(`Base QR code generated at: ${outputFile}`);
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}

// Generate the enhanced QR code
generateStylizedQRCode(); 