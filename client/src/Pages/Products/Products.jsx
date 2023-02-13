import React, { useEffect, useState } from "react";
import axios from "axios";
import './Products.css';
import { useNavigate } from "react-router-dom";

export default function Products(userid){
  const [products, setProducts] = useState([]);
  const [list, setList] = useState(false);
  const user = userid;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try{
        const res = await axios.get('http://localhost:8800/products');
        setProducts(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllProducts();
  },[])

  const handleView = () => {
    if(list){
      setList(false);
    }else{
      setList(true);
    }
  }

  const handleCart = async (product) => {
    try{
      await axios.post('http://localhost:8800/addtocart', {user, product});
    }catch(err){
      alert(err);
    }
  }

  return(
    <div className="product-page">
      <section className="product-nav">
        <h1>All Products</h1>
        <button onClick={handleView}> Change View</button>
      </section>
      <>{list? (
        <>
        <section className="list-nav">
          <h1>Name:</h1>
          <h1>Price:</h1>
          <h1>Quantity:</h1>
          <h1>Part Number:</h1>
        </section>
        <div className="list-container">
          {products.map((product) => (
            <div className="list-card" key={product.id} >
              <h2 className="grey-name" onClick={() => {navigate(`/item/${product.id}`)}}>{product.name}</h2>
              <h2>${product.price}</h2>
              <h2 className="grey">{product.qtn}</h2>
              <h2>
                #{product.number}
                <button onClick={() => {handleCart(product)}}>Add to Cart</button>
              </h2>
            </div>
          ))}
        </div>
        </>
      )
      :
      ( 
        <div className="product-container">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {product.cover && <img onClick={() => {navigate(`/item/${product.id}`)}} className="product-cover" src={product.cover} alt="Product Image" />}
              <h2 className="product-name">{product.name}</h2>
              <h3 className="product-num">Part #{product.number}</h3>
              <span className="product-price">${product.price}</span>
              <button onClick={() => {handleCart(product)}}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}</>
      
    </div>
  );
}