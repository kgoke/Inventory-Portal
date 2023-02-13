import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add.css";

function Add(admin) {
  const navigate = useNavigate();
  const authenticated = admin;
  useEffect(() => {
    if (authenticated.admin !== "admin") {
      navigate("/");
    }
  }, []);

  const [product, setProduct] = useState({
    name: "",
    number: "",
    price: null,
    qtn: null,
    desc: "",
    cover: "",
  });

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/products", product);
      console.log(product);
      navigate("/products");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="add-page">
      <h1 className="add-header">Add new product</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Part Number"
          name="number"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Quantity"
          name="qtn"
          onChange={handleChange}
        />
        <textarea
          type="text"
          placeholder="Description"
          rows="5"
          name="desc"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Cover"
          name="cover"
          onChange={handleChange}
        />
        <section className="add-buttons">
          <button onClick={handleClick}>Add</button>
          <button onClick={() => navigate("/products")}>Cancel</button>
        </section>
      </div>
    </div>
  );
}

export default Add;
