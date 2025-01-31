import React, { useState } from "react";
import emailjs from "emailjs-com";
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    organization: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.send(
        "service_fucvss4",
        "template_ghpgbgn",
        formData,
        "aPD3rzeieTATvvwNU"
      );

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", organization: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div id="video-container">
      <div className="contact-form-container">
        <h2>Get in Touch!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization:</label>
              <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <div className="button-container">
            <button type="submit">Send</button>
          </div>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
