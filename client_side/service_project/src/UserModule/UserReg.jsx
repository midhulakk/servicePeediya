import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import network from '../assets/network.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { userRegister } from '../../Apis/fetchApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../pages/Header'

function UserReg() {
  const [userReg,setUserReg]=useState({
    username:"",email:"",password:""
  })
  console.log(userReg);
  const navigate=useNavigate()
     
     const submitData=()=>{
         const {username,email,password}=userReg
         if (! username|| !password|| !email){
            toast.error("invalid")
         }
         else{
            userRegister(userReg).then((res)=>{
                console.log(res.data);
                toast.success("User Registerd Successfully")
                navigate('/userLog')               

            })
         }
     }
  

  return (
   <>
   <Header/>
    <div className="vh-100 d-flex align-items-center">
      <Container fluid="md">
        <Row className="h-100">
          {/* Left Column - Image */}
          <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className="w-75 mx-auto">
              <h4 className="text-center text-success mb-4">Sign Up</h4>
              <FloatingLabel controlId="floatingInput" label={<><i className="fa-solid fa-user" />{' '} Username</>} className="mb-3">
                <Form.Control type="text" placeholder="Username" onChange={(e)=>{setUserReg({...userReg,username:e.target.value})}}/>
              </FloatingLabel>
              <FloatingLabel  controlId="floatingInput"  label={<><i className="fa-solid fa-envelope" />{' '} Email</>} className="mb-3" >
               <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setUserReg({...userReg,email:e.target.value})}} />
             </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label={<><i className="fa-solid fa-lock" />{' '} Password</>} className="mb-3">
                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserReg({...userReg,password:e.target.value})}}/>
              </FloatingLabel>
              <button className="btn btn-success w-100 mt-3" onClick={(e)=>{submitData()}}>Register</button>
              <p>Already have a Account?<Link to={'/userLog'}>Login</Link></p>
            </div>
          </Col>

          {/* Right Column - Form */}
          <Col md={6} className="d-flex flex-column justify-content-center">
          <img
              src={network}
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

export default UserReg