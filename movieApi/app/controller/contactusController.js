const { transporter, contactHtml, contactResponseHtml } = require("../utils/mailer.js");
const ContactUsModel = require("../models/contectus");

exports.ContactUs = async (req, res) => {
  const requestData = req.body;

  try {
    const contact = new ContactUsModel({
      name: requestData.Name,
      email: requestData.Email,
      number: requestData.Number,
      message: requestData.Message,
    });

    const result = await contact.save();
    console.log("📧 Sending contact notification to admin...");
    
    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"FilmZone" <${process.env.FROM_EMAIL}>`,
        to: process.env.TO_EMAIL,
        replyTo: requestData.Email,
        subject: `New Contact: ${requestData.Name} (${requestData.Email})`,
        text: `Name: ${requestData.Name}\nEmail: ${requestData.Email}\n\nMessage:\n${requestData.Message}`,
        html: contactHtml({
          Name: requestData.Name,
          Email: requestData.Email,
          Message: requestData.Message,
        }),
      });
      console.log("✅ Admin notification sent");
    } catch (adminErr) {
      console.error("❌ Failed to send admin notification:", adminErr.message);
    }

    // Send auto-response to user
    console.log("📧 Sending auto-response to user:", requestData.Email);
    try {
      await transporter.sendMail({
        from: `"FilmZone" <${process.env.FROM_EMAIL}>`,
        to: requestData.Email,
        subject: "We received your message - FilmZone Team",
        text: `Hi ${requestData.Name},\n\nThank you for contacting us. We have received your message and will get back to you soon.\n\nYour Message:\n${requestData.Message}\n\nBest regards,\nFilmZone Team`,
        html: contactResponseHtml({
          Name: requestData.Name,
        }),
      });
      console.log("✅ User auto-response sent");
    } catch (userErr) {
      console.error("❌ Failed to send user auto-response:", userErr.message);
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Contact Request sent successfully",
      result: result,
    });
  } catch (err) {
    console.error("❌ Contact form error:", err.message);
    return res.status(400).json({
      success: false,
      message: "Server Internal error",
      error: err.message,
    });
  }
};
