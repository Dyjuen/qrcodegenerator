// Check for saved theme preference or use system preference
 if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Toggle theme function
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Generate QR Code
function generateQR() {
    const url = document.getElementById('url').value.trim();
    const qrCodeDiv = document.getElementById('qrcode');
    
    if (!url) {
        alert('Please enter a URL or text');
        return;
    }

    // Clear previous QR code
    qrCodeDiv.innerHTML = '';
    
    // Generate new QR code
    const qr = new QRCode(qrCodeDiv, {
        text: url,
        width: 200,
        height: 200,
        colorDark: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
        colorLight: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download button with smooth transition
    const downloadContainer = document.getElementById('download-container');
    downloadContainer.classList.remove('opacity-0');
    downloadContainer.classList.add('opacity-100');
}

// Save QR Code as PNG
function saveQRCode() {
    const qrCodeImg = document.querySelector('#qrcode img');
    if (!qrCodeImg) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = qrCodeImg.width;
    canvas.height = qrCodeImg.height;
    
    // Draw white background
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw QR code
    ctx.drawImage(qrCodeImg, 0, 0);
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Generate QR code on Enter key press
document.getElementById('url').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateQR();
    }
});