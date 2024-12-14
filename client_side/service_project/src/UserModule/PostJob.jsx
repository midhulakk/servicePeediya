import { React, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { postJobs } from '../../Apis/fetchApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserNav from '../pages/UserNav';

function PostJob() {
  const today = new Date().toISOString().split('T')[0];
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);  

  // Handle opening and closing of the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAgree = () => {
    setIsChecked(true);  
    setShowModal(false);
  };


  const [postJob,setPostJob]=useState({
    title:"",description:"",location:"", pin:"",date_required:"",skill:""
  })
  console.log(postJob);
  const navigate=useNavigate()

  const submitData=()=>{
    const header={
      "Authorization":`Token ${sessionStorage.getItem("token")}`,
      "Content-Type":'application/json'
      
    }
    const {title,description,location,pin,date_required,skill}=postJob
    if (!isChecked) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }
    if (! title|| !description|| !location || !pin|| !date_required || !skill){
      toast.error("Please fill all the fields")
      navigate('/jobpost')
   }
    else{
       postJobs(postJob,header).then((res)=>{
           console.log(res.data);
           toast.success("Job Posted")
           navigate('/userHome')               

       })
    }
}
  

  return (
    <>
    <UserNav/>
    <div className='w-100 h-100'>
      <div className='p-5 w-50 h-50 border shadow mt-5 mb-5' style={{ marginLeft: "300px" }}>
        <h2 className='text-success text-center'>Post Job</h2>
        <FloatingLabel controlId="floatingInput" label='Title' className="mb-3">
          <Form.Control type="text" placeholder="Title" onChange={(e)=>{setPostJob({...postJob,title:e.target.value})}}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label='Description' className="mb-3">
          <Form.Control type="text" placeholder="Description" onChange={(e)=>{setPostJob({...postJob,description:e.target.value})}} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label='Location' className="mb-3">
          <Form.Control type="text" placeholder="Location" onChange={(e)=>{setPostJob({...postJob,location:e.target.value})}}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Pin" className="mb-3">
          <Form.Control type="number" placeholder="Pin" onChange={(e) => { setPostJob({ ...postJob, pin: e.target.value }) }} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label='Date required' className="mb-3">
          <Form.Control type="date" min={today} onChange={(e)=>{setPostJob({...postJob,date_required:e.target.value})}}/>
        </FloatingLabel>
        <Form.Select aria-label="Default select example" className="mb-3" onChange={(e)=>{setPostJob({...postJob,skill:e.target.value})}}>
          <option value="" disabled selected>Select job category</option>
          <option value="plumber">Plumber</option>
          <option value="electrician">Electrician</option>
          <option value="cleaner">Cleaner</option>
          <option value="gardener">Gardener</option>
          <option value="carpenter">Carpenter</option>
          <option value="painter">Painter</option>
          <option value="welder">Welder</option>
          <option value="mechanic">Mechanic</option>
          <option value="cook">Cook</option>
          <option value="driver">Driver</option>

        </Form.Select>
        <Form.Check inline label={<Link onClick={handleShow} style={{ textDecoration: "none" }}>terms & conditions</Link>} checked={isChecked} onChange={() => setIsChecked(!isChecked)} name="group1" type="checkbox" id="terms" required />
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Terms and Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              By posting a job on <i>ServicePeediya</i>, you agree to the following terms:<br></br>

              <b>Eligibility: </b>You must be 18 years or older and legally authorized to post job listings.<br/>

              <b>Job Accuracy:</b> You agree to provide accurate, clear, and honest job descriptions. All jobs must comply with applicable laws.<br/>

              <b>Non-Discriminatory: </b>You must not post jobs that discriminate based on race, gender, religion, age, disability, or other protected categories.<br/>

              <b>Prohibited Jobs:</b> You may not post illegal, fraudulent, or misleading job listings.<br/>

              <b>Communication:</b> You are responsible for all interactions with applicants. <i>ServicePeediya</i> is not involved in the hiring process.<br/>

             <b> Content Ownership:</b> You retain ownership of your job listings but grant <i>ServicePeediya</i> the right to display and distribute the job content on our platform.<br/>

              <b>Platform’s Role:</b> <i>ServicePeediya</i> only provides the platform for posting jobs. We do not guarantee job fulfillment or applicant quality.<br/>

             <b> Termination: </b><i>ServicePeediya</i> reserves the right to remove any job post that violates these terms.<br/>

              <b>Indemnity:</b> You agree to indemnify <i>ServicePeediya</i> for any legal issues arising from your job posts.<br/>

              For any questions or clarifications, please contact us at <Link style={{textDecoration:"none"}}>servicePeediya@gmail.com</Link>.


            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAgree}>
              I Agree
            </Button>
          </Modal.Footer>
        </Modal>
        <div className='d-flex justify-content-center align-items-center'>
          <Link className='btn btn-danger me-5' to={'/userHome'}>Cancel</Link>
          <button className='btn btn-success' onClick={(e)=>{submitData()}}>Add Job</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default PostJob