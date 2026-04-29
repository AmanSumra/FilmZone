// src/utils/mailer.js
const nodemailer = require("nodemailer");

// Load env vars immediately
require("dotenv").config();

const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, FROM_EMAIL } =
  process.env;

// Debug log (remove in production)
console.log("📧 Mailer Config:");
console.log("  Host:", SMTP_HOST);
console.log("  Port:", SMTP_PORT);
console.log("  User:", SMTP_USER);
console.log("  From:", FROM_EMAIL);
console.log("  Pass exists:", SMTP_PASS ? "Yes" : "No");

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 465,
  secure: String(SMTP_SECURE) === "true", // true for 465, false for 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// optional: boot time verify (logs ma success/error dekhay)
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP ready to send mails");
  } catch (err) {
    console.error("❌ SMTP verify failed:", err.message);
  }
};

/** Basic HTML template */
const contactHtml = ({ Name, Email, Message }) => `
  <div style="font-family:system-ui,Arial;line-height:1.5">
    <h2>New Contact Message</h2>
    <p><b>Name:</b> ${Name || "-"}</p>
    <p><b>Email:</b> ${Email || "-"}</p>
    <p><b>Message:</b><br/>${(Message || "").replace(/\n/g, "<br/>")}</p>
    <hr/>
    <small>Sent from your website contact form.</small>
  </div>
`;

/** Ticket Booking Confirmation Email Template */
const ticketBookingHtml = ({ movieName, movieScreen, bookedSeat, movieDate, movieTime, totalPrice, orderId, userName }) => `
  <div style="font-family:system-ui,Arial;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
    <div style="text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;border-radius:10px 10px 0 0;">
      <h1 style="color:white;margin:0;">🎬 Movie Ticket Booked!</h1>
    </div>
    <div style="padding:20px;background:#f9f9f9;">
      <p style="font-size:16px;">Hi <b>${userName || "Valued Customer"}</b>,</p>
      <p style="font-size:16px;">Your movie ticket has been successfully booked. Here are your booking details:</p>
      
      <div style="background:white;padding:15px;border-radius:8px;margin:15px 0;border-left:4px solid #667eea;">
        <h3 style="color:#333;margin-top:0;">🎟️ Booking Details</h3>
        <p><b>Movie:</b> ${movieName || "-"}</p>
        <p><b>Screen:</b> ${movieScreen || "-"}</p>
        <p><b>Seats:</b> <span style="color:#667eea;font-weight:bold;">${bookedSeat || "-"}</span></p>
        <p><b>Date:</b> ${movieDate ? new Date(movieDate).toLocaleDateString() : "-"}</p>
        <p><b>Time:</b> ${movieTime || "-"}</p>
        <p><b>Total Amount:</b> <span style="color:#28a745;font-weight:bold;">₹${totalPrice || "-"}</span></p>
        <p><b>Order ID:</b> <span style="color:#666;font-size:14px;">${orderId || "-"}</span></p>
      </div>
      
      <p style="font-size:14px;color:#666;">Please arrive at the theater 30 minutes before the show time. Don't forget to bring this confirmation email or your booking ID.</p>
      
      <div style="text-align:center;margin-top:20px;padding:15px;background:#e8f4f8;border-radius:8px;">
        <p style="margin:0;font-size:14px;color:#333;">Thank you for choosing us! 🍿</p>
        <p style="margin:5px 0 0 0;font-size:12px;color:#666;">Enjoy your movie!</p>
      </div>
    </div>
    <div style="text-align:center;padding:15px;background:#333;color:white;border-radius:0 0 10px 10px;">
      <p style="margin:0;font-size:12px;">© 2024 Movie Booking. All rights reserved.</p>
    </div>
  </div>
`;

/** Contact Us Auto-Response Email Template */
const contactResponseHtml = ({ Name }) => `
  <div style="font-family:system-ui,Arial;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
    <div style="text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;border-radius:10px 10px 0 0;">
      <h1 style="color:white;margin:0;">Thank You for Contacting Us!</h1>
    </div>
    <div style="padding:20px;background:#f9f9f9;">
      <p style="font-size:16px;">Hi <b>${Name || "Valued Customer"}</b>,</p>
      <p style="font-size:16px;">We have received your message and appreciate you reaching out to us.</p>
      
      <div style="background:white;padding:15px;border-radius:8px;margin:15px 0;border-left:4px solid #667eea;">
        <p style="margin:0;">Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
      </div>
      
      <p style="font-size:14px;color:#666;">If your inquiry is urgent, please feel free to call us at our support number.</p>
      
      <div style="text-align:center;margin-top:20px;padding:15px;background:#e8f4f8;border-radius:8px;">
        <p style="margin:0;font-size:14px;color:#333;">We appreciate your patience! 🙏</p>
        <p style="margin:5px 0 0 0;font-size:12px;color:#666;">Best regards,<br/>Movie Booking Team</p>
      </div>
    </div>
    <div style="text-align:center;padding:15px;background:#333;color:white;border-radius:0 0 10px 10px;">
      <p style="margin:0;font-size:12px;">© 2024 Movie Booking. All rights reserved.</p>
    </div>
  </div>
`;

module.exports = {
  transporter,
  verifyTransporter,
  contactHtml,
  ticketBookingHtml,
  contactResponseHtml,
};
