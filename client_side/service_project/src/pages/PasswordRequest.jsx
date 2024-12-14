import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/password-reset/', { email, username });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <>
    <Header/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
  <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
    <h2 className="text-center text-primary mb-4">Forgot Your Password?</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary ">
          Send Password Reset Email
        </button>
      </div>
    </form>
    {message && (
      <div className="mt-3">
        <p className="text-center text-danger">{message}</p>
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default PasswordResetRequest;
