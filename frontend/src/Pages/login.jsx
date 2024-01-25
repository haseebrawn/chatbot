import React, { useState } from "react";
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

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:10000/api/saveUsersData",
        formData
      );
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
    } catch (error) {
      console.error("Error:", error);
    }
    handleLogin();
  };

  const isFormFilled = () =>
    formData.username.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="main_form">
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <textarea
        type="text"
        id="message"
        name="message"
        placeholder="message"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit" className="btnSubmit">
        Submit
      </button>
    </form>
  );
};

export default Login;
