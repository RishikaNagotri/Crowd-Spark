
import React from 'react';
import Header from './Header';
import axios from 'axios'
import './ContactPage.css';
import {useForm} from 'react-hook-form'

import InstagramIcon from '@mui/icons-material/Instagram';

function ContactPage() {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "313957ad-c36e-4813-a2a5-153e8267bf79",
      name: data.username,
      email: data.email,
      message: data.message
    }
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      alert("Thank You! Visit again")
    } catch (error) {
      alert("An error occurred", error);
      console.log(error);
    }
  }


  return (
    <>
      <Header />

      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>We're here to help you! Reach out to us using the form below or contact us directly.</p>

        <div className="contact-content">
          <div className="contact-form-card">
  <form
  className="contact-form"
  action="https://api.web3forms.com/submit"
  method="POST"
>
  <input type="hidden" name="access_key" value="313957ad-c36e-4813-a2a5-153e8267bf79" />

  <label>Name</label>
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
  />

  <label>Email</label>
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
  />

  <label>Message</label>
  <textarea
    name="message"
    placeholder="Your Message"
    rows="3"
    required
  ></textarea>

  <button type="submit">Send Message</button>
</form>


</div>


          <div className="contact-info">
            <h3>Let’s Build the Future Together!</h3>
            <p>
              Whether you’re an entrepreneur, investor, or a supporter of innovation,
              we’re here to help you bring your ideas to life.
            </p>

            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="mailto:crowdfunding@gmail.com">📩 crowdfundingplatform@gmail.com </a>
              <a href="https://www.facebook.com/crowdfunding">🌐 Facebook</a>
              <a href="https://www.twitter.com/crowdfunding">🐦 Twitter</a>
              
              <a href="https://www.instagram.com/crowdfunding" >
                <InstagramIcon style={{ fontSize: 20, verticalAlign: "middle", background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf)" ,borderRadius:"15px"}} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
