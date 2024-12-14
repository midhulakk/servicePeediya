import React from 'react'
import { Link } from 'react-router-dom'
import WorkerNav from '../pages/WorkerNav'

function WorkersTerms() {
  return (
    <>
    <WorkerNav/>
    <div className='m-5'>
       <h4 className='text-center'>Terms and conditions</h4>
       <p>
                      By registering as a worker on ServicePeediya, you agree to the following terms:<br/>

                      1. Eligibility :
                      You must be 18 years or older and legally authorized to provide services in your region.
                      You agree to provide accurate and verifiable information during registration.<br/>
                      2. Professional Conduct :
                      You commit to delivering services with honesty, integrity, and professionalism.
                      You agree to adhere to the agreed-upon terms with the service requester, including timelines and quality standards.<br/>
                      3. Compliance with Laws :
                      All services you provide must comply with applicable local, state, and national laws.
                      You are solely responsible for obtaining and maintaining any required licenses, permits, or certifications.<br/>
                      4. Non-Discrimination :
                      You agree to provide services without discrimination based on race, gender, religion, age, disability, or other protected categories.<br/>
                      5. Communication :
                      You are responsible for clear and prompt communication with service requesters.
                      ServicePeediya is not involved in negotiations, agreements, or disputes between workers and requesters.<br/>
                      6. Platform's Role :
                      ServicePeediya acts solely as a platform to connect workers with service requesters.
                      We do not guarantee job assignments, payment, or client quality.<br/>
                      7. Payment and Fees :
                      You are responsible for setting and agreeing on fees with the service requester.
                      ServicePeediya is not responsible for payment disputes or issues.<br/>
                      8. Content Ownership :
                      You retain ownership of your profile and service details but grant ServicePeediya the right to display and distribute this content on our platform.<br/>
                      9. Termination :
                      ServicePeediya reserves the right to suspend or terminate your account if you violate these terms.
                      Workers whose accounts are terminated for violations may not re-register without prior approval.<br/>
                      10. Indemnity :
                      You agree to indemnify ServicePeediya for any legal issues or claims arising from your services or interactions with service requesters.<br/>
                      11. Disputes :
                      Any disputes between workers and service requesters must be resolved between the parties. ServicePeediya is not liable for any conflicts.<br/>
                      For any questions or clarifications, please contact us at <Link style={{ textDecoration: "none" }}>servicePeediya@gmail.com</Link>.


                    </p>
    </div>
    </>
  )
}

export default WorkersTerms