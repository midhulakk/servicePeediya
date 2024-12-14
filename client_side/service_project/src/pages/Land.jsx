import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Header from './Header';

function Land() {
  return (
    <>
      <Header />
      <div 
        style={{
          backgroundImage: 'url(src/assets/bgimage.jpg)', // Use your background image here
          backgroundSize: 'cover',
          height: '100vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} 
        className='d-flex justify-content-center align-items-center'
      >
        <div className="container text-center">
  <h1 className="text-white mb-4" style={{
      fontSize: '4rem', 
      fontWeight: 'bold', 
      textTransform: 'uppercase', 
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
    }}>
    Welcome to <span className="text-success">ServicePeediya</span>
  </h1>
  
  <h3 className="text-white mb-5" style={{
      fontSize: '2rem', 
      fontWeight: '300', 
      letterSpacing: '1px',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
    }}>
    <i>Where users Find Their Workers</i>
  </h3>



          <div className="row justify-content-center">
            {/* User Signup/Login Card */}
            <div className="col-md-4 mb-4">
              <Card className="shadow-lg" style={{backgroundImage: 'url(src/assets/bgimage.jpg)', backgroundSize: 'cover', color: 'white'}}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4" style={{height: '250px', background: 'rgba(0, 0, 0, 0.5)'}}>
                  <Card.Title className="text-white">SignUp As A User</Card.Title>
                  <Card.Text className="text-white">
                    Create an account as a user and post your needed workers and lend them
                  </Card.Text>
                  <Link className="btn btn-primary w-100 mb-2" to="/userReg">SignUp</Link>
                  <Link className="btn btn-outline-primary w-100" to="/userLog">Login</Link>
                </Card.Body>
              </Card>
            </div>

            {/* Worker Signup/Login Card */}
            <div className="col-md-4 mb-4">
              <Card className="shadow-lg" style={{backgroundImage: 'url(src/assets/bgimage.jpg)', backgroundSize: 'cover', color: 'white'}}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4" style={{height: '250px', background: 'rgba(0, 0, 0, 0.5)'}}>
                  <Card.Title className="text-white">SignUp as a Worker</Card.Title>
                  <Card.Text className="text-white">
                    Join our platform as a worker and start offering your services to users.
                  </Card.Text>
                  <Link className="btn btn-success w-100 mb-2" to="/workReg">SignUp</Link>
                  <Link className="btn btn-outline-success w-100" to="/workLog">Login</Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Land;
