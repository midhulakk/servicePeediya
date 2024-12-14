import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import WorkerNav from '../pages/WorkerNav';
import { updateWorkerProfile, viewProfile } from '../../Apis/fetchApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const [data, setData] = useState({});
    const [certificate, setCertificate] = useState(null); // State for certificate
    const [profilePhoto, setProfilePhoto] = useState(null); // State for new profile photo
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null); // Preview for profile photo
    const navigate=useNavigate()
    const header = {
        Authorization: `Token ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        viewProfile(header)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file); // Update profile photo state
        setProfilePhotoPreview(URL.createObjectURL(file)); // Generate a preview URL
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Create a FormData object to handle file uploads
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('location', data.location);
            formData.append('pin', data.pin);
            if (profilePhoto) formData.append('profile_photo', profilePhoto);
            if (certificate) formData.append('certificate', certificate);
    
            // Call the API to update the profile
            const response = await updateWorkerProfile(header, formData);
    
            if (response.status === 200) {
                console.log('Profile updated successfully');
                navigate('/profile'); // Redirect to profile page
            } else {
                console.error('Failed to update profile', response.data);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    const profilePictureUrl = `http://localhost:8000/${data.profile_picture}`;
    


    return (
        <>
            <WorkerNav />
            <Container className="mt-5">
                <h3 className="text-center mb-3 text-primary">Update Profile</h3>
                <div className="w-75 mx-auto shadow p-5 border bg-light mb-3">
                    <Form onSubmit={handleFormSubmit}>
                        <h2 className="mb-3  text-center">{data.username}</h2>
                        <h3 className="mb-3 text-muted text-center">{data.skills}</h3>


                        {/* Profile Photo Section */}
                        <Row className="mb-4 text-center">
                            <Col xs={12}>
                                {profilePhotoPreview ? (
                                    <img
                                        src={profilePhotoPreview}
                                        alt="Profile Preview"
                                        className="img-fluid rounded-circle mb-3"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                ) : data.profile_picture ? ( // Check for existing profile photo
                                    <img
                                        src={profilePictureUrl} // Use existing photo URL
                                        alt="Profile"
                                        className="img-fluid rounded-circle mb-3"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div
                                        className="bg-secondary rounded-circle d-inline-block mb-3"
                                        style={{ width: '150px', height: '150px' }}
                                    ></div>
                                )}
                                <Form.Group controlId="formFileProfilePhoto">
                                    <Form.Label className="btn btn-outline-primary">
                                        Upload Profile Photo
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="d-none"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Profile Details Section */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInputEmail" label="Email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e)=>{setData({...data,email:e.target.value})}}
                                        value={data.email || ''}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInputPhone" label="Phone">
                                    <Form.Control
                                        type="number"
                                        placeholder="Phone"
                                        onChange={(e)=>{setData({...data,phone:e.target.value})}}
                                        value={data.phone || ''}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInputLocation" label="Location">
                                    <Form.Control
                                        type="text"
                                        placeholder="Location"
                                        onChange={(e)=>{setData({...data,location:e.target.value})}}
                                        value={data.location || ''}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInputPin" label="Pin Code">
                                    <Form.Control
                                        type="number"
                                        placeholder="Pin Code"
                                        onChange={(e)=>{setData({...data,pin:e.target.value})}}
                                        value={data.pin || ''}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {/* Update Certificate Section */}
                        <Row className="mb-3">
    <Col xs={12}>
    <a href={`http://127.0.0.1:8000${data.certification}`} target="_blank" rel="noopener noreferrer">
                                        View Certification
                                    </a>
    </Col>
</Row>


                        <div className="d-flex justify-content-center mt-4">
                            <Link className="btn btn-danger me-3" to={'/profile'}>
                                Cancel
                            </Link>
                            <Button type="submit" variant="success">
                                Save
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}

export default UpdateProfile;
