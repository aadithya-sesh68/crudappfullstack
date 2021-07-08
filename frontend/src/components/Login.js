import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { motion } from 'framer-motion';
import Alert from 'react-bootstrap/Alert';
import { BsFillPersonFill } from "react-icons/bs";
import { RiMailFill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { useHistory } from "react-router";

const Login = () => {
  const cookies = new Cookies();
  const initialUserState = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [authenticated, setauthenticated] = useState(false);
  const [err, setErr] = useState(null);
  const  history = useHistory();
  const setauth = (val) => {
    setauthenticated(val);
  };
  useEffect(() => {
    getSession();
  }, []);
  const getSession = () => {
    axios({
      method: "get",
      url: "/api/session",
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      if (response.data.isAuthenticated) {
        setauth(true);
      } else {
        setauth(false);
      }
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const logUser = (event) => {
    var log_data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/user-login/",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      withCredentials: true,
      data: log_data,
    })
      .then((response) => {
        setauthenticated(true);
        console.log("---", authenticated);
        history.push({
          pathname: '/users-list',
          state: {isAuth: authenticated},
        });
      })
      .catch((e) => {
        if (e.response.status === 401) setErr("Wrong credentials !!");
        if (e.response.status === 400) setErr("Bad Request, Try again !!");
        if (e.response.status === 406) setErr(e.response.data.error);
        console.log(e.response);
      });
  };

  // const getSession = () => {
  //   fetch("/api/session", {
  //     credentials: "same-origin",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.isAuthenticated) {
  //         setauthenticated(true);
  //       } else {
  //         setauthenticated(false);
  //       }
  //     });
  // };
  return (
    <div className="submit-form">
      {authenticated ? (
        <div>
          <h3>Already Logged In !</h3>
          <Link 
          to={{
            pathname: "/users-list",
            state: { isAuth: authenticated},
          }}
          className="btn btn-primary"
          >
            Click Here
          </Link>
        </div>
        ) : (
      <div>
        <motion.div
          initial={{opacity: 0, x: '-100vw', color: '#FFFFFF'}}
          animate={{opacity: 1, x: 0, color: '#006633'}}
          transition={{ duration: 2}}
        >
          <h1>CRUD App !</h1>
        </motion.div>
        <br />
        <motion.h2
        initial={{opacity: 0, color: 'FFFFFF'}} 
        animate={{opacity: 1, color: '#707070'}}
        transition={{ delay: 1, duration: 2 }}
        >
          Login
        </motion.h2>
        <motion.div 
        className="form-group"
        initial={{opacity: 0, x: '-100vw' }}
        animate={{opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1.5}}
        >
          <label htmlFor="email"><RiMailFill /> Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
        </motion.div>
        <br />
        <motion.div 
        className="form-group"
        initial={{opacity: 0, x: '-100vw' }}
        animate={{opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1.5}}
        >
          <label htmlFor="email"><BsFillPersonFill /> Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            value={user.username}
            onChange={handleInputChange}
            name="username"
          />
        </motion.div>
        <br />
        <motion.div 
        className="form-group"
        initial={{opacity: 0, x: '-100vw' }}
        animate={{opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 1.5}}
        >
          <label htmlFor="password"><RiLockPasswordFill /> Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
        </motion.div>
        <br></br>
        <motion.button 
        onClick={logUser} 
        className="btn btn-success"
        initial={{opacity: 0, x: '-100vw' }}
        animate={{opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1.5}}
        >
          Submit
        </motion.button>
        <br></br>
        <motion.div 
        initial={{opacity: 0, x: '-100vw' }}
        animate={{opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 1.5}}
        >
          <Link to={"/user-add"} className="nav-link">
            Don't have an account? Sign up
          </Link>
        </motion.div>
        <br></br>
        {err ? <Alert variant='danger'>{err}</Alert> : <p></p>}
      </div> 
      )}
    </div>
  );
};

export default Login;
