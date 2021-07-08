import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { motion } from 'framer-motion';
import AddUser from "./components/AddUser";
import User from "./components/User";
import UsersList from "./components/UsersList";
import Login from "./components/Login";
import Logout from "./components/Logout";

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   getSession();
  // }, []);
  // const getSession = () => {
  //   fetch("/api/session", {
  //     credentials: "same-origin",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.isAuthenticated) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     });
  // };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {" "}
        <div className="navbar-nav mr-auto">
          {/* {isAuthenticated ? (
            <li className="nav-item">
              <Link to={"/logout-user"} className="nav-link">
                Logout
              </Link>
            </li>
          ) : (
            <div></div>
          )} */}
          <li className="nav-item">
            {/*<Link to={"/logout-user"} className="nav-link">
              Logout
        </Link>*/}
          </li>
        </div>
      </nav>
      {/*<motion.div
        initial={{opacity: 0, x: '-100vw', color: '#FFFFFF'}}
        animate={{opacity: 1, x: 0, color: '#006633'}}
      >
        <h1>Welcome to CRUD App !</h1>
      </motion.div>*/}
      <br />
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/users-list"]} component={UsersList} />
          <Route exact path={["/user-add"]} component={AddUser} />
          <Route exact path={["/user-det/:id"]} component={User} />
          <Route exact path={["/", "/login-user"]} component={Login} />
          <Route exact path={["/logout-user"]} component={Logout} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
