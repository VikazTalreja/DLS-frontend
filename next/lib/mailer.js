import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.APP_FROM_EMAIL || 'no-reply@example.com';

let transporter;
if (host && user && pass) {
  transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

export async function sendOTPEmail(to, code) {
  if (!transporter) {
    console.warn('SMTP not configured; printing OTP to console.');
    console.log(`[DEV OTP] ${to}: ${code}`);
    return;
  }
  const subject = 'Your DLS OTP Code';
  const html = `
    <p>Your OTP code is:</p>
    <h2 style="letter-spacing:4px;">${code}</h2>
    <p>This code will expire in 10 minutes.</p>
  `;
  await transporter.sendMail({ from, to, subject, html });
}
