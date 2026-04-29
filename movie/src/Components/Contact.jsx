import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactInfoItem = ({ icon, title, children, delay }) => (
  <div 
    className="flex items-start space-x-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: delay }}
  >
    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <div className="text-gray-400">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (message === "" || number === "" || email === "" || name === "") {
      Swal.fire({
        icon: "warning",
        title: "Please Fill All Details",
        background: '#1f2937',
        color: '#ffffff'
      });
      return false;
    }

    const formData = new FormData();
    formData.append("Message", message);
    formData.append("Number", number);
    formData.append("Email", email);
    formData.append("Name", name);

    setSubmitting(true);
    axios.post(`http://localhost:5000/add/contactus`, formData, {
      headers: {
        Accept: "auth",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Request Sent Successfully!",
            text: "We'll get back to you soon.",
            background: '#1f2937',
            color: '#ffffff',
            confirmButtonColor: '#ef4444'
          });

          setName('');
          setNumber('');
          setMessage('');
          setEmail('');
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response?.data?.message || "An error occurred",
          background: '#1f2937',
          color: '#ffffff'
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gray-800 text-center py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a question or feedback? We'd love to hear from you. 
            Our team is here to help!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Information */}
          <div className="space-y-6">
            <div>
              <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">Contact Information</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-white">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you have a question about our services, pricing, or anything else, 
                our team is ready to answer all your questions.
              </p>
            </div>
            
            <div className="space-y-4">
              <ContactInfoItem
                delay="0ms"
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                }
                title="Our Office"
              >
                <p>123 Movie Lane, C.G. Road,</p>
                <p>Ahmedabad, Gujarat 380009</p>
              </ContactInfoItem>

              <ContactInfoItem
                delay="100ms"
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                }
                title="Email Us"
              >
                <a href="mailto:support@filmzone.com" className="hover:text-red-500 transition-colors">
                  support@filmzone.com
                </a>
              </ContactInfoItem>

              <ContactInfoItem
                delay="200ms"
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                }
                title="Call Us"
              >
                <a href="tel:+919999999999" className="hover:text-red-500 transition-colors">
                  (+91) 99999 99999
                </a>
              </ContactInfoItem>
            </div>

            {/* Social Media Links */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmitClick} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-500" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-500" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="number" 
                  value={number} 
                  onChange={(e) => setNumber(e.target.value)} 
                  placeholder="(+91) 99999 99999" 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-500" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  rows="5" 
                  placeholder="How can we help you?" 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-500 resize-none"
                ></textarea>
              </div>
              <div>
                <button 
                  disabled={submitting} 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117502.87879638647!2d72.48492473852077!3d23.02924298495532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1722927230230!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-300"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;