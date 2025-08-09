
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendStatusEmail(to, complaint) {
  const html = `<p>Your complaint <strong>${complaint.title}</strong> is now <strong>${complaint.status}</strong>.</p>
  <p>Notes: ${complaint.adminNotes || 'None'}</p>`;
  await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject: `Update: ${complaint.title} is ${complaint.status}`,
    html
  });
}

module.exports = { sendStatusEmail };
