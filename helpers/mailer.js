const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.Email,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// verify connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });

module.exports = { transporter }