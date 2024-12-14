import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import workers from '../assets/workers.png';
import notification from '../assets/notification.png';
import { Link } from 'react-router-dom';
import { newWorkerNotify } from '../../Apis/fetchApi';

function Dashboard() {
  const [notify, setNotify] = useState(0);

  useEffect(() => {
    newWorkerNotify()
      .then((res) => {
        setNotify(res.data.unread_count || 0); // Ensure valid data
        console.log('Notification Count:', res.data.unread_count);
      })
      .catch((err) => {
        console.error('API Error:', err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-success text-center">
        <i>
          <b>ServicePeediya</b>
        </i>
      </h2>
      <div className="d-flex justify-content-center align-items-center p-5 m-5">
        <Link to={'/dashboard/workers'}>
          <Card style={{ width: '18rem', position: 'relative' }}>
            <Card.Img variant="top" src={workers} />
            {notify > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '60%',
                  padding: '5px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  zIndex: '10',
                }}
              >
                {notify}
              </span>
            )}
          </Card>
        </Link>
        <Link to={'/sendusernotify'}>
          <Card style={{ width: '18rem', position: 'relative' }}>
            <Card.Img variant="top" src={notification} />
            </Card>
            </Link>
      </div>
    </div>
  );
}

export default Dashboard;
