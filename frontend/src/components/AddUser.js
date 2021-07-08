import React, { useState } from "react";
import UserDataService from "../services/UserService";
import Login from "./Login";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiMailFill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { TiSortAlphabeticallyOutline } from "react-icons/ti"
const AddUser = () => {
  const initialUserState = {
    name: "",
    username: "",
    role: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const saveUser = () => {
    var data = {
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };
    UserDataService.create(data)
      .then((response) => {
        setUser({
          name: response.data.name,
          username: response.data.username,
          role: response.data.role,
          email: response.data.email,
          password: response.data.password,
        });
        setSubmitted(true);
        console.log(response.data);
        console.log(response.data.username);
      })
      .catch((e) => {
        console.log(e.response.data.error);
      });
  };
  // const newUser = () => {
  //   setUser(initialUserState);
  //   setSubmitted(false);
  // };
  return (
    <div className="submit-form">
      {submitted ? (
        // <div>
        //   <h4>User created successfully</h4>
        //   <button className="btn btn-success" onClick={newUser}>
        //     Add User
        //   </button>
        // </div>
        <Login />
      ) : (
        <div>
          <motion.h2
          initial={{opacity: 0, color: 'FFFFFF'}} 
          animate={{opacity: 1, color: '#707070'}}
          transition={{ delay: 1, duration: 2 }}
          >
            Sign up
          </motion.h2>
          <motion.div 
          className="form-group"
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1.5}}
          >
            <label htmlFor="name"><TiSortAlphabeticallyOutline /> Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </motion.div>
          <motion.div 
          className="form-group"
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1.5}}
          >
            <label htmlFor="username"><BsFillPersonFill />{" "}Username</label>
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
          <motion.div 
          className="form-group"
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 1.5}}
          >
            <label htmlFor="role"><GrUserAdmin />{" "}Role</label>
            <select
                id="role"
                defaultValue={user.role}
                onChange={handleInputChange}
                name="role"
                required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </motion.div>
          <motion.div 
          className="form-group"
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 3, duration: 1.5}}
          >
            <label htmlFor="email"><RiMailFill />{" "}Email</label>
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
          <motion.div 
          className="form-group"
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 1.5}}
          >
            <label htmlFor="password"><RiLockPasswordFill />{" "}Password</label>
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
          onClick={saveUser} 
          className="btn btn-success"
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 4, duration: 1.5}}
          >
            Submit
          </motion.button>
          <br></br>
          <motion.div
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 4.5, duration: 1.5}}
          >
            <Link to={"/login-user"} className="nav-link">
              Have an account ?
            </Link>
          </motion.div>
          <br></br>
          {err ? <p>{err}</p> : <p></p>}
        </div>
      )}
    </div>
  );
};

export default AddUser;
