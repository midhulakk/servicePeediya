import React from 'react'
import WorkerNav from '../pages/WorkerNav'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { jobDetailView } from '../../Apis/fetchApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { acceptJob } from '../../Apis/fetchApi';

function ApplyJobs() {
  const { id } = useParams()
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  const [getJob, setJob] = useState({
    title: "", description: "", location: "", pin: "", date_posted: "", date_required: "", skill: "", status: ""
  })
  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    "Content-Type": 'application/json'
  }
  console.log("id=", id);

  useEffect(() => {
    jobDetailView(id, header).then((res) => {
      setJob(res.data)
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const handleApply = () => {
    acceptJob(id, header, getJob).then((res) => {
      setMessage(res.data.message);
      setApplied(true);
      
    })
      .catch((err) => {
        console.log("errors during applying:",err);
        setMessage(err.response?.data?.error || "Something went wrong. Please try again.");
      });
  };



  return (
    <>
      <WorkerNav />
      <div>
        <div className='p-5'>
          <Container>
            <Row>
              <Col>
                <Card className="shadow-lg rounded">
                  <Card.Header className="bg-success text-white text-center">
                    <h4>{getJob.title}</h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-primary text-center"></Card.Title>
                    <Card.Text className="mb-3">
                      <h6 className="font-weight-bold">
                        <b>Description:</b> {getJob.description}
                      </h6>
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <h6 className="font-weight-bold">
                        <b>Location:</b> {getJob.location}
                      </h6>
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <h6 className="font-weight-bold">
                        <b>PIN Code:</b> {getJob.pin}
                      </h6>
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <h6 className="font-weight-bold">
                        <b>Required Skills:</b> {getJob.skill}
                      </h6>
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <h6 className="font-weight-bold">
                        <b>Date Required:</b> {getJob.date_required}
                      </h6>
                    </Card.Text>


                    {/* <Button variant="primary" >
                                        Apply for Job
                                    </Button> */}
                  </Card.Body>
                  <Card.Footer className="bg-light text-muted text-center">
                    <p>Posted by : {getJob.user}<br />Posted on : {getJob.date_posted}
                    </p>

                  </Card.Footer>
                </Card>


              </Col>
              <Col>
                <div className='justify-content-center align-items-center text-center mt-5'>
                  <h4>Are you ready to accept this job posted by <i>{getJob.user} </i>sheduled on {getJob.date_required} at  {getJob.location} ?
                  </h4>
                  <button
                    className="btn btn-success"
                    onClick={handleApply}
                    disabled={applied}>
                    {applied ? "Accepted" : "Apply"}
                  </button>
                  {message && (
                    <div className='mt-3 alert alert-info'>{message}</div>
                  )}
                </div>
              </Col>

            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default ApplyJobs