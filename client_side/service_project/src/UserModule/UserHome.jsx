import React, { useEffect, useState } from 'react';
import userimg from '../assets/userimg.jpg';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getpostJobs } from '../../Apis/fetchApi';
import UserNav from '../pages/UserNav';
import JobsOffers from './JobsOffers';

function UserHome() {
  const [getJob, setPostJob] = useState([]);
  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    "Content-Type": 'application/json'
  };

  useEffect(() => {
    getpostJobs(header)
      .then((res) => {
        setPostJob(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <UserNav />
      
      {/* Banner Section */}
      <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5"
        style={{
          backgroundImage: `url(${userimg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '40vh',
          textAlign: 'center',
        }}
      >
        <h3 className="text-white" style={{ fontSize: '36px', fontFamily: 'sans-serif', fontStyle: 'italic' }}>
          POST A JOB
        </h3>
        <h6 className="text-white" style={{ fontSize: '24px', fontFamily: 'sans-serif', fontStyle: 'italic' }}>
          Post your needed jobs and find your perfect worker
        </h6>
        <Link className="btn btn-success mt-3" to={'/jobpost'} style={{ fontSize: '16px', padding: '10px 20px' }}>
          Post Job
        </Link>
      </div>

      {/* Jobs Posted Section */}
      <div className="mt-5 container">
        <h3 className="text-center mb-4" style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
          Jobs Posted
        </h3>
        <div className="row justify-content-center">
          {getJob.length !== 0 ? (
            getJob.map((job) => (
              <div key={job.id} className="col-md-4 mb-4">
                <Card style={{ width: '18rem', height: '150px' }} className="border shadow-lg d-flex flex-column justify-content-between">
                  <Card.Body>
                    <Card.Title style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A4A4A' }}>
                      {job.title}
                    </Card.Title>
                    <Card.Text style={{ color: '#6C757D', fontSize: '14px', flexGrow: 1 }}>
                      <b>{job.description}</b>
                    </Card.Text>
                    <Link to={`/jobDetail/${job.id}`} className="btn btn-primary btn-sm" style={{ padding: '8px 12px', borderRadius: '8px' }}>
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center">No jobs posted yet.</div>
          )}
        </div>
      </div>

      {/* Jobs Offered Section */}
      <div className="mt-5 container">
        <h3 className="text-center mb-4" style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
          Jobs Offered
        </h3>
        <JobsOffers />
      </div>
    </div>
  );
}

export default UserHome;
