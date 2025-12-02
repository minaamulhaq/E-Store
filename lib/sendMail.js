import nodemailer from 'nodemailer';
export const sendMail = async (subject, receiver, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.NODE_ENV === 'production',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: `Developer Inaam <${process.env.SMTP_USER}>`,
        to: receiver,
        subject: subject,
        html: body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};