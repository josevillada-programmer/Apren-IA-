const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use 'true' if your SMTP server uses SSL/TLS, 'false' for STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const sendVerificationEmail = async (toEmail, verificationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Verificación de cuenta AprendIA',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Verificación de Cuenta</h2>
                <p>Gracias por registrarte en AprendIA. Para activar tu cuenta, por favor usa el siguiente código de verificación:</p>
                <p style="font-size: 24px; font-weight: bold; color: #0056b3;">${verificationCode}</p>
                <p>Si no solicitaste esta verificación, puedes ignorar este correo.</p>
                <p>Saludos,<br>El equipo de AprendIA</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully to ' + toEmail);
    } catch (error) {
        console.error('Error sending verification email to ' + toEmail + ':', error);
        throw new Error('Failed to send verification email.');
    }
};

module.exports = { sendVerificationEmail };
