import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { userLogout } from '../../Apis/fetchApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usersList } from '../../Apis/fetchApi';
import { useEffect } from 'react';
import { useState } from 'react';

function UserNav() {
  const navigate=useNavigate()
  const [getUser,setUser]=useState([])
  const header={
    "Authorization":`Token ${sessionStorage.getItem("token")}`,
    "Content-Type":'application/json'
  }
  const handlelogout=()=>{
    userLogout(header).then((res)=>{
      console.log(res.data);
      sessionStorage.removeItem("token");
      navigate('/')
      toast.success("Logout Successfull")
    }).catch((err) => {
      // In case of error
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    });
  }

  useEffect(() => {
    usersList(header)
    .then((res) => setUser(res.data))
    .catch((err) => toast.error("Failed to fetch user data."));
}, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
        <Container>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Navbar.Brand>
              <img
                alt="ServicePeediya Logo"
                src={logo}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />{' '}
              <span className="fw-bold text-primary">ServicePeediya</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="me-4">
               <Link to={'/userHome'} style={{textDecoration:"none"}}><i className="fa-solid fa-house me-2" /> Home </Link>
                             </Nav.Link>
              <Nav.Link href="#notifications" className="me-4">
               <Link to={'/usernotify'} style={{textDecoration:'none'}}><i className="fa-solid fa-bell me-2" /> Notifications</Link>
              </Nav.Link>
              <Nav.Link href="#notifications" className="me-4">
              <Link to={'/jobStatus'} style={{textDecoration:"none"}}> <i className="fa-solid fa-list-check" /> Updates </Link>
              </Nav.Link>
                    <i className="fa-solid fa-user me-2"/>
                    <NavDropdown > 
                {/* Profile Section */}
                <div className="dropdown-header text-center p-3 bg-gradient rounded-top">
                  <h6 className="fw-bold text-dark">{getUser.username }</h6>
                  <p className="text-muted small mb-2">{getUser.email}</p>
                 </div>
                <NavDropdown.Divider />

                {/* Menu Options */}
                <NavDropdown.Item href="#settings" className="dropdown-item-custom">
                  <i className="fa-solid fa-gear me-2" /> Settings
                </NavDropdown.Item>
                <NavDropdown.Item href="#about" className="dropdown-item-custom">
                  <Link to={'/aboutus'} style={{textDecoration:'none'}}><i className="fa-solid fa-info-circle me-2" /> About Us</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#terms" className="dropdown-item-custom">
                  <i className="fa-solid fa-file-contract me-2" /> Terms & Conditions
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handlelogout} className="dropdown-item-custom logout-item">
                  <i className="fa-solid fa-right-from-bracket me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Custom Styles */}
      <style jsx="true">{`
        .bg-gradient {
          background: linear-gradient(45deg, #6a11cb, #2575fc);
          color: white;
        }

        .dropdown-header img {
          border: 2px solid #fff;
        }

        .dropdown-item-custom {
          padding: 10px 15px;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }

        .dropdown-item-custom:hover {
          background-color: #f8f9fa;
        }

        .logout-item {
          color: #dc3545;
        }

        .logout-item:hover {
          background-color: #f8d7da;
        }
          
        .btn-outline-primary:hover {
          background-color: white;
          color: #6a11cb;
        }
      `}</style>
    </>
  );
}


export default UserNav