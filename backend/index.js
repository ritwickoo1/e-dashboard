const express = require('express');
const cors = require('cors');
require('./db/config')
const Product = require('./db/Product');
const User = require('./db/User');
const app = express();
app.use(express.json())
app.use(cors());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toJSON();
    delete result.password;
    res.send(result);
});
app.post('/login', async (req, res) => {
    if(req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if(user) {
            res.send(user);
        } else {
            res.status(401).send({error: 'Invalid Credentials'});
        }
    }else{
        res.status(400).send({error: 'Email and Password are required'});
    }
});

app.post('/add-Product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if(products) {
        res.send(products);
    } else {
        res.status(401).send({error: 'No Products Found'});
    }
});

app.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id});
    if(result.deletedCount === 1) {
        res.send({message: 'Product Deleted Successfully'});
    } else {
        res.status(401).send({error: 'Product Not Found'});
    }
});
app.get("/search/:key" , async (req, res) => {
    const result = await Product.find({
        $or: [
            {name: {$regex: req.params.key}},
        ]
    });
    if(result) {
        res.send(result);
    } else {
        res.status(401).send({error: 'Product Not Found'});
    }
});

app.get("/product/:id", async (req, res) => {
    const result = await Product.findOne({_id: req.params.id});
    if(result) {
        res.send(result);
    } else {
        res.status(401).send({error: 'Product Not Found'});
    }
});

app.put("/product/:id", async (req, res) => {
    const result = await Product.updateOne({_id: req.params.id}, req.body);
    if(result) {
        res.send({message: 'Product Updated Successfully'});
    } else {
        res.status(401).send({error: 'Product Not Found'});
    }
    
});

app.listen(5000);