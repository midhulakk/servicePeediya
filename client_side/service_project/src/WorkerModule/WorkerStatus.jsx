import React, { useState, useEffect } from 'react';
import WorkerNav from '../pages/WorkerNav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { acceptedjobView, cancelJob } from '../../Apis/fetchApi';

function WorkerStatus() {
  const [jobs, setJobs] = useState([]);
  const header = {
    Authorization: `Token ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    acceptedjobView(header)
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCancelJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to cancel this job?')) return;

    try {
      const response = await cancelJob(header, jobId);
      if (response.status === 200) {
        setJobs(jobs.filter((job) => job.id !== jobId));
        alert('Job successfully canceled.');
      }
    } catch (error) {
      console.error('Error canceling job:', error);
      alert('Failed to cancel the job. Please try again.');
    }
  };

  return (
    <>
      <WorkerNav />
      <div>
        <h2 className="text-center text-success m-5">Applied Jobs</h2>
        <div className="container">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card className="mb-4 shadow-lg border-0" key={job.id}>
                <Card.Header className="bg-primary text-white">
                  <h4>{job.title}</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="text-secondary">
                        <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                        {job.location}
                      </h5>
                      <p className="mb-2 text-muted">{job.description}</p>
                    </div>
                    <div className="text-center">
                      <p className="fw-bold text-primary">Required By:</p>
                      <span className="badge bg-warning text-dark px-3 py-2">
                        {job.date_required}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    {/* <Button variant="outline-success" className="me-2">
                      <i className="bi bi-eye-fill me-1"></i> View Details
                    </Button> */}
                    <Button
                      variant="danger"
                      onClick={() => handleCancelJob(job.id)}
                    >
                      <i className="bi bi-x-circle-fill me-1"></i> Cancel Job
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-center mt-3">
              <p className="text-muted">No accepted jobs available.</p>
              <i className="bi bi-briefcase-fill text-muted fs-1"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkerStatus;
