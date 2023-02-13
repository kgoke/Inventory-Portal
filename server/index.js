import express, { application } from 'express';
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

// .env file setup
dotenv.config();

// server setup
const app = express();
app.use(express.json());
app.use(cors());

// connect to database
const db = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`
});

// check if server is running
app.listen(8800, () => {
    console.log('Server is running on port 8800');
});

// check connection to frontend
app.get("/", (req, res) => {
    res.json('Connected to backend');
});

// handle user login (!!!NOT TO BE USED FOR PRODUCTION!!!)
app.get("/login", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const q = 'SELECT * FROM  users WHERE ' + '`username` = ' + "'" + `${username}` + "'" + ' && ' + '`password` = ' + "'" + `${password}` + "'";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});


// handle getting products from database
app.get("/products", (req, res) => {
    const q = 'SELECT * FROM products';
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

// handle adding products to database
app.post("/products", (req, res) => {
    const q = 'INSERT INTO products (`name`, `number`, `desc`, `price`, `cover`, `qtn`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.number,
        req.body.desc,
        req.body.price,
        req.body.cover,
        req.body.qtn,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json('Product has been created');
    });
});

// handle adding product to cart
app.post("/addtocart", (req, res) => {
    const q = 'INSERT INTO carts (`user_id`, `product-name`,`product-num`, `product-price`) VALUES (?)';
    const values = [
        req.body.user.userid,
        req.body.product.name,
        req.body.product.number,
        req.body.product.price,
    ];

    db.query(q, [values], (err, data) => {
        if(err)return res.json(err);
        return res.json('Product added to cart');
    });
});

// hanlde fetching cart items from database
app.get("/cart", (req, res) => {
    const userid = req.query.userid;
    const q = 'SELECT * FROM  carts WHERE ' + '`user_id` = ' + "'" + `${userid}` + "'";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

// hanlde deleteing item from cart
app.delete("/deletecartitem", (req, res) => {
    const productId = req.query.productid;
    const q = "DELETE FROM `carts` WHERE `id` = '" + productId + "'";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

// handle fetching all users from database
app.get("/users", (req, res) => {
    const q = 'SELECT * FROM users';
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

// handle deleting user form database
app.delete("/deleteuser", (req, res) => {
    const userid = req.query.userid;
    const q = "DELETE FROM `users` WHERE `id` = '" + userid + "'";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// handle fetching single product
app.get("/getiteminfo", (req, res) => {
    const productid = req.query.item;
    const q = "SELECT * FROM `products` WHERE `id` = '" + productid + "'";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})