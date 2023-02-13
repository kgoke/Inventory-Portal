import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart(user) {
  const [products, setProducts] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/cart?userid=${user.userid}`
      );
      setProducts(res.data);
      let newSubTotal = 0;
      for (var i = 0; i < res.data.length; i++) {
        newSubTotal += res.data[i]["product-price"];
      }
      setSubTotal(newSubTotal);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // hanlde deleteing product from cart
  const hanldeDelete = async (product) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/deletecartitem?productid=${product}`
      );
      fetchAllProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-container">
        <section className="cart-bar">
          <h1>Product Name:</h1>
          <h1>Product Number:</h1>
          <h1>Product Price:</h1>
        </section>
        {products.map((product) => (
          <div className="cart-card" key={product.id}>
            <div>{product["product-name"]}</div>
            <div>#{product["product-num"]}</div>
            <div className="price">
              <span>${product["product-price"]}</span>
              <button
                onClick={() => {
                  hanldeDelete(product.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="sub">Total: $ {subtotal} <button>Checkout</button></div>
      </div>
    </div>
  );
}

export default Cart;
