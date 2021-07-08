import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";
//import Login from "../components/Login";
//import history from "../history";
import { useHistory } from "react-router";
import Alert from 'react-bootstrap/Alert';
import { BiLogOut } from 'react-icons/bi';
import { motion } from 'framer-motion';

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [currentuser, setCurrentUser] = useState(null);
  const [isLogin, setisLogin] = useState(props.location.state.isAuth);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [logUser, setLogUser] = useState("");
  const [role, setRole] = useState("");

  const history = useHistory();
  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setisLogin(true);
      })
      .catch((e) => {
        console.log("---" + e.message);
        setisLogin(false);
        window.location.href = "/login-user";
      });
    whoami();
  };
  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };
  const whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
        setLogUser(data.username);
        setRole(data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const lgout = () => {
    fetch("/api/user-logout", {
      credentials: "same-origin",
    })
      .then((response) => {
        // console.log(response.data);
        setisLogin(false);
        history.push("/login-user");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {isLogin && (
        <div>
          <div class="btn-lgout">
            <motion.button 
            className="btn btn-warning" 
            onClick={lgout}
            initial={{opacity: 0, y: -250 }}
            animate={{opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5}}
            >
              <BiLogOut />Logout
            </motion.button>
          </div>
          <div className="list row">
            <div className="col-md-6">
              <motion.h4
              initial={{opacity: 0, x: '-100vw' }}
              animate={{opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1.5}}
              >
                Users List
              </motion.h4>
              <motion.div
              initial={{opacity: 0, x: '-100vw' }}
              animate={{opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 1.5}}
              >
                <ul className="list-group">
                  {users &&
                    users.map((user, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveUser(user, index)}
                        key={index}
                      >
                        {user.name}
                      </li>
                    ))}
                </ul>
              </motion.div>
            </div>
            <div className="col-md-6">
              {currentuser ? (
                <motion.div
                initial={{opacity: 0, x: '+100vw' }}
                animate={{opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1.5}}
                >
                  <h4>User</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentuser.name}
                  </div>
                  <div>
                    <label>
                      <strong>Username:</strong>
                    </label>{" "}
                    {currentuser.username}
                  </div>
                  <div>
                    <label>
                      <strong>Role:</strong>
                    </label>{" "}
                    {currentuser.role}
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                    </label>{" "}
                    {currentuser.email}
                  </div>
                  <br></br>
                  {/* {currentuser.role === "admin" ? (
                  <Link
                    to={"/user-detail/" + currentuser.id}
                    className="btn btn-warning"
                  >
                    Edit/View
                  </Link>
                ) : (
                  <div></div>
                )} */}
                  <Link
                    to={{
                      pathname: "/user-det/" + currentuser.id,
                      state: { lg_user: logUser, role: role },
                    }}
                    className="btn btn-info"
                  >
                    View
                  </Link>
                </motion.div>
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
          </div>
        </div>
      )}
    </>
  );
};

export default UsersList;
