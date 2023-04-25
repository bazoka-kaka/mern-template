import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const userRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd !== matchPwd) {
      setErrMsg("Password and password confirmation don't match");
      return;
    }
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      navigate("/login", { from: location });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username and password are required");
      } else if (err.response.status === 409) {
        setErrMsg("Username is already taken");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };

  return (
    <div>
      {errMsg && <p>{errMsg}</p>}
      <h1>Register new User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />{" "}
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />{" "}
        <label htmlFor="password_confirmation">Password Confirmation: </label>
        <input
          type="password"
          id="password_confirmation"
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          required
        />{" "}
        <button>Register</button>
        <p>
          Already have an account?{" "}
          <Link to="/login">Login into your account</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
