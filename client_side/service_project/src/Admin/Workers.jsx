import React, { useEffect, useState } from 'react';
import { workerView, adminApproval } from '../../Apis/fetchApi';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Workers() {
    const { id } = useParams();
    const [work, setWork] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        workerView()
            .then((res) => {
                setWork(res.data);
                setError(false);
            })
    }, []);

    const approvWorkers = (workerId) => {
        adminApproval(workerId)
            .then(() => {
                toast.success("Worker approved successfully!");
                workerView()
                    .then((res) => setWork(res.data)) // Ensure the latest data is fetched.
                    .catch(() => toast.error("Failed to refresh workers data."));
            })
            .catch(() => toast.error("Approval failed. Please try again."));
        setShow(false);
    };
    

    const WorkerTable = ({ workers, title, action }) => (
        <>
            <h3 className={`text-center mt-4 ${title.includes("Unapproved") ? "text-info" : "text-success"}`}>
                {title}
            </h3>
            {workers.length ? (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Pin Code</th>
                            <th>Job</th>
                            <th>Certificate</th>
                            {action && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map((worker) => (
                            <tr key={worker.id}>
                                <td>
                                    <img
                                        src={
                                            worker.profile_picture
                                                ? `http://127.0.0.1:8000${worker.profile_picture}`
                                                : "https://via.placeholder.com/50"
                                        }
                                        alt={worker.username || "Worker Profile"}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                </td>
                                <td>{worker.username}</td>
                                <td>{worker.phone}</td>
                                <td>{worker.email}</td>
                                <td>{worker.location}</td>
                                <td>{worker.pin}</td>
                                <td>{worker.skills}</td>
                                <td>
                                    <a href={`http://127.0.0.1:8000${worker.certification}`} target="_blank" rel="noopener noreferrer">
                                        Download Certification
                                    </a>
                                </td>
                                {action && (
                                    <td>
                                        <Button
                                            variant="info"
                                            onClick={() => {
                                                setSelectedWorker(worker);
                                                setShow(true);
                                            }}
                                            title="Approve Worker"
                                        >
                                            Approve
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h5 className="text-center text-warning">No {title}</h5>
            )}
        </>
    );

    const approvedWorkers = work.filter((worker) => worker.is_approved); // Ensure the field matches the API response
    const unapprovedWorkers = work.filter((worker) => !worker.is_approved);
    
    return (
        <div className="container">
            <h2 className="text-center text-danger"><b><i>Registered Workers</i></b></h2>
            <WorkerTable workers={unapprovedWorkers} title="Unapproved Workers" action />
            <WorkerTable workers={approvedWorkers} title="Approved Workers" />
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>Are you sure you want to approve {selectedWorker?.username}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => approvWorkers(selectedWorker?.id)}>
                        Approve
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Workers;
