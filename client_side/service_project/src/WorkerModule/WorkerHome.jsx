import React from 'react';
import WorkerNav from '../pages/WorkerNav';
import wrkimg from '../assets/wrkimg.jpg';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { jobMatchView } from '../../Apis/fetchApi';
import { useEffect, useState } from 'react';

function WorkerHome() {
  const [viewJob, setJob] = useState([]);
  
  useEffect(() => {
    const header = {
      "Authorization": `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": 'application/json'
    };
    
    jobMatchView(header).then((res) => {
      console.log(res.data);
      setJob(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <WorkerNav />
      <div className="d-flex flex-column justify-content-center align-items-center p-5" 
        style={{
          backgroundImage: `url(${wrkimg})`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          height: "350px",
          position: 'relative' // Ensures text is positioned relative to the container
        }}>
        {/* Text over the image */}
        <div className="overlay-text" 
          style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            color: 'white', 
            fontSize: '30px', 
            fontWeight: 'bold', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
          }}>
          <i>We Value Your Work! <br /> Apply for Jobs Today <br/> We Trust You</i>
        </div>
      </div>

      <div>
        <h2 className='text-center text-success mt-5'>Apply for jobs</h2>
        <div style={{ width: '100%' }} className='d-flex justify-content-center align-items-center mt-3 p-5'>
          {
            viewJob.length !== 0 ? (
              viewJob.map((job) => (
                <Card key={job.id} style={{ width: '18rem' }} className="text-center border shadow me-5">
                  <Card.Body>
                    <Card.Title style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A4A4A' }}>
                      {job.title}
                    </Card.Title>
                    <Card.Text style={{ color: '#6C757D', fontSize: '14px' }}>
                      <b>{job.description}</b>
                    </Card.Text>
                    <Link to={`/applyJobs/${job.id}`} className="btn btn-primary btn-sm" style={{ padding: '8px 12px', borderRadius: '8px' }}>
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-center">No jobs posted yet.</div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default WorkerHome;
