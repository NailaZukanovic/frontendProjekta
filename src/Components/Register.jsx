import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Link} from "@material-ui/core";
import {
    toast,
    ToastContainer,
  } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();

  const notify = () => toast.error("🦄 Passwords don't match", {
    theme: "colored"
  });

  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    isJoined: true
  });

  function handleChange(event) {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setFormData((prevFormdData) => {
      return {
        ...prevFormdData,
        [name]: type === "checkbox" ? checked : value
      };
    });
  }
  console.log(formData);
  function handleSubmit(event) {
    event.preventDefault();
    if (formData.password === formData.confirm) {
        axios.post('http://localhost:4000/signup', {
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        });

        navigate("/notes");
    } else {
    //   console.log("Passwords do not match");
        notify();
      return;
    }
  }
  return (
    <div className="form-container-register">
                <ToastContainer />
      <form className="form-register" onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="First name"
          className="form--input-register"
          value={formData.name}
          onChange={handleChange}
          name="name"
        />
        <input
          type="text"
          placeholder="Last name"
          className="form--input-register"
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
        />
        <input
          type="email"
          placeholder="Email address"
          className="form--input-register"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="form--input-register"
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="form--input-register"
          value={formData.confirm}
          onChange={handleChange}
          name="confirm"
        />
        <div className="form--marketing-register">
          <input
            id="okayToEmail-register"
            type="checkbox"
            checked={formData.isJoined}
            onChange={handleChange}
            name="isJoined"
          />
          <label htmlFor="okayToEmail-register">I want to join the newsletter</label>
        </div>
        <div className="form--marketing-register"><p><a onClick={() => navigate('/Login')}>Already have account? Log in</a></p></div>
        <button className="form--submit-register">Sign up</button>
      </form>
    </div>
  );
}