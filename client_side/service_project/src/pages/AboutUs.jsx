import React from 'react';
import Header from './Header';

function AboutUs() {
  return (
    <>
      <Header />
      <div className='text-center px-4'>
        <h4 className='text-center text-primary my-4'>SeervicePeediya</h4>

        <p>
          Welcome to <i>SeervicePeediya</i> – your trusted platform for connecting with skilled professionals and local services in your community. We understand that finding reliable help can sometimes be a challenge. Whether you're looking for a plumber to fix a leaky faucet, an electrician to install a new appliance, or a carpenter to bring your furniture ideas to life, <strong>SeervicePeediya</strong> is here to make the process easy, efficient, and stress-free.
        </p>

        <h5 className='mt-4'>Our Mission</h5>
        <p>
          At <i>SeervicePeediya</i>, our mission is to bridge the gap between individuals in need of services and the skilled workers who can provide them. We aim to create a vibrant community where trust, reliability, and convenience come together to empower both service seekers and providers.
        </p>

        <h5 className='mt-4'>What We Offer</h5>
        <ul className='text-start d-inline-block'>
          <li><strong>For Service Seekers:</strong> Easily post your job requests and connect with professionals in your area who have the expertise you need. Get notifications and quotes, compare options, and hire the best fit for your requirements.</li>
          <li><strong>For Service Providers:</strong> Showcase your skills and find new opportunities by receiving tailored job notifications in your area of expertise. Expand your reach and grow your business by helping your local community.</li>
        </ul>

        <h5 className='mt-4'>Why Choose Us?</h5>
        <ul className='text-start d-inline-block'>
          <li><strong>Simple and Intuitive:</strong> Our platform is designed to be user-friendly, ensuring that you can find or offer services effortlessly.</li>
          <li><strong>Localized Solutions:</strong> Focused on connecting communities, we help you discover professionals near you for faster and more reliable service.</li>
          <li><strong>Transparent and Secure:</strong> We prioritize your trust with clear communication and secure processes that make every interaction seamless.</li>
        </ul>

        <h5 className='mt-4'>Our Vision</h5>
        <p>
          We envision a world where local communities thrive through meaningful connections and easy access to services. By empowering individuals and skilled workers, we strive to build stronger, more self-sufficient neighborhoods.
        </p>

        <h5 className='mt-4'>Join Us Today!</h5>
        <p>
          Become a part of the <strong>SeervicePeediya</strong> community and experience the convenience of finding trusted help or growing your skills-based career. Let’s work together to make your everyday tasks simpler and your goals more achievable.
        </p>

        <p className='mt-4'>
          Thank you for choosing <strong>SeervicePeediya</strong> – Where help is just around the corner!
        </p>
      </div>
    </>
  );
}

export default AboutUs;

