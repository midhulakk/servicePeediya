import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const UserFeedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/feedback/user/", feedback); // Update API URL if necessary
      setResponseMessage(response.data.message);
      setFeedback({ name: "", email: "", message: "" }); // Reset form
      setError(null);
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
   <>
   <Header/>
    <div className="container mt-4">
      <h4 className="text-success text-center mb-4">We Value Your Feedback</h4>

      {responseMessage && (
        <div className="alert alert-success text-center">{responseMessage}</div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Feedback
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={feedback.message}
            onChange={handleChange}
            placeholder="Enter your feedback"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Submit Feedback
        </button>
      </form>
    </div>
   </>
  );
};

export default UserFeedback;
