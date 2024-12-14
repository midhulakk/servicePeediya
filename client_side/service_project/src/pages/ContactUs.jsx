import React from 'react'
import WorkerNav from './WorkerNav'
import { Button, Form, Col, Row, ListGroup, Container, Toast } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Header from './Header';

function ContactUs() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const [showToast, setShowToast] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can replace this with an actual API call
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form after submission
        setShowToast(true); // Display success toast
      };
    
  return (
    <>
    <Header/>
    <Container className="mt-5">

        <Row>
          {/* Left Side: Contact Form */}
          <Col md={6}>
        <h4 className="text-center mb-4">Contact Us</h4>
            <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="message" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
            </div>
          </Col>

          {/* Right Side: Contact Details */}
          <Col md={4} className='m-5 p-5'>
            <h5>Contact Information</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="fa-solid fa-envelope me-2" /> Email: info@servicepeediya.com
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="fa-solid fa-phone me-2" /> Phone: +123 456 7890
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="fa-solid fa-location-pin me-2" /> Address: 123 ServicePeediya Street, City, Country
              </ListGroup.Item>
            </ListGroup>
            <div className='m-5'>
            <h5>Follow Us</h5>
              <a href="#" className="me-3">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="#" className="me-3">
                <i className="fa-brands fa-twitter" />
              </a>
              <a href="#" className="me-3">
                <i className="fa-brands fa-instagram" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Toast Notification for successful form submission */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>Message sent successfully!</Toast.Body>
      </Toast>


    </>
  )
}

export default ContactUs