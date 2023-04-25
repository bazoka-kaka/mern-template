import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const userRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname;
  const { setAuth, persist, setPersist } = useAuth();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const username = response?.data?.user;
      console.log(accessToken, roles, username);
      setAuth({ user: username, accessToken, roles });
      navigate(from, { from: location });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username and password are required");
      } else if (err.response.status === 401) {
        setErrMsg("Bad credentials");
      } else {
        setErrMsg("Authentication failed");
      }
    }
  };

  return (
    <div>
      {errMsg && <p>{errMsg}</p>}
      <h1>Login into your account</h1>
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
        />
        <br />
        <input
          type="checkbox"
          id="persist"
          checked={persist}
          onChange={(e) => {
            localStorage.setItem("persist", e.target.checked);
            setPersist(e.target.checked);
          }}
        />{" "}
        <label htmlFor="persist">Trust this device</label>
        <br />
        <button>Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register">Create a new account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
