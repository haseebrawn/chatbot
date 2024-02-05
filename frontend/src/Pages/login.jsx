import React, { useState } from "react";
import "../Wrraper.css";
import axios from "axios";
const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormFilled()) {
      alert("Please fill all the fields.");
      return;
    }

    // Manual email validation
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // console.log(formData);
      const response = await axios.post(
        "http://localhost:10000/api/saveUsersData",
        formData
      );
      const parsedResponse = JSON.parse(response.data.response);
      console.log(parsedResponse);
      // console.log(parsedResponse._id);
      localStorage.setItem('LogedUser', JSON.stringify(parsedResponse));
    } catch (error) {
      console.error("Error:", error);
    }
    handleLogin();
  };

  const isFormFilled = () =>
    formData.username.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

    const isValidEmail = (email) => {
      // Regular expression for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check for at least 3 characters after "gmail.com"
      const domainAndLimitPattern = /@gmail\.com$/;
      return emailPattern.test(email) && domainAndLimitPattern.test(email);
    };

  return (
    <form onSubmit={handleSubmit} className="main_form">
      <input
        type="text"
        id="username"
        name="username"
        className="login_input"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
       <input
        type="email"
        id="email"
        name="email"
        className="login_input"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        type="text"
        id="message"
        name="message"
        placeholder="message"
        value={formData.message}
        onChange={handleChange}
        className="login_textarea"
      ></textarea>
      <button type="submit" className="btnLoginSubmit">
        Submit
      </button>
    </form>
  );
};

export default Login;
