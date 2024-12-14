import React, { useState } from 'react';
import axios from 'axios';
import Header from '../pages/Header'; // Assuming Header is a separate component.

const SendNotification = () => {
  const [recipientType, setRecipientType] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipientType || !recipientId || !message || !title) {
      setStatusMessage('All fields are required.');
      return;
    }

    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/sendnotify/', {
        recipient_type: recipientType,
        recipient_id: recipientId,
        message: message,
        title: title,  // Include title in the request
      });

      setStatusMessage(response.data.message);
      // Optionally clear form after successful submission
      setRecipientType('');
      setRecipientId('');
      setMessage('');
      setTitle('');
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.error || 'Error sending notification');
      } else {
        setStatusMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Send Notification</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Recipient Type</label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Recipient Type</option>
              <option value="user">User</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Recipient ID</label>
            <input
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="Recipient ID"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification Title"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              style={styles.textarea}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Send Notification'}
            </button>
            <button
              type="button"
              onClick={() => {
                setRecipientType('');
                setRecipientId('');
                setMessage('');
                setTitle('');
              }}
              style={styles.clearButton}
            >
              Clear
            </button>
          </div>
        </form>

        {statusMessage && <p style={styles.status}>{statusMessage}</p>}
      </div>
    </>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '50px auto',
    padding: '25px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '100px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  clearButton: {
    width: '48%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  status: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#333',
    fontSize: '14px',
  },
};

export default SendNotification;
