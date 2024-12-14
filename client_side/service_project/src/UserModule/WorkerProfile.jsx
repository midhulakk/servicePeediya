import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { viewProfile, workerProfile } from '../../Apis/fetchApi'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserNav from '../pages/UserNav'

function WorkerProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState([])
    const header = {
        "Authorization": `Token ${sessionStorage.getItem("token")}`,
        "Content-Type": 'application/json'
    }
    useEffect(() => {
        workerProfile(id, header).then((res) => {
            setProfile(res.data)
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const profilePictureUrl = `http://localhost:8000/${profile.profile_picture}`;


    return (
        <>
            <UserNav />
            <div className="container mt-5">
                <Card className="shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
                    <Card.Body className="text-center">
                        <img
                            src={profilePictureUrl}
                            className="rounded-circle mb-3"
                            style={{ width: '150px', height: '150px' }}
                        />
                        <h3 className="card-title">{profile.username}</h3>
                        <h5 className="text-muted mb-3">{profile.skills}</h5>
                        <p className="mb-2"><strong>Email: </strong> {profile.email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {profile.phone}</p>
                        <p className="mb-2"><strong>Location:</strong> {profile.location}  </p>
                        <p className="mb-4"><strong>Pin:</strong> {profile.pin}</p>
                        <p className="mb-4">
                            <strong>View certificate:</strong>{" "}
                            <a href={`http://127.0.0.1:8000${profile.certification}`} target="_blank" rel="noopener noreferrer">
                                        Certification
                                    </a>
                        </p>



                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default WorkerProfile
