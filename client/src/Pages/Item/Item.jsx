import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Item.css";

function Item() {
    const {item} = useParams();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(null);
    const [cover, setCover] = useState('');
    const [number, setNumber] = useState(null);
    const [qtn, setQtn] = useState(null);
    
    useEffect(() => {
      const fetchProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/getiteminfo?item=${item}`);
            setName(res.data[0].name);
            setDesc(res.data[0].desc);
            setCover(res.data[0].cover);
            setPrice(res.data[0].price);
            setQtn(res.data[0].qtn);
            setNumber(res.data[0].number);
        }catch(err){
            console.log(err);
        }
      }
      fetchProduct();
    },[])
    

  return (
    <div className='item-page'>
        <div className='item-card'>
            <img src={cover} alt="Product Image" className="item-img" />
            <h1>{name}</h1>
            <h2>Part Number: #{number}</h2>
            <h2>Price: ${price}</h2>
            <h3>Quantity: {qtn}</h3>
            <p>{desc}</p>
        </div>
    </div>
  )
}

export default Item