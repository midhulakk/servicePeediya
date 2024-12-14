import React from 'react';
import UserNav from '../pages/UserNav';
import { Card, Badge, Button, Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { jobStatus } from '../../Apis/fetchApi';
import { Link } from 'react-router-dom';

function JobStatus() {
  const [jobData, setJobData] = useState([]);

  const header = {
    Authorization: `Token ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    jobStatus(header)
      .then((res) => {
        console.log(res.data);
        setJobData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <UserNav />
      <Container className="mt-5">
        <h2 className="text-center mb-5 text-primary">Job Status</h2>
        {jobData.length === 0 ? (
          <div className="text-center">
            <p>No jobs available at the moment.</p>
          </div>
        ) : (
          jobData.map((job) => (
            <Card className="mb-4 shadow-sm border-light rounded" key={job.id}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <Card.Title className="fw-bold">{job.title}</Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <p className="mb-1 text-muted">
                      <strong>Date Posted:</strong> {job.date_posted}
                    </p>
                    <Badge
                      bg={job.status === 'Open' ? 'success' : 'warning'}
                      className="mt-2"
                    >
                      {job.status}
                    </Badge>
                  </Col>
                  <Col md={4} className="text-end">
                 <Link className='btn btn-outline-primary' to={`/jobDetail/${job.id}`}>View job</Link> </Col>
                </Row>
                <hr />
                {job.worker ? (
                  <div>
                    <h5 className="mt-3 text-success">Accepted By</h5>
                    <Row>
                      <Col sm={3}>
                        <p>
                          <strong>Name:</strong> {job.worker.username}
                        </p>
                      </Col>
                      <Col sm={3}>
                        <p>
                          <strong>Contact:</strong> {job.worker.phone}
                        </p>
                      </Col>
                      <Col sm={3}>
                        <p>
                          <strong>Skills:</strong> {job.worker.skills}
                        </p>
                      </Col>
                      <Col sm={3}>
                          
                        <Link class="btn btn-outline-dark" to={`/workprofile/${job.worker.id}`}>View Profile</Link>
                      </Col>
                    </Row>
                    
                  </div>
                ) : (
                  <p className="text-muted mt-3">No workers have accepted this job yet.</p>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

export default JobStatus;
