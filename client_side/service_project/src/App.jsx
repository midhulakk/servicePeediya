import './App.css'
import './bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Routes} from 'react-router-dom'
import Land from './pages/Land'
import UserReg from './UserModule/UserReg'
import UserLog from './UserModule/UserLog'
import WorkReg from './WorkerModule/WorkReg'
import WorkLog from './WorkerModule/WorkLog'
import UserHome from './UserModule/UserHome'
import PostJob from './UserModule/PostJob'
import Footer from './pages/Footer';
import JobDetail from './UserModule/JobDetail';
import Dashboard from './Admin/Dashboard';
import Workers from './Admin/Workers';
import WorkerHome from './WorkerModule/WorkerHome';
import ApplyJobs from './WorkerModule/ApplyJobs';
import WorkerStatus from './WorkerModule/WorkerStatus';
import WorkersTerms from './WorkerModule/WorkersTerms';
import ContactUs from './pages/ContactUs';
import ProfileView from './WorkerModule/ProfileView';
import UpdateProfile from './WorkerModule/UpdateProfile';
import JobStatus from './UserModule/JobStatus';
import WorkerProfile from './UserModule/WorkerProfile';
import AboutUs from './pages/AboutUs';
import UserNotify from './UserModule/UserNotify';
import SendUNotify from './Admin/SendUNotify';
import PasswordResetRequest from './pages/PasswordRequest';
import PasswordResetConfirm from './pages/PasswordConfirm';
import FeedbackPage from './pages/FeedbackPage';


function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Land/>}/>
      <Route path='/userReg' element={<UserReg/>}/>
      <Route path='/userLog' element={<UserLog/>}/>
      <Route path='/workReg' element={<WorkReg/>}/>
      <Route path='/workLog' element={<WorkLog/>}/>
      <Route path='/userHome' element={<UserHome/>}/>
      <Route path='/jobpost' element={<PostJob/>}/>
      <Route path='/jobDetail/:id' element={<JobDetail/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/workers' element={<Workers/>}/>
      <Route path='/workerHome' element={<WorkerHome/>}/>
      <Route path='/applyJobs/:id' element={<ApplyJobs/>}/>
      <Route path='/workerStatus' element={<WorkerStatus/>}/>
      <Route path='/workerTerms' element={<WorkersTerms/>}/>
      <Route path='/contactUs' element={<ContactUs/>}/>
      <Route path='/profile' element={<ProfileView/>}/>
      <Route path='/updateProfile/:id' element={<UpdateProfile/>}/>
      <Route path='/jobStatus' element={<JobStatus/>}/>
      <Route path='/workprofile/:id' element={<WorkerProfile/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/usernotify' element={<UserNotify/>}/>
      <Route path='/sendusernotify' element={<SendUNotify/>}/>
      <Route path='/passreq' element={<PasswordResetRequest/>}/>
      <Route path="/reset-password/:uidb64/:token" element={<PasswordResetConfirm />}/>
      <Route path='/feedback' element={<FeedbackPage/>}/>






     </Routes>
     <Footer/>

     <ToastContainer/>
    </>
  )
}

export default App
