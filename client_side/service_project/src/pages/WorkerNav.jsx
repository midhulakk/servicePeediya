import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { userLogout } from '../../Apis/fetchApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { workersList } from '../../Apis/fetchApi';

function WorkerNav() {
  const navigate = useNavigate();
  const [getWorkers, setWorkers] = useState([]);
  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    "Content-Type": 'application/json'
  };

  const handlelogout = () => {
    userLogout(header).then((res) => {
      console.log(res.data);
      sessionStorage.removeItem("token");
      navigate('/');
      toast.success("Logout Successful");
    }).catch((err) => {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    });
  };

  useEffect(() => {
    workersList(header)
      .then((res) => {
        console.log(res.data); // Log response data
        setWorkers(res.data);
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging
        toast.error("Failed to fetch worker data.");
      });
  }, []); 

  const profilePicture = getWorkers?.profile_picture
    ? `http://127.0.0.1:8000${getWorkers.profile_picture}`
    : "https://via.placeholder.com/30";

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to={'/workerHome'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand href="#home">
              <img
                alt="ServicePeediya Logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              ServicePeediya
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Align items to the right */}
              <Link to={'/workerHome'} style={{ textDecoration: "none" }}>
                <Nav.Link href="#workerHome" className='me-4'>Home</Nav.Link>
              </Link>
              <Nav.Link href="#notifications" className="me-4">
                <Link to={'/usernotify'} style={{textDecoration:'none'}}>
                  <i className="fa-solid fa-bell me-2" /> Notifications
                </Link>
              </Nav.Link>
              <Nav.Link href="#workerStatus" className='me-4'>
                <Link to={'/workerStatus'} style={{ textDecoration: 'none' }}>
                  <i className="fa-solid fa-list-check" /> Updates
                </Link>
              </Nav.Link>

              {/* Profile Dropdown */}
              <NavDropdown
                title={
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                }
                id="basic-nav-dropdown"
                className="custom-dropdown"
              >
                <div className="dropdown-header text-center p-3 bg-gradient rounded-top">
                  <h6 className="fw-bold text-dark">{getWorkers.username}</h6>
                  <p className="text-muted small mb-2">{getWorkers.email}</p>
                  <Link to={'/profile'} className="btn btn-sm btn-outline-primary">
                    View Profile
                  </Link>
                </div>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#settings" className="dropdown-item-custom">
                  <i className="fa-solid fa-gear me-2" /> Settings
                </NavDropdown.Item>
                <NavDropdown.Item href="#about" className="dropdown-item-custom">
                  <Link to={'/aboutus'} style={{textDecoration:'none'}}><i className="fa-solid fa-info-circle me-2" /> About Us</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#about" className="dropdown-item-custom">
                  <Link to={'/contactUs'} style={{ textDecoration: "none" }}>
                    <i className="fa-solid fa-envelope me-2" /> Contact Us
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom">
                  <Link to={"/workerTerms"} style={{ textDecoration: "none" }}>
                    <i className="fa-solid fa-file-contract me-2" /> Terms & Conditions
                  </Link>
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

      {/* Additional styles for the custom dropdown, hover effects, etc. */}
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

export default WorkerNav;
