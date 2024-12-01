// import logo from './logo.svg';
// import './App.css';

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Components
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ChangePassword from "./components/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import Home from "./pages/Home";
import Protected from "./pages/Protected";
// CSS
import "./components/uikit-3.21.11/css/uikit.css";
import "./components/materialize-v1.0.0-mod/css/materialize.css";
import "./components/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import "./components/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css";
// javascript
import M from "./components/materialize-v1.0.0-mod/js/materialize.js";
import UIkit from "./components/uikit-3.21.11/js/uikit.min.js";
import Icons from "./components/uikit-3.21.11/js/uikit-icons.min";
import "./components/bootstrap-5.3.3-dist/js/bootstrap.min";
// Bootstrap
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from "react-bootstrap";

function App() {
  // uikit icons
  UIkit.use(Icons);
  //
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);


  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
    <ul uk-accordion="multiple:true">
      <li>
        <span className="uk-accordion-title"><span uk-icon="icon: check"> hi </span>hi</span>
        <div className="uk-accordion-content">how are you</div>
      </li>
      <li>
        <span className="uk-accordion-title">hi</span>
        <div className="uk-accordion-content">how are you</div>
      </li>
      <li>
        <span className="uk-accordion-title">hi</span>
        <div className="uk-accordion-content">how are you</div>
      </li>
    </ul>
      <div className="app">
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas Title</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="me-auto">
                {isLoggedIn ? (
                  <>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/change_password">change_password</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/logout">
                        Logout
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/change_password">
                        Change Password
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/protected">
                        Protected data
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register">
                      Sign up
                    </Nav.Link>
                  </>
                )}
              </Nav>
        </Offcanvas.Body>
      </Offcanvas>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand onClick={handleShow}><span className="pulse btn btn-primary">Drawer</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isLoggedIn ? (
                  <>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/change_password">change_password</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/logout">
                        Logout
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/change_password">
                        Change Password
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/protected">
                        Protected data
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register">
                      Sign up
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            // element={
            //   <ProtectedRoute isLoggedIn={isLoggedIn}>
            //     <Home user={user} />
            //   </ProtectedRoute>
            // }
            element={
                isLoggedIn? <Home user={user}/> : <Navigate to="/login"/>
            }
          />
          <Route path="/protected" element={isLoggedIn?<Protected/>:<Navigate to="/login"/>}/>
          <Route path="/login" element={!isLoggedIn?(<Login onLogin={handleLogin} />):(<Navigate to="/protected"/>)} />
          <Route path="/register" element={!isLoggedIn?(<Register />):(<Navigate to="/protected"/>)} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/change_password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
