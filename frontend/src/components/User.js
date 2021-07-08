import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { TiSortAlphabeticallyOutline } from "react-icons/ti"
import { motion } from "framer-motion";
const User = (props) => {
  var initialUserState = {
    id: null,
    username: "",
    name: "",
    role: "",
    loggedInUser: "",
  };
  const loggedInUser = props.location.state.lg_user;
  const lgUserRole = props.location.state.role;
  console.log(props);
  initialUserState = {
    ...initialUserState,
    loggedInUser: loggedInUser,
    lgUserRole: lgUserRole,
  };
  console.log(initialUserState);
  const [currentUser, setCurrentUser] = useState(initialUserState);
  console.log(currentUser);
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = (id) => {
    UserDataService.get(id)
      .then((response) => {
        var final = response.data;
        final["loggedInUser"] = loggedInUser;
        final["lgUserRole"] = lgUserRole;
        setCurrentUser(final);
        console.log(final);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    axios({
      method: "put",
      url: `http://localhost:8000/router/user/${currentUser.id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: currentUser,
    })
      .then((response) => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
        props.history.push({
          pathname: "/users-list",
          state: { isAuth: true },
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        if (e.response.status === 403)
          setMessage("You cannot update this user");
        console.log(message);
      });
  };

  const deleteUser = () => {
    axios({
      method: "delete",
      url: `http://localhost:8000/router/user/${currentUser.id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: currentUser,
    })
      .then((response) => {
        setMessage("The user was deleted successfully!");
        props.history.push({
          pathname: "/users-list",
          state: { isAuth: true },
        });
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 403)
          setMessage("You cannot delete this user");
      });
  };
  const back = () => {
    props.history.push({
      pathname: "/users-list",
      state: { isAuth: true },
    });
  };
  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <motion.h4
          initial={{opacity: 0, color: 'FFFFFF'}} 
          animate={{opacity: 1, color: '#707070'}}
          transition={{ delay: 1, duration: 2 }}
          >
            User Details
          </motion.h4>
          <motion.form
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1.5}}
          >
            <br></br>
            <div className="form-group">
              <label htmlFor="name"><BsFillPersonFill/> Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={currentUser.username}
                onChange={handleInputChange}
                name="username"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="name"><TiSortAlphabeticallyOutline /> Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentUser.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="role"><GrUserAdmin /> Role</label>
              <select
                id="role"
                defaultValue={currentUser.role}
                onChange={handleInputChange}
                name="role"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <br></br>
          </motion.form>
          <br></br>
          {lgUserRole === "admin" || currentUser.username === loggedInUser ? (
            <>
              <motion.button 
              className="btn btn-danger mr-2"
              onClick={handleShow}
              initial={{opacity: 0, x: '-100vw' }}
              animate={{opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 1.5}}
              >
                Delete
              </motion.button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the user?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-danger" onClick={deleteUser}>
                        Yes, delete
                    </button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <div></div>
          )}
          {"  "}
          {currentUser.username === loggedInUser ? (
            <motion.button
              type="submit"
              className="btn btn-primary"
              onClick={updateUser}
              initial={{opacity: 0, x: '+100vw' }}
              animate={{opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 1.5}}
            >
              Update User
            </motion.button>
          ) : (
            <div></div>
          )}
          <p>{message}</p>
          <br></br>
          <motion.button 
          className="btn btn-light mr-2" 
          onClick={back}
          initial={{opacity: 0, x: '-100vw' }}
          animate={{opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 1.5}}
          >
            Go back
          </motion.button>
        </div>
      ) : (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        >
          <br />
          <Alert variant='warning'>Please click on a User...</Alert>
        </motion.div>
      )}
    </div>
  );
};

export default User;
