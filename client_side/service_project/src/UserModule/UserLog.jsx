import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import network from '../assets/network.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { userLogin } from '../../Apis/fetchApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../pages/Header'


function UserLog() {
  const navigate=useNavigate()
  const [logData,setLogin]=useState({
    username:"",password:""
  })
  console.log(logData);


  const formSubmit=()=>{
    const {username,password}=logData
    if (!username || !password){
      toast.warning("Invalid Input")
    }
    else{
      userLogin(logData).then((res)=>{
        console.log(res.data);
        toast.success("Login Successfull")
        navigate('/UserHome')
        sessionStorage.setItem("token",res.data.token)
        
      })
    }

  }
 

  return (
    <>
    <Header/>
    <div className="vh-100 d-flex align-items-center" >
      <Container fluid="md">
        <Row className="h-100">
          {/* Left Column - Image */}
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img
              src={network}
              alt="Workers"
              className="img-fluid"
              style={{ maxHeight: '80%' }}
            />
          </Col>

          {/* Right Column - Form */}
          <Col md={6} className="d-flex flex-column justify-content-center">
            <div className="w-75 mx-auto">
              <h2 className="text-center text-success mb-4">Sign In</h2>
              <FloatingLabel controlId="floatingInput" label={<><i className="fa-solid fa-user" />{' '} Username</>} className="mb-3" >
                <Form.Control type="text" placeholder="Username"  onChange={(e)=>{setLogin({...logData,username:e.target.value})}}/>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label={<><i className="fa-solid fa-lock" />{' '}Password</>}>
                <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setLogin({...logData,password:e.target.value})}}/>
              </FloatingLabel>
              <p className='m-1' style={{textDecoration:'none'}}><Link to={'/passreq'}>Forgot Password</Link></p>
              <button className="btn btn-success w-100 mt-3" onClick={(e)=>{formSubmit()}}>Sign In</button>
              <p>Dont have a Account?<Link to={'/userReg'}>SignUp</Link></p>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default UserLog