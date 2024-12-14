import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <Navbar className="bg">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}ServicePeediya
          </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header