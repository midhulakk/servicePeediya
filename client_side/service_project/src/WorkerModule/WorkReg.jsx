import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form, Modal, Button } from 'react-bootstrap';
import workers from '../assets/workers.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Header from '../pages/Header'
import { workerRegister } from '../../Apis/fetchApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function WorkReg() {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Handle opening and closing of the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAgree = () => {
    setIsChecked(true);
    setShowModal(false);
  };

  const [workreg, setWorkreg] = useState({
    username: "", email: "", password: "", phone: "", location: "", pin: "", skills: "", certification: "", profile_picture: ""
  })
  console.log(workreg);
  const navigate = useNavigate()
  const submitData = () => {
    const header = { "Content-Type": "multipart/form-data" }

    const { username, email, password, phone, location, pin, skills, certification, profile_picture } = workreg
    if (!isChecked) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }
    if (!username ||  !email || !password || !phone || !location || !pin || !skills || !certification || !profile_picture) {
      toast.error("Please Fill Every Details")
    }
    else {
      const formdata = new FormData
      formdata.append("username", workreg.username)
      formdata.append("email", workreg.email)
      formdata.append("password", workreg.password)
      formdata.append("phone", workreg.phone)
      formdata.append("location", workreg.location)
      formdata.append("pin", workreg.pin)
      formdata.append("skills", workreg.skills)
      formdata.append("certification", workreg.certification)
      formdata.append("profile_picture", workreg.profile_picture)
      workerRegister(formdata, header).then((res) => {
        console.log(res.data);
        navigate('/workLog')
        toast.success("Registration successful. Please wait for admin approval")


      }).catch((err) => {
        console.error("Error:", err.response || err.message);
        console.log((err.response.data));
        toast.error(err.response?.data?.message || "Registration failed!");
      });
    }
  }


  return (
    <>
      <Header />
      <div className="d-flex align-items-center">
        <Container fluid="md">
          <Row className="h-100">
            {/* Left Column - Image */}
            <Col md={8} className="d-flex justify-content-center align-items-center mt-5 mb-5">
              <div className="w-75 h-100 p-2 shadow rounded bg-white">
                <h4 className="text-center text-success mb-4"><b>REGISTER</b></h4>
                <FloatingLabel controlId="floatingInput" label={<><i className="fa-solid fa-user" />{' '} Username</>} className="mb-3">
                  <Form.Control type="text" placeholder="Username" onChange={(e) => { setWorkreg({ ...workreg, username: e.target.value }) }} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label={<><i className="fa-solid fa-envelope" />{' '} Email</>} className="mb-3" >
                  <Form.Control type="email" placeholder="name@example.com" onChange={(e) => { setWorkreg({ ...workreg, email: e.target.value }) }} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label={<><i className="fa-solid fa-lock" />{' '}Password</>} className="mb-3">
                  <Form.Control type="password" placeholder="Password" onChange={(e) => { setWorkreg({ ...workreg, password: e.target.value }) }} />
                </FloatingLabel><hr />
                <Row className="mb-3">
                  <div className="text-center mb-3">
                    {/* Profile Picture Preview */}
                    <div
                      className="rounded-circle overflow-hidden border"
                      style={{
                        width: '150px',
                        height: '150px',
                        margin: 'auto',
                        background: '#f0f0f0',
                      }}
                    >
                      {workreg.profile_picture ? (
                        <img
                          src={URL.createObjectURL(workreg.profile_picture)}
                          alt="Profile Preview"
                          className="img-fluid"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: '#aaa',
                          }}
                        >
                          No Image
                        </span>
                      )}
                    </div>

                    {/* File Input */}
                    <Form.Control
                      type="file"
                      accept="image/*"
                      className="mt-3"
                      onChange={(e) => {
                        setWorkreg({ ...workreg, profile_picture: e.target.files[0] });
                      }}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <Col md={8}>
                    <FloatingLabel controlId="floatingInput" label="Location">
                      <Form.Control type="text" placeholder="Location" onChange={(e) => { setWorkreg({ ...workreg, location: e.target.value }) }} />
                    </FloatingLabel>
                  </Col>
                  <Col md={4}>
                    <FloatingLabel controlId="floatingInput" label="Pin">
                      <Form.Control type="number" placeholder="Pin" onChange={(e) => { setWorkreg({ ...workreg, pin: e.target.value }) }} />
                    </FloatingLabel>
                  </Col>
                </Row>

                <FloatingLabel controlId="floatingInput" label='Phone' className="mb-3">
                  <Form.Control type="number" placeholder="Phone" onChange={(e) => { setWorkreg({ ...workreg, phone: e.target.value }) }} />
                </FloatingLabel>
                <Form.Select aria-label="Default select example" className="mb-3" onChange={(e) => { setWorkreg({ ...workreg, skills: e.target.value }) }} >
                  <option value="" disabled selected>Select job category</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="cleaner">Cleaner</option>
                  <option value="gardener">Gardener</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                  <option value="welder">Welder</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="cook">Cook</option>
                  <option value="driver">Driver</option>
                </Form.Select>
                <FloatingLabel controlId="floatingInput" label='Certifications if any' className="mb-3">
                  <Form.Control type="file" placeholder="" onChange={(e) => { setWorkreg({ ...workreg, certification: e.target.files[0] }) }} />
                </FloatingLabel>

                <Form.Check inline label={<Link onClick={handleShow} style={{ textDecoration: "none" }}>terms & conditions</Link>} checked={isChecked} onChange={() => setIsChecked(!isChecked)} name="group1" type="checkbox" id="terms" required />
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      By registering as a worker on ServicePeediya, you agree to the following terms:<br/>

                      1. Eligibility :
                      You must be 18 years or older and legally authorized to provide services in your region.
                      You agree to provide accurate and verifiable information during registration.<br/>
                      2. Professional Conduct :
                      You commit to delivering services with honesty, integrity, and professionalism.
                      You agree to adhere to the agreed-upon terms with the service requester, including timelines and quality standards.<br/>
                      3. Compliance with Laws :
                      All services you provide must comply with applicable local, state, and national laws.
                      You are solely responsible for obtaining and maintaining any required licenses, permits, or certifications.<br/>
                      4. Non-Discrimination :
                      You agree to provide services without discrimination based on race, gender, religion, age, disability, or other protected categories.<br/>
                      5. Communication :
                      You are responsible for clear and prompt communication with service requesters.
                      ServicePeediya is not involved in negotiations, agreements, or disputes between workers and requesters.<br/>
                      6. Platform's Role :
                      ServicePeediya acts solely as a platform to connect workers with service requesters.
                      We do not guarantee job assignments, payment, or client quality.<br/>
                      7. Payment and Fees :
                      You are responsible for setting and agreeing on fees with the service requester.
                      ServicePeediya is not responsible for payment disputes or issues.<br/>
                      8. Content Ownership :
                      You retain ownership of your profile and service details but grant ServicePeediya the right to display and distribute this content on our platform.<br/>
                      9. Termination :
                      ServicePeediya reserves the right to suspend or terminate your account if you violate these terms.
                      Workers whose accounts are terminated for violations may not re-register without prior approval.<br/>
                      10. Indemnity :
                      You agree to indemnify ServicePeediya for any legal issues or claims arising from your services or interactions with service requesters.<br/>
                      11. Disputes :
                      Any disputes between workers and service requesters must be resolved between the parties. ServicePeediya is not liable for any conflicts.<br/>
                      For any questions or clarifications, please contact us at <Link style={{ textDecoration: "none" }}>servicePeediya@gmail.com</Link>.


                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleAgree}>
                      I Agree
                    </Button>
                  </Modal.Footer>
                </Modal>

                <button className="btn btn-success w-100 mt-3" onClick={(e) => { submitData() }}>Register</button>
                <p>Already have a Account?<Link to={'/workLog'}>Login</Link></p>
              </div>
            </Col>

            {/* Right Column - Form */}
            <Col md={4} className="d-flex flex-column justify-content-center">
              <h5 className="text-center text-success mb-4">
                <strong>Welcome to ServicePeediya!</strong>
              </h5>
              <p className="text-center">
                <em>ServicePeediya</em> is your gateway to new opportunities. We connect skilled professionals like you with clients who need your expertise.
                Whether you're a plumber, electrician, mechanic, or cleaner, we make it easier for you to find meaningful work and build lasting relationships with customers in your area.
              </p>
              <p className="text-center">
                Get started today and take your skills to the next level!
              </p>
              <img
                src={workers}
                alt="Workers"
                className="img-fluid"
                style={{ maxHeight: '80%' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default WorkReg