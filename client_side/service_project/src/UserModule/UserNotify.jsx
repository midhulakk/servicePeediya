import React from 'react';
import UserNav from '../pages/UserNav';
import { userNotication } from '../../Apis/fetchApi';
import { useState } from 'react';
import { useEffect } from 'react';


function UserNotify() {
   const [notifications,setNotification]=useState([])
   const header = {
    Authorization: `Token ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };
   useEffect(()=>{
    userNotication(header).then((res)=>{
        console.log(res.data);
        setNotification(res.data)
    }).catch((err)=>{console.log(err);
    })
   },[])

  return (
    <>
    <UserNav/>
    <div className='container mt-4'>
      <h4 className='text-success text-center mb-4'>Notifications</h4>
      <div className='list-group'>
        {notifications.map((notification) => (
          <div key={notification.id} className='list-group-item mb-3'>
            <h5 className='mb-1 text-success'>{notification.title}</h5>
            <p className='mb-1'>{notification.message}</p>
            <small className='text-muted'>{notification.timestamp}</small>
          </div>
        ))}
      </div>
      {notifications.length === 0 && (
        <p className='text-center text-muted'>No notifications at the moment.</p>
      )}
    </div>
    </>
  );
}

export default UserNotify;

