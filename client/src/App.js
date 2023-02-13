import React, { useState } from "react";
import "./App.css";
import Products from "./Pages/Products/Products";
import Homepage from "./Pages/Homepage/Homepage";
import Item from "./Pages/Item/Item";
import Cart from "./Pages/Cart/Cart";
import { MdOutlineInventory as Logo } from "react-icons/md";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add";
import axios from "axios";
import Users from "./Pages/Users/Users";

function App() {

  // State to store the login status
  const [loginStatus, setLoginStatus] = useState(true);

  // state to store the user's login information
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  // statue to store the user's type (admin or regular user)
  const [userType, setUserType] = useState("");

  // state to store the user's id
  const [userid, setUserId] = useState("");

  // event handler for changes in teh lgoin form
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // event handler for login button click
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // make a GET request to the login endpoint
    const url = `http://localhost:8800/login?username=${userInfo.username}&password=${userInfo.password}`;
    const res = await axios.get(url);

    // check if response contains data
    if (res.data.length > 0) {
      // if the user is an admin, set their type to 'admin'
      if (res.data[0].type === "admin") {
        setUserType("admin");
      }
      // set the user id
      setUserId(res.data[0].id);

      // set the login status to false
      setLoginStatus(false);
    } else {
      // show an alert if the username/password is incorrect
      alert("Incorrect Username/Password");
    }
  };

  // event handler for the logout button click
  const handleLogOut = () => {
    // set the login status to true
    setLoginStatus(true);

    // reset user info
    setUserInfo({
      username: "",
      password: "",
    });

    // reset the user type
    setUserType("");

    // reset the user id
    setUserId("");
  };

  return (
    <div className="App">
      {loginStatus ? (
        <div className="login-container">
          <div className="login-card">
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Username..."
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <nav className="nav-container">
            <div className="nav-logo">
              <Logo className="logo" />
              <h1>Portal</h1>
            </div>
            <section className="nav-links">
              <Link to="/">Home </Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
            </section>
            {userType === "admin" ? (
              <section className="admin-links">
                <h1>{userType}</h1>
                <Link to="/add">Add Product</Link>
                <Link to="/users">Users</Link>
                <button className="logout-btn" onClick={handleLogOut}>
                  Log Out
                </button>
              </section>
            ) : (
              <button className="logout-btn-reg" onClick={handleLogOut}>
                Log Out
              </button>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products userid={userid} />} />
            <Route path="/add" element={<Add admin={userType} />} />
            <Route path="/users" element={<Users admin={userType} />} />
            <Route path="/cart" element={<Cart userid={userid} />} />
            <Route path="/item/:item" element={<Item />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
