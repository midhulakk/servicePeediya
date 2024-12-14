import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import workers from '../assets/workers.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Header from '../pages/Header'
import { workerLogin } from '../../Apis/fetchApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function WorkLog() {
  const [login,setLog]=useState({
    username:"",password:""
  })
  console.log(login);
  const navigate=useNavigate()
   
  const submitData = () => {
    const { username, password } = login;

    if (!username || !password) {
        toast.error("Invalid Credentials");
        return;
    }
    workerLogin(login)
      .then((res) => {
        const worker = res.data;

        // Check if the worker's account is approved
        if (!worker.is_approved) {
          toast.error('Your account is not approved by the admin yet. Please try again later.');
          return;
        }

        // Login successful
        toast.success('Login successful');
        sessionStorage.setItem('token', worker.token); // Store token in sessionStorage
        navigate('/workerHome'); // Redirect to the worker home page
      }) .catch((error) => {
        // Handle error if login fails
        if (error.response) {
          toast.error(error.response.data.error || 'An error occurred. Please try again.');
        } else {
          toast.error('Network error. Please try again.');
        }
      });
};

    
    
  
  
  return (
    <>
    <Header/>
    <div className="vh-100 d-flex align-items-center mb-5" >
      <Container fluid="md">
        <Row className="h-100">
          {/* Left Column - Image */}
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img
              src={workers}
              alt="Workers"
              className="img-fluid"
              style={{ maxHeight: '80%' }}
            />
          </Col>

          {/* Right Column - Form */}
          <Col md={6} className="d-flex flex-column justify-content-center mb-5">
            <div className="w-75 mx-auto">
              <h4 className="text-center text-success mb-4">Sign In</h4>
              <FloatingLabel controlId="floatingInput" label={<><i className="fa-solid fa-user" />{' '} Username</>} className="mb-3" >
                <Form.Control type="text" placeholder="Username" onChange={(e)=>{setLog({...login,username:e.target.value})}} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label={<><i className="fa-solid fa-lock" />{' '}Password</>}>
                <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setLog({...login,password:e.target.value})}}/>
              </FloatingLabel>
              <p className='m-1' style={{textDecoration:'none'}}><Link to={'/passreq'}>Forgot Password</Link></p>
              <button className="btn btn-success w-100 mt-2" onClick={(e)=>{submitData()}}>Sign In</button>
              <p>Dont have a Account?<Link to={'/workReg'}>SignUp</Link></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default WorkLog