import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserNav from '../pages/UserNav';
import { getJobDetail } from '../../Apis/fetchApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function JobDetail() {
    const {id}=useParams()
    const [getDetail,setDetail]=useState([]) 
    const header={
        "Authorization":`Token ${sessionStorage.getItem("token")}`,
        "Content-Type":'application/json'
      }
      useEffect(()=>{
        getJobDetail(id,header).then((res)=>{
            setDetail(res.data)
            console.log(res.data);       
        })
      },[])


    return (
        <>
        <UserNav/>
            <div className='p-5'>
                <Container>
                    <Row>
                        <Col className='text-center'>
                        <Card className="shadow-lg rounded">
                                <Card.Header className="bg-primary text-white text-center">
                                    <h4>{getDetail.title}</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-primary text-center"></Card.Title>
                                    <Card.Text className="mb-3">
                                        <h6 className="font-weight-bold"><b>Description :</b>  {getDetail.description}</h6>
                                       
                                    </Card.Text>

                                    <Card.Text className="mb-3">
                                        <h6 className="font-weight-bold"><b>Worker Required :</b> {getDetail.skill}</h6>
                                    </Card.Text>

                                    <Card.Text className="mb-3">
                                        <h6 className="font-weight-bold"><b>Location :</b>{getDetail.location}</h6>
    
                                    </Card.Text>
                                    <Card.Text className="mb-3">
                                        <h6 className="font-weight-bold"><b>Pin :</b>{getDetail.pin}</h6>
    
                                    </Card.Text>

                                    <Card.Text className="mb-3">
                                        <h6 className="font-weight-bold"><b>Date Required:</b>{getDetail.date_required}</h6>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-light text-muted text-center">
                                    <p>Posted on: {getDetail?.date_posted}</p>
                                </Card.Footer>
                            </Card>

                           
                        </Col>
                       
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default JobDetail