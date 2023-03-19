import React from 'react';
import './Footer.css';
import Logo from './or-logo.png'
function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <img src={Logo} style={{height:"50px", width:"50px"}} alt="Organization Logo" />
            <p>Main objective of BCSIR is to pursue scientific research for the betterment of the Bangladeshi people. It was established on 16 November 1973.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <div className="d-flex justify-content-around">
              <a href="https://www.facebook.com/" className='fa fa-facebook' alt="Facebook" ></a>
              <a href="https://twitter.com/" className='fa fa-twitter' alt="Twitter"></a>
              <a href="https://wa.me/" className='fa fa-whatsapp' alt="WhatsApp" ></a>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Find Us</h5>
            <i className='fas fa-map-marker-alt'></i>
            <p>Dr. Qudrat-E-Khuda Road<br />Dhaka 1205</p>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <span className="text-muted">&copy; 2023 My Organization</span>
      </div>
    </footer>
  );
}

export default Footer;
