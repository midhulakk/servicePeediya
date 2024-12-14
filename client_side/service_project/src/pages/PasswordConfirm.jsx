import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const PasswordResetConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Send both passwords in the request
      const response = await axios.post(
        `http://localhost:8000/api/password-reset/confirm/${uidb64}/${token}/`,
        { new_password1: newPassword, new_password2: confirmPassword } // Sending both fields
      );
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      if (error.response?.data?.error) {
        const errorMessages = Object.values(error.response.data.error).flat();
        setErrors(errorMessages); // Display error messages returned from the backend
      } else {
        setErrors([error.response?.data?.error || 'An unexpected error occurred']);
      }
    }
  };

  return (
    <>
    <Header/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
  <div className="card p-5 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
    <h2 className="text-center text-success mb-4">Reset Your Password</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-success btn-lg">
          Set New Password
        </button>
      </div>
    </form>
    {errors.length > 0 && (
      <div className="mt-3">
        <ul className="list-unstyled text-danger">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )}
    {message && (
      <div className="mt-3">
        <p className="text-center">{message}</p>
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default PasswordResetConfirm;
