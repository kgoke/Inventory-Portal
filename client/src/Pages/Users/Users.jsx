import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";

function Users(admin) {
  const authenticated = admin;
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated.admin !== "admin") {
      navigate("/");
    }
  }, []);

  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async (userid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/deleteuser?userid=${userid}`
      );
      fetchAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-page">
      <div className="user-container">
        <h1 className="title">Users</h1>
        <section className="user-titles">
          <h1>Name:</h1>
          <h1>Role:</h1>
        </section>
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h1>{user.username}</h1>
            <h1>
              {user.type}{" "}
              <button
                onClick={() => {
                  handleDelete(user.id);
                }}
              >
                Delete
              </button>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
